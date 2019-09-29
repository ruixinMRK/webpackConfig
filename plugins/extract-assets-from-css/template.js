/*
	by ruixin
 */
(function () {
    
    try {
        __cndUrl__ = httpDomain.cdn||"";
    } catch (e) {
        __cndUrl__ = '';
    }
    
    "${var}"

    var c = "${obj}";

    function insertStyle(str) {
        if (str) {
            var style = document.createElement("style");
            style.innerText = str;
            document.head.appendChild(style);
        }
	};
	
	var cache = {};
	function filterUrl(url){

		if(!cache[url] && url){
			var styleStr = "";
			for (var str in c) {
				if (url.indexOf(str) > -1) {
					styleStr = c[str];
					cache[url] = true;
					delete c[str];
					break;
				}
			}
			insertStyle(styleStr);
		}
		
	}

	function isNative (Ctor) {
		return Ctor && typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

    if( isNative(MutationObserver) ){
		let ob = new MutationObserver(function(mutations){
			for(var i=0;i<mutations.length;i++){
				let target = mutations[i].addedNodes[0];
				if(target){
					filterUrl(target.src||target.href);
				}
			}
			
		});
		ob.observe(document.head,{
			childList:true
		});
	}else{
		document.head.addEventListener("DOMNodeInserted", function (ev) {

			if(ev.target.nodeName.toLowerCase() == 'script'){
				filterUrl(ev.target.src)
			}
			
		}, false);
	}
    
    insertStyle(c['main'] || "");

})();