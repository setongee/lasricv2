import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from "cors";
import auth from "./routes/linkedinAuth.route.js";
import ping from "./routes/profile.route.js";
dotenv.config()

const port = 4580;
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:9000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "https://lasric.lagosstate.gov.ng"
];

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// base url
let base_url = "/api/v2"

app.use(`${base_url}/auth`, auth);
app.use(`${base_url}/ping`, ping);


app.listen(port, () => {
  console.log(`Server is live on port - ${port}`);
});