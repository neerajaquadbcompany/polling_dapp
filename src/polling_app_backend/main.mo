import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor {

 
  var question: Text = "What is your favorite programming language?";
  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);

  
  votes.put("Motoko", 5);
  votes.put("Rust", 3);
  votes.put("TypeScript", 2);
  votes.put("Python", 4);

  
  public query func getQuestion() : async Text {
    question
  };

  
  public query func getVotes() : async [(Text, Nat)] {
    Iter.toArray(votes.entries())
  };

 
  public func vote(entry: Text) : async [(Text, Nat)] {
    let votes_for_entry: ?Nat = votes.get(entry);
    let current_votes_for_entry: Nat = switch votes_for_entry {
      case null 0;
      case (?Nat) Nat;
    };
    votes.put(entry, current_votes_for_entry + 1);  
    Iter.toArray(votes.entries())  
  };
};
