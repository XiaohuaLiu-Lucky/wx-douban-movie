var appInstance = getApp();
Page({
	data: {
		title: ["in_theaters","coming_soon"],
		in_theaters : [],
		coming_soon : []
	},
	onLoad() {
		// 一进入这个页面就发送两个请求，拿回数据，数据存一下
		let in_theaters = appInstance.globalData.baseUrl + appInstance.globalData.itemUrl.in_theaters + "?city=成都&start=0&count=10";
		let coming_soon = appInstance.globalData.baseUrl + appInstance.globalData.itemUrl.coming_soon + "?start=0&count=10";
		this.getMovieListData(in_theaters,'in_theaters');
		this.getMovieListData(coming_soon,'coming_soon');
	},
	getMovieListData(url,type) {
		wx.showToast({
			title: "加载中",
			icon: "loading",
			duration: 100000
		});
		wx.request({
			// url: 'https://www.easy-mock.com/mock/5acf2b8a9e1d8d12cbd7951b/douban-movie/in_theaters',
			// url: 'https://www.easy-mock.com/mock/5acf2b8a9e1d8d12cbd7951b/douban-movie/coming_soon',
			url,
			method: 'GET',
			header: {
				'content-type': 'json'
			},
			dataType: 'json',
			success:(res) => {
				// nginx做代理
				let data = res.data.subjects;
				this.arrageData(data,type);
			},
			fail(error) {
				console.log(error.errMsg);
			},
			complete() {
				wx.hideToast();
			}
		});
	},
	arrageData(res,type) {
		let resultArr = []
		res.forEach(function(item,index) {
			resultArr.push({
				image: item.images.medium,
				title: item.title,
				rating: item.rating.average,
				collect_count: item.collect_count + '人想看',
				id: item.id
			});
		});
		this.setData({
			[type] : resultArr
		});
	},
	jumpToSearch() {
		wx.navigateTo({
			url: "../search/index"
		});
	},
	bindToMore(e) {
		let type = e.currentTarget.dataset.type
		wx.navigateTo({
			url: '../movieTheatre/index?type=' + type
		});
	},
	toMovieDetail(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../movieDetail/index?id=' + id
		});
	}
});