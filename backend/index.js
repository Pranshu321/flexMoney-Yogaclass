var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect to MongoDB Atlas cluster
mongoose.connect(
  "mongodb+srv://pranshu:12345@flexmoney.rgo3ybp.mongodb.net/?retryWrites=true&w=majority"
);

async function CompletePayment(email) {
  // mock implementation of a payment process
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.payment) return "already";
    const updateUser = await User.findOneAndUpdate({ email }, { payment: true });
    return "success";
  }
  return "not user";
}

// Define the User schema
const User = mongoose.model("User", {
  name: String,
  email: String,
  age: Number,
  batch: String,
  payment: Boolean,
  //   payment: Object,
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "This is backend of Yoga Form", status: 200 });
});

app.post("/pay", async(req, res) => {
  const { email } = req.body;
  console.log(email);
  const paymentResult = await CompletePayment(email);
  res.json({ paymentResult });
});

// Handle POST requests to the /users endpoint
app.post("/submit", async (req, res) => {
  // Get the user data from the request body
  console.log(req.body);
  const { name, email, age, batch } = req.body;

  // Do some basic validation
  if (!name || !age || !email || !batch) {
    // res.redirect('/')
    return res.status(400).send({ error: "All fields are required" });
  }
  if (age < 18 || age > 65) {
    return res.status(400).send({ error: "Age must be between 18 and 65" });
  }

  try {
    // Save the user to the database
    const user = await User.create({ name, age, email, batch, payment: false });
    res.send({ user });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error saving user to database or completing payment" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
