import React from 'react'
import { Message } from "../interfaces"

interface PropsMessages {
  owner: string
  data: Message[]
  initLoading: boolean
  loading: boolean
}

const Messages: React.FC<PropsMessages> = ({ owner, data, loading, initLoading }) => {

  if (initLoading) return <div>Loading ...</div>
  return (
    <div>
      {data.map((elem: Message) => {
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
