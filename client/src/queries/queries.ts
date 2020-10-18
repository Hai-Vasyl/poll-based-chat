import { gql } from "@apollo/client"

export const GET_INITIAL_MESSAGES = gql`
  query getInitialMessages {
    getInitialMessages {
      content
      id
      owner
    }
  }
`
