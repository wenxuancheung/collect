const fetch = require('../../utils/fetch')
// const api = require('../../api/index')

Page({
	data:{

	},
	state: {

	},
	onLoad(query){
		this.initData(query)
		this.state = {
			id: query.id,
			business_id: query.business_id
		}
	},
	initData({ id, business_id }){
		api.getCollectInfo({
			id: id, 
			business_id: business_id
		}).then((res)=>{
			this.setData(res)
		})
	},
	bindPickerChange(e){
		let { index } = e.currentTarget.dataset
		this.data.list[index].value = this.data.list[index].param[parseInt(e.detail.value)]
		this.setData(this.data)
	},
	bindCheckChange(e){
		let { index } = e.currentTarget.dataset
		this.data.list[index].value = e.detail.value
		this.setData(this.data)
	},
	submitButon(e){
		let array = []

		this.data.list.map((item, index)=>{
			array.push({
				id: item.id,
				value: item.value
			})
		})

		api.submitCollectInfo({
			collect: array
		}).then((res)=>{
			wx.showToast({
				title: '提交成功',
				duration: 1500,
				mask: true
			})
			setTimeout(()=>{
				wx.navigateBack()
			}, 1500)
		})
	}
})