import express from "express";
import { getCommits } from "services/github/github-service";

const githubRouter = express.Router();

// TODO: redo req typing
githubRouter.get<{ url: string }>("/:url", async (req, res) => {
  try {
    const url = decodeURIComponent(req.params.url);
    const commitData = await getCommits(url);
    res.status(200).end(JSON.stringify(commitData));
  } catch (e: any) {
    console.error(e);
    res.status(e?.code ?? 500).end(e?.message ?? "Unknown Error");
  }
});

export default githubRouter;
