const router = require("express").Router();
const { User } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
