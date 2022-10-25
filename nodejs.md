# 学习nodejs

### 不同浏览器的javaScript解析引擎:
* chrome 浏览器  =>  V8(性能最好)
* Firefox 浏览器  =>  OdinMonkey(奥丁猴)
* Safri 浏览器  =>  Jscore
* IE 浏览器  =>  Chakra(查克拉)

### 打开指定文件路径的命令窗口
* window图标键 + R => 输入cmd
* 文件夹中路径里边清空,输入cmd,然后回车
* shift + 鼠标右键 => 打开Powershell窗口(新的终端)

### 常用快捷键
* ↑键  ==>  快速定位到上一次执行的命令
* tab键  ==>  快速补全路径
* esc键  ==>  快速清空当前已输入的命令
* 输入cls命令，可以清空终端

### fs文件系统模块
> 用来操作文件的模块

	导入: 
		const fs = require('fs')
		
	方法:
		fs.readFile(path[, options], callback)  ==>  读取指定文件中的内容
			参数1：要读取的文件路径
			参数2：表示以什么编码格式来读取文件(中括号中的参数代表可选)
			参数3：回调函数，两个参数值(err,dataStr),若err为null,则表示读取成功
			
		fs.writeFile(file, data[, options], callback)  ==>  向指定的文件中写入内容
			参数1：文件路径
			参数2：要写入的内容
			参数3：以什么格式写入文件内容，默认是utf8
			参数4：回调函数，一个参数值(err),若err为null,则表示写入成功
			
			注意：
				可以创建文件，但不能创建路径
				新的写入内容会覆盖旧的内容
			
	问题:
		路径动态拼接的问题：代码运行时，会把相对路径动态拼接成被操作文件的完整路径
		
	解决方法：
		__dirname 表示当前node文件所处的目录
	
### path路径模块
> 用来处理路径的模块

	导入:
		const path = require('path')

	方法：
		path.join([...paths])  ==>  将多个路径片段拼接成一个完整的路径字符串
			参数：路径序列
		
		path.basename(path[, ext])  ==>  从路径字符串中，将文件名解析出来
			参数1：文件路径
			参数2：文件的扩展名,若不写，返回值会带上文件后缀，若写上，则不带
			
		path.extname(path)  ==>  获取路径中的文件扩展名
			参数：路径
			
### http模块
> 用来创建 web 服务器的模块，对外提供网络资源

	导入:
		const http = require('http')
		
	创建web服务器实例:
		const server = http.createServer()
	
	为服务器实例绑定request事件,监听客户端的请求:
		server.on("request",(req,res)=>{
			// 只要有客户端请求我们自己的服务器，就会触发request事件，从而调用这个事件处理函数
			req 是请求对象，它包含了与客户端相关的数据和属性，例如：
				req.url 是客户端请求的url地址
				req.method 是客户端的 mothod请求类型
				
			res 是响应对象：
				res.end(数据)  ==>  向客户端发送指定的内容，并结束这次请求的处理过程
		})
		
	启动服务器:
		server.listen(端口号,回调函数)
		server.listen(80,()=>{
			console.log('服务器启动了...')
		})
		
	解决中文乱码的问题：
		当调用res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：
		server.on("request",(req,res)=>{
			const str = `您请求的url地址是${req.url},请求的method类型是${req.method}`
			
			res.setHeader('Content-Type','text/html; charset=utf-8')
			res.end(str)
		})
		
	根据不同的url响应不同的html内容:
		server.on('request',(req,res)=>{
			const url = req.url;
			let content = '<h1>404 Not found!</h1>'
			if(url === '/' || url === '/index.html'){
				content = '<h1>首页</h1>'
			}else if(url === '/about.html'){
				content = '<h1>关于</h1>'
			}
			
			res.setHeader('Content-Type','text/html; charset=utf-8')
			res.end(content)
		})
		
		
		
##### 服务器相关的概念
> IP地址：每台计算机的唯一地址
    格式：通常用"点分十进制"表示成(a.b.c.d)的形式，a、b、c、d都是0~255之间的十进制的整数
	
	注意：
		互联网中每台web服务器，都有自己的IP地址，可通过终端运行ping www.baidu.com命令，查看对应网址的IP地址
		特殊地址 ==> 127.0.0.1 可用于自己测试
		
> 域名和域名服务器
	字符型的地址方案，直观且便于记忆，即所谓的域名地址
	IP地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器(DNS,Domain name server)的电脑中
	域名服务器就是提供IP地址和域名之间的转换服务的服务器
	
	开发测试期间，127.0.0.1 对应的域名是 localhost
	
> 端口号
	一台电脑中，可以运行成百上千个web服务，每个web服务都对应一个唯一的端口号，
	客户端发送过来的网络请求，通过端口号，可以被准确的交给对应的web服务进行处理
	
	每个端口号不能同时被多个web服务占用
	实际应用中，80 端口可以被省略
	
### 模块化

- 概念:
	遵守固定的规则，把一个大文件拆成独立并相互依赖的多个小模块
	
- 分类:
	1. 内置模块(由node.js官方提供,例如: fs、path、http)
	2. 自定义模块(用户创建的每个.js文件)
	3. 第三方模块(由第三方开发出来的模块,使用前需要先下载)

- 规范:
	遵循commenjs规范

- 加载:
	使用require()方法加载(会执行被加载模块中的代码)
	得到的是对应模块中 module.exports 指向的那个对象
	
- 暴露:
	每个.js自定义模块中都有一个module对象,它里边存储了和当前模块有关的信息
	
	exports 等同于 module.exports
	
### npm 与 包(第三方模块)

- [搜索包](https://www.npmjs.com/)
- [下载包](https://registry.npmjs.org/)  ==>  包管理工具(npm)

- 包的语义化版本规范:
	包的版本号是以"点分十进制"形式进行定义的,总共有三位数字
		第一位数字: 大版本
		第二位数字: 功能版本
		第三位数字: Bug修复版本
		
		版本号提升规则: 只要前边的版本号增长了,则后边的版本号归零
		
- 包管理配置文件:
	npm规定,在项目根目录中,必须提供一个叫做package.json的包管理配置文件,用来记录与项目有关的一些配置信息
	
	安装命令: npm init -y (只能在英文目录下运行成功,且不能包含空格)
	
	dependencies 配置项会自动写入下载的依赖包

	npm i ==> 从 dependencies 拿到所有的依赖信息, 下载当前项目用到的所有依赖包
	
	npm uninstall 依赖名  ==> 卸载依赖包
	
	devDependencies 配置项只在开发阶段使用
		简写:  npm i 依赖名 -D 
		完整:  npm i 依赖名 --save-dev
		
		

