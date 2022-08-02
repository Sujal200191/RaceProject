import express from "express";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Handle GET requests to /api route
app.get("/api", (_req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Express is listening at http://localhost:${port}`);
});
