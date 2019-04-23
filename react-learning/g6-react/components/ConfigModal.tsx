import React, { ReactPropTypes } from 'react'
import { Modal, Input } from 'antd'
import styles from '../task-add.scss'

export interface CustomData {
	type: string
	name: string
	exec_cmd?: string
	image_name?: string
	spider_name?: string
	pod_num?: string | number
}

export default class ConfigModal extends React.Component<any, any> {
	state: CustomData = {
		type: '',
		name: '',
		exec_cmd: '',
		image_name: '',
		spider_name: '',
		pod_num: '',
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.type !== this.props.type) {
			this.setState({
				type: nextProps.type,
				name: '',
				exec_cmd: '',
				image_name: '',
				spider_name: '',
				pod_num: '',
			})
		}
		if(nextProps.data) {
			const {data} =  nextProps
			this.setState({
				name: data.name,
				exec_cmd: data.exec_cmd,
				image_name: data.image_name,
				spider_name: data.spider_name,
				pod_num: data.pod_num,
			})
		}
	}

	handleChange = (name: string) => (ev: any) => {
		this.setState({
			[name]: ev.target.value,
		})
	}

	handleOk() {
		console.log('ok')
	}

	handleCancel() {
		console.log('cancel')
	}

	render() {
		let content
		switch (this.props.type) {
			case 'shell':
				content = (
					<div className={styles['modal-input-group']}>
						<Input
							value={this.state.name}
							onChange={this.handleChange('name')}
							placeholder="shell名"
						/>
						<Input
							value={this.state.exec_cmd}
							onChange={this.handleChange('exec_cmd')}
							placeholder="执行的命令"
						/>
					</div>
				)
				break
			case 'rancher':
				content = (
					<div className={styles['modal-input-group']}>
						<Input
							value={this.state.name}
							onChange={this.handleChange('name')}
							placeholder="rancher名"
						/>
						<Input
							value={this.state.image_name}
							onChange={this.handleChange('image_name')}
							placeholder="镜像地址"
						/>
						<Input
							value={this.state.spider_name}
							onChange={this.handleChange('spider_name')}
							placeholder="爬虫名"
						/>
						<Input
							value={this.state.pod_num}
							onChange={this.handleChange('pod_num')}
							placeholder="启动pod数量"
						/>
					</div>
				)
				break
			default:
				break
		}
		return (
			<Modal
				title={'新增 ' + this.props.type}
				visible={this.props.visible}
				onOk={this.props.btnOkClick.bind(this, this.state)}
				onCancel={this.props.btnCancelClick}
				cancelText="取消"
				okText="确定"
			>
				{content}
			</Modal>
		)
	}
}
