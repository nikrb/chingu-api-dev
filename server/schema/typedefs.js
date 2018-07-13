const typeDefs = `
  type Query {
    country(id: ID): Country
    countries: [Country]
    currentUserQuery: User
    user(username: String): User
    users: [User]
    standups(username: String): [Standup]
    post(_id: String): Post
    posts: [Post]
    comment(_id: String): Comment
  }
  type User {
    _id: String
    id: ID
    first_name: String
    last_name: String
    github_url: String
    username: String
    country_id: ID
  }
  type Standup {
    _id: String
    id: ID
    created: String
    user_id: ID
    have_done: String
    will_do: String
    blocked: String
  }
  type Country {
    _id: String
    id: ID
    name: String
  }
  type Post {
    _id: String
    title: String
    content: String
    comments: [Comment]
  }
  type Comment {
    _id: String
    postId: String
    content: String
    post: Post
  }
  input CountryInput{
    name: String!
  }
  input UserInput {
    first_name: String
    last_name: String
    github_url: String
    username: String
    country_id: ID
  }
  input StandupInput {
    user_id: ID
    have_done: String
    will_do: String
    blocked: String
  }
  type Mutation {
    createStandup(standup_data: StandupInput!): Standup
    createUser(user_data: UserInput!): User
    createCountry(country: CountryInput!): Country
    createPost(title: String, content: String): Post
    createComment(postId:String, content: String): Comment
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
