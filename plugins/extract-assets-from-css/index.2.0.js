
/* ruixin */
var _loaderUtils = require('loader-utils');
var fs = require("fs");

function ExtractAssetsFromCss(options){
    this.cssHashLength = (options&&options.cssHashLength)||8;
    this.needReplace = (options&&options.needReplace)||'http://localhost:8080';
    this.phpStr = '&+httpDomain.cdn+&';
    this.styleName = "style2js";
    this.mainEntry = "";
}
ExtractAssetsFromCss.prototype.apply = function(compiler){

    var that = this;
    let entryArr = Object.keys(compiler.options.entry);
    this.mainEntry = entryArr.find((item) => item.indexOf("verdor")<0);//找出页面的主入口

    compiler.plugin("emit",function(compilation,callback){
        
        var indexAssets = {};//匹配有多少个入口
        var cssAssets = {};//匹配若干个入口中引用的css文件
        var jsAssets = {};//匹配需要把首页资源样式写入到js文件的js
        for(var str in compilation.assets){
            if(/(\.html|\.php)/g.test(str)){
                indexAssets[str] = compilation.assets[str];
            }
            else if(/\.css/g.test(str)){
                cssAssets[str] = compilation.assets[str];
            }
            
        }

        var cssReg = /(css\/([^.]+)\.css\?(\w*))/igm;//匹配正则中引用的css文件
        var assetsReg = /([^{}]*\{[^{}]*(?:\.png|\.gif|\.jpg|\.jpeg|\.otf|\.ttf|\.ttc)[^{}]*\})/igm;//匹配css文件中引用的资源
        
        for(var str in indexAssets){
            var source  = indexAssets[str].source();
            
            cssReg.lastIndex = assetsReg.lastIndex = 0;
            
            var totalCssTarget = '';
            
            source.replace(cssReg,function(){
                
                var cssUrl = arguments[1];//css全路径名
                var cssName = arguments[2];//css文件名
                var cssHash = arguments[3];//css哈希值
                var cssStr = cssAssets[cssUrl].source();//根据路径获取css的内容
                var newCssUrl = "";
                //将需要提取的资源路径前加上php变量
                var cssTarget = cssStr.replace(assetsReg,function(str){totalCssTarget+=str.replace(that.needReplace,that.phpStr);return ""});
                //以新的css文件重新生产hash值
                var newCssFileHash = _loaderUtils.getHashDigest(cssTarget,"md5","hex",that.cssHashLength);
                //将原始hash值替换
                if(cssHash) newCssUrl = cssUrl.replace(cssHash,newCssFileHash);
                //将新的内容重新赋值给webpack资源对象
                compilation.assets[cssUrl] = {source:function(){return cssTarget},size:function(){return cssTarget.length}};//将css文件中引用资源的地方清空，并且将样式拿出
                
                if(newCssUrl!='') {
                    //如果新的哈希存在的话，重新按照hash值生成新的css文件url，并且写入到首页中去,并将老的删除
                    source = source.replace(cssUrl,newCssUrl);
                    compilation.assets[newCssUrl] = compilation.assets[cssUrl];
                    delete compilation.assets[cssUrl];
                }

            })

            
            //计算出新js的名称
            var jsName = that.mainEntry+'_'+that.styleName;
            //读取生成js的模板
            totalCssTarget = totalCssTarget.replace(/"/g,"'").replace(/&\+httpDomain\.cdn\+&/g,'"+httpDomain.cdn+"');
            var jsStr = fs.readFileSync(__dirname +"/template.js").toString().replace("needReplace",totalCssTarget).replace(/\r\n/g,"");
            //获取webpack配置中的publicpath
            var publicP = compiler.options.output.publicPath.replace(that.needReplace,"<?php echo $cdn ?>");
            var fileName = compiler.options.output.filename;
            //将实际js路径计算得出
            var newPath = fileName.replace("[name]",jsName).replace(/\[chunkhash:(\d)\]/g,function(){
                var arg = arguments;
                var newJsHash =  _loaderUtils.getHashDigest(jsStr,"md5","hex",arg[1]);
                return newJsHash;
            });
            var newScriptEle = '<script type=text/javascript src="'+ publicP + 'static/' + newPath +'" />';
            //将新的标签出入到首页中
            var headSplit = source.split("</head>");
            source = headSplit[0] + newScriptEle + "</head>" + headSplit[1];
            compilation.assets["js/"+jsName+'.js'] = {source:function(){return jsStr},size:function(){return jsStr.length}};

            compilation.assets[str] = {source:function(){return source},size:function(){return source.length}};//将取出的样式插入到.html文件的head标签中去
        }
        
        callback();
        
    })
    
}

module.exports = ExtractAssetsFromCss;