// <!-- Global site tag (gtag.js) - Google Analytics -->
(function(){
  var script = document.createElement("script");
  script.async = "async";
  script.onload = script.onreadystatechange = function() {
    if (
      !this.readyState ||
      this.readyState == "loaded" ||
      this.readyState == "complete"
    ) {
      func();
      script.onload = script.onreadystatechange = null;
    }
  };
  document.head.appendChild(script);
  function func() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-122106866-1");
  }
  script.src = "https://www.googletagmanager.com/gtag/js?id=UA-122106866-1";

})();
// baidu tongji
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f4b1306b5cc3dcbf264a1257a5ebf05f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
