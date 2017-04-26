(function (window, document) {
    'use strict';
    // create window.Ionic if it doesn't already exist
    var ionic = window.Ionic = window.Ionic || {};
    // find the static directory, which should be the same as this JS file
    var scriptElm = document.getElementsByTagName('script');
    scriptElm = scriptElm[scriptElm.length - 1];
    var stcDir = document.querySelector('script[data-static-dir]');
    if (stcDir) {
        ionic.staticDir = stcDir.dataset['staticDir'];
    }
    else {
        var paths = scriptElm.src.split('/');
        paths.pop();
        ionic.staticDir = scriptElm.dataset['staticDir'] = paths.join('/') + '/';
    }
    var style = document.createElement('style');
    style.innerHTML = Object.keys(ionic.components).join(',') + '{visibility:hidden}';
    document.head.appendChild(style);
    // build up a path for the exact ionic core javascript file this browser needs
    var pathItems = [];
    if (!('attachShadow' in Element.prototype)) {
        // browser requires the shadow dom polyfill
        pathItems.push('sd');
    }
    if (!window.customElements) {
        // browser requires the custom elements polyfill
        pathItems.push('ce');
    }
    // request the ionic core file this browser needs
    var s = document.createElement('script');
    s.src = ionic.staticDir + 'ionic.core' + pathItems.join('.') + '.js';
    document.head.appendChild(s);
})(window, document);
