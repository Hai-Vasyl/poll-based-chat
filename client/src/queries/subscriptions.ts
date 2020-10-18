import { gql } from "@apollo/client"

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      content
      id
      owner
    }
  }
`
