var globalData = getApp().globalData;
Page({
	data: {
		windowWidth: globalData.windowWidth + 'px',
		windowHeight: globalData.windowHeight + 'px',
		in_theaters : [],
		in_theaters_info : {},
		coming_soon : [],
		coming_soon_info : {},
		count: 5,
		active: true,
		triggler: false,
		type: 'in_theaters',
		// 假数据
		in_theaters1: [{
			casts:"主演：帕拉巴斯/拉纳·达格巴提/安努舒卡·谢蒂",
			collect_count:"11114人想看",
			directors:"导演：S·S·拉贾穆里",
			genres:"类型：剧情/动作/战争",
			id:"26420932",
			image:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2452075545.jpg",
			rating:7,
			title:"巴霍巴利王2：终结"
		},{
			casts:"主演：帕拉巴斯/拉纳·达格巴提/安努舒卡·谢蒂",
			collect_count:"11114人想看",
			directors:"导演：S·S·拉贾穆里",
			genres:"类型：剧情/动作/战争",
			id:"26420932",
			image:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2452075545.jpg",
			rating:7,
			title:"巴霍巴利王2：终结"
		},{
			casts:"主演：帕拉巴斯/拉纳·达格巴提/安努舒卡·谢蒂",
			collect_count:"11114人想看",
			directors:"导演：S·S·拉贾穆里",
			genres:"类型：剧情/动作/战争",
			id:"26420932",
			image:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2452075545.jpg",
			rating:7,
			title:"巴霍巴利王2：终结"
		},{
			casts:"主演：帕拉巴斯/拉纳·达格巴提/安努舒卡·谢蒂",
			collect_count:"11114人想看",
			directors:"导演：S·S·拉贾穆里",
			genres:"类型：剧情/动作/战争",
			id:"26420932",
			image:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2452075545.jpg",
			rating:7,
			title:"巴霍巴利王2：终结"
		}]
	},
	onLoad(options) {
		this.show_theaters_Or_comingSoon(options.type);
		this.getMovieListData(options.type);
	},
	show_theaters_Or_comingSoon(type) {
		let active = true;
		if(type === 'in_theaters') {
			active = true;
		}else if(type === 'coming_soon') {
			active = false;
		}
		this.setData({
			active,
			type
		});
	},
	show(e) {
		let type = e.currentTarget.dataset.type;
		this.show_theaters_Or_comingSoon(type);
		// if(this.data[type].length === 0) {
			this.getMovieListData(type);
		// }
	},
	getUrl(type) {
		let url = globalData.baseUrl + globalData.itemUrl[type];
		if(type === 'in_theaters') {
			// url += `?start={{offset}}&count=10`
			url += '';
		}else if(type === 'coming_soon') {
			// url += `?city=成都&start={{offset}}&count=10`
			url += '?city=成都'
		}
		return url;
	},
	getMovieListData(type) {
		let offset = this.data[type + '_info'].offset || 0;
		let total = this.data[type + '_info'].total || 9999;
		let url = this.getUrl(type);
		if(offset >= total) {
			return;
		}
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 99999
		});
		wx.request({
			url,
			method: 'GET',
			header: {
				'content-type':'json'
			},
			data: {
				start : offset,
				count : this.data.count
			},
			success:(res) => {
				this.setData({
					[type + '_info'] : {
						offset: offset + res.data.subjects.length,
						total: res.data.total
					}
				});
				this.arrageData(res.data.subjects,type);
			},
			fail(err) {
				console.log(err.errMsg);
			},
			complete: () => {
				wx.hideToast();
				this.setData({
					triggler: false
				});
			}
		});
	},
	arrageData(res,type) {
		// console.log(res);
		let result = [];
		let director = null;
		let cast = null;
		let genre = null;
		res.forEach(item => {
			director = item.directors.map(item => item.name).join(' / ');
			cast = item.casts.map(item => item.name).join(' / ');
			genre = item.genres.join(' / ');
			result.push({
				image: item.images.medium,
				title: item.title,
				directors: '导演：' + director,
				casts: '主演：' + cast,
				genres: '类型：' + genre,
				rating: item.rating.average,
				collect_count: item.collect_count + '人想看',
				id: item.id
			});
		});
		console.log(result);
		this.setData({
			[type]: [...this.data[type],...result]
		});
	},
	showAction(e) {
		let type = e.currentTarget.dataset.type;
		let str = '';
		if(type === 'in_theaters') {
			str = '用户点击购票'
		}else if(type === 'coming_soon') {
			str = '那就去看吧'
		}
		wx.showModal({
			title: '提示',
			content: str
		});
	},
	navigateToDetail(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../movieDetail/index?id=' + id
		})
	},
	scrolltolower(e) {
		this.setData({
			triggler: true
		});
		this.getMovieListData(this.data.type);
	}
});