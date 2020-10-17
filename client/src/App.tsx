import React, { useState } from 'react'
import Messages from "./components/Messages"
import MessageForm from "./components/MessageForm"
import "./App.css"

const App: React.FC = () => {
  const [owner, setOwner] = useState("Joe")

  const matchUser = (user: string) => {
    setOwner(user)
  }

  return (
    <div className="wrapper">
      <div ><Messages owner={owner} /></div>
      <MessageForm owner={owner} matchUser={matchUser} />
    </div>
  )
}

export default App
