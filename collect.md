# 积累

1. [安装 node 中文官网](http://nodejs.cn/)

2. [安装 cnpm 中国镜像站](http://npmmirror.com/)

3. 安装 yarn 命令: npm install -g yarn

4. 安装指定版本的依赖: npm install 依赖名@版本号

5. 查看依赖的所有版本: npm view 依赖名 versions

6. [git小乌龟](https://tortoisegit.org/download/)

7. [app版本更新逻辑](https://blog.csdn.net/shelter123456/article/details/126039009)


### webStorage:

   >  存储内容大小一般支持5MB左右(不同浏览器可能不一样)
   >
   >  浏览器端通过 Window.sessionStorage 和 Window.loaclStorage 属性实现本地缓存机制
   >  
   >  sessionStorage存储的内容会随着浏览器窗口的关闭而消失
   >  
   >  loaclStorage存储的内容需要手动清除才消失
   >  
   >  getItem如果没有取到value值，会返回null
   >  
   >  JSON.parse(null) 结果是 null
   >  
   >  JSON.stringify() 对象转字符串


### 方法:

   + obj.hasOwnProperty('属性名')  判断对象上有没有该属性
