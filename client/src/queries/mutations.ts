import { gql } from "@apollo/client"

export const POST_MESSAGE = gql`
  mutation postMessage($content: String!, $owner: String!) {
    postMessage(content: $content, owner: $owner) {
      content
      id
      owner
    }
  }
`
