import express from "express";
import { getCommits } from "services/github/github-service";

const githubRouter = express.Router();

// TODO: redo req typing
githubRouter.get("/", async (req: { query: { url: string } }, res) => {
  try {
    const commitData = await getCommits(req.query.url);
    res.status(200).end(JSON.stringify(commitData));
  } catch (e: any) {
    console.error(e);
    res.status(e?.code ?? 500).end(e?.message ?? "Unknown Error");
  }
});

export default githubRouter;
