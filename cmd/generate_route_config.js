let fs = require('fs');
// let path = require('path'); //解析需要遍历的文件夹
// let filePath = path.resolve('./routes');
let importStr = ''; //需要生成的引用字符串
let routArr = []; //需要生成的路由数组
let cantStr = []; //生成名字
let redirect = '';
//调用文件遍历方法
let config = require('../src/config/routes/route_id_config');
readConfig();
let routStr = JSON.stringify(routArr);
routStr = routStr.replace(/\$"|"\$|\\r|\\n/g, ''); //去除分号
let template = fs.readFileSync('cmd/route_template.js', 'utf-8');
template = template.replace(/'\$\{const\}'/g, importStr);
template = template.replace(/'\$\{Array\}'/g, routStr);

if(process.argv[2] == '--dev'){
	template = template.replace(/'\$\{redirect\}'/g, JSON.stringify(redirect));
}else{
	template = template.replace(/,\s'\$\{redirect\}'/g, "");
}

fs.writeFileSync('src/config/routes.js', template);
//文件遍历方法
function readConfig() {
    if (config.useId.length > 0 && process.argv[2] == '--dev') {
        config.useId.forEach(id => {
            let filedir = config.configs[id];
            fileDisplay(filedir);
        })
    } else {
        let files = Object.values(config.configs);
        files.forEach(file => {
            fileDisplay(file);
        })
    }
}
//获取文件
function fileDisplay(filedir) {
    if (filedir) {
        // 读取文件内容
        let content = require(`../src/config/routes/${filedir}.js`);
        content = setfuncton(content);
        if (redirect == '' && process.argv[2] == '--dev') { //设置路由重定向
            redirect = {
                "path": "*",
                "redirect": content.path
            }
        }
        routArr.push(processRoute(content)); //生成数据
    }
}

function setfuncton(item) { //处理对象中的方法
    for (let i in item) {
        if (typeof item[i] == "object") {
            item[i] = setfuncton(item[i]);
        } else if (typeof item[i] == "function") {
            item[i] = `$${item[i]}$`
        }
    }
    return item
}
//处理获取到的对象
function processRoute(item) {
    item.name = ruandStr();
    let hasStr = true;
    if (item.url) {
        processImport(item);
    }
    if (item.children) {
        Object.assign(item, {
            component: "$details_con$"
        })
        item.children.forEach(v => {
            v = processRoute(v);
            if (v.path == '') {
                hasStr = false;
            }
        });
        if (hasStr && item.url) {
            item.children.unshift({
                path: '',
                component: `$${item.name}$`
            })
        }

    } else {
        if (item.url) {
            Object.assign(item, {
                component: `$${item.name}$`
            })
        }

    }
    delete item.url;
    delete item.name;
    return item;
}

function processImport(item) {
    let fireName = item.url.split('/');
    importStr += `const ${item.name} = (resolve) =>import ( /* webpackChunkName:"${fireName[fireName.length-1]}" */ '${item.url}');\n`
}
//生成随机名字
function ruandStr() {
    let name = randomRange(2, 5);
    cantStr.push(name);
    return name;
}

function randomRange(min, max) {
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    returnStr += range;
    if (returnStr && !cantStr.includes(returnStr)) {
        return returnStr;
    } else {
        return randomRange(min, max);
    }
}