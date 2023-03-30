const { User } = require("../models");

const userData = [
  {
    username: "johndoe",
    password: "admin",
  },
  {
    username: "joseantonio",
    password: "password12345",
  },
  {
    username: "Mardebolivia",
    password: "securepassword",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
