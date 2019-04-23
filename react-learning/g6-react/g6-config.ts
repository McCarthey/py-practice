import G6 from '@antv/g6'
import { string } from 'prop-types'

// 初始化g6数据
const initData = {
    nodes: [
        {
            id: 'start',
            x: 100,
            y: 200,
            label: 'start',
            shape: 'start-module',
            customData: {
                type: 'start',
                name: '开始',
            },
        },
        {
            id: 'end',
            x: 500,
            y: 200,
            label: 'end',
            shape: 'end-module',
            customData: {
                type: 'end',
                name: '结束',
            },
        },
    ],
    edges: [],
}

interface NodeOptions {
    fillColor: string
    label: string
    labelColor: string
}

/**
 * 自定义节点的工厂函数
 * @param {string} nodeName 模块名称
 * @param {NodeOptions} options 模块配置项
 * @param {string} 基于哪个模块扩展（可选，默认'rect'）
 */
function CustomNodeFactory(nodeName: string, options: NodeOptions, baseShape: string = 'rect') {
    G6.registerNode(
        nodeName,
        {
            afterDraw(cfg: any, group: any) {
                const size = cfg.size
                const width = size[0]
                const height = size[1]
                group.addShape('rect', {
                    attrs: {
                        x: -width / 2,
                        y: -height / 2,
                        width,
                        height,
                        fill: options.fillColor,
                    },
                })
                group.addShape('text', {
                    attrs: {
                        x: 0,
                        y: 0,
                        textAlign: 'center',
                        text: cfg.label || options.label,
                        fill: options.labelColor,
                        fontSize: 18,
                    },
                })
                if(cfg.customData && cfg.customData.status) {
                    const statusColor = getStatusColor(cfg.customData.status)
                    group.addShape('circle', {
                        attrs: {
                            x: 30,
                            y: 30,
                            r: 6,
                            fill: statusColor,
                            stroke: '#fff'
                        },
                    })
                }
            },
        },
        baseShape,
    )
}

const colors = {
    startColor: '#409eff',
    endColor: '#faad14',
    shellColor: '#673ab7',
    rancherColor: '#67C23A',
    pythonColor: '#F56C6C',
}

/** tooltip 格式*/
interface StatusMap {
    [key: string]: (number | string)[]
}

const STATUS_MAP: StatusMap = {
    NOT_START: [1, '未开始', '#bdbdbd'],
    WAIT: [2, '等待中', '#ffd54f'],
    FINISH: [3, '已完成', '#388e3c'],
    RUNNING: [4, '运行中', '#1e88e5'],
    STOP: [5, '已停止', '#ef6c00'],
    FAIL: [6, '失败', '#f44336'],
}

function getStatusName(status: number, EN: boolean = false) {
    if (EN) {
        return Object.keys(STATUS_MAP)[status - 1]
    }
    const s = Object.keys(STATUS_MAP).find(v => STATUS_MAP[v][0] === status) as string
    return STATUS_MAP[s][1]
}

function getStatusColor(status: number) {
    const s = Object.keys(STATUS_MAP).find(v => STATUS_MAP[v][0] === status) as string
    return STATUS_MAP[s][2]
}

const tooltipStyle = `
                    <style>
                        .g6-tooltip-content { padding: 2px 10px;}
						.g6-tooltip-content span { display: inline-block; width:100px; }
						.g6-tooltip-content .task-run-status { color: #fff; padding: 2px 10px; border-radius: 4px; width: auto; }
						.g6-tooltip-content .status-NOT_START { background-color: ${STATUS_MAP['NOT_START'][2]}; }
						.g6-tooltip-content .status-WAIT { background-color: ${STATUS_MAP['WAIT'][2]}; }
						.g6-tooltip-content .status-FINISH { background-color: ${STATUS_MAP['FINISH'][2]}; }
						.g6-tooltip-content .status-RUNNING { background-color: ${STATUS_MAP['RUNNING'][2]}; }
						.g6-tooltip-content .status-STOP { background-color: ${STATUS_MAP['STOP'][2]}; }
						.g6-tooltip-content .status-FAIL { background-color: ${STATUS_MAP['FAIL'][2]}; }
					</style>`

const tooltipBehavior = {
    type: 'tooltip',
    formatText(model: any) {
        return `${tooltipStyle}
			<div class="g6-tooltip-content">
			<p><span>ID: </span>${model.id}</p>
			<p><span>Type: </span>${model.shape.slice(0, -7)}</p>
			<p>${
                model.customData && model.customData.name
                    ? `<span>Name: </span>${model.customData.name}`
                    : ''
            }</p>
			<p>${
                model.customData && model.customData.image_name
                    ? `<span>Image_name: </span>${model.customData.image_name}`
                    : ''
            }</p>
			<p>${
                model.customData && model.customData.spider_name
                    ? `<span>Spider_name: </span>${model.customData.spider_name}`
                    : ''
            }
			<p>${
                model.customData && model.customData.exec_cmd
                    ? `<span>Exec_cmd: </span>${model.customData.exec_cmd}`
                    : ''
            }</p>
			<p>${
                model.customData && model.customData.pod_num
                    ? `<span>Pod_num: </span>${model.customData.pod_num}`
                    : ''
            }</p>
			<p>${
                model.customData && model.customData.status
                    ? `<span>Status: </span><span class="task-run-status status-${getStatusName(
                          model.customData.status,
                          true,
                      )}">${getStatusName(model.customData.status)}</span>`
                    : ''
            }</p>
			</div>`
    },
}

// 自定义三种节点类型
function G6CustomNode() {
    CustomNodeFactory('start-module', {
        fillColor: colors.startColor,
        label: 'start',
        labelColor: '#fff',
    })
    CustomNodeFactory('end-module', {
        fillColor: colors.endColor,
        label: 'end',
        labelColor: '#fff',
    })
    CustomNodeFactory('shell-module', {
        fillColor: colors.shellColor,
        label: 'shell',
        labelColor: '#fff',
    })
    CustomNodeFactory('rancher-module', {
        fillColor: colors.rancherColor,
        label: 'rancher',
        labelColor: '#fff',
    })
    CustomNodeFactory('python-module', {
        fillColor: colors.pythonColor,
        label: 'python',
        labelColor: '#fff',
    })
}

export { G6CustomNode, tooltipBehavior, STATUS_MAP }
export default initData
