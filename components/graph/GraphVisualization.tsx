'use client';

import { Edge, GraphVisualizationProps, Node } from '@/action/model/graph';
import { useEffect, useRef } from 'react';
import { Network, Options } from 'vis-network';

export default function GraphVisualization({ data }: GraphVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    const nodes: Node[] = data.nodes.map((node) => ({
      id: node.id,
      label: node.properties.name || node.properties.title || '',
      group: node.label
    }));

    const edges: Edge[] = data.edges.map((edge) => ({
      from: edge.source,
      to: edge.target,
      label: edge.type
    }));

    const networkData = { nodes, edges };

    const options: Options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      clickToUse: false,
      nodes: {
        shape: 'dot',
        size: 15
      },
      edges: {
        arrows: 'to',
        smooth: true
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -3000,
          springLength: 95
        }
      }
    };

    const network = new Network(containerRef.current, networkData, options);

    return () => network.destroy();
  }, [data]);

  return <div className="flex h-full w-full dark:invert" ref={containerRef} />;
}
