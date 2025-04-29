function setCookie(name,value)
{
	//如果支持localstorage优先使用，否则使用cookie
	if(window.localStorage){
		localStorage.setItem(name,value);
	}else{
		var days = 30;//此cookie被保存30天
		var exp = new Date(); 
		exp.setTime(exp.getTime() + days*24*60*60*1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();//chrome不适用
	}
}

function getCookie(name)
{
	var l,arr;
	if(window.localStorage){
		l = localStorage.getItem(name);
	}else{
		arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));	
	}
	if(l != ""){
		return l;
	}
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return null;
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
	{
		document.cookie = name + "="+cval+";expires="+exp.toGMTString();	
	}
}

function requset(name)
{
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
	{
		return unescape(r[2]);	
	}
	return null;
}

String.prototype.replaceAll = function(oldStr,newStr){
		return this.replace(new RegExp(oldStr,"gm"),newStr);
}