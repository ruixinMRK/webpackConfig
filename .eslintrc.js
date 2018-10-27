module.exports = {
    root: true, 
    extends: "eslint:recommended",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 7
    },
    env: {
        browser: true,
        es6: true
    },
    plugins: [
        "html"
    ],
    parser: "babel-eslint",

    rules: {
        "indent": ["error", "tab",{"SwitchCase": 1}],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "semi": ["error", "always",{ "omitLastInOneLineBlock": true }],
        "no-console": ["error",{allow:["log","warn"]}],
        "arrow-parens": 0,
        "no-news":0,
        "no-case-declarations":0,
        "no-var":2,
        "no-empty-function":2,
        
        // "max-depth": ["error", 4],
        "max-params": ["error", 3]

    }
        
}