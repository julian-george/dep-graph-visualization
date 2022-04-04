export type GithubCommit = {
  oid: string;
  message: string;
  committedDate: string;
  author: { email: string; name: string };
  parents: {
    edges: {
      node: {
        oid: string;
      };
    }[];
  };
};

export type GithubRef = {
  /**
   * Each node's target represents a different head ref, with its history being the previous commits in that ref's branch
   */
  node: {
    target: {
      history: {
        edges: {
          node: GithubCommit;
        }[];
      };
    };
  };
};

export type GithubData = {
  repository: {
    refs: {
      edges: GithubRef[];
    };
  };
};

export type GraphData = (
  | {
      data: {
        id: string;
        label: string;
      };
      position?: {
        x: number;
        y: number;
      };
    }
  | {
      data: {
        source: string;
        target: string;
        label: string;
      };
    }
)[];
