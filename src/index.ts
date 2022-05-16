import express, { Express, NextFunction, Request, Response } from "express";
import http, { request } from "http";
import path from "path";
import fs, { promises as fsPromises } from "fs";
import dotenv from "dotenv";
import { urlGet } from "./services";

dotenv.config();

const PORT = process.env.PORT || 3500;
const httpHeader = process.env.NODE_ENV === "production" ? "https" : "http";

const app: Express = express();

// app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.get(
  "^/$|/index(.html|.php|.net)?",
  (req: Request, res: Response) =>
    res.sendFile(path.join(__dirname, "views", "index.html"))
  // res.sendFile("./views/index.html", { root: __dirname })
);

app.get("/new-page(.html|.php|.net)?", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "views", "new-page.html"))
);
app.get(
  "/old-page(.html|.php|.net)?",
  (req: Request, res: Response) => res.redirect(301, "/new-page") // 302 by default
);

// Router Handler
app.get(
  "/hello(.html|.php|.net)?",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Attempted to call hello");
    next(); // will call next function on chance
  },
  (req: Request, res: Response) => res.send("Hello World")
);

// Chain Router
function rOne(req: Request, res: Response, next: NextFunction) {
  console.log("Router One");
  next();
}
function rTwo(req: Request, res: Response, next: NextFunction) {
  console.log("Router Two");
  next();
}
function rThree(req: Request, res: Response, next: NextFunction) {
  console.log("Router Three");
  res.send("Chain completed!");
}

app.get("/chain(.html|.php|.net)?", [rOne, rTwo, rThree]);

app.get("/*", (req: Request, res: Response) =>
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
);

app.listen(PORT, () =>
  console.log(
    `⚡️[server]: Server is running at ${httpHeader}://localhost:${PORT}`
  )
);
