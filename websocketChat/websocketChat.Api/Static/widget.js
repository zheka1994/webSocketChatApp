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

    loadCss("/appe953735e1554fdd4b5c2.css");
    loadJavaScript("/app80034a2b694116a02f97.js");
})();