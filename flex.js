/* 

	Flex:
	
		Ⅰ.常见的父项属性：
		
			-- flex-direction: 设置主轴的方向
				①  row  从左到右(默认值)
				②  row-reverse  从右到左
				③  column  从上倒下
				④  column-reverse  从下到上
				
			-- justify-content: 设置主轴上子元素的排列方式
				①  flex-start  从头部开始 若主轴是x轴，则从左到右(默认值)
				②  flex-end  从尾部开始排列
				③  center  在主轴居中对齐(若主轴是x轴，则水平居中)
				④  space-around  平分剩余空间
				⑤  space-between  先两边贴边，再评分剩余空间
			
			-- flex-wrap: 设置子元素是否换行
				①  nowrap  不换行(默认值)
				②  wrap  换行
			
			-- align-content: 设置侧轴上的子元素的排列方式(多行==有换行，单行下无效果)
				①  flex-start  在侧轴的头部开始排列(默认)
				②  flex-end  在侧轴的尾部开始排列
				③  center  在侧轴的中间显示
				④  space-around  子项在侧轴平分剩余空间
				⑤  space-between  子项在侧轴先分布在两头，再平分剩余空间
				⑥  stretch  设置子项元素高度平分父元素高度
			
			-- align-items: 设置侧轴上的子元素的排列方式(单行)
				①  flex-start  从上到下(默认)
				②  flex-end  从下到上
				③  center  居中
				④  stretch  拉伸(子元素不设置高度)
			
			-- flex-flow: 复合属性，相当于同时设置了 flex-direction 和 flex-wrap
			
		Ⅱ.常见的子项属性：
		
			-- flex: 子项目占的份数(剩余空间)
				值：number
			
			-- align-self: 控制子项自己在侧轴的排列方式
			-- order: 定义子项的排列顺序(前后顺序)
 
*/