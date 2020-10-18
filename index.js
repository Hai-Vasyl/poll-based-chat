const { ApolloServer, gql, PubSub } = require("apollo-server")
const NEW_MESSAGE = "NEW_MESSAGE"

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
    getInitialMessages: [Message!]
  }
  type Mutation {
    postMessage(content: String!, owner: String!): Message!
  }
  type Subscription {
    newMessage: Message
  }
`

const resolvers = {
  Query: {
    getInitialMessages: () => messages,
  },
  Mutation: {
    postMessage: (_, args) => {
      const newMessage = { id: Date.now(), ...args }
      messages.push(newMessage)
      pubsub.publish(NEW_MESSAGE, { newMessage })
      return newMessage
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator([NEW_MESSAGE])
      },
    },
  },
}

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
})

server.listen().then(({ url }) => {
  console.log(`Server started on url: ${url}`)
})
