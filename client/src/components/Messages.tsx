import React from 'react'
import { useSubscription } from "@apollo/client"
import { GET_MESSAGES } from "../queries/subscriptions"
import { Message } from "../interfaces"

const Messages: React.FC<{ owner: string }> = ({ owner }) => {
  const { loading, data } = useSubscription(GET_MESSAGES)

  if (loading) return <div>Loading ...</div>
  return (
    <div>
      {data.getMessages.map((elem: Message) => {
        return (
          <div key={elem.id} className={`message ${owner === elem.owner && "message--me"}`} >
            <span className="message__owner">{elem.owner}</span>
            <span className="message__content">{elem.content}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
