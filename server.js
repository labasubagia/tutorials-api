const express = require("express");
const cors = require("cors");
const tutorialRouter = require("./router/tutorial");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ message: "Welcome to application" });
});
app.use("/tutorials", tutorialRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
