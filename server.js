
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  sendContactMessage,
  sendTestimonial,
  sendRegistrationEmail,
} = require("./services/mailService");

mongoose.connect("mongodb://127.0.0.1:27017/skill_swap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
  offers: String,
  wants: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already exists" });

  const user = new User({ name, email, password });
  await user.save();
  await sendRegistrationEmail(email, name);
  res.json({ success: true });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
  const { bio, offers, wants, password } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false });

  user.bio = bio;
  user.offers = offers;
  user.wants = wants;

  if (password && password.trim()) {
    user.password = password;
  }

  await user.save();
  res.json({ success: true });
});

app.put("/api/users/:id/admin-update", async (req, res) => {
  const { name, email, bio, offers, wants } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      bio,
      offers,
      wants,
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to get user" });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or error occurred" });
  }
});

app.get("/api/init-users", async (req, res) => {
  await User.deleteMany({});
  await User.insertMany([
    {
      name: "Admin",
      email: "admin@skillswap.sa",
      password: "admin123",
      bio: "Platform administrator",
      offers: "",
      wants: "",
    },
    {
      name: "Sara Ahmed",
      email: "sara@example.com",
      password: "123456",
      bio: "Graphic Designer",
      offers: "Photoshop, Illustrator",
      wants: "Web Development",
    },
    {
      name: "Mohammed Ali",
      email: "mohammed@example.com",
      password: "123456",
      bio: "Full Stack Developer",
      offers: "Node.js, React",
      wants: "UI/UX Design",
    },
  ]);
  res.send("Dummy users added.");
});

app.post("/api/contact", async (req, res) => {
  const { sender, type, message } = req.body;
  try {
    await sendContactMessage(sender, type, message);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send contact message:", err);
    res.status(500).json({ success: false });
  }
});

app.post("/api/testimonial", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendTestimonial(name, email, message);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to send testimonial:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
