const dotenv = require("dotenv");
const app = require("./config/server");
const routers = require("./routes/routes");

dotenv.config();

app.use("/", routers);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
