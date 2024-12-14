import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getIndexOfLargest = (arr) => {
  const maxValue = Math.max(...arr); // spread the array to find the max value
  return arr.indexOf(maxValue); // find the first occurrence of the max value
};

const handleAnecdoteClick = (setSelected, setPrevSelected, prevSelected, length) => {
  let randomIndex
  do {
    randomIndex = getRandomInt(0, length - 1)
  } while (randomIndex === prevSelected)
  setPrevSelected(randomIndex)
  setSelected(randomIndex)
}

const handleVoteClick = (selectedIdx, votes, incrementVote) => {
  const updatedVotes = votes.map((vote, idx) => idx === selectedIdx ? vote + 1 : vote)
  incrementVote(updatedVotes)
}

const GenerateButton = (buttonInfo) => {
  if (buttonInfo.flag == "Anecdote") {
    // handle next button rendering and events
    
    // destructure the state arrays
    const [selected, setSelected] = buttonInfo.state
    const [prevSelected, setPrevSelected] = buttonInfo.prevState

    return (
      <button onClick={() => handleAnecdoteClick(setSelected, setPrevSelected, prevSelected, buttonInfo.length)}>
        {buttonInfo.label}
      </button>
    )
  } else if (buttonInfo.flag == "Vote") {
    // handle vote button rendering and events
    const [votes, incrementVote] = buttonInfo.voteState
    return (
      <button onClick={() => handleVoteClick(buttonInfo.selectedIdx, votes, incrementVote)}>
        {buttonInfo.label}
      </button>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // initialise the vote array
  const voteArray = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [prevSelected, setPrevSelected]= useState(0)
  const [votes, incrementVote] = useState(voteArray)

  // get the index of the most popular quote
  const popularVote = getIndexOfLargest(votes)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <GenerateButton label="Next anecdote" length={anecdotes.length } state={[selected, setSelected]} prevState={[prevSelected, setPrevSelected]} flag="Anecdote"/>
      <GenerateButton label="vote" voteState={[votes, incrementVote]} selectedIdx={selected} flag="Vote"/>

      <h1>Anecdote with the most votes</h1>
      {anecdotes[popularVote]}
    </div>
  )
}

export default App