import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Bool "mo:core/Bool";
import Debug "mo:core/Debug";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Super admin principal for full access rights
  var superAdmin : ?Principal = null;

  // Helper function to check if caller is super admin
  func isSuperAdmin(caller : Principal) : Bool {
    switch (superAdmin) {
      case (null) { false };
      case (?admin) { Principal.equal(caller, admin) };
    };
  };

  // Helper function to check if caller has admin privileges (either super admin or regular admin)
  func hasAdminAccess(caller : Principal) : Bool {
    isSuperAdmin(caller) or AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getSuperAdmin() : async ?Principal {
    Debug.print("getSuperAdmin called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can view super admin");
    };
    
    Debug.print("Authorization successful");
    superAdmin;
  };

  public shared ({ caller }) func setSuperAdmin(newSuperAdmin : Principal) : async () {
    Debug.print("setSuperAdmin called by: " # caller.toText());
    Debug.print("Attempting to set super admin to: " # newSuperAdmin.toText());
    Debug.print("Current super admin: " # (switch (superAdmin) { case (null) { "none" }; case (?p) { p.toText() } }));
    
    // Check if caller is anonymous
    if (caller.isAnonymous()) {
      Debug.print("Authorization failed: anonymous caller cannot set super admin");
      Runtime.trap("Unauthorized: Anonymous users cannot set super admin");
    };

    switch (superAdmin) {
      // Allow initial setup only by authenticated users
      case (null) {
        Debug.print("Initial super admin setup");
        superAdmin := ?newSuperAdmin;
        // Grant admin role to the new super admin
        AccessControl.assignRole(accessControlState, caller, newSuperAdmin, #admin);
        Debug.print("Super admin set successfully and granted admin role");
      };
      // Only current superAdmin can update
      case (?current) {
        Debug.print("Updating existing super admin");
        if (not Principal.equal(caller, current)) {
          Debug.print("Authorization failed: caller is not current super admin");
          Runtime.trap("Unauthorized: Only current super admin can update super admin");
        };
        superAdmin := ?newSuperAdmin;
        // Grant admin role to the new super admin
        AccessControl.assignRole(accessControlState, caller, newSuperAdmin, #admin);
        Debug.print("Super admin updated successfully and granted admin role");
      };
    };
  };

  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    Debug.print("getCallerUserProfile called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    Debug.print("getUserProfile called by: " # caller.toText() # " for user: " # user.toText());
    
    if (not Principal.equal(caller, user) and not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: can only view own profile or must be admin");
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    Debug.print("saveCallerUserProfile called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
    Debug.print("Profile saved successfully");
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phoneNumber : Text;
    message : Text;
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();

  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    phoneNumber : Text,
    message : Text,
  ) : async Text {
    Debug.print("submitContactForm called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can submit contact forms");
    };
    let submission : ContactSubmission = {
      name;
      email;
      phoneNumber;
      message;
    };
    contactSubmissions.add(phoneNumber, submission);
    Debug.print("Contact form submitted successfully");
    "Contact form submitted successfully";
  };

  public type Booking = {
    bookingId : Text;
    name : Text;
    phoneNumber : Text;
    location : Text;
    typeOfWork : Text;
    dateRequired : Text;
    description : Text;
    isPaid : Bool;
    owner : ?Principal;
  };

  let bookings = Map.empty<Text, Booking>();

  public query ({ caller }) func getAllBookings() : async [Booking] {
    Debug.print("getAllBookings called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  public query ({ caller }) func getBooking(bookingId : Text) : async ?Booking {
    Debug.print("getBooking called by: " # caller.toText() # " for booking: " # bookingId);
    
    switch (bookings.get(bookingId)) {
      case (null) { null };
      case (?booking) {
        switch (booking.owner) {
          case (?owner) {
            if (not Principal.equal(owner, caller) and not hasAdminAccess(caller)) {
              Debug.print("Authorization failed: can only view own bookings");
              Runtime.trap("Unauthorized: Can only view your own bookings");
            };
          };
          case (null) {};
        };
        ?booking;
      };
    };
  };

  func validateTextField(fieldName : Text, value : Text) : Text {
    let trimmed = value.trimStart(#char(' ')).trimEnd(#char(' '));
    if (trimmed == "") {
      Runtime.trap(fieldName # " cannot be empty");
    };
    if (trimmed.size() > 128) {
      Runtime.trap(fieldName # " is too long (max 128 characters)");
    };
    trimmed;
  };

  public shared ({ caller }) func createBooking(
    bookingId : Text,
    name : Text,
    phoneNumber : Text,
    location : Text,
    typeOfWork : Text,
    dateRequired : Text,
    description : Text,
  ) : async () {
    Debug.print("createBooking called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can create bookings");
    };

    ignore validateTextField("bookingId", bookingId);
    ignore validateTextField("name", name);
    ignore validateTextField("typeOfWork", typeOfWork);
    ignore validateTextField("dateRequired", dateRequired);

    let newBooking : Booking = {
      bookingId;
      name;
      phoneNumber;
      location;
      typeOfWork;
      dateRequired;
      description;
      isPaid = false;
      owner = ?caller;
    };
    bookings.add(bookingId, newBooking);
    Debug.print("Booking created successfully");
  };

  public shared ({ caller }) func updateBookingPaymentStatus(bookingId : Text) : async () {
    Debug.print("updateBookingPaymentStatus called by: " # caller.toText() # " for booking: " # bookingId);
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can update payment status");
    };
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking does not exist.") };
      case (?booking) {
        let updatedBooking = { booking with isPaid = true };
        bookings.add(bookingId, updatedBooking);
        Debug.print("Payment status updated successfully");
      };
    };
  };

  public query ({ caller }) func getBookingMetrics() : async {
    totalBookings : Nat;
    paidBookings : Nat;
    pendingPayments : Nat;
    totalRevenue : Nat;
  } {
    Debug.print("getBookingMetrics called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can view metrics");
    };

    var totalBookings = 0;
    var paidBookings = 0;
    var pendingPayments = 0;
    var totalRevenue = 0;

    for ((_, booking) in bookings.entries()) {
      totalBookings += 1;
      if (booking.isPaid) {
        paidBookings += 1;
        totalRevenue += 1000;
      } else {
        pendingPayments += 1;
      };
    };

    {
      totalBookings;
      paidBookings;
      pendingPayments;
      totalRevenue;
    };
  };

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    Debug.print("setStripeConfiguration called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    if (stripeConfiguration != null) {
      Runtime.trap("Stripe is already configured");
    };
    stripeConfiguration := ?config;
    Debug.print("Stripe configuration set successfully");
  };

  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can check Stripe configuration status");
    };
    stripeConfiguration != null;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public type UpiPaymentRequest = {
    amount : Nat;
    upiId : Text;
    customerName : Text;
    description : Text;
  };

  public shared ({ caller }) func processUpiPayment(request : UpiPaymentRequest, successUrl : Text, cancelUrl : Text) : async Text {
    Debug.print("processUpiPayment called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can make payments");
    };

    // UPI ID must contain '@', no Text.matches check needed!
    if (not request.upiId.contains(#char('@'))) {
      Runtime.trap("Invalid UPI ID format. Please enter a valid UPI ID.");
    };

    let item : Stripe.ShoppingItem = {
      currency = "INR";
      productName = request.customerName;
      productDescription = request.description;
      priceInCents = request.amount;
      quantity = 1;
    };

    let response = await Stripe.createCheckoutSession(
      getStripeConfig(),
      caller,
      [item],
      successUrl,
      cancelUrl,
      transform,
    );
    Debug.print("UPI payment processed successfully");
    response;
  };

  var checkoutSessions = Map.empty<Text, Principal>();

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    Debug.print("createCheckoutSession called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can make payments");
    };

    let sessionId = await Stripe.createCheckoutSession(
      getStripeConfig(),
      caller,
      items,
      successUrl,
      cancelUrl,
      transform,
    );
    checkoutSessions.add(sessionId, caller);
    Debug.print("Checkout session created successfully");
    sessionId;
  };

  var upiBookings = 0;

  public shared ({ caller }) func createUpiOrder(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    Debug.print("createUpiOrder called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can create UPI orders");
    };

    let response = await Stripe.createCheckoutSession(
      getStripeConfig(),
      caller,
      items,
      successUrl,
      cancelUrl,
      transform,
    );
    upiBookings += 1;
    Debug.print("UPI order created successfully");
    response;
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    Debug.print("getStripeSessionStatus called by: " # caller.toText() # " for session: " # sessionId);
    
    switch (checkoutSessions.get(sessionId)) {
      case (null) {
        if (not hasAdminAccess(caller)) {
          Debug.print("Authorization failed: session not found and caller is not admin");
          Runtime.trap("Unauthorized: Session not found or access denied. This sessionId may belong to another user.");
        };
      };
      case (?owner) {
        if (not Principal.equal(owner, caller) and not hasAdminAccess(caller)) {
          Debug.print("Authorization failed: can only check own session status");
          Runtime.trap("Unauthorized: Can only check your own sessionId status for Stripe checkout.");
        };
      };
    };
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public shared ({ caller }) func getUpiBookingsCount() : async Nat {
    Debug.print("getUpiBookingsCount called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Payment metrics are available for admins only");
    };
    upiBookings;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  type ServiceLocation = {
    name : Text;
    coordinates : {
      latitude : Float;
      longitude : Float;
    };
  };

  let serviceLocations = Map.empty<Text, ServiceLocation>();

  public shared ({ caller }) func addServiceLocation(name : Text, latitude : Float, longitude : Float) : async () {
    Debug.print("addServiceLocation called by: " # caller.toText());
    
    if (not hasAdminAccess(caller)) {
      Debug.print("Authorization failed: caller is not an admin");
      Runtime.trap("Unauthorized: Only admins can add service locations");
    };
    let newServiceLocation : ServiceLocation = {
      name;
      coordinates = {
        latitude;
        longitude;
      };
    };
    serviceLocations.add(name, newServiceLocation);
    Debug.print("Service location added successfully");
  };

  public query ({ caller }) func getAllServiceLocations() : async [ServiceLocation] {
    Debug.print("getAllServiceLocations called by: " # caller.toText());
    
    if (not (AccessControl.hasPermission(accessControlState, caller, #user) or isSuperAdmin(caller))) {
      Debug.print("Authorization failed: insufficient permissions");
      Runtime.trap("Unauthorized: Only authenticated users can view service locations");
    };
    serviceLocations.values().toArray();
  };
};
