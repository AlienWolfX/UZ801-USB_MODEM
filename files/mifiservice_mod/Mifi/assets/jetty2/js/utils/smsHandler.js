function stringToCode(num_string, encodeType) //bs is a string of number, and parse to code(ASCII and UNICODE).
{
  var result = "";
  var sub_str = "";
  var substr_int = "";
  if(num_string=="" || num_string==null)
  {
    return result;
  }
  if("1" == encodeType) //Transform to ASCII
  {
    for(var i=0; i<num_string.length; i+=2)
    {
      subbs = num_string.substring(i, i+2);
      subbs_int = parseInt(subbs,16);
      result+=String.fromCharCode(subbs_int);
    }
  }
  else //Transform to UNICODE
  {
    for(var i=0; i<num_string.length; i+=4)
    {
      subbs = num_string.substring(i, i+4);
      subbs_int = parseInt(subbs,16);//16 string to 10 number
      result += String.fromCharCode(subbs_int);//10 unicode to string
    }
  }
  return result;
}

function sms_html_encode(txt)
{
	txt = txt.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
	return txt;
}

function test(text_content)
{
	var temp;
	temp = stringToCode(text_content,0);  //Unicode
	temp = sms_html_encode(temp);
	return temp;
}

function test1(text_content)
{

}

