import { useState } from 'react'
import './App.css'

// Import Dependencies
import RenderComponentList from './RenderComponentList/RenderComponentList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World!!</h1>

      <RenderComponentList />

    </>
  )
}

export default App
