const babel = require('@babel/core');
// const { code } = babel.transformSync('new Promise().then(()=>{})',{
// 	filename: './babel.config.js'
// });
// console.log(code);

const { code } = babel.transformFileSync('example.js', {
	filename: './babel.config.js'
});
console.log(code);