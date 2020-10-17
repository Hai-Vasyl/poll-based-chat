import React from 'react'
import { useQuery } from "@apollo/client"
import { GET_MESSAGES } from "../queries/queries"
import { Message } from "../interfaces"

const Messages: React.FC<{ owner: string }> = ({ owner }) => {
  const { error, loading, data } = useQuery(GET_MESSAGES)

  if (loading) return <div>Loading ...</div>
  if (error) return <div>Error happend (</div>
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
