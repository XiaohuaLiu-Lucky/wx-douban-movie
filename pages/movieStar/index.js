var globalData = getApp().globalData;
Page({
	data: {
		showAllDesc: false,
		starResult : {}
	},
	onLoad(options) {
		let id = options.id || 1044707;
		let url = globalData.baseUrl + globalData.itemUrl.celebrity + id;
		this.showToast();
		this.getStarData(url);
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
	getStarData(url) {
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
		let work = res.works.map(item => ({
			image : item.subject.images.medium,
			title :  item.subject.title,
			rating : item.subject.rating.average,
			collect_count : item.subject.collect_count + '人想看',
			id : item.subject.id
		}));
		this.setData({
			starResult : {
				image: res.avatars.medium,
				imageLarge: res.avatars.large,
				name : res.name,
				born_place : '出生地：' + res.born_place,
				birthday : '1970-1-1',
				professions : '导演/编剧/制片/演员',
				fans : '231682粉丝',
				works : work,
				summary :`“岩石”（The Rock）本名叫德威恩·约翰逊（Dwayne Johnson），曾是世界摔角联联合会的冠军和明星人物。在体育界成名后，他的触角逐渐伸向影视圈，先是参加了一些电视节目的录制，然后又在连续剧中露过几面。凭着健硕的身材、英俊的相貌和广泛的知名度，“岩石”很快就在这个圈子里得到了不错的口碑。
　　岩石， 1972年5月2日 生于美国加州的海沃德，是他们家第3代摔角手，父亲是著名摔角健将洛奇·约翰逊，爷爷彼得·麦维亚也是摔角界的传奇人物。耳闻目染之下，他从小即掌握了一些极佳的摔角技巧。父亲从小对他要求严格，希望长大培养出新一代的摔交手。岩石从8岁时就开始练拳，14岁走进健身房，成年后练就了一副好的体格，他的成功应该归功于他老爸的鼓励和自己的毅力、信心。`
			}
		});
	},
	unfold() {
		this.setData({
			showAllDesc: !this.data.showAllDesc
		});
	},
	toMovieDetail(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../movieDetail/index?id=' + id
		});
	},
	viewPicture() {
		wx.navigateTo({
			url: '../viewPicture/index?url=' + this.data.starResult.imageLarge
		});
	}
});