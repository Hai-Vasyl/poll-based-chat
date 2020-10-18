import React, { useState, useRef, useEffect } from 'react'
import Messages from "./components/Messages"
import MessageForm from "./components/MessageForm"
import { useSubscription, useQuery } from "@apollo/client"
import { NEW_MESSAGE } from "./queries/subscriptions"
import { GET_INITIAL_MESSAGES } from "./queries/queries"
import { Message } from "./interfaces"
import "./App.css"

const App: React.FC = () => {
  const { loading, data } = useSubscription(NEW_MESSAGE)
  const { loading: initLoading, data: initData } = useQuery(GET_INITIAL_MESSAGES)
  const [owner, setOwner] = useState("Joe")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const messages: Message[] = initData ? [...initData.getInitialMessages] : []
    setMessages(messages)
  }, [initData])

  useEffect(() => {
    if (data) {
      setMessages(prevMessages => [...prevMessages, { ...data.newMessage }])
    }
  }, [data])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const matchUser = (user: string) => {
    setOwner(user)
  }

  return (
    <div className="wrapper">
      <div className="messages" >
        <Messages owner={owner} loading={loading} data={messages} initLoading={initLoading} />
        <div
          ref={messagesEnd}>
        </div>
      </div>
      <MessageForm owner={owner} matchUser={matchUser} />
    </div>
  )
}

export default App
