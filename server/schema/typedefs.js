const typeDefs = `
  type Query {
    country(id: ID): Country
    countries: [Country]
    post(_id: String): Post
    posts: [Post]
    comment(_id: String): Comment
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
  type Mutation {
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
