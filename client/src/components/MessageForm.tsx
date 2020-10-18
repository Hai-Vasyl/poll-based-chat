import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from "../queries/mutations"

interface MassageFormProps {
  matchUser(user: string): void
  owner: string
}

const MessageForm: React.FC<MassageFormProps> = ({ owner, matchUser }) => {
  const [content, setContent] = useState("")
  const [user, setUser] = useState("")
  const [postMessage] = useMutation(POST_MESSAGE)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.name === "content") {
      setContent(event.target.value)
    } else {
      setUser(event.target.value)
    }

  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (content.trim().length === 0) {
      return
    }
    postMessage({ variables: { content, owner } })
    setContent("")
  }

  const handleMatchUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    matchUser(user)
  }

  return (
    <div>
      <form onSubmit={handleMatchUser} className="usermatch"  >
        <input type="text" name="user" value={user} onChange={handleChange} />
        <button>Match</button>
      </form>
      <form onSubmit={submitForm} className="form">
        <textarea name="content" className="form__input" value={content} placeholder="Type message here" onChange={handleChange} ></textarea>
        <button className="form__btn">Send</button>
      </form>
    </div>
  )
}

export default MessageForm
