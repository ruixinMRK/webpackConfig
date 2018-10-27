
import babelPolyfill from '@babel/polyfill';


if(module.hot){
    module.hot.accept()
}


class Main{

    constructor(){

        let o = {};
        console.log(o?.a?.a);

    }


}

new Main();
