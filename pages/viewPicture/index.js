Page({
	data: {
		url: ''
	},
	onLoad(options) {
		let url = options.url || 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2516079193.jpg';
		this.setData({
			url
		});
	},
	backLastPage() {
		wx.navigateBack({
			delta: 1
		});
	}
});