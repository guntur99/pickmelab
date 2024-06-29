// import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
// import Iter "mo:base/Iter";
// import Option "mo:base/Option";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Vector "mo:vector/Class";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";

actor {

  // let usersIi = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  let usersIi = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
  let tickets = TrieMap.TrieMap<Text, Tickets>(Text.equal, Text.hash);
  let events = TrieMap.TrieMap<Text, Events>(Text.equal, Text.hash);

  type User = {
    internet_identity : Text;
    username : Text;
    fullname : Text;
    avatar : Text;
    dob : Text;
    domicile : Text;
    address : Text;
    user_type : Text;
    reseller_type : Text;
    progress : Nat32;
    timestamp : Time.Time;
  };
  
  public type Events = {
      uuid : Text;
      title : Text;
      poster : Text;
      category : Text;
      total_ticket : Nat32;
      available_ticket : Nat32;
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
  
  public type Tickets = {
    uuid : Text;
    user_id : Text;
    event_id : Text;
    event_title : Text;
    category : Text;
    price : Nat32;
    icp_price : Nat32;
    discount : Text;
    timestamp : Time.Time;
  };
  
  public func updateProfile(userId : Text, username : Text, fullname : Text, dob : Text, domicile : Text, address : Text, user_type : Text, reseller_type : Text, avatar : Text, progress : Nat32) : async Bool {
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
            reseller_type = reseller_type;
            avatar = avatar;
            progress = progress;
            timestamp = Time.now();
          };
          usersIi.put(userId, newUser);
          return true;
        };
        case (null) {
          return false;
        };
    };

  };

  public func register(userId : Text, username : Text, fullname : Text, dob : Text, domicile : Text, address : Text, user_type : Text, reseller_type : Text, avatar : Text, progress : Nat32) : async Bool {
    let uuid = await generateUUID();
    
    if (usersIi.get(userId) != null) {
      return false;
    };
    let user : User = {
      uuid = uuid;
      internet_identity = userId;
      username = username;
      fullname = fullname;
      dob = dob;
      domicile = domicile;
      address = address;
      user_type = user_type;
      reseller_type = reseller_type;
      avatar = avatar;
      progress = progress;
      timestamp = Time.now();
    };

    usersIi.put(user.internet_identity, user);

    return true;
  };
  
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  public query func checkUserById(userId : Text) : async Result.Result<User, Text> {
    let user = usersIi.get(userId);
    
    switch (user) {
      case (?user) {
        return #ok(user);
      };
      case (null) {
        return #err("User not found!");
      };
    };
  };

  public query func checkUsername(username : Text) : async Result.Result<[User], Text> {
    var allUser = Vector.Vector<User>();

    for (user in usersIi.vals()) {
      if(user.username == username){
        allUser.add(user);
      }
    };

    return #ok(Vector.toArray(allUser));
  };

  public query func getUsername(userId : Text) : async Result.Result<Text, Text> {
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

  public query func getAllUser() : async Result.Result<[User], Text> {
    var allUser = Vector.Vector<User>();
    
    for (user in usersIi.vals()) {
        allUser.add(user);
    };

    return #ok(Vector.toArray(allUser));
  };

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
      available_ticket = total_ticket;
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

  public func updateEvent(eventId : Text, title : Text, poster : Text, category : Text, total_ticket : Nat32, 
    available_ticket : Nat32, price : Nat32, icp_price : Nat32, date : Text, time : Text, country : Text, city : Text, 
    location : Text, description : Text, committee_id : Text, published_by : Text) : async Bool 
  {
    let event = events.get(eventId);
    switch (event) {
        case (?event) {
          let event : Events = {
            uuid = eventId;
            title = title;
            poster = poster;
            category = category;
            total_ticket = total_ticket;
            available_ticket = available_ticket;
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
        case (null) {
          return false;
        };
    };
  };

  public func buyTicket(userId : Text, eventId : Text, eventTitle : Text, ticketCategory : Text, totalTicket : Nat32, price : Nat32, icpPrice : Nat32, discount : Text) : async Bool 
  {
    let ticketId = await generateUUID();
    let ticket : Tickets = {
      uuid = ticketId;
      user_id = userId;
      event_id = eventId;
      event_title = eventTitle;
      category = ticketCategory;
      total_ticket = totalTicket;
      price = price;
      icp_price = icpPrice;
      discount = discount;
      timestamp = Time.now();
    };

    tickets.put(ticket.uuid, ticket);

    return true;
  };

  public query func getTicketsByUId(userId : Text, eventId : Text) : async Result.Result<[Tickets], Text> {
    var allTicket = Vector.Vector<Tickets>();

    for (ticket in tickets.vals()) {
      if(ticket.user_id == userId and ticket.event_id == eventId){
        allTicket.add(ticket);
      }
    };

    return #ok(Vector.toArray(allTicket));
  };

public func transferTicket(receiverId : Text, eventId : Text, eventTitle : Text, ticketCategory : Text, totalTicket : Nat32, price : Nat32, icpPrice : Nat32, discount : Text, ticketId : Text) : async Bool 
  {
    let ticket = tickets.get(ticketId);
    switch (ticket) {
        case (?ticket) {
          let ticket : Tickets = {
            uuid = ticketId;
            user_id = receiverId;
            event_id = eventId;
            event_title = eventTitle;
            category = ticketCategory;
            total_ticket = totalTicket;
            price = price;
            icp_price = icpPrice;
            discount = discount;
            timestamp = Time.now();
          };
          tickets.put(ticket.uuid, ticket);
          return true;
        };
        case (null) {
          return false;
        };
    };
  };

  public query func getAllTicket() : async Result.Result<[Tickets], Text> {
    var allTicket = Vector.Vector<Tickets>();

      for (ticket in tickets.vals()) {
        allTicket.add(ticket);
      };

      return #ok(Vector.toArray(allTicket));
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
  
  public shared func generateUUID() : async Text {
      let g = Source.Source();
      return UUID.toText(await g.new());
  };

};
