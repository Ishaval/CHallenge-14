const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post by id
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("post", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", (req, res) => {
//   res.render("home");
// });

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "createdAt"],
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "createdAt"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
