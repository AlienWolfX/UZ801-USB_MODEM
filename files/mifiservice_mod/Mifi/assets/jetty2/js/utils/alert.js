var cn_alert = {
            "Confirm" : "确定",
            "Warning" : "警告",
           
        };

var en_alert = {
            "Confirm": "Confirm",
             "Warning": "Warning"
           
        };
        
function get_lan_alert(m) {
    //获取文字
    var lan = getCookie('language');     //语言版本
    //选取语言文字
    switch (lan) {
        case 'Chinese':
            var t = cn_alert[m];
            break;
        default:
            var t = en_alert[m];
    }

    //如果所选语言的json中没有此内容就选取其他语言显示
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];
  

    if (t == undefined) t = m; //如果还是没有就返回他的标识

    return t;
}
function Alert(alertMsg, msgType, yesFunc, btnWords)
{
	var type = msgType==0?1:3; //显示的图标
	var ms1 = mifi_translate('Warning');
	var ms2 = mifi_translate('Confirm');
	iAlertIdx = $.layer({
		area: ['310px','auto'],
		offset: [($(window).height()*0.2)+'px', ''],
		dialog: {
			btn: [btnWords||ms2],
			msg: alertMsg,
			type: type,
			yes: function(index) {try{layer.close(index);}catch(e){}; if(yesFunc){yesFunc();}}
		},
		title: ms1,
		border: [0 , 0 , '', false],
		shade : [0.5 , '#000' , true],
		success: function(layer) {window.ontouchmove = stopDefaultAction;},
		end: function() {window.ontouchmove = null;}
	});
}

function stopDefaultAction(e)
{
	if(e && e.preventDefault) {
		e.preventDefault();
	} else {
		window.event.returnValue = false;
	}
}
	
function _loadCss(cssAddr)
{
	var aCssAddr = []; // 需要加载的 css 数组
	if(cssAddr instanceof Array)
	{
		aCssAddr = aCssAddr.concat(cssAddr);
	}
	else if(cssAddr)
	{
		aCssAddr.push(cssAddr);
	}
	for(var i = 0, length = aCssAddr.length; i < length; i++)
	{
		var linkDom = document.createElement("link");
		linkDom.charset = 'utf-8';
		linkDom.rel = 'stylesheet';
		linkDom.href = aCssAddr[i];
		var elm = document.querySelector("head");
		//elm.appendChild(linkDom);
		elm.appendChild(linkDom);
	}
}
function showLoading(msg, content, contentAlert) {
	if (msg) {
		$('#loadMsg').html("Waiting");
	} else {
		$('#loadMsg').html('');
	}
	$('#loading').modal({
        zIndex: 3000,
		position : [ '30%' ],
		overlayId : 'confirm-overlay',
		containerId : 'confirm-container',
		minHeight : 140,
		persist : true,
        focus: false,
        escClose: false
	});
    var loading = $("#loading #loading_container");
    var a = "<a href='javascript:void(0)'>&nbsp;</a>";
	if(content){
		loading.html(content + a);
	} else {
		loading.html(a);
	}
	
	if(contentAlert) {
		$('#loading #loading_wording').html("Waiting");
	} else {
		$("#loading #loading_wording").html("");
	}
    $("a:last", loading).focus().hide();
}
/**
 * 隐藏等待遮罩
 * @method hideLoading
 */
function hideLoading() {
	$('#confirm-overlay').css("cursor","default");
	$.modal.close();
	$('#loadMsg').html('');
}