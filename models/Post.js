const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  upvote: [
    {
      user: {
        type: Schema.Type.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Type.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
