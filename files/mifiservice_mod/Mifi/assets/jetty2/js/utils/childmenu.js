var arrays = new Array("wwan","wifi");
function Show(tagId){
	for(var i = 0; i < arrays.length; i++){
		if(arrays[i] == tagId){
			document.getElementById(arrays[i]).style.display = "block";
		}
		else{
			document.getElementById(arrays[i]).style.display = "none";
		}
	}
}

/*网页加载时出发的函数（刚加载网页时隐藏所有子菜单）*/
function loadFun(){
	alert('ok');
	/*获取<ul></ul>的所有子节点<li>节点*/
	var array = document.getElementByTagName("ul").item(0).childNodes;
	/*遍历子节点*/
	for(var i = 0; i < array.length; i++){
		/*获取<li></li>标签的子节点*/
		var childNodes = array[i].childNodes;
		for(var i = 0; i < array.length; j++){
			/*如果碰到主菜单中的<ul>标签就隐藏该子菜单的下拉菜单*/
 			if(childNodes[j].tagName == "UL"){
				childNodes[j].style.display = "none";
			}    
		}
	}
}


