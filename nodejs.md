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
			
	问题:
		路径动态拼接的问题：代码运行时，会把相对路径动态拼接成被操作文件的完整路径
		
	解决方法：
		__dirname 表示当前文件所处的目录
	
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