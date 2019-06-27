/**
* 增加，为处理在oss中 ，不自动调用相应目录的index.html问题
*/
$(function(){
 $("a").each(function(index, element) {

   var currHref = $(element).attr("href");
   //console.log("href: "+currHref);
   if(typeof(currHref) === "undefined"){//排除无链接的a标签
     return true;
   }else if(currHref.substring(0,7) === "http://" || currHref.substring(0,8) === "https://"){//排除已有完整路径的链接
     return true;
   }else if(currHref.substring(0, 1) === "#"){//排除页内导航链接
     return true;
   }

   var preHref = "", endHref = "";

   if(currHref.indexOf("#", 0) !== -1){//对有“#”的链接，将前后部分分别提取出来
     preHref = currHref.split("#")[0];
     endHref = "#" + currHref.split("#")[1];
   }else{//处理没“#”的链接
     preHref = currHref;
   }

   if(preHref.indexOf("/", 0) !== -1){//排除已指向站内具体文件的链接
     var tmpHref = preHref.split("/");
     if(tmpHref.length > 1 && tmpHref[tmpHref.length - 1].indexOf(".", 0) !== -1){
       return true;
     }
   }

   if(preHref.substr(preHref.length-1,1) !== "/"){//末尾先添上“/”
     preHref = preHref + "/";
   }

   $(element).attr("href", preHref + "index.html" + endHref);
   //console.log("modified: " + preHref + "index.html" + endHref);
 });
});
