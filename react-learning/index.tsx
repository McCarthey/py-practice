import React from 'react';
import styles from './task-add.scss';

import G6 from '@antv/g6';
import initData, { G6CustomNode } from '@/assets/initData';
import { Button } from 'antd';
import { Input } from 'antd';

interface G6State {
  g6Data: any;
  mode: string;
  graph: any;
  selectedNode: any;
  selectedEdge: any;
  selectedType: any;
  menuShow: boolean;
  editModalShow: boolean;
  menuStyle: {
	left: string;
	top: string;
  };
  moduleList: ModuleItem[];
}

interface ModuleItem {
  id: number;
  name: string;
  describe: string;
  image_url: string;
}

class TaskAdd extends React.Component {
  state: G6State = {
	g6Data: initData,
	mode: 'default',
	graph: {},
	selectedNode: '',
	selectedEdge: '',
	selectedType: '',
	menuShow: false,
	editModalShow: false,
	menuStyle: {
		left: '0px',
		top: '0px',
	},
	moduleList: [
		{
		id: 1,
		name: '开始',
		describe: '开始组件，生成 task_id',
		image_url: 'http://192.168.1.67:8000/static/start.ico',
		},
		{
		id: 2,
		name: '结束',
		describe: '结束组件',
		image_url: 'http://192.168.1.67:8000/static/end.png',
		},
		{
		id: 3,
		name: 'shell',
		describe: '这是运行 shell 的组件',
		image_url: 'http://192.168.1.67:8000/static/shell.jpg',
		},
		{
		id: 4,
		name: 'rancher',
		describe: '这是一个基于 rancher 的 scrapy 组件',
		image_url: 'http://192.168.1.67:8000/static/rancher.svg',
		},
	],
  };

  componentDidMount() {
	this.initG6();
  }

  /** 切换g6 mode */
  public handleChangeMode = () => {
	if (this.state.mode === 'edit') {
		this.setState({ mode: 'default' });
		this.state.graph.setMode('default');
	} else {
		this.setState({ mode: 'edit' });
		this.state.graph.setMode('edit');
	}
  };

  /** 删除g6 中的元素:节点、线 */
  public handleDeleteItem = () => {
	const { selectedType, selectedNode, selectedEdge, g6Data, graph } = this.state;
	switch (selectedType) {
		case 'node':
		if (!selectedNode) {
			return;
		}
		let dN = g6Data.nodes.splice(g6Data.nodes.findIndex((n: any) => n.id === selectedNode), 1);
		if (dN) {
			// 同时删除该节点相关的线
			dN = dN[0];
			const edges = g6Data.edges;
			for (let i = 0; i < edges.length; i++) {
			if (edges[i].source === dN.id || edges[i].target === dN.id) {
				edges.splice(i, 1);
			}
			}
		}
		this.setState({ selectedNode: '' }); // 删除后清空选中的节点
		break;
		case 'edge':
		if (!selectedEdge) {
			return;
		}
		g6Data.edges.splice(g6Data.edges.findIndex((e: any) => e.id === selectedEdge), 1);
		this.setState({ selectedEdge: '' }); // 删除后清空选中的线
		break;
		default:
		break;
	}

	this.setState({ menuShow: false });

	graph.data(g6Data);
	graph.render();
  };

  /** 保存当前节点、线的信息 */
  public handleSave = () => {
	const nodes = this.state.g6Data.nodes.map((n: any) => {
		return {
		id: n.id,
		x: n.x,
		y: n.y,
		label: n.label,
		shape: n.shape,
		customData: n.customData,
		style: n.style,
		labelCfg: n.labelCfg,
		};
	});
	const edges = this.state.g6Data.edges.map((e: any) => {
		return {
		id: e.id,
		source: e.source,
		target: e.target,
		};
	});
	const g6DataJSON = JSON.stringify({ nodes, edges });
	// console.log(g6DataJSON);
	localStorage.setItem('g6Data', g6DataJSON);
  };

  /** 初始化g6 */
  initG6() {
	G6CustomNode();
	// 全局定义G6的线样式
	G6.Global.defaultEdge.style = {
		endArrow: true,
	};
	const that = this;
	const graph = new G6.Graph({
		container: 'mountNode',
		width: 800,
		height: 500,
		modes: {
		default: [
			'drag-canvas',
			{
			type: 'zoom-canvas',

			sensitivity: 5,
			},
			{
			type: 'tooltip',
			formatText(model: any) {
				return `ID: ${model.id}
              <br>`;
			},
			},
		],

		edit: ['selected-node-click', 'drag-node', 'click-add-edge', 'selected-edge-click'],
		},

		defaultNode: {
		shape: 'rect',
		style: {},
		size: [50, 50],
		},
		nodeStyle: {
		selected: {
			lineWidth: 4,
			fillOpacity: 0.8,
			stroke: '#000',
		},
		},
		edgeStyle: {
		default: {
			lineWidth: 1,
			lineAppendWidth: 30,
		},
		selected: {
			lineWidth: 4,
			lineAppendWidth: 30,
			stroke: '#F56C6C',
		},
		},
	});
	// 定义鼠标右键事件
	graph.on('contextmenu', (ev: any) => {
		if (!ev.item || this.state.mode !== 'edit') {
		return;
		}
		// console.log(ev);
		const item = ev.item;
		const type = item.getType();
		const clientX = ev.clientX;
		const clientY = ev.clientY;
		this.setState({ menuShow: true });
		this.setState({
		menuStyle: {
			left: clientX + 'px',
			top: clientY + 'px',
		},
		});
		this.setState({ selectedType: type });
	});
	graph.on('click', (ev: any) => {
		this.setState({ menuShow: false });
	});
	// 选中某条线
	G6.registerBehavior('selected-edge-click', {
		getEvents() {
		return {
			'edge:dblclick': 'onClick',
			'edge:contextmenu': 'onClick',
		};
		},
		onClick(ev: any) {
		const edge = ev.item;
		const graph = this.graph;
		that.setState({ selectedEdge: edge.getModel().id });
		graph.getEdges().forEach((e: any) => {
			if (e.getModel().id !== edge.getModel().id) {
			graph.setItemState(e, 'selected', false);
			}
		});
		graph.getNodes().forEach((n: any) => {
			graph.setItemState(n, 'selected', false);
		});
		graph.setItemState(edge, 'selected', !edge.hasState('selected'));
		},
	});
	// 选中某个节点
	G6.registerBehavior('selected-node-click', {
		getEvents() {
		return {
			'node:dblclick': 'onClick',
			'node:contextmenu': 'onClick',
		};
		},
		onClick(ev: any) {
		const node = ev.item;
		const graph = this.graph;
		that.setState({ selectedNode: node.getModel().id });
		graph.getNodes().forEach((n: any) => {
			if (n.getModel().id !== node.getModel().id) {
			graph.setItemState(n, 'selected', false);
			}
		});
		graph.getEdges().forEach((e: any) => {
			graph.setItemState(e, 'selected', false);
		});
		graph.setItemState(node, 'selected', !node.hasState('selected'));
		},
	});
	// 画连接线
	G6.registerBehavior('click-add-edge', {
		getEvents() {
		return {
			'node:click': 'onClick',
			'mousemove': 'onMousemove',
		};
		},
		onClick(ev: any) {
		const node = ev.item;
		const graph = this.graph;
		const point = { x: ev.x, y: ev.y };
		const model = node.getModel();
		// 如果在添加边的过程中，再次点击另一个节点，结束边的添加
		if (this.addingEdge && this.edge) {
			graph.updateItem(this.edge, {
			target: model.id,
			});
			const edges = graph.getEdges();
			const g6Data = Object.assign({}, that.state.g6Data, {
			edges: edges.map((e: any) => {
				const { id, source, target } = e.getModel();
				return { id, source, target };
			}),
			});
			that.setState({ g6Data });

			this.edge = null;
			this.addingEdge = false;
		} else {
			// 点击节点，触发增加边
			this.edge = graph.addItem('edge', {
			id: `edge${+new Date()}`,
			source: model.id,
			target: point,
			});
			this.addingEdge = true;
		}
		},
		onMousemove(ev: any) {
		const point = { x: ev.x, y: ev.y };
		if (this.addingEdge && this.edge) {
			// 增加边的过程中，移动时边跟着移动
			this.graph.updateItem(this.edge, {
			target: point,
			});
		}
		},
	});

	graph.data(this.state.g6Data);
	graph.render();
	this.setState({ graph });
  }

  render() {
	const { mode } = this.state;
	let divOp;
	let divMenuShow;
	if (this.state.menuShow) {
		divMenuShow = (
		<div className={styles['menu-wrapper']} style={this.state.menuStyle}>
			{this.state.selectedType !== 'edge' ? <div>编辑</div> : ''}
			<div onClick={this.handleDeleteItem} className={styles['btn-delete']}>
			删除
			</div>
		</div>
		);
	}
	if (mode === 'edit') {
		divOp = this.state.moduleList.map((m: ModuleItem, index: number) => {
		return (
			<div className={styles.module} key={index}>
			添加{m.name}模块
			</div>
		);
		});
	}
	return (
		<div className={styles['g6-page']}>
		<section className={styles['op-wrapper']}>
			<Button onClick={this.handleChangeMode}>
			当前模式:&nbsp;{mode === 'edit' ? '编辑' : '预览'}
			</Button>
			<div className={styles['module-list']}>{divOp}</div>
		</section>
		<div id="mountNode" className={styles.mountNode} />
		{divMenuShow}
		<section className={styles['basic-info-wrapper']}>
			<div className={styles['input-item']}>
			<p>任务名称：</p>
			<Input placeholder="任务名称" />
			</div>
			<div className={styles['input-item']}>
			<p>任务描述：</p>
			<Input.TextArea rows={4} placeholder="任务描述" />
			</div>
		</section>
		<Button type="primary" onClick={this.handleSave}>
			保存
		</Button>
		</div>
	);
  }
}

export default TaskAdd;
