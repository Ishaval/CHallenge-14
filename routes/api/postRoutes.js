const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Create new post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData[0]) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
