# Array

### Array.join(分隔符)

	结论:
		连接一个数组的所有元素转换成字符串并返回
		
	参数:
		指定的分隔符

### Array.unshift(element1, ..., elementN)

	结论:
		将一个或多个元素添加到数组的开头,并返回该数组的新长度
		会改变原数组
		
### Array.shift()

	结论:
		从数组中删除第一个元素,并返回该被删除的元素
		会改变原数组
		
	注意:
		如果是空数组,则返回undefined
		
### Array.push(element1, ..., elementN)

	结论:
		将一个或多个元素添加到数组的末尾,并返回该数组的新长度
		会改变原数组
		
### Array.pop()

	结论:
		从数组中删除最后一个元素,并返回该被删除的元素
		会改变原数组
		
	注意:
		如果是空数组,则返回undefined
		
### Array.slice(startIndex,endIndex)

	结论:
		提取数组的一部分元素,并返回一个新数组
		不会改变原数组
		
### Array.splice(startIndex,deleteCount,[item1, item2, ...])

	结论:
		删除现有元素或添加新元素
		会改变原数组
		
### Array.includes(element, startIndex)

	结论:
		判断数组是否包含某个元素, 返回布尔值
		
	参数:
		element ==> 指定的元素(必填)
		startIndex ==> 开始搜索的索引值(选)
		
### Array.sort(function)

	结论:
		排序
		
	参数:
		排序的条件函数
		从小到大 ==> Array.sort( (a,b)=> return a - b; )
		从大到小 ==> Array.sort( (a,b)=> return b - a; )
		
### Array.reverse()

	结论:
		反转数组的顺序
		

### Array.forEach(callback, thisArg)
	
	结论: 
		数组循环

	回调函数包含三个数据:
		item 数组的每一项(必填)
		index 数组中当前元素的索引值(选填)
		array 数组本身(选填)
		
		Array.forEach((item, index, array) => {
			console.log(item)
		})
		
### Array.map(callback, thisArg)

	结论: 
		处理数组中每项的数据
		返回一个新数组,且不会更改原数组
	
	回调函数包含三个数据:
		item 数组的每一项(必填)
		index 数组中当前元素的索引值(选填)
		array 数组本身(选填)
		
		Array.map((item, index, array) => {
			return item;
		})
		
### Array.filter(callback, thisArg)

	结论: 
		返回一个新数组,新数组中的每项都满足条件
		不会更改原数组
	
	回调函数包含三个数据:
		item 数组的每一项(必填)
		index 数组中当前元素的索引值(选填)
		array 数组本身(选填)
		
		Array.filter((item, index, array) => {
			return item >= 1;
		})
		
### Array.every(callback, thisArg)

	结论: 
		返回布尔值
		检测数组中的每项是否符合条件,若有一项不符合,则返回false
	
	注意: 
		该方法不会对空数组进行检测,返回值为true
		不会改变原数组
		 
	回调函数包含三个数据:
		item 数组的每一项(必填)
		index 数组中当前元素的索引值(选填)
		array 数组本身(选填)
		
		Array.every((item, index, array) => {
			return item >= 1;
		})
		
### Array.some(callback, thisArg)
	
	结论:
		返回布尔值
		检测数组中是否有元素符合条件,若有,则返回true
		
	注意:
		该方法不会对空数组进行检测,返回值为true
		不会改变原数组
		
	回调函数包含三个数据:
		item 数组的每一项(必填)
		index 数组中当前元素的索引值(选填)
		array 数组本身(选填)
		
		Array.some((item, index, array) => {
			return item >= 1;
		})
		 
	