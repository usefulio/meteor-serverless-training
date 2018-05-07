const slsw = require("serverless-webpack");

module.exports = {
    entry: slsw.lib.entries,
    mode: "development",
    target: "node",
    devtool: "source-map"
};