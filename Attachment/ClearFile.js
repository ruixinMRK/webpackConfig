let fs = require('fs');
let path = require('path');

let filterFile = ['static','IndexRun.php','IndexRun.html','node_modules'];

//需要监控报错的目录
let errorList = ['async'];
let errorFilterList = ['占位用','echarts','area_cn','verdor','add_goods_win'];
let overMaxList = [];

//是否开启监控js文件打小的验证
let errorOn  =true;
const MAX_SIZE = 1024*40;//KB

var deleteFolder = function(p) {
    
    var files = [];

    let s = new RegExp(".*?"+'shop_es6.{1,2}'+filterFile[0],'g').test(p);
    
    let del = true;
    for(let item of filterFile){
        if(path.resolve(p) === path.resolve(__dirname,"../",item)){
            del = false;
        }
    }
    if(s&&errorOn){
        del = true;
    }
    if( fs.existsSync(p)&&del) {
        files = fs.readdirSync(p);
        
        files.forEach(function(file,index){
            var curPath = p + "/" + file;

            if(s){
                var info = fs.statSync(curPath);
                
                if(info.size>MAX_SIZE&&info.isFile()&&/\/(\w+)\..*\.js$/g.test(curPath)&&errorFilterList.indexOf(RegExp.$1)<0){
                    overMaxList.push(file);
                }
            }
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath,s);
            } else { // delete file
                 !s&&fs.unlinkSync(curPath);
            }
            
            
        });
         if(p!=path.resolve(__dirname,"../")&&!s) fs.rmdirSync(p);
    }

};

deleteFolder(path.resolve(__dirname,"../"));

if(overMaxList.length>0){
    throw new Error(overMaxList.join(',')+"等文件超出40KB,请更正")
}
// filterFile = ['src_temp']
// deleteFolder(path.resolve(__dirname,"../"));
// fs.rename(path.resolve(__dirname,'../src_temp'),path.resolve(__dirname,'../src'),function(err){ 
//     if(err){ 
//         console.log(err,"重命名失败！"); 
//     }else{ 
//         console.log("重命名成功！"); 
//     } 
// });
