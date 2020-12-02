
/* *************此文件只与打包有关,重要********** */
module.exports = {
	devServerPath: '/static/', //本地开发访问目录
	title:'闪店云商家云',//html文件title
	publicPath:'<?php echo $cdn?>static/',//生产环境地址(打包后)
	anomaly:true//是否开启异常监控,如果开启的话,js的打包后的映射.map文件会被单独提取到map文件夹下并且 crossOrigin属性将被设置为true(可以跨域捕捉到script的错误)
};
