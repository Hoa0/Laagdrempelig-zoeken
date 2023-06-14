module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "camelcase": ["error", { "properties": "always" }],
        "block-spacing": ["error", "always"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-const-assign": ["off"],

    }
}
