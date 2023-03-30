const router = require("express").Router();
const { Comment, User } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete comment
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
