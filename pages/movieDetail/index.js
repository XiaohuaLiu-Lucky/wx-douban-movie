var globalData = getApp().globalData;
Page({
	data: {
		id : 26430636,
		subjectData: {},
		showAllDesc: false
	},
	onLoad(options) {
		let id = options.id || this.data.id;
		console.log(id);
		let url = globalData.baseUrl + globalData.itemUrl.subject + id;
		this.showToast();
		this.getMovieData(url);
	},
	showToast() {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 9999999
		});
	},
	hideToast() {
		wx.hideToast();
	},
	getMovieData(url) {
		wx.request({
			url,
			method: 'GET',
			header: {
				'content-type': 'json'
			},
			success: (res) => {
				this.arrageData(res.data);
			},
			fail() {
				console.log('数据请求失败');
			},
			complete: () => {
				this.hideToast();
			}
		});
	},
	arrageData(res) {
		console.log(res);
		let casts = [];
		casts = res.casts.map(item => ({
			image : item.avatars.small || item.avatars.medium || item.avatars.large,
			name : item.name,
			id : item.id
		}));
		this.setData({
			subjectData: {
				image : res.images.medium,
				imageLarge : res.images.large,
				title : res.title,
				year_genres : res.year + ' / ' + res.genres.join(' / '),
				original_title : '原名：' +  res.original_title,
				country : '国家：' + res.countries.join(' / '),
				rating : res.rating.average,
				ratings_count : res.ratings_count + '人',
				wish_count : res.wish_count,
				comments_count : res.comments_count,
				summary : res.summary,
				casts : casts
			}
		})
		console.log(this.data.subjectData);
	},
	unfold() {
		this.setData({
			showAllDesc: !this.data.showAllDesc
		});
		console.log(111)
	},
	wish_or_comment(e) {
		let wish = e.currentTarget.dataset.wish;
		let str = '';
		if(wish === 'wish') {
			str = '想看，那就去看吧'
		}else if(wish === 'comment') {
			str = '看过，那就去评论吧'
		}
		wx.showModal({
			title: '提示',
			content: str
		});
	},
	viewPicture() {
		wx.navigateTo({
			url: '../viewPicture/index?url=' + this.data.subjectData.imageLarge
		});
	},
	navigateToFilmmaker(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../movieStar/index?id=' + id
		});
	}
});