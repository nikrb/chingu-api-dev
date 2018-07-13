const typeDefs = `
  type Query {
    country(id: ID): Country
    countries: [Country]
    currentUserQuery: User
    user(username: String): User
    users: [User]
    standups(username: String): [Standup]
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
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
