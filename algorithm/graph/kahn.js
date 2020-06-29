// 判断有向图中是否存在环
// 卡恩算法：
const isDAG = (graphData) => {
  const edges = _.cloneDeep(graphData.edges);
  const sortedList = [];
  const targetNodesSet = new Set(edges.map(e => e.target));
  const allNodesSet = new Set(graphData.nodes.map(n => n.id));
  const zeroIndegreeNodes = [...allNodesSet].filter(n => !targetNodesSet.has(n));
  while (zeroIndegreeNodes.length) {
    const n = zeroIndegreeNodes.pop();
    sortedList.push(n);
    const outdegreeEdges = edges.filter(e => e.source === n);
    for (let i = 0; i < outdegreeEdges.length; i++) {
      const deletedEdgeIndex = edges.findIndex(e => e.id === outdegreeEdges[i].id);
      const deletedEdgeTargetNodeId = edges[deletedEdgeIndex].target;
      edges.splice(deletedEdgeIndex, 1);
      if (!edges.some(e => e.target === deletedEdgeTargetNodeId)) {
        zeroIndegreeNodes.push(deletedEdgeTargetNodeId);
      }
    }
  }
  // // 若还有剩余的边，则存在环
  if (edges.length) {
    return {
      isDag: false,
      list: [],
    };
  }
  return {
    isDag: true,
    list: sortedList,
  };
};