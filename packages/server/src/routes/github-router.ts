import express from "express";
import { getCommits } from "services/github";

const githubRouter = express.Router();

// TODO: redo req typing
githubRouter.get("/", async (req: { query: { url: string } }, res) => {
  try {
    await getCommits(req.query.url);
    res.end("Success");
  } catch (e: any) {
    console.error(e);
    res.status(e?.code ?? 500).send(e?.message ?? "Unknown Error");
  }
});

export default githubRouter;
