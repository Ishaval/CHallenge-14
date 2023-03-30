const { Post } = require("../models");

const postData = [
  {
    title: "Hoodies",
    content: "Hoodies are a great way to stay warm and look cool.",
    user_id: 1,
  },
  {
    title: "Sweaters",
    content: "Sweaters are a great way to stay warm and look cool.",
    user_id: 1,
  },
  {
    title: "T-Shirts",
    content: "T-Shirts are a great way to stay warm and look cool.",
    user_id: 2,
  },
  {
    title: "Pants",
    content: "Pants are a great way to stay warm and look cool.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
