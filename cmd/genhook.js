let fs = require("fs");
let path = require("path");

let exit = false;
// try{
//     exit  = fs.statSync(path.resolve("../.git/hooks/pre-commit"));
// }
// catch(e){
    fs.copyFileSync("./cmd/pre-commit","./.git/hooks/pre-commit");
// }