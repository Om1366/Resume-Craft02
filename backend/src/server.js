require("dotenv").config();   // 👈 MUST BE FIRST

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

// Connect MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
