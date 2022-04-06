const router = require("express").Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "Name is required" });
    return;
  }

  const user = {
    name,
    salary,
    approved,
  };

  try {
    await User.create(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const user = {
    name,
    salary,
    approved,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);
    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: "User not found" });
    return;
  }
  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
