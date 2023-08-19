/*

angular 命令：

    全局安装脚手架： npm install -g @angular/cli
        （cnpm安装之后，创建新项目的话 可能会出现 setTimeout is not defined 的报错）

    创建新项目： ng new 项目名称

    跳过 npm i 安装项目： ng new 项目名称 --skip-install

    运行项目： ng serve --open

    创建组件： ng g component 项目名称或路径(app下)

    创建服务指令（公用方法）： ng g service 目录（需在 app.modules 里边引入并且在 providers 里边声明，组件内也需再次引入使用）





app.modules文件：

    imports--模块

    declarations--组件

    providers--服务



angular 写法：

    1. 声明属性的几种方式：

        a.  public           共有（默认）           可以在这个类里边使用，也可以在类外边使用

        b.  protected        保护类型               只可以在当前类和它的子类里边访问

        c.  private          私有                   只在当前类可以访问这个属性
    
    2. 动态绑定属性

        [属性名]="变量名"
            绑定HTML--属性名：innerHTML
            动态修改class：[ngClass]="{'class名':判断条件,'class名':判断条件}"
            动态修改样式：[ngStyle]="{'background-color':'green'}"
            隐藏数据：[hidden]

    3. 图片路径

        本地路径：src="assets/目录"
        远程路径：[src]="路径名"
    
    4. 数据循环

        写法： *ngFor="let item of 数组名"
        拿到数组的索引： *ngFor="let item of 数组名;let 自定义索引名 = index;"

    5. 条件判断

        a. 写法：*ngIf="判断"

        b. 写法示例：*ngSwitch

            变量名： public num:Number = 1;  // 1、2、其他

            <div [ngSwitch]="num">
                <div *ngSwitchCase="1"></div>
                <div *ngSwitchCase="2"></div>
                <div *ngSwitchDefault></div>
            </div>

    6. 管道（行内调用方法）

        例：public today:any=new Date();

            <div>{{today | date:'yyyy-mm-dd hh:mm:ss'}}</div>

    7. 事件

        点击： <div (click)="事件名()" ></div>

    8. 表单事件、事件对象

        input监听键盘事件:  <input type="text" (keydown)="keyDown()" />

        监听事件对象$event:  <input type="text" (keydown)="keyDown($event)" />

    9. 双向数据绑定--MVVM--只针对表单

        app.module.ts 里边引入  import { FormsModule } from '@angular/forms';
        并在 imports 里声明

        <input type="text" [(ngModel)]="变量名" />

    10. Angular中的Dom操作(ViewChild)

        a. dom节点起名字    <div #自定义名称 ></div>

        b. 引入  import { ViewChild } from '@angular/core';

        c. 用法：@ViewChild('dom节点名') 自定义变量名:any

        d. 还可用来调用子组件里的方法

    11. 生命周期函数：

        a. ngOnInit    --    组件和指令初始化完成，并不是真正的dom加载完成（一般用来请求数据）

        b. ngOnChanges    --    当被绑定的输入属性的值变化时调用（父子组件传值时会触发）

        c. ngAfterViewInit   --    视图加载完成后触发  dom加载完成

        d. ngOnDestory    --    销毁指令/组件之前调用（可保存数据）

    12. 组件传值

        a. 父传子：（同样写法：可传数据，也可传方法。若传的是 this,则代表将整个父组件传给了子组件）
                    父组件定义变量： public title:String="测试"
                                    <div [title]="title" ></div>

                    子组件引入模块： import { Input } from '@angular/core';
                                    @Input() title:any;

        b. 子传父： 🔝10

        c. 子组件通过@Output触发父组件方法：

            子组件引入  import { Output , EventEmitter } from '@angular/core';

            子组件实例化  @Output private outer = new EventEmitter();

            调用  this.outer.emit('数据')

            父组件接收  <子组件 (outer)="事件名($event)" ></子组件>

    13.  Rxjs异步编程：

        引入  import { Observable } from 'rxjs'

        可 setInterval 多次执行

        写法：
            let stream = new Observable(observer => {
                observer.next('传出去的值')
            })

            let a = stream.subscribe(value => console.log(value))

            取消订阅：a.unsubscribe();

    14. 数据请求

        a. get请求：app.module 引入  import { HttpClientModule } from '@angular/common/http'

                    imports 里注入 HttpClientModule

                    需要用到的组件 引入 import { HttpClient } from '@angular/common/http'

                    构造函数中声明 constructor( public http:HttpClient )

                    使用 ==>  this.http.get(api链接).subscribe(response:any => { console.log(response) })

        b. post提交：需要用到的组件 引入 import { HttpClient , HttpHeaders } from '@angular/common/http'

                    声明请求头： const httpOptions = {
                                                        headers: new HttpHeaders({'Content-Type':'applocation/json'})
                                                    }

                    使用 ==>  this.http.post(api链接,{参数},httpOptions).subscribe(response:any => { console.log(response) })

        c. jsonp请求： 服务器需支持jsonp,监测方法：api接口后加callback=方法名
        
                    app.module 引入  import { HttpClientModule , HttpClientJsonpModule } from '@angular/common/http'

                    imports 里注入 HttpClientModule,HttpClientJsonpModule

                    使用 ==>  this.http.jsonp(api,'callback').subscribe(response:any => { console.log(response) })

        d. 第三方模块数据请求axios:

                    安装： cnpm install axios --save

                    方法组件引入： import axios from 'axios'

                    获取: axios.get(spi).then(function (response){
                        console.log(response)
                    }).catch(function (error){
                        console.log(error)
                    })
    
    15. 路由：

        app-routing.module 文件中import引入组件

        传入组件：

                const routes: Routes = [
                    { path: 'home', component: 引入时定义的名称 },
                    { path: 'news', component: 引入时定义的名称 },
                    { path: '**', redirectTo: 'home' }   //默认挂载组件'home'
                ];

        点击跳转：  <a routerLink="/home" ></a>
                   <a [routerLink]="['/home']" ></a>

        选中状态：  <a routerLink="/home" routerLinkActive="active" ></a>  (active为类名，可自定义)

        get传值：
                <a [routerLink]="['/home']" [queryparams]="{传的值}" ></a>

                接收： 引入 import { ActivitedRoute } from '@angular/router'
                声明： constructor( public route:ActivitedRoute )
                this.route.queryParams.subscribe((data) => { console.log(data) })

        动态路由：
                
                配置 ==> const routes: Routes = [
                            { path: 'news/:aid', component: 引入时定义的名称 },
                        ];

                        <a [routerLink]="['/home/',传值]" ></a>

                    接收：  this.route.params.subscribe((data) => { console.log(data) })

        js跳转：

            a. 动态路由跳转

                引入 ==>  import { Router } from '@angular/router'

                声明 ==>  constructor( private router:Router )

                跳转 ==>  this.router.navigate([路径/,数据])

            b. get传值跳转

                引入 ==>  import { Router , NavigationExtras } from '@angular/router'

                定义传值 ==>  let navigationExtras: NavigationExtras ={
                                    queryParams: {传值},
                              }

                跳转 ==>  this.router.navigate([路径],navigationExtras)

        父子路由：

            const routes: Routes = [
                { 
                    path: 'home', component: 引入时定义的名称,
                    children:[
                        {path: 'news', component: 引入时定义的名称}
                    ]
                },
            ];

            <a [routerLink]="['/home/news']" ></a>

            父组件放置  <router-outlet></router-outlet>



*/