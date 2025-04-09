import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'

function App() {
  const [count, setCount] = useState(0)

  return (

    <RegistrationForm/>
  )
}

export default App
