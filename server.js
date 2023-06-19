import express from "express";
import { createServer } from "http";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();
const http = createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the port for the server to listen on
const port = process.env.PORT || 3006;

// Set up middleware to serve static files
// Parse JSON bodies
app.use(express.static(path.resolve("public")));
app.use("/api", router);

// Set the view engine to ejs and set the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Set up a route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

http.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
