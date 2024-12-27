import { useState, useEffect } from "react"
import FindCountry from "./components/FindCountry"

const App = () => {
  const [targetCountry, setTargetCountry] = useState('')

  const handleTargetCountryChange = (event) => {
    setTargetCountry(event.target.value)
  }

  return (
    <FindCountry targetCountry={targetCountry} setTargetCountry={handleTargetCountryChange}/>
  )
}

export default App