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
