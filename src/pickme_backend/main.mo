import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

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

  public type Events = {
      title : Text;
      poster : Text;
      category : Text;
      total_ticket : Nat;
      price : Nat;
      icp_price : Nat;
      date : Text;
      time : Text;
      country : Text;
      city : Text;
      location : Text;
      description : Text;
      committee_id : Text;
      published_by : Text;
  };
  
  private stable var eId : EventId = 0;
  private stable var events : Trie.Trie<EventId, Events> = Trie.empty();

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
      // timestamp = Time.now();
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

  public query func getUsernameById(userId : Principal) : async Result.Result<Text, Text> {
    let user = usersIi.get(userId);
    
    switch (user) {
        case (?user) {
          return #ok(user.username);
        };
        case (null) {
          return #err("User not found!");
        };
    };
  };

  // public func signIn(user : Users) : async UserId {
  //   let user_id = uId;

  //   uId += 1;
  //   users := Trie.replace(
  //     users,
  //     uKey(user_id),
  //     Nat32.equal,
  //     ?user,
  //   ).0;

  //   return user_id;
  // };

  // public query func getUser(user_id : UserId) : async ?Users {
  //   let result = Trie.find(users, uKey(user_id), Nat32.equal);

  //   return result;
  // };

  // private func uKey(x : UserId) : Trie.Key<UserId> {
  //   return { hash = x; key = x };
  // };

  public func createEvent(event : Events) : async EventId {
    let event_id = eId;

    eId += 1;
    events := Trie.replace(
      events,
      eKey(event_id),
      Nat32.equal,
      ?event,
    ).0;

    return event_id;
  };

  public query func readEvent(event_id : EventId) : async ?Events {
    let result = Trie.find(events, eKey(event_id), Nat32.equal);

    return result;
  };

  public query func readAllEvent() : async [(EventId, Events)] {
    let result = Iter.toArray(Trie.iter(events));

    return result;
  };

  public func updateEvent(event_id : EventId, event_input : Events) : async Bool {

    let result = Trie.find(events, eKey(event_id), Nat32.equal);
    let data = Option.isSome(result);

    if(data) {
      events := Trie.replace(
        events,
        eKey(event_id),
        Nat32.equal,
        ?event_input,
      ).0;
    };

    return data;
  };

  public func deleteEvent(event_id : EventId) : async Bool {

    let result = Trie.find(events, eKey(event_id), Nat32.equal);
    let data = Option.isSome(result);

    if(data) {
      events := Trie.replace(
        events,
        eKey(event_id),
        Nat32.equal,
        null,
      ).0;
    };

    return data;
  };

  private func eKey(x : EventId) : Trie.Key<EventId> {
    return { hash = x; key = x };
  };

};
