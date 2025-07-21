// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import { PORT, mongoDBURL } from "./config.js";
// import booksRoute from "./routes/booksRoute.js";
// import authRoute from "./routes/authRoute.js"; // ✅ Add this line

// const app = express();

// // Middleware for parsing JSON body
// app.use(express.json());

// // Middleware for handling CORS
// app.use(cors());

// // Health check route
// app.get("/", (req, res) => {
//   res.status(234).send("Welcome To MERN Stack Tutorial");
// });

// // Routes
// app.use("/books", booksRoute);
// app.use("/auth", authRoute); // ✅ Add this line for /auth/signup and /auth/login

// // MongoDB connection and server start
// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("-> App connected to database");
//     app.listen(PORT, () => {
//       console.log(`-> App is listening on port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("-> Failed to connect to MongoDB:", error);
//   });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.json());

// Proper CORS setup to avoid issues:
app.use(
  cors({
    origin: [
      "http://localhost:5173", // your local frontend URL
      "https://your-deployed-frontend-url", // replace this with your actual deployed frontend URL (e.g. your Vercel URL)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);
app.use("/auth", authRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("-> App connected to database");
    app.listen(PORT, () => {
      console.log(`-> App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("-> Failed to connect to MongoDB:", error);
  });
