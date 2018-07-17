var appInstance = getApp();
Page({
	data: {
		searchValue: "",
		resultArr: [],
		// 假数据
		resultArr1: [{
			id: "1305724",
			small:"http://img3.doubanio.com/view/photo/s_ratio_poster/public/p726784568.webp",
			title:"X战警2",
			totalData:"7.6分 /2003 /布莱恩·辛格"
		},{
			id: "1305724",
			small:"http://img3.doubanio.com/view/photo/s_ratio_poster/public/p726784568.webp",
			title:"X战警2",
			totalData:"7.6分 /2003 /布莱恩·辛格"
		},{
			id: "1305724",
			small:"http://img3.doubanio.com/view/photo/s_ratio_poster/public/p726784568.webp",
			title:"X战警2",
			totalData:"7.6分 /2003 /布莱恩·辛格"
		}]
	},
	onLoad() {
		this.bindSearch = this.debounce(this.sendRequest,1500);
	},
	backToIndex() {
		wx.navigateBack({
			delta: 1
		});
		wx.showToast({
			title: "回到首页",
			icon: "success",
			duration: 300
		});
	},
	debounce(handler, delay) {
		var timer = null;
		return function() {
			clearTimeout(timer);
			var self = this;
			var arg = arguments;
			timer = setTimeout(function(){
				handler.apply(self,arg);
			},delay);
		}
		console.log(11);
	},
	// bindSearch(e) {
	// 	let value = e.detail.value;
	// 	this.sendRequest(value);
	// },
	// sendRequest(data) {
	sendRequest(event) {
		let data = event.detail.value;
		let urlData = appInstance.globalData;
		let url = urlData.baseUrl + urlData.itemUrl.search + data + "&start=0&count=10";
		wx.request({
			// url: 'https://www.easy-mock.com/mock/5acf2b8a9e1d8d12cbd7951b/douban-movie/search',
			url,
			method: 'GET',
			header: {
				'content-type': 'json'
			},
			dataType: 'json',
			success:(res) => {
				// nginx做代理
				let data = res.data.subjects;
				this.arrageData(data);
			},
			fail(error) {
				console.log(error.errMsg);
			}
		});
	},
	arrageData(data) {
		let resultArr = [];
		data.forEach(item => {
			let name = '';
			let {title,year,rating:{average},directors,images:{small},id} = item;
			// let title = item.title;
			// let year = item.year;
			// let average = item.rating.average;
			// let director = item.directors[0].name;
			// let image = item.images.small;
			name = directors.map(item => item.name).join('/');
			let totalData = average + '分 /' + year + ' /' + name;
			resultArr.push({small,title,totalData,id});	

		});
		this.setData({
			resultArr
		});
		console.log(this.data.resultArr);
	},
	toMovieDetail(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../movieDetail/index?id=' + id
		});
	}
});