let fs = require('fs');
let path = require('path');

let filterList = ["res","area_cn.js","zx_area.js"];
let reg = /[>\s,.，"'”]([\u4e00-\u9fa5]+)[>：'"”‘]/gm;
let content = new Set();

var generatorJS = function(p) {
    
    var files = [];

    if( fs.existsSync(p)) {
        files = fs.readdirSync(p);
        
        files.forEach(function(file){
            var curPath = p + "/" + file;

            if(filterList.indexOf(file)<0){
                if(fs.statSync(curPath).isDirectory()) { 
                    generatorJS(curPath);
                } else {
                    let data = fs.readFileSync(curPath);
                    // content.add(path.normalize(curPath));
                    let c = null;
                    while(c = reg.exec(data)){
                        content.add(c[1]);
                    }
                    
                    
                }
            }
            
            
            
        });
        
    }

};

generatorJS(path.resolve(__dirname,"../src/"));

let obj = {
    "zh_cn":"{",
    "en_us":"{"
}

for(let str in obj){
    let item = obj[str];
    content = [...content];
    for(let i = 0;i<content.length;i++){
        let cont = content[i];
        item += `"${cont}":"${cont}",`;
    }
    item += "}";
    fs.writeFileSync(`./${str}.json`,item);
}



