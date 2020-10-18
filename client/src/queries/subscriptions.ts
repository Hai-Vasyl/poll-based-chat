import { gql } from "@apollo/client"

export const GET_MESSAGES = gql`
  subscription getMessages {
    getMessages {
      content
      id
      owner
    }
  }
`
