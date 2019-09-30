
const _scriptCache = new Map();

export function loadScript(url, name) {
	let promise;

	if(_scriptCache.has(url)) {
		// TODO: normalize URL
		promise = _scriptCache.get(url);
	} else {
		promise = new Promise((resolve,reject) => {
			let script = document.createElement('script');
			script.onerror = () => reject(new Error(`Failed to load '${url}'`));
			script.onload = resolve;
			script.async = true;
			script.src = url;

			if(document.currentScript) {
				document.currentScript.parentNode.insertBefore(script, document.currentScript);
			} else {
				(document.head || document.getElementsByTagName('head')[0]).appendChild(script);
			}
		});

		_scriptCache.set(url, promise);
	}

	return promise.then(() => {
		// eslint-disable-next-line
		if(global[name]) {
			// eslint-disable-next-line
			return global[name];
		} else {
			throw new Error(`"${name}" was not created by "${url}"`);
		}
	});
}