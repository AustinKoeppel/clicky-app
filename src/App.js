import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import friends from "./friends.json";
import "./App.css";

class App extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    clickText: "",
    guessedFriends:[],
    friends
  }

  shuffleFriends = () => {
    let currentFriends = this.state.friends;
    let newFriends = [];
    for(let i = 0; i < 12; i++) {
      let rand = Math.floor(Math.random() * currentFriends.length);
      newFriends[i] = currentFriends[rand];
      currentFriends.splice(rand, 1);
      this.setState({friends:newFriends});
    }
    
  }

  componentDidMount = () => {
    this.shuffleFriends();
    this.setState({
      score: 0,
      highScore: 0,
      clickText: "Click an image to begin!"
    });
  }
  
  removeFriend = (id) => {
    let correct = true;
    this.state.guessedFriends.forEach(friend => {
      console.log("Friend id", friend);
      if(friend.id === id) {
        document.getElementsByClassName("container")[0].classList.toggle("shake");
        this.setState({
          guessedFriends: [],
          score:0,
          clickText: "You guessed incorrectly!"
        })
        this.shuffleFriends();
        correct = false;
      }
    });
    if(correct) {
      let guessedFriends = this.state.guessedFriends;
      let pushItem;
      this.state.friends.forEach(friend => {
        if(friend.id === id) {
          pushItem = friend;
        }
      });

      console.log("PUSH",pushItem);
      guessedFriends.push(pushItem);
      let score = this.state.score + 1;
      let highScore = this.state.highScore
      if(highScore < score) {
        highScore = score;
      }

      this.setState({
        guessedFriends: guessedFriends,
        score: score,
        highScore: highScore,
        clickText: "You guessed correctly!"
      })
      this.shuffleFriends();
    }
  }

  render() {
    return (
      <div>
        <Navbar highScore={this.state.highScore}
          score={this.state.score}
          clickText={this.state.clickText}></Navbar>
        <Header></Header>
        <Wrapper>
          {this.state.friends.map(friend =>
            <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id }
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
            />
          )}
        </Wrapper>
        <Footer></Footer>
      </div>
    )
  }
}

// const App = () => (


export default App;
