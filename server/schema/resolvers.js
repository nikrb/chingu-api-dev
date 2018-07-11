const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const id2String = o => {
  o._id = o._id.toString();
  // chingu uses id: ID
  o.id = o._id;
  return o;
};

const resolvers = (db) => {
  const Posts = db.collection('posts');
  const Comments = db.collection('comments');
  const Countries = db.collection('countries');
  return {
    Query: {
      country: async (root, { id }) => {
        const res = await Countries.find({ _id: ObjectId(id) }).limit(1).toArray();
        return id2String(res[0]);
      },
      countries: async () => (await Countries.find({}).toArray()).map(id2String),
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
      createCountry: async (root, args) => {
        const country = {...args.country};
        const res = await Countries.insertOne(country);
        const new_id = res.insertedId;
        Countries.updateOne({ _id: ObjectId(new_id)}, {$set: { id: new_id }});
        return id2String(res.ops[0]);
      },
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
