
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractAssetsFromIndex = require('extract-assets-from-css');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');//多线程压缩js

const path = require("path");

const baseWebpackConfig = require('./webpack.base.conf');
const configs = require('./base');
const jsName = 'js/[name].js?[chunkhash:8]';
const publicPath = configs.publicPath;


var webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: jsName,
        path: path.resolve(__dirname,"../", `${configs.dest}static`),
        publicPath,
        chunkFilename: 'js/async/[name].js?[chunkhash:8]',
        libraryTarget: 'umd',
        umdNamedDefine: true
	},
	externals:{
		"@babel/polyfill":{
			root: 'BabelPolyfill',
			commonjs: 'babel-polyfill',
			commonjs2: 'babel-polyfill',
			amd: 'babel-polyfill'
		},
		'vue' : 'Vue',
        'vuex' : 'Vuex',
        'vue-router' : 'VueRouter',
        'src/components/element-ui.common' : 'Element',
	},
    module: {
        
    },
    devtool: configs.anomaly ?  'source-map':false,
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css?[chunkhash:8]'
        }),
        /* new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true
            },
            sourceMap: true
          }),  */
          new ParallelUglifyPlugin({
            // cacheDir: '.cache/',
            uglifyJS:{
              output: {
                comments: false
              },
              compress: {
                warnings: false
              }
            }
          }),
          new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 4
          }),
          new webpack.NamedChunksPlugin((chunk) => {
            // 解决异步模块打包的问题
            if (chunk.name) {
              return chunk.name;
            }
            // console.log(chunk);
            // return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
          }),
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../",'src/template/index.html'),
            filename: path.resolve(__dirname,"../", `${configs.dest}static/index.html`),
            title: configs.title,
            chunks: ['verdor','manifest', "main"], //指定index页面需要的模块,
            // inject:"head",
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            // }
        }),
        //運用此插件后postcss的自动加css的前缀失效，应该与mini-css-extract-plugin有关 
        //因为此插件为压缩cssde 作用但是mini-css-extract-plugin也有此功能，故暂时关闭此插件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css(\?\w+)?$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true },safe: true/* 避免打包后修改z-index的问题 */ },
            canPrint: true
        }),

        new ExtractAssetsFromIndex({
            cssHashLength:8,
            styleName:"style2js",
            crossOrigin:configs.anomaly,
            publicPath:configs.publicPath
        })

    ]

})


module.exports = webpackConfig
