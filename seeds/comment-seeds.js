const { Comment } = require("../models");

const commentData = [
  {
    content: "Tremendo post capo wachin",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "Tremendo post capo wachin",
    user_id: 1,
    post_id: 2,
  },
  {
    content: "Tremendo post capo wachin",
    user_id: 2,
    post_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
