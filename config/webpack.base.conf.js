const path = require('path')
const webpack = require('webpack');
const os = require("os");
const {
	VueLoaderPlugin
} = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer')({
	browsers: ['iOS >= 7', 'Android >= 4.1']
})
const configs = require('./base')
const HappyPack = require('happypack'); //多线程打包


const happyThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length
}); //共享池

let jsName = 'js/[name].js';
let publicPath = configs.devServerPath;


//后期等vue-loader 15.1之后重新支持了happyPack后再来
//css less 开启多线程打包后 vue中的样式的scoped不起作用了

//后期优化方向
module.exports = {
	target: 'web',
	entry: {
		"main": "./src/main.js" /* ,verdor:["vue","vuex","vue-router","babel-polyfill"] */
	},
	output: {
		filename: jsName,
		path: path.resolve(__dirname, "../", `${configs.dest}static`),
		publicPath,
		chunkFilename: 'js/async/[name].js',
		// crossOriginLoading:configs.anomaly ? "crossOrigin" : ""  //是否启用 crossOrigin 加载script标签用于捕捉错误
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'configs$': path.resolve(__dirname, "../", 'src/config/base.js'), //程序的一些基本配置
			'src': path.resolve(__dirname, "../", 'src')
		},
		extensions: ['.js', '.vue', '.json']
	},
	optimization: {
		splitChunks: {
			cacheGroups: {

				commons: {
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 20000
				}
				// vendor: {
				//     test: /node_modules/,
				//     chunks: 'initial',
				//     name: 'verdor',
				//     priority: 10,
				//     enforce: true,
				// }
			}

		},
		runtimeChunk: {
			name: 'manifest'
		},
	},
	module: {
		rules: [{
				test: /\.vue$/,
				// use: ['happypack/loader?id=vue']
				use: [{
					loader: 'vue-loader',
					options: {
						loaders: {
							css: [MiniCssExtractPlugin.loader, 'css-loader'],
							less: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
						},
						postcss: [autoprefixer] //工具,autoprefixer插件:CSS补全浏览器前缀
					}
				}]
			},
			{
				test: /\.js(\?.*)?$/,
				use: ['babel-loader']
				// use:['happypack/loader?id=babel']
			},
			{
				test: /\.css(\?.*)?$/,
				// use: [MiniCssExtractPlugin.loader,'happypack/loader?id=css']
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer]
						}
					}
				]
			},
			{
				test: /\.less(\?.*)?$/,
				// use: [MiniCssExtractPlugin.loader,'happypack/loader?id=less']
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer]
						}
					},
					'less-loader'
				]

			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 2000,
					name: function(...args) {
						// 如果不用args出来的路径是错误的
						//str 为全路径名字  防止引用不同目录下图片名相同,打包之后重叠的问题
						// let path = args[0].split("\\").slice(-2,-1) + "";
						// return "images/"+path+"/[name].[hash:8].[ext]";
						return "images/[name].[hash:8].[ext]";
					}
				}
			},
			{
				test: /\.(eot|woff|ttf|woff2|)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					name: 'fonts/[name].[hash:8].[ext]'
				}
			}
		]
	},
	plugins: [
		// new HappyPack({
		//     id: 'babel',
		//     loaders: ['babel-loader'],
		//     // 使用共享进程池中的子进程去处理任务
		//     threadPool: happyThreadPool,
		// }),
		/* new HappyPack({
		    id: 'vue',
		    loaders: [{
		        loader: 'vue-loader',
		        options: {
		            loaders: {
		                css: ['css-loader'],
		                less: ['css-loader', 'less-loader']
		            },
		            postcss: [autoprefixer] //工具,autoprefixer插件:CSS补全浏览器前缀
		        }
		        },
		        // 'eslint-loader'
		    ],
		    // 使用共享进程池中的子进程去处理任务
		    threadPool: happyThreadPool,
		}),*/
		/* new HappyPack({
		    id: 'css',
		    loaders: [
		        'css-loader',
		        "postcss-loader"
		    ],
		    // 使用共享进程池中的子进程去处理任务
		    threadPool: happyThreadPool,
		}), 
		new HappyPack({
		    id: 'less',
		    loaders: [
		        'css-loader',
		        "postcss-loader",
		        'less-loader'
		    ],
		    // 使用共享进程池中的子进程去处理任务
		    threadPool: happyThreadPool,
		}), */
		new webpack.DefinePlugin({
			'process.env.VERSION': JSON.stringify({
				version: '2.0.' + Math.ceil(Date.now() / (1000 * 24 * 60 * 60)) + "." + ("00" + new Date().getHours()).substr(-2)
			})
		}),
		new VueLoaderPlugin()
	],
}