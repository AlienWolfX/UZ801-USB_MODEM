function request(param, callback){
	var iAjax = $.ajax({
		url: "http://192.168.100.1:80/ajax",
		data: JSON.stringify(param),
		type: "post",
		dataType: "json",
		async: true,
		timeout: 20 * 1000,
		beforeSend: function(XMLHttpRequest) {
//			console.log("beforeSend");
		},
		success: function(data, textStatus) {
//			console.log("success");
			if(data) 
			{
				if(callback) 
				{
					callback(data);
				}
			} 
			else 
			{
				Alert("��̨�������ݸ�ʽ����ȷ,����ϵ����Ա������������:" + data);
			}
		},
		complete: function(XMLHttpRequest, textStatus) {
//			console.log("complete");
		},
		error: function(XMLHttpRequest, textStatus, errorMessage) { // abort��ִ��error����
			if(textStatus == "timeout")
			{
				iAjax.abort();
				 // ���ӳ�ʱ���⴦����
				 if(timeOutFunc)
				 {
					 timeOutFunc();
				 } 
				 else 
				 {
					 Alert("����ʱ,����ӿ��Ƿ��쳣�������粻ͨ��");
				 }
			}
			else if(textStatus != "abort")
			{
				var getNetInfoCallback = function(result){
					if(result && +result.network === 0) // ����
					{
						Alert("����δ����");
					}
					else
					{
						Alert("�������쳣,������:" + XMLHttpRequest.status + ",������Ϣ:" + XMLHttpRequest.statusText);
					}
				};
			}
		}
	});
}

function request2(param, callback) {
    var iAjax = $.ajax({
        url: "http://192.168.100.1:80/ajax",
        data: JSON.stringify(param),
        type: "post",
        dataType: "json",
        async: true,
        timeout: 25 * 1000,
        beforeSend: function(XMLHttpRequest) {
            //			console.log("beforeSend");
        },
        success: function(data, textStatus) {
            //			console.log("success");
            if (data) {
                if (callback) {
                    callback(data);
                }
            }
            else {
                Alert("��̨�������ݸ�ʽ����ȷ,����ϵ����Ա������������:" + data);
            }
        },
        complete: function(XMLHttpRequest, textStatus) {
            //			console.log("complete");
        },
        error: function(XMLHttpRequest, textStatus, errorMessage) { // abort��ִ��error����
            if (textStatus == "timeout") {
                data.flag =1;
                data.error_info = "none";
                callback(data);
                //location.reload(true);
                iAjax.abort();
            }
            else if (textStatus != "abort") {
                var getNetInfoCallback = function(result) {
                    if (result && +result.network === 0) // ����
                    {
                        Alert("����δ����");
                    }
                    else {
                        Alert("�������쳣,������:" + XMLHttpRequest.status + ",������Ϣ:" + XMLHttpRequest.statusText);
                    }
                };
            }
        }
    });
}
