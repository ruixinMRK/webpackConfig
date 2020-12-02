import './main.less';

/* 
	eslint-disable
*/
if (module.hot) {
    module.hot.accept();
}


const _scriptCache = new Map();

/**
 * Load an external script.
 * 
 * @param {string} url Absolute URL of script to load
 * @param {string=} name Name of global variable that the script is expected to define
 * @return {Promise}
 */
export function loadScript(url, name) {
    let promise;

    if (_scriptCache.has(url)) {
        // TODO: normalize URL
        promise = _scriptCache.get(url);
    } else {
        promise = new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.onerror = event => reject(new Error(`Failed to load '${url}'`));
            script.onload = resolve;
            script.async = true;
            script.src = url;

            if (document.currentScript) {
                document.currentScript.parentNode.insertBefore(script, document.currentScript);
            } else {
                (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
            }
        });

        _scriptCache.set(url, promise);
    }

    return promise.then(() => {
        if (global[name]) {
            return global[name];
        } else {
            throw new Error(`"${name}" was not created by "${url}"`);
        }
    });
}


loadScript("https://img.midukanshu.com/browser/h5/library/deeplink.js", "mduDeepLink").then((d) => {
    console.log(d);
})
// require("https://img.midukanshu.com/browser/h5/library/deeplink.js",(d)=>{
// 	console.log(d);
// })
// import("https://img.midukanshu.com/browser/h5/library/deeplink.js").then((d)=>{
// 	console.log(d);
// })

// class HelloMessage extends React.Component {
// 	render() {
// 	  return (
// 			<div>
// 		  Hello {this.props.name}
// 			</div>
// 	  );
// 	}
// }

// ReactDOM.render(
// 	<HelloMessage name="Taylor" />,
// 	document.getElementById('app')
// );

const p = new Promise((resolve, reject) => {
    resolve('ok123')
})

p.then(resp => console.log(resp))
var b = new Map();
var c = new Set();


console.log(123)
