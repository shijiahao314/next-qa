'use client';

import { GraphData } from '@/action/model/graph';
import { useHeader } from '@/components/frame/HeaderProvider';
import MyToastContainer from '@/components/frame/MyToastContainer';
import GraphVisualization from '@/components/graph/GraphVisualization';
import { useEffect, useState } from 'react';

export default function Page() {
  const defaultGraphData: GraphData = {
    nodes: [],
    edges: []
  };
  const [graphData, setGraphData] = useState<GraphData>(defaultGraphData);

  useEffect(() => {
    async function fetchGraph() {
      const response = await fetch('/api/graph');
      const data = await response.json();

      setGraphData(data);
    }

    fetchGraph();
  }, []);

  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">命名实体识别</label>);
  }, [setHeader]);

  return (
    <>
      <title>KGE-知识图谱表征</title>
      <MyToastContainer></MyToastContainer>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="bg0 border0 hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          知识图谱表征
        </label>
        <div className="flex grow flex-col justify-center space-y-4 overflow-y-auto px-8 py-4">
          <div className="border0 flex h-full grow flex-col justify-center space-y-2 rounded-lg border p-4">
            <label className="text-md font-bold">知识图谱可视化</label>
            <div className="border0 flex h-full w-full border border-dashed shadow">
              {graphData === defaultGraphData ? (
                <div className="flex h-full w-full items-center justify-center">加载中...</div>
              ) : (
                <GraphVisualization data={graphData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
