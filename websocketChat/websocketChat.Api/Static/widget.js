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

    loadCss("/appb81465a4afc52b6cb9b6.css");
    loadJavaScript("/appe4dcc5b10b2ad4d2dc7b.js");
})();