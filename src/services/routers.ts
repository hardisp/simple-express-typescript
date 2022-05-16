import express, { Express, Request, Response } from "express";
import path from "path";

export function urlGet(name: string, app: Express, viewName: string) {
  console.log();
  app.get(
    "/",
    (req: Request, res: Response) =>
      res.sendFile(path.join(__dirname, "views", `${viewName}.html`))
    // res.sendFile("./views/index.html", { root: __dirname })
  );
}
