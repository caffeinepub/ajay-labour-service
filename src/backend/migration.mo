import Map "mo:core/Map";

module {
  public type OldActor = {
    contactSubmissions : Map.Map<Text, { name : Text; email : Text; phoneNumber : Text; message : Text }>;
    userProfiles : Map.Map<Principal, { name : Text; phoneNumber : Text }>;
    bookings : Map.Map<Text, {
      bookingId : Text;
      name : Text;
      phoneNumber : Text;
      location : Text;
      typeOfWork : Text;
      dateRequired : Text;
      description : Text;
      isPaid : Bool;
      owner : ?Principal;
    }>;
    checkoutSessions : Map.Map<Text, Principal>;
    upiBookings : Nat;
    serviceLocations : Map.Map<Text, {
      name : Text;
      coordinates : { latitude : Float; longitude : Float };
    }>;
    stripeConfiguration : ?{
      secretKey : Text;
      allowedCountries : [Text];
    };
  };

  public type NewActor = {
    contactSubmissions : Map.Map<Text, { name : Text; email : Text; phoneNumber : Text; message : Text }>;
    userProfiles : Map.Map<Principal, { name : Text; phoneNumber : Text }>;
    bookings : Map.Map<Text, {
      bookingId : Text;
      name : Text;
      phoneNumber : Text;
      location : Text;
      typeOfWork : Text;
      dateRequired : Text;
      description : Text;
      isPaid : Bool;
      owner : ?Principal;
    }>;
    checkoutSessions : Map.Map<Text, Principal>;
    upiBookings : Nat;
    serviceLocations : Map.Map<Text, {
      name : Text;
      coordinates : { latitude : Float; longitude : Float };
    }>;
    stripeConfiguration : ?{
      secretKey : Text;
      allowedCountries : [Text];
    };
    superAdmin : ?Principal;
  };

  public func run(old : OldActor) : NewActor {
    { old with superAdmin = null };
  };
};
