module.exports= {
	ignore: [
		/\/core-js/,
	],
	'presets': [
		[
			'@babel/preset-env',
			{
				'modules': false,
				corejs: '3',
				//         "targets": {
				//           "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
				//           //           browsers: [
				// //             'Chrome >= 60',
				// //             'Safari >= 10.1',
				// //             'iOS >= 10.3',
				// //             'Firefox >= 54',
				// //             'Edge >= 15',
				// //           ],
				//         },
				'useBuiltIns': 'usage'
				// "entry" : 需要入口配置 babel-poly,但是会打包指定浏览器的所有不支持的新特性,不管有没有使用
				// preset-env >7.3 新增了usage 可以针对只配置的浏览器环境且使用了最新的语法才会编译
			}
		],
		['@babel/preset-react',{
			'pragma': 'dom', // default pragma is React.createElement
			'pragmaFrag': 'DomFrag', // default is React.Fragment
			'throwIfNamespace': false // defaults to true
		}]
	],
	'plugins': [

		[
			"@babel/plugin-transform-runtime",
			{
			  "absoluteRuntime": false,
			  "corejs": { version: 3, proposals: true },
			  "helpers": true,
			  "regenerator": true,
			  "useESModules": false
			}
		  ],
		  
		'@babel/plugin-proposal-function-bind',

		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-logical-assignment-operators',
		['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
		['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
		['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
		'@babel/plugin-proposal-do-expressions',


		['@babel/plugin-proposal-decorators', { 'legacy': true }],
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-throw-expressions',

		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		['@babel/plugin-proposal-class-properties', { 'loose': false }],
		'@babel/plugin-proposal-json-strings'
	],

	'compact': true
};
