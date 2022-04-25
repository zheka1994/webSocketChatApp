(function() {
    function loadJavaScript(src) {
        var body = document.querySelector("body");
        var js = document.createElement("script");
        js.src = src;
        js.async = true;
        body.append(js);
    }
    
    function loadCss(href) {
        var head = document.querySelector("head");
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = href;
        head.append(link);
    }

    loadCss("/app4ef09cd637f3a2ab9478.css");
    loadJavaScript("/appb80708ed7363b3e6fed2.js");
})();