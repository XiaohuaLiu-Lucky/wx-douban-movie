App({
	globalData: {
		// baseUrl: 'http://api.douban.com',
		baseUrl: 'http://localhost', //nginx做代理
		itemUrl: {
			search : "/v2/movie/search?q=",
			in_theaters : "/v2/movie/in_theaters",
			coming_soon : "/v2/movie/coming_soon",
			subject : '/v2/movie/subject/',
			celebrity : '/v2/movie/celebrity/'
		},
		windowWidth: null,
		windowHeight: null
	},
	onLaunch(){
		wx.getSystemInfo({
			success:(res) => {
				this.globalData.windowWidth = res.windowWidth;
				this.globalData.windowHeight = res.windowHeight;
				
			},
			fail() {
				console.log('获取系统信息失败');
			}
		});
	}
});