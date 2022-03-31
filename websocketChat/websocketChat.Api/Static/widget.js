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

    loadCss("/app5e2337c73283f9259974.css");
    loadJavaScript("/app47e26999d0afd7c2755f.js");
})();