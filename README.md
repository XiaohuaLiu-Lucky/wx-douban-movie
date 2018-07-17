# 微信小程序之豆瓣电影

> 


## 注意事项

> 该项目用到的所有数据都是向豆瓣API测试接口请求而来，但是豆瓣屏蔽了对微信小程序的接口请求。

> 解决办法：这里需要用到nginx代理：由本机IP向豆瓣的接口请求数据，就是所谓的以我的方式去把数据拿到本地，然后给微信小程序用，我访问就相当于微信小程序访问，给小程序做代理，就可以拿到数据。

> 使用方法：

1. 下载稳定版的nginx: http://nginx.org/en/download.htm

2. 修改nginx.conf下的server配置为如下(意思是通过本机的localhost对豆瓣api进行访问，然后代理https://api.douban.com)：

   ```
     server {
        listen       80;
        server_name  localhost;
        location  / {  
           proxy_store off;
           proxy_redirect off;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header Referer 'no-referrer-when-downgrade';
           proxy_set_header User-Agent 'Mozilla/5.0 (Windows NT 10.0;WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
           proxy_connect_timeout 600;
           proxy_read_timeout 600;
           proxy_send_timeout 600;
           proxy_pass https://api.douban.com;
    }
   ```
3. 然后cmd进入到压缩包解压的有exe的文件夹，直接输入nginx然后enter就可以了。

