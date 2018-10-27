/* ruixin */
/* 针对于webpack4.83 */
var _loaderUtils = require('loader-utils');
var fs = require("fs");
var CleanCSS = require('clean-css');
var cssMinify = new CleanCSS();

function ExtractAssetsFromCss(options) {
	this.cssHashLength = (options && options.cssHashLength) || 8;
	this.crossOrigin = (options && options.crossOrigin) || false;
	this.phpStr = '&+httpDomain.cdn+&static/';
	this.styleName = "main_style2js";
	this.publicPath = ((options && options.publicPath) || "");
	this.publicPathReg = this.publicPath.replace(/\?/g, "\\?").replace(/\$/g, "\\$");
}
ExtractAssetsFromCss.prototype.apply = function(compiler) {

	var that = this;

	compiler.plugin("emit", function(compilation, callback) {


		var indexAssets = {}; //匹配有多少个入口
		var cssAssets = {}; //匹配若干个入口中引用的css文件
		var jsAssets = {}; //匹配js文件
		var mapAssets = {}; //将.map文件单独打包到固定的文件夹
		for (var str in compilation.assets) {

			if (/(\.html|\.php)/g.test(str)) {
				indexAssets[str] = compilation.assets[str];
			} else if (/\.(css|css\?\w*)$/g.test(str)) {
				cssAssets[str] = compilation.assets[str];
			} else if (/\.(map|map\?\w*)$/g.test(str)) {
				mapAssets[str] = compilation.assets[str];
			} else if (/\.(js|js\?\w*)$/g.test(str)) {
				jsAssets[str] = compilation.assets[str];
			}

		}

		if (that.crossOrigin) {
			var mapReg = /\/([^/.]+)[^/]*\.js\.map.*/g;
			for (var str in mapAssets) {

				mapReg.lastIndex = 0;
				mapReg.test(str);
				delete compilation.assets[str];
				compilation.assets["map/" + RegExp.$1 + ".js.map"] = mapAssets[str];
			}
			for (var str in jsAssets) {
				let s = jsAssets[str].source().replace(/\s{1}\/\/#[\s\S]+?$/, "");
				compilation.assets[str] = {
					source: function() {
						return s;
					},
					size: function() {
						return s.length;
					}
				};
			}
		}

		/* 
			"css/./good_sale_win.css?3552ab9d"
			"css/good_sale_win.css?3552ab9d"
		*/
		var cssReg = /(?:css\/(?:[./]+)?([^.]+)\.css(?:\?(\w*))?)/igm; //匹配正则中引用的css文件
		var assetsReg = /[^{}]*\{([^{}]*(?:\.png|\.gif|\.jpg|\.jpeg|\.otf|\.ttf|\.ttc|\.woff|\.eot)[^{}]*)+[^{}]*\}/igm; //匹配css文件中引用的资源

		for (var str in indexAssets) {
			var source = indexAssets[str].source();

			assetsReg.lastIndex = 0;
			var totalCssTarget = '';

			let jsContent = `{`;
			let jsObj = ``;
			/* 遍历所有的css文件 并把每个css文件中引用的 */
			for (let cssUrl in cssAssets) {

				cssReg.lastIndex = assetsReg.lastIndex = 0;

				let arr = cssReg.exec(cssUrl);

				var cssName = arr[1]; //css文件名
				var cssHash = arr[2]; //css哈希值

				var cssStr = cssAssets[cssUrl].source(); //根据路径获取css的内容
				var newCssUrl = "";
				var single = ``; //提取单个文件css资源串
				//将需要提取的资源路径前加上php变量
				let cssTarget = cssStr.replace(assetsReg, function(str) {
					single += str.replace(new RegExp(that.publicPathReg, "g"), that.phpStr);
					return ""
				});
				if (single) {
					jsObj += `var _${cssName} = "${cssMinify.minify(single).styles.replace(/"/g,"'")}";\n`;
					jsContent += `"${cssName}":_${cssName},`;
				}

				//以新的css文件重新生产hash值
				var newCssFileHash = _loaderUtils.getHashDigest(cssTarget, "md5", "hex", that.cssHashLength);
				//将原始hash值替换
				if (cssHash) newCssUrl = cssUrl.replace(cssHash, newCssFileHash);
				//将新的内容重新赋值给webpack资源对象
				compilation.assets[cssUrl] = {
					source: function() {
						return cssTarget
					},
					size: function() {
						return cssTarget.length
					}
				}; //将css文件中引用资源的地方清空，并且将样式拿出

				if (newCssUrl != '') {
					//如果新的哈希存在的话，重新按照hash值生成新的css文件url，并且写入到首页中去,并将老的删除
					source = source.replace(cssUrl, newCssUrl);
					compilation.assets[newCssUrl] = compilation.assets[cssUrl];
					delete compilation.assets[cssUrl];
				}


			}
			jsContent += `};`;



			//替换httpDomain.cdn
			jsObj = jsObj.replace(/&\+httpDomain\.cdn\+&/g, '"+__cndUrl__+"');

			var jsStr = fs.readFileSync(__dirname + "/template.js").toString().replace('"${obj}"', jsContent).replace('"${var}"', jsObj).replace(/\r\n/g, "");
			jsStr = jsStr.replace('"${crossOrigin}"', that.crossOrigin ? "true" : "false");

			//获取webpack配置中的publicpath
			// var pp = compiler.options.output.publicPath;
			var publicP = that.publicPath;
			//以下代码为将。html文件修改然后覆盖
			var fileName = compiler.options.output.filename;
			//将实际js路径计算得出
			var newPath = fileName.replace("[name]", that.styleName).replace(/\[chunkhash:(\d)\]/g, function() {
				var arg = arguments;
				var newJsHash = _loaderUtils.getHashDigest(jsStr, "md5", "hex", arg[1]);
				return newJsHash;
			});
			var newScriptEle = '<script type=text/javascript ' + (that.crossOrigin ? "crossOrigin='anonymous' " : "") + 'src="' + publicP + newPath + '" ></script>';
			//将新的标签出入到首页中
			var headSplit = source.split("</head>");
			source = headSplit[0] + newScriptEle + "</head>" + headSplit[1];
			compilation.assets[newPath] = {
				source: function() {
					return jsStr
				},
				size: function() {
					return jsStr.length
				}
			};

			compilation.assets[str] = {
				source: function() {
					return source
				},
				size: function() {
					return source.length
				}
			}; //将取出的样式插入到.html文件的head标签中去
		}

		callback();

	})

}

module.exports = ExtractAssetsFromCss;