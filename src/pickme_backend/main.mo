// import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
// import Iter "mo:base/Iter";
// import Option "mo:base/Option";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Vector "mo:vector/Class";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";

actor {

  public type EventId = Nat32;

  type User = {
    internet_identity : Principal;
    username : Text;
    fullname : Text;
    avatar : Text;
    dob : Text;
    domicile : Text;
    address : Text;
    user_type : Text;
  };
  
  let usersIi = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  let events = TrieMap.TrieMap<Text, Events>(Text.equal, Text.hash);

  public type Events = {
      uuid : Text;
      title : Text;
      poster : Text;
      category : Text;
      total_ticket : Nat32;
      price : Nat32;
      icp_price : Nat32;
      date : Text;
      time : Text;
      country : Text;
      city : Text;
      location : Text;
      description : Text;
      committee_id : Text;
      published_by : Text;
      timestamp : Time.Time;
  };
  
  // private stable var eId : EventId = 0;
  // private stable var events : Trie.Trie<EventId, Events> = Trie.empty();

  public func updateUser(userId : Principal, username : Text, fullname : Text, dob : Text, domicile : Text, address : Text, user_type : Text, avatar : Text) : async Bool {
    let user = usersIi.get(userId);
    switch (user) {
        case (?user) {
          let newUser : User = {
            internet_identity = userId;
            username = username;
            fullname = fullname;
            dob = dob;
            domicile = domicile;
            address = address;
            user_type = user_type;
            avatar = avatar;
            // timestamp = user.timestamp;
          };
          usersIi.put(userId, newUser);
          return true;
        };
        case (null) {
          return false;
        };
    };

  };

  public func register(userId : Principal, username : Text, fullname : Text, dob : Text, domicile : Text, address : Text, user_type : Text, avatar : Text) : async Bool {
    let user_id = userId;

    if (usersIi.get(user_id) != null) {
      return false;
    };
    let user : User = {
      internet_identity = user_id;
      username = username;
      fullname = fullname;
      dob = dob;
      domicile = domicile;
      address = address;
      user_type = user_type;
      avatar = avatar;
      timestamp = Time.now();
    };

    usersIi.put(user.internet_identity, user);

    return true;
  };
  
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  public query func checkUserById(userId : Principal) : async Result.Result<User, Text> {
    let user = usersIi.get(userId);
    
    Debug.print(debug_show(userId));
    switch (user) {
      case (?user) {
        return #ok(user);
      };
      case (null) {
        return #err("User not found!");
      };
    };
  };

  // public query func getUsernameById(userId : Principal) : async Result.Result<Text, Text> {
  //   let user = usersIi.get(userId);
    
  //   switch (user) {
  //       case (?user) {
  //         return #ok(user.username);
  //       };
  //       case (null) {
  //         return #err("User not found!");
  //       };
  //   };
  // };

  public func createEvent(title : Text, poster : Text, category : Text, total_ticket : Nat32, 
    price : Nat32, icp_price : Nat32, date : Text, time : Text, country : Text, city : Text, 
    location : Text, description : Text, committee_id : Text, published_by : Text) : async Bool 
  {
    let eventId = await generateUUID();
    let event : Events = {
      uuid = eventId;
      title = title;
      poster = poster;
      category = category;
      total_ticket = total_ticket;
      price = price;
      icp_price = icp_price;
      date = date;
      time = time;
      country = country;
      city = city;
      location = location;
      description = description;
      committee_id = committee_id;
      published_by = published_by;
      timestamp = Time.now();
    };

    events.put(event.uuid, event);

    return true;
  };

  public query func getEventById(eventId : Text) : async Result.Result<Events, Text> {
    let event = events.get(eventId);
    switch (event) {
        case (?event) {
          return #ok(event);
        };
        case (null) {
          return #err("Event not found!");
        };
    };
  };

  public query func getHeadlineEvent() : async Result.Result<[Events], Text> {
    var hEvent = Vector.Vector<Events>();
    
    for (event in events.vals()) {
      if (event.price <= 10) {
        hEvent.add(event);
      }
    };

    return #ok(Vector.toArray(hEvent));
  };

  public query func getAllEvent() : async Result.Result<[Events], Text> {
    var allEvent = Vector.Vector<Events>();

      for (event in events.vals()) {
        allEvent.add(event);
      };

      return #ok(Vector.toArray(allEvent));
  };

  
  // generate UUID
  public shared func generateUUID() : async Text {
      let g = Source.Source();
      return UUID.toText(await g.new());
  };

  // public func updateEvent(event_id : EventId, event_input : Events) : async Bool {

  //   let result = Trie.find(events, eKey(event_id), Nat32.equal);
  //   let data = Option.isSome(result);

  //   if(data) {
  //     events := Trie.replace(
  //       events,
  //       eKey(event_id),
  //       Nat32.equal,
  //       ?event_input,
  //     ).0;
  //   };

  //   return data;
  // };

  // public func deleteEvent(event_id : EventId) : async Bool {

  //   let result = Trie.find(events, eKey(event_id), Nat32.equal);
  //   let data = Option.isSome(result);

  //   if(data) {
  //     events := Trie.replace(
  //       events,
  //       eKey(event_id),
  //       Nat32.equal,
  //       null,
  //     ).0;
  //   };

  //   return data;
  // };

  // private func eKey(x : EventId) : Trie.Key<EventId> {
  //   return { hash = x; key = x };
  // };

};
