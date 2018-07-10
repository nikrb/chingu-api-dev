
const id2String = o => {
  o._id = o._id.toString();
  return o;
};

const resolvers = (db) => {
  const Posts = db.collection('posts');
  const Comments = db.collection('comments');
  return {
    Query: {
      post: async (root, { _id }) =>
        id2String(await Posts.findOne(ObjectId(_id))),
      posts: async () => (await Posts.find({}).toArray()).map(id2String),
      comment: async (root, { _id }) =>
        id2String(await Comments.findOne(ObjectId(_id))),
    },
    Post: {
      comments: async({ _id }) =>
        (await Comments.find({postId: _id}).toArray()).map(id2String),
    },
    Comment: {
      post: async({ postId }) => id2String(await Posts.findOne(ObjectId(_id)))
    },
    Mutation: {
      createPost: async (root, args, context, info) => {
        const res = await Posts.insert(args);
        return id2String(await Posts.findOne({ _id: res.insertedIds[0]}));
      },
      createComment: async (root, args) => {
        const res = await Comments.insert(args);
        return id2String(await Comments.findOne({ _id: res.insertedIds[0]}));
      }
    }
  };
};

module.exports = resolvers;
