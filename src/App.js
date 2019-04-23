import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import pups from "./cards.json";
import "./App.css";

class App extends Component {
 
  state = {
    pups,
    clickedPuppyIds: [],
    score: 0,
    goal: 12,
    status: "",
    topscore:0
  };

  
  shuffleScoreCard = id => {
    let clickedPuppyIds = this.state.clickedPuppyIds;
    let topscore = this.state.topscore;
    if(clickedPuppyIds.includes(id)){
      this.setState({ clickedPuppyIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedPuppyIds.push(id)
      if(clickedPuppyIds.length>topscore)
      {
      this.setState({topscore: clickedPuppyIds.length})
      }
      else
      if(clickedPuppyIds.length === 12){
        
        this.setState({score: 12, status: "You Won! Great Job! Click to play again!", clickedPuppyIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ pups, clickedPuppyIds,  score: clickedPuppyIds.length, status: " " });
       
      for (let i = pups.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [pups[i], pups[j]] = [pups[j], pups[i]];
      }
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clicky</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
        topscore={this.state.topscore}
               goal={12}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.pups.map(puppy => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={puppy.id}
              key={puppy.id}
              image={puppy.image}
            />
          ))}
        </Wrapper>
    </div>
    );
  }
}

export default App;
