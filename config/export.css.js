const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const autoprefixer = require('autoprefixer')({
	browsers: ['iOS >= 7', 'Android >= 4.1']
});

const isDev = process.env.NODE_ENV == 'dev';

module.exports = function(options,needPostCss=true) {
	options = options || {};

	let cssLoader = ['css-loader'];
	if(needPostCss){
		cssLoader.push({
			loader: 'postcss-loader',
			options: {
				plugins: [autoprefixer]
			}
		});
	}
	function generateLoaders(loader, loaderOptions) { //生成loader
		let loaders = [...cssLoader]; // 默认是css-loader
		if (loader) { // 如果参数loader存在
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, { //将loaderOptions和sourceMap组成一个对象
					sourceMap: isDev  
				})
			});
		}
		if (options.extract) { // 如果传入的options存在extract且为true	
			return [  MiniCssExtractPlugin.loader].concat(loaders);
		} else {
			return [  isDev ? 'style-loader' : MiniCssExtractPlugin.loader ].concat(loaders);
		}
	}
	return { //返回css类型对应的loader组成的对象 generateLoaders()来生成loader
		css: generateLoaders(),
		// postcss: generateLoaders(),
		less: generateLoaders('less'),
		// sass: generateLoaders('sass', {
		// 	indentedSyntax: true
		// }),
		// scss: generateLoaders('sass'),
		// stylus: generateLoaders('stylus'),
		// styl: generateLoaders('stylus')
	};
};