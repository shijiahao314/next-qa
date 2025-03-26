export interface Node {
  id: number;
  label: string;
  group: string | undefined;
}

export interface Edge {
  from: number;
  to: number;
  label: string;
}

export interface GraphData {
  nodes: { id: number; label?: string; properties: { name?: string; title?: string } }[];
  edges: { source: number; target: number; type: string }[];
}

export interface GraphVisualizationProps {
  data: GraphData;
}
