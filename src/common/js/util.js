/*
*解析url参数
*@example ?id=123456&a=b
*@return Object {id:123456, a:b}
*/
export function urlParse() {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g; 
	let arr = url.match(reg);
	// ['?id=12345', '&a=b']
	// 将数组转换成对象
	if (arr) {
		arr.forEach((item) => {
			let newArr = item.slice(1).split('=');
			let key = decodeURIComponent(newArr[0]);
			let value = decodeURIComponent(newArr[1]);
			obj[key] = value;
		});
	}
	return obj; 
};
