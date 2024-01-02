# JavaScript

## 一、方法

### 1. 数据类型转换

| 方法 | 作用 |
|------|------|
| str = String(num) | 数字转字符串 |
| str = num.toString() | 数字转字符串 |
| num = Number(str) | 字符串转数字 |
| num = str.toNumber() | 字符串转数字 |
| newNum = Number.parseInt(num) | 转换为整数，不会四舍五入 |
| newNum = Number.parseFloat(num) | 转换为浮点数 |
| newStr = num.toFixed(n) | 保留几位小数，四舍五入 |

### 2. 字符串方法

| 方法 | 作用 |
|------|------|
| newStr = str.concat(str1,str2,...) | 拼接字符串 |
| newStr = str.substr(开始下标,截取长度) | 截取字符串 |
| newStr = str.slice(开始下标,结束下标) | 截取字符串 |
| newArr = str.split('') | 分隔字符串，默认全局分隔，返回数组 |
| str.indexOf('..') | 判断字符串是否包含指定的子字符串，返回符合的下标，查找不到返回-1 |
| newStr = str.padStart(padLength [,padString]) | 从字符串的开头用另一个字符串填充一个字符串到一定长度，并返回一个达到一定长度的结果字符串，第二个参数为空时默认填充空格 |
| newStr = str.padEnd(padLength [,padString]) | 从字符串的结尾用另一个字符串填充一个字符串到一定长度，并返回一个达到一定长度的结果字符串，第二个参数为空时默认填充空格 |

### 3. 数组遍历

| 方法 | 作用 |
|------|------|
| for(var i in arr){} | 快速遍历,i是数组元素的下标 |
| arr.forEach((item,index,arr) => {}) | item 数组元素，index 数组元素下标，arr 数组本身 |
| newArr = arr.map((item,index,arr) => {}) | 可以操作每一项数组元素，返回一个新数组 |
| newArr = arr.filter((item,index,arr) => {}) | 过滤符合条件的数组元素，返回一个新数组 |

### 4. 数组方法

| 方法 | 作用 |
|------|------|
| newArr = arr.concat(arr1,arr2,...) | 拼接数组 |
| arr.slice(开始下标,结束下标) | 截取数组 |
| arr.includes('str') | 判断数组是否包含指定的子字符串，返回 true or false |
| arr.indexOf('..') | 判断数组是否包含指定的子字符串，返回符合的下标，查找不到返回-1 |
| arr.push() | 尾部新增元素 |
| arr.unshift() | 头部新增元素 |
| arr.pop() | 尾部删除元素 |
| arr.shift() | 头部删除元素 |
| newStr = arr.join('') | 分隔数组，默认全局分隔，返回字符串 |
| newArr = arr.splice(开始下标,删除数,新增1,新增2...) |  |
| Array.isArray(arr) | 判断是否为数组类型，返回 true or false |

### 5. Math对象方法

| 方法 | 作用 |
|------|------|
| Math.ceil(num) | 向上取整 |
| Math.floor(num) | 向下取整 |
| Math.round(num) | 四舍五入取整 |
| Math.abs(num) | 取绝对值 |

### 6. Date对象方法

| 方法 | 作用 |
|------|------|
| new Date() | 获取当前时间 |
| Date.now() | 获取当前时间 |

### 7. ES6方法拓展

| 方法 | 作用 |
|------|------|
| 空值合并操作符（??） | 逻辑操作符,当左侧值为 null 或者 undefined 时返回其右侧值,否则返回左侧值; |
| Object.assign(target, ...sources) | 合并对象 |
| array.at(-1) | 数组的负索引访问器 |
