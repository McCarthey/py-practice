import React from 'react'
import produce from 'immer'
import styles from './task-add.scss'

import G6 from '@antv/g6'
import initData, { G6CustomNode, tooltipBehavior } from './g6-config'
import { Button, Input, message } from 'antd'
import taskApi from '@/net/task/api'
import moduleApi from '@/net/module/api'

import ConfigModal, { CustomData } from './components/ConfigModal'

interface G6State {
    name: string
    desc: string
    g6Data: any
    mode: string
    graph: any
    selectedNode: any
    selectedEdge: any
    selectedType: any
    menuShow: boolean
    editModalShow: boolean
    menuStyle: {
        left: string
        top: string
    }
    moduleList: ModuleItem[]
    modal: {
        visible: boolean
        type: string
        data?: CustomData
    }
    btnLoading: boolean
}

interface ModuleItem {
    id: number
    name: string
    describe: string
    image_url: string
}

class TaskAdd extends React.Component {
    state: G6State = {
        name: '',
        desc: '',
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
        moduleList: [],
        modal: {
            visible: false,
            type: '',
        },
        btnLoading: false,
    }

    async componentWillMount() {
        if (localStorage.getItem('g6Data')) {
            const g6Data = localStorage.getItem('g6Data') as string
            this.setState({
                g6Data: JSON.parse(g6Data),
            })
        }
        const { data } = await moduleApi.getModuleList()
        this.setState({
            moduleList: data,
        })
    }

    componentDidMount() {
        this.initG6()
    }

    /** 切换g6 mode */
    public handleChangeMode = () => {
        if (this.state.mode === 'edit') {
            this.setState({ mode: 'default' })
            this.state.graph.setMode('default')
        } else {
            this.setState({ mode: 'edit' })
            this.state.graph.setMode('edit')
        }
    }

    /** 添加模块节点 */
    public handleAdd(data: CustomData) {
        const customData: any = Object.assign({}, data)
        for (const key in customData) {
            // 删除空字段
            if (!customData[key]) {
                delete customData[key]
            }
        }
        const item = {
            id: `node${+new Date()}`,
            x: 50,
            y: 50,
            shape: `${customData.type}-module`,
            customData,
        }
        this.setState(
            (state: G6State) => {
                const nodes = state.g6Data.nodes.concat(item)
                return {
                    g6Data: {
                        nodes,
                        edges: state.g6Data.edges,
                    },
                }
            },
            () => {
                this.state.graph.data(this.state.g6Data)
                this.state.graph.render()
            },
        )
    }

    /** 编辑节点信息 */
    public handleEdit(data: CustomData) {
        const customData: any = Object.assign({}, data)
        for (const key in customData) {
            // 删除空字段
            if (!customData[key]) {
                delete customData[key]
            }
        }
        this.setState(
            produce(draft => {
                const eN = draft.g6Data.nodes.findIndex(
                    (n: any) => n.id === this.state.selectedNode,
                )
                draft.g6Data.nodes[eN].customData = customData
                draft.menuShow = false
            }),
            () => {
                this.state.graph.data(this.state.g6Data)
                this.state.graph.render()
            },
        )
    }

    /** 删除g6 中的元素:节点、线 */
    public handleDeleteItem = () => {
        const { selectedType, selectedNode, selectedEdge } = this.state
        switch (selectedType) {
            case 'node':
                if (!selectedNode) {
                    return
                }
                this.setState(
                    produce(draft => {
                        const nodes = draft.g6Data.nodes
                        let dN = nodes.splice(nodes.findIndex((n: any) => n.id === selectedNode), 1)
                        // 同时删除该节点相关的线
                        if (dN) {
                            dN = dN[0]
                            draft.g6Data.edges = draft.g6Data.edges.filter((e: any) => {
                                return e.source !== dN.id && e.target !== dN.id
                            })
                        }
                        draft.selectedNode = '' // 删除后清空选中的节点
                        draft.menuShow = false
                    }),
                    () => {
                        const { graph, g6Data } = this.state
                        graph.data(g6Data)
                        graph.render()
                    },
                )
                break
            case 'edge':
                if (!selectedEdge) {
                    return
                }
                this.setState(
                    produce(draft => {
                        const edges = draft.g6Data.edges
                        edges.splice(edges.findIndex((e: any) => e.id === selectedEdge), 1)
                        draft.selectedEdge = '' // 删除后清空选中的线
                        draft.menuShow = false
                    }),
                    () => {
                        const { graph, g6Data } = this.state
                        graph.data(g6Data)
                        graph.render()
                    },
                )
                break
            default:
                break
        }
    }

    /** 保存当前节点、线的信息 */
    public handleSave = async () => {
        if (!this.state.name || !this.state.desc) {
            message.warning('请填写名称和描述')
            return
        }
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
            }
        })
        const edges = this.state.g6Data.edges.map((e: any) => {
            return {
                id: e.id,
                source: e.source,
                target: e.target,
            }
        })
        const g6DataJSON = JSON.stringify({ nodes, edges })
        this.setState({ btnLoading: true })
        try {
            await taskApi.createTask(this.state.name, this.state.desc, g6DataJSON)
            this.setState({ btnLoading: false })
            message.success('创建成功')
        } catch (e) {
            console.log(e)
            this.setState({ btnLoading: false })
            message.error('创建失败')
        }
    }

    /** 显示节点编辑modal */
    public showEditModal = () => {
        const { selectedNode, g6Data } = this.state
        const eN = g6Data.nodes.findIndex((n: any) => selectedNode === n.id)
        const data = g6Data.nodes[eN].customData
        console.log(data)
        this.setState({
            modal: {
                visible: true,
                type: data.type,
                data,
            },
        })
    }

    /** 显示Modal */
    showModuleModal(moduleItem: ModuleItem) {
        if (moduleItem.name !== 'start' && moduleItem.name !== 'end') {
            this.setState({
                modal: {
                    visible: true,
                    type: moduleItem.name,
                },
            })
        }
    }

    public saveModuleInfo(value: CustomData) {
        if (this.state.modal.data) {
            console.log('编辑的data', value)
            this.handleEdit(value)
            this.closeModuleConfig()
            return
        }
        console.log('新的data', value)
        this.handleAdd(value)
        this.closeModuleConfig()
    }

    closeModuleConfig = () => {
        this.setState({
            modal: {
                visible: false,
                type: '',
            },
        })
    }

    handleInputChange = (name: string) => (ev: any) => {
        this.setState({
            [name]: ev.target.value,
        })
    }

    /** 初始化g6 */
    initG6() {
        G6CustomNode() // 注册自定义节点
        // 全局定义G6的线样式
        G6.Global.defaultEdge.style = {
            endArrow: true,
        }
        const that = this
        
        const graph = new G6.Graph({
            container: 'mountNode',
            width: 960,
            height: 540,
            modes: {
                default: [
                    'drag-canvas',
                    tooltipBehavior,
                    {
                        type: 'zoom-canvas',
                        sensitivity: 5,
                    },
                ],

                edit: ['selected-node-click', 'drag-node', 'click-add-edge', 'selected-edge-click'],
            },

            defaultNode: {
                shape: 'rect',
                style: {},
                size: [80, 80],
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
        })
        // 定义鼠标右键事件
        graph.on('contextmenu', (ev: any) => {
            if (!ev.item || this.state.mode !== 'edit') {
                return
            }
            // console.log(ev);
            const item = ev.item
            const type = item.getType()
            const clientX = ev.clientX
            const clientY = ev.clientY
            this.setState({ menuShow: true })
            this.setState({
                menuStyle: {
                    left: clientX + 'px',
                    top: clientY + 'px',
                },
            })
            this.setState({ selectedType: type })
        })
        graph.on('click', (ev: any) => {
            this.setState({ menuShow: false })
        })
        // 选中某条线
        G6.registerBehavior('selected-edge-click', {
            getEvents() {
                return {
                    'edge:dblclick': 'onClick',
                    'edge:contextmenu': 'onClick',
                }
            },
            onClick(ev: any) {
                const edge = ev.item
                const graph = this.graph
                that.setState({ selectedEdge: edge.getModel().id })
                graph.getEdges().forEach((e: any) => {
                    if (e.getModel().id !== edge.getModel().id) {
                        graph.setItemState(e, 'selected', false)
                    }
                })
                graph.getNodes().forEach((n: any) => {
                    graph.setItemState(n, 'selected', false)
                })
                graph.setItemState(edge, 'selected', !edge.hasState('selected'))
            },
        })
        // 选中某个节点
        G6.registerBehavior('selected-node-click', {
            getEvents() {
                return {
                    'node:dblclick': 'onClick',
                    'node:contextmenu': 'onClick',
                }
            },
            onClick(ev: any) {
                const node = ev.item
                const graph = this.graph
                that.setState({ selectedNode: node.getModel().id })
                graph.getNodes().forEach((n: any) => {
                    if (n.getModel().id !== node.getModel().id) {
                        graph.setItemState(n, 'selected', false)
                    }
                })
                graph.getEdges().forEach((e: any) => {
                    graph.setItemState(e, 'selected', false)
                })
                graph.setItemState(node, 'selected', !node.hasState('selected'))
            },
        })
        // 画连接线
        G6.registerBehavior('click-add-edge', {
            getEvents() {
                return {
                    'node:click': 'onClick',
                    mousemove: 'onMousemove',
                }
            },
            onClick(ev: any) {
                const node = ev.item
                const graph = this.graph
                const point = { x: ev.x, y: ev.y }
                const model = node.getModel()
                // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
                if (this.addingEdge && this.edge) {
                    graph.updateItem(this.edge, {
                        target: model.id,
                    })
                    const edges = graph.getEdges()
                    const g6Data = Object.assign({}, that.state.g6Data, {
                        edges: edges.map((e: any) => {
                            const { id, source, target } = e.getModel()
                            return { id, source, target }
                        }),
                    })
                    that.setState({ g6Data })

                    this.edge = null
                    this.addingEdge = false
                } else {
                    // 点击节点，触发增加边
                    this.edge = graph.addItem('edge', {
                        id: `edge${+new Date()}`,
                        source: model.id,
                        target: point,
                    })
                    this.addingEdge = true
                }
            },
            onMousemove(ev: any) {
                const point = { x: ev.x, y: ev.y }
                if (this.addingEdge && this.edge) {
                    // 增加边的过程中，移动时边跟着移动
                    this.graph.updateItem(this.edge, { target: point })
                }
            },
        })

        graph.data(this.state.g6Data)
        graph.render()
        this.setState({ graph })
    }

    render() {
        const { mode } = this.state
        let divOp
        let divMenuShow
        const { menuShow, selectedType, selectedNode } = this.state
        if (
            menuShow &&
            ((selectedType === 'node' && selectedNode !== 'start' && selectedNode !== 'end') ||
                selectedType === 'edge')
        ) {
            divMenuShow = (
                <div className={styles['menu-wrapper']} style={this.state.menuStyle}>
                    {this.state.selectedType !== 'edge' ? (
                        <div onClick={this.showEditModal}>编辑</div>
                    ) : (
                        ''
                    )}
                    <div onClick={this.handleDeleteItem} className={styles['btn-delete']}>
                        删除
                    </div>
                </div>
            )
        }
        if (mode === 'edit') {
            const moduleList = this.state.moduleList.map((m: ModuleItem, index: number) => {
                return (
                    <div
                        className={styles.module + ' ' + styles[`module-${m.name}`]}
                        title={m.describe}
                        key={index}
                        onClick={() => this.showModuleModal(m)}
                    >
                        {m.name}
                    </div>
                )
            })
            divOp = (
                <div className={styles['module-list']}>
                    {moduleList}
                    <span>（点击添加相应模块）</span>
                </div>
            )
        }
        return (
            <div className={styles['g6-page']}>
                <section className={styles['op-wrapper']}>
                    <Button onClick={this.handleChangeMode}>
                        当前模式:&nbsp;{mode === 'edit' ? '编辑' : '预览'}
                    </Button>
                    {divOp}
                </section>
                <div id="mountNode" className={styles.mountNode} />
                {divMenuShow}
                <section className={styles['basic-info-wrapper']}>
                    <div className={styles['input-item']}>
                        <p>任务名称：</p>
                        <Input
                            placeholder="任务名称"
                            value={this.state.name}
                            onChange={this.handleInputChange('name')}
                        />
                    </div>
                    <div className={styles['input-item']}>
                        <p>任务描述：</p>
                        <Input.TextArea
                            rows={4}
                            placeholder="任务描述"
                            value={this.state.desc}
                            onChange={this.handleInputChange('desc')}
                        />
                    </div>
                </section>
                <Button type="primary" onClick={this.handleSave} loading={this.state.btnLoading}>
                    保存
                </Button>
                <ConfigModal
                    {...this.state.modal}
                    btnOkClick={this.saveModuleInfo.bind(this)}
                    btnCancelClick={this.closeModuleConfig}
                />
            </div>
        )
    }
}

export default TaskAdd
