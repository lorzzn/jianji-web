module.exports = {
  presets: [],
  plugins: [
    "babel-plugin-macros", // twin.macro
    ["@babel/plugin-proposal-decorators", { legacy: true }], // 使用较旧版本的装饰器语法
    ["@babel/plugin-proposal-class-properties", { loose: true }], // 宽松模式，提高代码执行的性能和可读性
  ],
}
