const fs = require('fs'); 
const glob = require("glob");

let html = glob.sync("../src_temp/*.*");

let fileArr = glob.sync("../src_temp/static/**");
fileArr.push(...html);

fileArr.filter((item,index)=>{
    if(!fs.statSync(item).isDirectory()) { // recurse  
        fs.unlinkSync(item);
        return false;  
    }
    return true;
}).sort((a,b)=>{return b.length-a.length}).forEach((item)=>{
    fs.rmdirSync(item);
})