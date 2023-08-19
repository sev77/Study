/*

Vue命令：

    全局安装脚手架--vue-cli：

        安装命令：npm install -g @vue/cli 或者 yarn global add @vue/cli
        更新命令：npm update -g @vue/cli 或者 yarn global upgrade --latest @vue/cli
        检查：vue -V

    新建项目：vue create 项目名称(不能大写)

    启动项目：npm run serve

便利：

    浏览器上安装 Vue Devtools

*/

/*

Vue写法：

    关闭Vue的生产提示：Vue.config.productionTip = false

    1. MVVM

        M ==> 模型： data里的数据

        V ==> 视图： 页面结构

        VM ==> 视图模型： new Vue实例

    2. 绑定结构模块：
            a.  new Vue 的参数 el 绑定
            b.  new Vue 的实例对象.$mount("")

    3. data 通过函数式return的写法：
            避免全局污染

    4. 指令：
            v-bind   --数据单向绑定
            v-model:value[简写：v-model]  --数据双向绑定，默认收集的就是value值，应用在表单类元素--需有value属性)

    5. 数据代理：

            定义 ==> 通过一个对象(实例对象)代理对另一个对象(data)中属性的操作(读/写)

            Object.defineProperty(对象名,'对象属性名',{
                value: 属性值,
                enumerable: true,  //控制属性是否可以被枚举(遍历)
                writable: true,  //控制属性是否可以被修改
                configurable: true,  //控制属性是否可以被删除
                
                // 当有人读取该属性时，get函数就会被调用，且返回值就是该属性的值
                get(){
                    return 返回值
                },
                
                // 当有人读取该属性时，set函数(setter)就会被调用，且会收到修改的具体值
                set(value){
                    变量 = value
                }
            })

    6. 事件处理：(事件写在methods中)
            
            使用：v-on:click($event)[简写：@click]   --点击事件
                  @scroll  --滚动条滚动事件
                  @wheel  --鼠标滚轮滚动事件

            事件修饰符：阻止默认事件 ==>  v-on:click.prevent 可连着写修饰符

                a. prevent：阻止默认事件 (e.preventDefault() )
                b. stop：阻止事件冒泡
                c. once：事件只触发一次
                d. capture：使用事件的捕获模式
                e. self：只有event.target是当前操作的元素时才触发
                f. passive：事件的默认行为立即执行，无需等待事件回调执行完毕

            键盘事件： @keydown  ==>  按下按键
                      @keyup  ==>  抬起按键

                      @keyup.enter  ==>  回车
                      @keyup.delete  ==>  删除、退格
                      @keyup.esc  ==>  推出
                      @keyup.space  ==>  空格
                      @keyup.tab  ==>  换行（特殊：必须配合keydown，还有 ctrl、alt、shift、meta）
                      @keyup.up  ==>  上
                      @keyup.down  ==>  下
                      @keyup.left  ==>  左
                      @keyup.right  ==>  右

                      其他未提供的健需要拿到健名key,并转为小写，单词之间用-连接

                      自定义按键：  Vue.config.keyCodes.自定义别名 = 键码

        7. 计算属性：computed

            定义：要用的属性不存在，要通过已有属性计算得来

            原理：底层借助了Object.defineproperty方法提供的getter和setter

            get什么时候被调用：
                  a. 初次读取时会被调用一次
                  b. 当依赖的数据发生变化时会被调用

            优势：与methods相比，内部有缓存机制，效率更高，调试方便

            只读不改 可用简写：computed:{ 属性名(){  } }

        8. 监视属性：watch

            监视属性必须存在，才能被监视

            immediate:true  初始化时调用handler

            deep:true  深度监听

            handler(newValue,oldValue)  当被监听的数据发生变化时会被调用

            只有handler时可简写：watch:{ 监听属性(new,old){  } }

        9. computed 和 watch 区别：

            a. computed能完成的功能，watch都能做到

            b. watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作

        10. 绑定样式： :class=""

            字符串写法：适用于 ==> 样式的类名不确定，需动态指定
            数组写法：适用于 ==> 样式的个数不确定，名字也不确定
            对象写法：适用于 ==> 样式的个数确定，名字也确定，取决于用不用

        11. 绑定style:   :style=""

        12. 条件渲染：

            v-show  ==>  调整display（适用于切换频率高的场景）

            v-if(适用于切换频率低的场景，若内容多，外层可用templete标签搭配使用)
            v-else-if
            v-else

        13. 列表渲染：

            便利数组 ==>  v-for="(item,index) in 数组" :key="index"
            便利对象 ==>  v-for="(value,key) in 对象" :key="key"

            面试题：react、vue中的key有什么作用(key的内部原理)

                a. 虚拟DOM中key的作用：
                    key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】
                    随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                
                b. 对比规则：
                    旧虚拟DOM中找到了与新虚拟DOM相同的key：
                        若虚拟DOM中内容没变，直接使用之前的真是DOM
                        若虚拟DOM中的内容变了，则生成新的真是DOM，随后替换掉页面中之前的真实DOM

                    旧虚拟DOM中未找到与新虚拟DOM相同的key:
                        创建新的真是DOM，渲染到页面

                c. 用index作为key可能会引发的问题：
                    若对数据进行：逆序添加、逆序删除等破坏顺序操作：
                        会产生没有必要的真实DOM更新  ==>  界面效果没有问题，但效率低

                    如果结构中还包含输入类的DOM：
                        会产生错误DOM更新  ==>  界面有问题

                d. 开发中如何选中key:
                    最好使用每条数据的唯一标识作为key,比如 id、手机号、身份证号、学号等唯一值
                    如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

        14. 数组过滤： 数组.filter((obj)=>{ return 判断条件 })

        15. 数组排序： 数组.sort((a,b)=>{ return a-b为升序  b-a为降序 })

        16. VUE监测数据的原理： 

            a. vue会监视data中所有层次的数据

            b. 如何监测对象中的数据？
                通过setter实现监视，且要在new vue时就传入要监测的数据
                    对象中后追加的属性，vue默认不做响应式处理
                    如需给后添加的属性做响应式，请使用如下API：
                        Vue.set(target,propertyName/index,value) 或
                        vm.$set(target,propertyName/index,value)

            c. 如何监测数组中的数据？
                通过包裹数组更新元素的方法实现，本质就是做了两件事：
                    调用原生对用的方法对数组进行更新
                    重新解析模板，进行更新页面

            d. 在Vue修改数组中的某一个元素一定要使用如下方法：
                使用API：push()、pop()、unshift()、shift()、splice()、sort()、reverse()
                Vue.set() 或 vm.$set()

            特别注意：Vue.set() 跟 vm.$set() 不能给vm 或 vm的根数据对象 添加属性

        17. 收集表单数据：

            若：<input type="text" />，则v-model收集的是value值，用户输入的就是value值
            若：<input type="radio" />，则v-model收集的是value值，且要给标签配置value值
            若：<input type="checkbox" />
                没有配置input的value值，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                配置input的value属性：
                    v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                    v-model的初始值是数组，那么收集的就是value组成的数组
            
            备注：v-model的三个修饰符：
                lazy:失去焦点再收集数据
                number:输入字符串转为有效的数字
                trim：输入首位空格过滤

        18. 过滤器：

            定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
            语法：
                注册过滤器：Vue.filter(name,callback) 或 new vue{ filters:{} }
                使用过滤器：{{ xxx | 过滤器名 }} 或 v-bind:属性=" xxx | 过滤器名 "
            备注：
                过滤器可以接收额外参数、多个过滤器也可以串联
                并没有改变原本的数据，是产生新的对应的数据

        19. 内置指令：

            v-bind      ==>      单项绑定解析表达式，可简写为：:xxx
            v-model     ==>      双向数据绑定
            v-for       ==>      遍历数组、对象、字符串
            v-on        ==>      绑定事件监听，可简写为：@
            v-if        ==>      条件渲染(动态控制节点是否存在)
            v-else      ==>      条件渲染(动态控制节点是否存在)
            v-show      ==>      条件渲染(动态控制节点是否展示)
            v-text      ==>      向其所在的节点中渲染文本内容，替换掉节点中的内容

            v-html      ==>      向指定节点中渲染包含html结构的内容，可以识别html结构，替换掉节点中的内容
                严重问题：有安全性问题
                    在网站上动态渲染任何HTML是非常危险的，容易导致XSS攻击
                    一定要在可信的内容上使用，永不要用在用户提交的内容上

            v-cloak     ==>      没有值
                本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性
                使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题

            v-once      ==>      没有值，所在节点在初次动态渲染后，就视为静态内容了，之后数据变化不会引起该节点更新，可用于优化性能

            v-pre       ==>      没有值，跳过其所在节点的编译过程，
                可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

        20. 自定义指令：

            定义语法：
                局部指令：new vue({ directives:{指令名：配置对象} }) 或 new vue({ directives:{指令名：回调函数} })
                全局指令：Vue.directive(指令名,配置对象) 或 Vue.directive(指令名,回调函数)

            配置对象中常用的3个回调：
                bind  指令与元素成功绑定时调用
                inserted  指令所在元素被插入页面时调用
                update  指令所在模板结构被重新解析时调用

            备注：
                指令定义是不加 v- ，但使用时要加 v-
                指令名如果时多个单词，要使用 kebab-case 命名方式，不要用 kebabCase 命名

        21. 生命周期：

            又名：生命周期回调函数、生命周期函数、生命周期钩子

            Vue在关键时刻帮我们调用一些特殊名称的函数

            常用的生命周期钩子：
                mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等（初始化操作）
                beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等（收尾工作）

            关于销毁Vue实例：
                销毁后借助Vue开发者工具看不到任何信息
                销毁后自定义事件会失效，但原生DOM事件依然有效
                一般不会在beforeDestroy操作数据，因为即便操作数据，也不会触发更新流程

*/

/*

组件：

    1. 定义：实现应用中局部功能的代码和资源的整合

        非单文件组件：一个页面定义多个组件
        单文件组件：一个页面定义一个组件

    2. Vue中使用组件的三大步骤：
            
            a. 定义组件(创建组件)：
                使用Vue.extend(options)创建，其中options和new vue(options)时传入的options几乎一样，但也有点区别：
                    el不要写，最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器
                    data必须写成函数，避免组件被复用时，数据存在引用关系
                备注：使用temeplate可以配置组件结构

            b. 注册组件：
                局部注册：靠 new vue 的时候传入components选项
                全局注册：靠Vue.component("组件名",组件)

            c. 使用组件标签:
                <组件名></组件名>

            几个注意点：

                组件名：
                    一个单词组成 ==> 
                        第一种写法--首字母小写
                        第二种写法--首字母大写
                    多个单词组成 ==>
                        第一种写法--都用小写，单词之间用-连接
                        第二种写法--首字母都大写(需要Vue脚手架支持)
                    
                    备注：组件名尽可能回避HTML中已有的元素名称
                          可以使用name配置项指定组件在开发者工具中呈现的名字

                关于组件标签：
                    第一种写法 -- <组件名></组件名>
                    第二种写法 -- <组件名 />

                    备注：不使用脚手架时，<组件名 />会导致后续组件不能渲染

                一个简写方式：const school = Vue.extend(options) 可简写为 const school = options

    3. 关于VueComponent:

            组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的

            我们只需要写组件标签，Vue解析时会帮我们创建组件的实例对象，即Vue帮我们执行的：new VueComponent(options)

            特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent

            关于this的指向：
                组件配置中：data函数、methods中的函数、watch中的函数，它们的this均是【VueComponent实例对象】
                new vue()配置中：data函数、methods中的函数、watch中的函数，它们的this均是【Vue实例对象】

            VueComponent的实例对象也可称之为组件实例对象

            一个重要的内置关系: VueComponent.prototype.__proto__ === Vue.prototype
                目的：让组件实例对象可以访问到Vue原型上的属性、方法

*/

/*

脚手架：

    1. 关于不同版本的Vue：

        vue.js 与 vue.runtime.xxx.js 的区别：
            vue.js是完整版的Vue,包含：核心功能 + 模板解析器
            vue.runtime.xxx.js 是运行版的 Vue,只包含：核心功能
        
        因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用template配置项，需要使用
        render函数接收到的createElement函数去指定具体内容

    2. vue.config.js配置文件：
            
        使用 vue inspect > output.js 可以查看Vue脚手架的默认配置
        使用 vue.config.js 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

    3. ref属性：

        被用来给元素或子组件注册引用信息(id的替代者)
        应用在html标签上获取的是真实的dom元素，应用在组件标签上是组件实例对象
        使用方式：
            打标识： <标签 ref="xxx" ></标签> 或 <组件标签 ref="xxx" />
            获取：this.$refs.xxx

    4. 配置项props:
        
        功能：让组件接收外部传过来的数据
        传递数据： <组件标签 数据名="数据值" />
        接收数据：
            只接收：props:['数据名']
            限制类型：props:{ 数据名:数据类型 }
            限制类型、限制必要性、限制默认值：props:{ 数据名:{ type:类型, required:true(必要性), default:默认值 } }

        备注：props是只读的，不可直接修改

    5. mixin(混入):
            
        功能：可以把多个组件共用的配置提取成一个混入对象
        使用方法：
            定义混合：例如 { data(){....} }
            使用混合：
                全局：Vue.mixin(xxx)
                局部：mixins:['xxx']

    6. 插件(plugins):
        
        功能：增强Vue
        本质：包含install方法的一个对象，install的第一个参数是Vue，第二个参数是插件使用者传递的数据
        定义插件：
            对象.install = function(Vue,options){
                //添加全局过滤器
                Vue.filter(...)

                //添加全局指令
                Vue.directive(...)

                //配置全局混入
                Vue.mixin(...)

                //添加实例方法
                Vue.propotype.$myMethod = function(){...}
                Vue.propotype.$myPropoty = xxx
            }
        使用插件：Vue.use()

    7. scoped 样式：

        作用：让样式在局部生效，防止冲突
        写法：<style scoped ></style>

    8. 组件的自定义事件：

        一种组件间通信的方式，适用于：子组件 ==> 父组件

        使用场景：子组件 想给 父组件 传数据，就要在父组件中给子组件绑定自定义事件(事件的回调在父组件中)

        绑定自定义的方式：

            父组件中 ==>  <子组件名 @自定义事件名="事件"/> 或 <子组件名 v-on:自定义事件名="事件"/>

            父组件中 ==>  mounted(){ this.$refs.xxx.$on('自定义事件名',事件) }

            若想让自定义事件只触发一次，可以使用once修饰符，或$once方法

        触发自定义事件：this.$emit('自定义事件名',数据)

        解绑自定义事件：this.$off('自定义事件名')

        组件上也可以绑定原生DOM事件，如click,但需要使用native修饰符

    9. 全局事件总线(GlobalEventBus)：

        一种组件间通信的方式，适用于任意组件间通信

        安装全局事件总线：
            new vue({
                ....
                beforeCreate(){
                    Vue.prototype.$bus = this
                },
                ....
            })

        使用全局事件总线：
            接收数据 ==> 
                methods(){ demo(data){...} }
                ...
                mounted(){
                    this.$bus.$on('xxxx',this.demo)
                }
            提供数据 ==> 
                this.$bus.$emit('xxxx',数据)

        最好在beforeDestory钩子中，用$off解绑当前所用到的事件

    10. 消息订阅与发布(安装第三方库，这里推荐pubsub-js)：

        一种组件间通信的方式，适用于任意组件间通信

        使用步骤：
            安装pubsub: npm i pubsub-js
            引入: import pubsub from 'pubsub-js'
            接收数据 ==> 
                methods(){ demo(name,data){...} }
                ...
                mounted(){
                    this.pid = pubsub.subscribe('xxxx',this.demo)
                }
            提供数据 ==> 
                pubsub.publish('xxxx',数据)

            最好在beforeDestory钩子中，用pubsub.unsubscribe(this.pid)取消订阅

    11.  生命周期函数： $nextTick:
            
            语法：this.$nextTick(回调函数)
            作用：在下一次DOM更新结束后执行其指定的回调
            什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在$nextTick所指定的回调函数中执行

    12. Vue封装的过度与动画：

            作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名

            写法：
                准备好样式：
                    元素进入时：
                        .v-enter 进入的起点
                        .v-enter-active 进入过程中
                        .v-enter-to 进入的终点
                    
                    元素离开时：
                        .v-leave 离开的起点
                        .v-leave-active 离开过程中
                        .v-leave-to 离开的终点

                使用<transition>包裹要过度的元素，并配置name属性：
                    <transition name="hellow" appear>
                        <h1 v-show="isShow"></h1>
                    </transition>

            备注：若有多个元素需要过度，则需要使用<transition-group></transition-group>，且每个元素都要指定key值

    13. vue脚手架配置代理：

            方法一：
                
                在vue.config.js中添加如下配置：
                    devServer:{
                        proxy: "域名"
                    }

                    优点：配置简单，请求资源是时直接发给前端即可
                    缺点：不能配置多个代理，不能灵活的控制请求是否走代理
                    工作方式：当请求了前端不存在的资源时，那么该请求会转发给服务器(优先匹配前端资源)

            方法二：

                在vue.config.js中添加如下配置：
                    devServer:{
                        proxy: {
                            'api':{   //匹配所有以'/api'开头的请求路径
                                target:'域名',  //代理目标的基础路径
                                changeOrigin: true,  //是否撒谎
                                pathRewrite:{ "^/api":"" }
                            }
                        }
                    }

                    优点：可以配置多个代理，且可以灵活控制请求是否走代理
                    缺点：配置繁琐，请求资源时必须加前缀

    14. 插槽slot：

        作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 父组件 ==> 子组件

        分类：默认插槽、具名插槽、作用域插槽

        使用方式：
            默认 ==> 子组件写入<slot></slot>标签
                     父组件在组件标签内写入结构

            具名 ==> 子组件写入<slot name="xxx"></slot>标签
                     父组件在组件标签内写入结构 并在外层标签中 写入  slot="xxx" 或 v-slot:xxx 指定插槽

            作用域 ==> 
                    理解：数据在子组件中，但需要在父组件中使用
                    子组件中 <slot :定义名="数据" ></slot>
                    父组件中 <组件标签>
                                <template scope="xxx">   // slot-scope="xxx"
                                    <h1 v-for="item in xxx.数据"><h1>
                                </template>
                            </组件标签>

    15. 路由router:

        npm i vue-router@3

        <router-link to="路径"></router-link>
        <router-link name="配置名称"></router-link>

        query传参： <router-link to="路径?xxx=xxx"></router-link>
        params传参： <router-link to="路径/xxx/xxx"></router-link>   配置里边: 路径:参数名:参数名

        <router-view></router-view>

        配置项porps传参:
            porps:{xxx:xxx}
            porps:true    会把收到的所有params参数通过props传给组件
            props(route){ return{ xxx:route.query.xxx } }

        replace模式：
            作用：控制路由跳转时操作浏览器历史记录的模式
            浏览器的历史记录有两种写入方式：分别是push和replace，push是追加记录，replace是替换当前记录.默认是push
            <router-link :replace="true" to="路径?xxx=xxx"></router-link>

        编程式路由导航：

            this.$router.push({})   跳转
            this.$router.replace({})   跳转
            this.$router.back()   回退
            this.$router.forward()   前进
            this.$router.go(number)   number 为正，前进number步  为负，后退number步

        缓存路由组件：

            <keep-alive include="要缓存的组件名">      组件名==>组件中配置的name
                <router-view></router-view>
            </keep-alive>
            <keep-alive :include="['要缓存的组件名','要缓存的组件名']">      组件名==>组件中配置的name
                <router-view></router-view>
            </keep-alive>

            include不写的话默认都缓存

        路由组件独有的两个生命周期钩子：
        
            激活：从组件隐藏到出现
            activated(){  }
            失活：从组件出现到隐藏
            deactivated(){  }


    16. 路由守卫：

        全局前置 ==> 初始化跟每一次路由切换之前会被调用
                    router.beforeEach((to,from,next)=>{    //to去哪的信息   from从哪来的信息
                        if(to.meta.isAuth){  //判断是否需要权限
                            if(判断条件，选择是否放行){
                                next();  //跳转放行
                            }else{
                                next();
                            }
                        }
                    })

                    路由配置项配置 元信息  meta:{ isAuth:true,title: 'title' }

        全局后置 ==>初始化跟每一次路由切换之后会被调用
                    router.afterEach((to,from)=>{    //to去哪的信息   from从哪来的信息
                        举例：配置页面标题   document.title = to.meta.title || 'xxxx'
                    })

        独享(只有前置)：配置项 beforeEnter((to,from,next)=>{    //to去哪的信息   from从哪来的信息
                                  if(to.meta.isAuth){  //判断是否需要权限
                                      if(判断条件，选择是否放行){
                                          next();  //跳转放行
                                      }else{
                                          next();
                                      }
                                  }
                              })

        组件内：配置项
                通过路由规则，进入该组件时被调用
                beforeRouteEnter(to,from,next){

                }
                通过路由规则，离开该组件时被调用
                beforeRouteLeave(to,from,next){
                    
                }

*/ 

/*

    路由器的两种工作模式：

        对于一个url来说，#号及其后面的内容就是hash值

        hash值不会包含在http请求中，即：hash值不会带给服务器

        hash模式：
            地址中永远带着#号，不美观
            若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
            兼容性较好

        history:
            地址干净，美观
            兼容性和hash模式相比略差
            应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题


    移动端常用UI组件库：Vant、Cube UI、Mint UI
    PC端常用UI组件库：Element UI、IView UI

*/




