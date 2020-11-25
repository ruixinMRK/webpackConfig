/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const os = require('os');
const {
	VueLoaderPlugin
} = require('vue-loader');
const configs = require('./base');
// const HappyPack = require('happypack'); //多线程打包
const cssExport = require('./export.css.js');

// const happyThreadPool = HappyPack.ThreadPool({
// 	size: os.cpus().length
// }); //共享池

let jsName = 'js/[name].js';
let publicPath = configs.devServerPath;


//后期等vue-loader 15.1之后重新支持了happyPack后再来
//css less 开启多线程打包后 vue中的样式的scoped不起作用了

//后期优化方向
// 单页面入口
module.exports = {
	target: ['web', 'es5'],
	entry: {
		'main': './src/main.js'
	},
	output: {
		filename: jsName,
		path: path.resolve(__dirname, '../', `${configs.dest}static`),
		publicPath,
		chunkFilename: 'js/async/[name].js',
		// https://www.webpackjs.com/configuration/output/#output-auxiliarycomment
		// library:"" // 导出包的名字(一般用于第三方库)
		// libraryTarget:"umd" // 导出包的格式是啥
		// jsonpFunction:"jsop" // 更改加载js方法的名字，可以在多个webpack共存时实现
		// crossOriginLoading:configs.anomaly ? 'crossOrigin' : ''  //是否启用 crossOrigin 加载script标签用于捕捉错误
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'configs$': path.resolve(__dirname, '../', 'src/config/base.js'), //程序的一些基本配置
			'src': path.resolve(__dirname, '../', 'src')
		},
		extensions: ['.js', '.vue', '.json'],
		// https://www.webpackjs.com/configuration/resolve/
		// modules:[] // 告诉 webpack 解析模块时应该搜索的目录

	},

	// cacheGroups 自定义配置主要使用它来决定生成的文件
	// test 限制范围，可以是正则，匹配文件夹或文件
	// name 生成文件名
	// priority 优先级，多个分组冲突时决定把代码放在哪块
	// minSize 最小尺寸必须大于此值，默认30000B
	// minChunks 其他entry引用次数大于此值，默认1(minChunks指的是被不同entry引入的次数)
	// 		为1时，适合分离 node_moudles 里的第三方库（很多人认为这个值设成2其实不合理）
	// maxInitialRequests entry文件请求的chunks不应该超过此值（请求过多，耗时）
	// maxAsyncRequests 异步请求的chunks不应该超过此值
	// automaticNameDelimiter 自动命名连接符
	// chunks 值为"initial", "async"（默认） 或 "all"
	// 	initial 入口chunk，对于异步导入的文件不处理
	// 	async 异步chunk，只对异步导入的文件处理（个人理解）
	// 	all 全部chunk（我反正选all，不甚理解）

	optimization: {
		splitChunks: {
			cacheGroups: {
				// 可以提取所有的css文件到一个文件里
				styles: {
					name: 'styles',
					test: /\.scss|css$/,
					chunks: 'all', // merge all the css chunk to one file
					enforce: true
				},
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
							css: cssExport({}, false).css,
							less: cssExport({}, false).less
						},
						postcss: [cssExport({}, false).autoprefixer] //工具,autoprefixer插件:CSS补全浏览器前缀
					}
				}]
			},
			{
				test: /\.js(\?.*)?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
				// use:['happypack/loader?id=babel']
			},
			{
				test: /\.css(\?.*)?$/,
				// use: [MiniCssExtractPlugin.loader,'happypack/loader?id=css']
				use: cssExport().css
			},
			{
				test: /\.less(\?.*)?$/,
				// use: [MiniCssExtractPlugin.loader,'happypack/loader?id=less']
				use: cssExport().less

			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 2000,
					name: function (...args) {
						// 如果不用args出来的路径是错误的
						//str 为全路径名字  防止引用不同目录下图片名相同,打包之后重叠的问题
						// let path = args[0].split('\\').slice(-2,-1) + '';
						// return 'images/'+path+'/[name].[hash:8].[ext]';
						return 'images/[name].[hash:8].[ext]';
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
		        'postcss-loader'
		    ],
		    // 使用共享进程池中的子进程去处理任务
		    threadPool: happyThreadPool,
		}), 
		new HappyPack({
		    id: 'less',
		    loaders: [
		        'css-loader',
		        'postcss-loader',
		        'less-loader'
		    ],
		    // 使用共享进程池中的子进程去处理任务
		    threadPool: happyThreadPool,
		}), */
		new webpack.DefinePlugin({
			'process.env.VERSION': JSON.stringify({
				version: '2.0.' + Math.ceil(Date.now() / (1000 * 24 * 60 * 60)) + '.' + ('00' + new Date().getHours()).substr(-2)
			})
		}),
		new VueLoaderPlugin()
	],
}
