import React from 'react';

import GGEditor, { Flow, Command, Toolbar } from 'gg-editor';

const data = {
  nodes: [
	{
		type: 'node',
		size: '70*70',
		shape: 'flow-circle',
		color: '#FA8C16',
		label: '起止节点',
		x: 55,
		y: 55,
		id: 'ea1184e8',
		index: 0,
	},
	{
		type: 'node',
		size: '70*70',
		shape: 'flow-circle',
		color: '#FA8C16',
		label: '结束节点',
		x: 55,
		y: 255,
		id: '481fbb1a',
		index: 2,
	},
  ],
  edges: [
	{
		source: 'ea1184e8',
		sourceAnchor: 2,
		target: '481fbb1a',
		targetAnchor: 0,
		id: '7989ac70',
		index: 1,
	},
  ],
};

export default class Editor extends React.Component {
  render() {
	return (
		<GGEditor>
		<Flow style={{ width: 500, height: 500 }} data={data} />
		<Toolbar>
			<Command name="undo">撤销</Command>
			<Command name="redo">重做</Command>
		</Toolbar>
		</GGEditor>
	);
  }
}
