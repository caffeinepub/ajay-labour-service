import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact form submission type
  type ContactSubmission = {
    name : Text;
    email : Text;
    phoneNumber : Text;
    message : Text;
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phoneNumber : Text, message : Text) : async Text {
    let submission : ContactSubmission = {
      name;
      email;
      phoneNumber;
      message;
    };
    contactSubmissions.add(phoneNumber, submission);
    "Contact form submitted successfully";
  };

  type Booking = {
    bookingId : Text;
    name : Text;
    phoneNumber : Text;
    location : Text;
    typeOfWork : Text;
    dateRequired : Text;
    description : Text;
    paymentStatus : Bool;
  };

  let bookings = Map.empty<Text, Booking>();

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    if (stripeConfiguration != null) {
      Runtime.trap("Stripe is already configured");
    };
    stripeConfiguration := ?config;
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
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
    let newBooking : Booking = {
      bookingId;
      name;
      phoneNumber;
      location;
      typeOfWork;
      dateRequired;
      description;
      paymentStatus = false;
    };

    bookings.add(bookingId, newBooking);
  };

  public shared ({ caller }) func updateBookingPaymentStatus(bookingId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update payment status");
    };
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking does not exist.") };
      case (?booking) {
        bookings.add(bookingId, { booking with paymentStatus = true });
      };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let stripeConfig = getStripeConfig();
    await Stripe.createCheckoutSession(stripeConfig, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  type ServiceArea = {
    name : Text;
    location_coordinates : {
      latitude : Float;
      longitude : Float;
    };
  };

  let serviceAreas = Map.empty<Text, ServiceArea>();

  public shared ({ caller }) func addServiceArea(name : Text, latitude : Float, longitude : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add service areas");
    };
    let newServiceArea : ServiceArea = {
      name;
      location_coordinates = {
        latitude;
        longitude;
      };
    };
    serviceAreas.add(name, newServiceArea);
  };

  public query ({ caller }) func getAllServiceAreas() : async [ServiceArea] {
    serviceAreas.values().toArray();
  };
};
