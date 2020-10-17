const { ApolloServer, gql } = require("apollo-server")

const messages = [
  {
    id: JSON.stringify(Date.now()),
    content: "Lorem ipsum dolor sit amet Jhon",
    owner: "Jhon",
  },
  {
    id: JSON.stringify(Date.now() + 1),
    content: "Lorem ipsum dolor sit amet Adam",
    owner: "Adam",
  },
  {
    id: JSON.stringify(Date.now() + 2),
    content: "Lorem ipsum dolor sit amet Joe",
    owner: "Joe",
  },
]

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    owner: String!
  }
  type Query {
    getMessages: [Message]!
  }
  type Mutation {
    postMessage(content: String!, owner: String!): Message!
  }
`

const resolvers = {
  Query: {
    getMessages: () => messages,
  },
  Mutation: {
    postMessage: (_, args) => {
      const newMessage = { id: Date.now(), ...args }
      messages.push(newMessage)
      return newMessage
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server started on url: ${url}`)
})
