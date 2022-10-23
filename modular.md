
# modular

### 模式

> 全局function模式
* 将方法定义到window下
> namespace模式
* 将方法定义到对象下
> IIFE模式
* 通过 立即执行函数 在开始的时候将方法绑定到window下，匿名函数自调用(闭包)
> IIFE模式增强
* 引入依赖

# commonjs

* 模块的加载是同步的

### 暴露

* module.exports = value
> 本质修改 exports ,可以是任意属性类型(如：对象、方法)
* exports.xxx = value
> 本质是往 exports 对象添加属性,可不断添加

> 暴露的本质是修改或添加到exports对象中

### 引入

* require(value)
* 若value为路径，则引入的是本地包
* 若value为名称。则引入的是第三方包名

### 注意
* 第三方库放到自定义库上边
* 适用于服务器端
* 浏览器端如要使用，可以下载 Browserify 进行依赖处理，然后用命令 browserify 入口文件(js/src/app.js) *o(output) 出口文件(js/dist/bundle.js)
> npm install -g browserify

# AMD

* 下载并引入 [require.js](https://requirejs.org/docs/api.html)
* 主文件js中进行模块配置
* 提前加载好依赖

### 规范
* 专门用于浏览器端，模块的加载是异步的

### 定义暴露模块

* define(function(){ return 模块 })
* define(['module1','module2'],function(m1,m2){ return 模块 })      参数与模块是一一对应的关系(显示声明 依赖注入)

### 引入使用模块

* 自执行函数中调用
* require(['module1','module2'],function(m1,m2){ 使用m1,m2 })      参数与模块是一一对应的关系
* jquery库 需要使用小写，可查看jquery源码最后了解
* angular库 需要再单独暴露

# CMD

* 按需加载,异步加载
* 用于浏览器端,需要依赖 Sea.js

### 暴露

* 无依赖
	  define(function(require,exports,module){ 
		exports.xxx = value
		module.exports = value
	  })

* 有依赖
	  define(function(require,exports,module){ 
		// 引入依赖模块(同步)
		var module2 = require('路径')
		// 引入依赖模块(异步)
		require.async('路径',function(m3){  })
		
		exports.xxx = value
	  })
	  
### 引入

	define(function(){
		var module1 = require('路径')
	})
	
# ES6

* 依赖模块需要编译打包处理
* 因浏览器兼容问题，需要使用 Bable 将ES6编译为ES5代码
* 使用 Browserify 编译打包js

* npm install babel-cli browserify -g
* npm install babel-preset-es2015 --save-dev

* 新建 .babelrc文件
	{
		"presets": ["es2015"]
	}
	
* babel 入口文件(js/src) -d 出口文件(js/lib)

### 导出模块

* export (常规暴露：分别暴露、统一暴露，引入的时候需要按对象引入)
* export default value;  (默认暴露，可以是任意数据类型，单个文件只能默认暴露一次)

### 导入模块

* import xxx from '路径'
