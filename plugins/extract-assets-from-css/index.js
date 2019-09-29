
/* ruixin */
var _loaderUtils = require('loader-utils');
function ExtractAssetsFromCss(options){
    this.cssHashLength = (options&&options.cssHashLength)||8;
    this.needReplace = (options&&options.needReplace)||'http://localhost:8080';
    this.phpStr = '<?php echo $cdn ?>';
}
ExtractAssetsFromCss.prototype.apply = function(compiler){

    var that = this;
    compiler.plugin("emit",function(compilation,callback){
        
        var indexAssets = {};//匹配有多少个入口
        var cssAssets = {};//匹配若干个入口中引用的css文件
        for(var str in compilation.assets){
            if(/(\.html|\.php)$/g.test(str)){
                indexAssets[str] = compilation.assets[str];
            }
            else if(/\.css$/g.test(str)){
                cssAssets[str] = compilation.assets[str];
            }
        }

        var cssReg = /(css\/([^.]+)\.(\w*\.)?css)/igm;//匹配正则中引用的css文件
        var assetsReg = /([^{}]*\{[^{}]*(?:\.png|\.jpg|\.jpeg|\.otf|\.ttf|\.ttc)[^{}]*\})/igm;//匹配css文件中引用的资源
        
        for(var str in indexAssets){
            var source  = indexAssets[str].source();
            cssReg.lastIndex = assetsReg.lastIndex = 0;
            
            var totalCssTarget = '<style>';
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
                if(cssHash) newCssUrl = cssUrl.replace(cssHash,newCssFileHash+'.');
                //将新的内容重新赋值给webpack资源对象
                compilation.assets[cssUrl] = {source:function(){return cssTarget},size:function(){return cssTarget.length}};//将css文件中引用资源的地方清空，并且将样式拿出
                
                if(newCssUrl!='') {
                    //如果新的哈希存在的话，重新按照hash值生成新的css文件url，并且写入到首页中去,并将老的删除
                    source = source.replace(cssUrl,newCssUrl);
                    compilation.assets[newCssUrl] = compilation.assets[cssUrl];
                    delete compilation.assets[cssUrl];
                }
                
            })
            //将首页以header截取
            var headSplit = source.split("</head>");
            var styleTarget = headSplit[0] + totalCssTarget + "</style></head>" + headSplit[1];
            styleTarget = styleTarget.replace(new RegExp(that.needReplace,'g'),that.phpStr);
            compilation.assets[str] = {source:function(){return styleTarget},size:function(){return styleTarget.length}};//将取出的样式插入到.html文件的head标签中去
        }
        
        callback();
        
    })
    
}

module.exports = ExtractAssetsFromCss;