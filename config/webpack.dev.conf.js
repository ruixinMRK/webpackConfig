
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const configs = require('./base');

const path = require('path');
let publicPath = configs.devServerPath;

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	// cheap-module-eval-source-map is faster for development
	devtool: '#eval-source-map',
	output: {
		path: path.resolve(__dirname, '../'),
	},
	module:{
		//为项目加上eslint规范检测
		rules:[
			// {
			//     test: /\.(js|vue)$/,
			//     loader: 'eslint-loader',
			//     enforce: "pre",
			//     include: [path.resolve(__dirname, "../",'src/module')], // 指定检查的目录
			//     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
			//         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
			//     }
			// }
		]
	},
	plugins: [
		new webpack.DefinePlugin({'process.env.ASSET_PATH': JSON.stringify(publicPath),'process.env.VERSION': 
            JSON.stringify({version:'2.0.'+ Math.ceil(Date.now()/(1000*24*60*60))+ '.' + ('00'+ new Date().getHours()).substr(-2)})
		}),
		new MiniCssExtractPlugin({filename: 'css/[name].css'}),
		new webpack.HotModuleReplacementPlugin(),
	],
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	devServer:{
		//设置服务器访问的基本目录
		contentBase:path.resolve(__dirname, '../'),
		//服务器ip地址，localhost
		host:'localhost',
		port:5000,
		open:true,//自动打开浏览器
		hot:true,//2热更新
		stats:'errors-only',
		historyApiFallback: true,
	},
	// devServer: {
	//     historyApiFallback: true, // 404的页面会自动跳转到/页面
	//     inline: true, // 文件改变自动刷新页面
	//     port: 5000, // 服务器端口 
	//     open : true,
	//     host:'0.0.0.0',
	//     // hot:true,
	//     stats:"errors-only"
	// }
});
