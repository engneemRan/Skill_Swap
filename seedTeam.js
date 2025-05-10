const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  offers: String,
  wants: String,
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/skill_swap", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return seedTeam();
  })
  .catch((err) => console.error("❌ Connection error:", err));

async function seedTeam() {
  const teamMembers = [
    {
      name: "Aliyah Al Shammari",
      email: "aliyah@skillswap.sa",
      password: "123456",
      offers: "Frontend Development, UX Design",
      wants: "Leadership, Agile Practices",
    },
    {
      name: "Atheer Al Harbi",
      email: "atheer@skillswap.sa",
      password: "123456",
      offers: "UI/UX Design, Prototyping",
      wants: "Animation, Advanced JS",
    },
    {
      name: "Bdour Al Qurashi",
      email: "bdour@skillswap.sa",
      password: "123456",
      offers: "Data Analysis, Python",
      wants: "AI, NLP",
    },
    {
      name: "Shoug Al Shammari",
      email: "shoug@skillswap.sa",
      password: "123456",
      offers: "Backend Development, APIs",
      wants: "DevOps",
    },
    {
      name: "Raneem Al Harbi",
      email: "raneem@skillswap.sa",
      password: "123456",
      offers: "Project Management, Communication",
      wants: "Technical Writing",
    },
    {
      name: "Randa Al Harthy",
      email: "randa@skillswap.sa",
      password: "123456",
      offers: "Software Testing, QA",
      wants: "Automation Tools",
    },
  ];

  await User.insertMany(teamMembers);
  console.log("✅ Team members added successfully!");
  mongoose.disconnect();
}
