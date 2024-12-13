import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.val}
      </td>
    </tr>
  )
}

const Statistics = ({props}) => {
  const statCount = props[0].val + props[1].val + props[2].val
  if (statCount === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const avg = (props[0].val + (-1 * props[2].val)) / statCount
  const positivePercentage = (props[0].val / statCount ) * 100
  return (
    <p>
      <StatisticLine text={props[0].name} val={props[0].val}/>
      <StatisticLine text={props[1].name} val={props[1].val}/>
      <StatisticLine text={props[2].name} val={props[2].val}/>
      <StatisticLine text="all" val={statCount}/>
      <StatisticLine text="average" val={avg}/>
      <StatisticLine text="positive" val={positivePercentage}/>
    </p>
  )
}

const Button = (buttonInfo) => {
  const [state, setState] = buttonInfo.state // destructure the array
  return (
    <button onClick={() => setState(state + 1)}>
      {buttonInfo.label}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // instantiate the stats array -- contains stat objects
  const stats = [
    {name: "good", val: good},
    {name: "neutral", val: neutral},
    {name: "bad", val: bad}
  ]

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label="good" state={[good, setGood]}/>
      <Button label="neutral" state={[neutral, setNeutral]}/>
      <Button label="bad" state={[bad, setBad]}/>

      <h1>Statistics</h1>
      <Statistics props={stats}/>
    </div>
  )
}

export default App