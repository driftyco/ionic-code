var platform_1 = require('./platform');
var dom_1 = require('../util/dom');
var win = window;
var doc = document;
platform_1.Platform.register({
    name: 'core',
    settings: {
        mode: 'ios',
        keyboardHeight: 290,
    }
});
platform_1.Platform.setDefault('core');
platform_1.Platform.register({
    name: 'mobile'
});
platform_1.Platform.register({
    name: 'phablet',
    isMatch: function (p) {
        var smallest = Math.min(p.width(), p.height());
        var largest = Math.max(p.width(), p.height());
        return (smallest > 390 && smallest < 520) &&
            (largest > 620 && largest < 800);
    }
});
platform_1.Platform.register({
    name: 'tablet',
    isMatch: function (p) {
        var smallest = Math.min(p.width(), p.height());
        var largest = Math.max(p.width(), p.height());
        return (smallest > 460 && smallest < 820) &&
            (largest > 780 && largest < 1400);
    }
});
platform_1.Platform.register({
    name: 'android',
    superset: 'mobile',
    subsets: [
        'phablet',
        'tablet'
    ],
    settings: {
        activator: function (p) {
            // md mode defaults to use ripple activator
            // however, under-powered devices shouldn't use ripple
            // if this a linux device, and is using Android Chrome v36 (Android 5.0)
            // or above then use ripple, otherwise do not use a ripple effect
            if (p.testNavigatorPlatform('linux')) {
                var chromeVersion = p.matchUserAgentVersion(/Chrome\/(\d+).(\d+)?/);
                if (chromeVersion) {
                    // linux android device using modern android chrome browser gets ripple
                    return (parseInt(chromeVersion.major, 10) < 36 ? 'none' : 'ripple');
                }
                // linux android device not using chrome browser checks just android's version
                if (p.version().major < 5) {
                    return 'none';
                }
            }
            // fallback to always use ripple
            return 'ripple';
        },
        hoverCSS: false,
        keyboardHeight: 300,
        mode: 'md',
        scrollAssist: true,
    },
    isMatch: function (p) {
        return p.isPlatform('android', 'android|silk');
    },
    versionParser: function (p) {
        return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
    }
});
platform_1.Platform.register({
    name: 'ios',
    superset: 'mobile',
    subsets: [
        'ipad',
        'iphone'
    ],
    settings: {
        clickBlock: true,
        hoverCSS: false,
        keyboardHeight: 300,
        mode: 'ios',
        scrollAssist: isIOSDevice,
        swipeBackEnabled: isIOSDevice,
        swipeBackThreshold: 40,
        tapPolyfill: isIOSDevice,
    },
    isMatch: function (p) {
        return p.isPlatform('ios', 'iphone|ipad|ipod');
    },
    versionParser: function (p) {
        return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
    }
});
platform_1.Platform.register({
    name: 'ipad',
    superset: 'tablet',
    settings: {
        keyboardHeight: 500,
    },
    isMatch: function (p) {
        return p.isPlatform('ios', 'ipad');
    }
});
platform_1.Platform.register({
    name: 'iphone',
    subsets: [
        'phablet'
    ],
    isMatch: function (p) {
        return p.isPlatform('ios', 'iphone');
    }
});
platform_1.Platform.register({
    name: 'windowsphone',
    superset: 'mobile',
    subsets: [
        'phablet',
        'tablet'
    ],
    settings: {
        mode: 'md',
    },
    isMatch: function (p) {
        return p.isPlatform('windowsphone', 'windows phone');
    },
    versionParser: function (p) {
        return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
    }
});
platform_1.Platform.register({
    name: 'cordova',
    isEngine: true,
    methods: {
        ready: function (resolve) {
            function isReady() {
                doc.removeEventListener('deviceready', isReady);
                resolve();
            }
            dom_1.windowLoad(function () {
                doc.addEventListener('deviceready', isReady);
            });
        }
    },
    isMatch: function () {
        return !!(win.cordova || win.PhoneGap || win.phonegap);
    }
});
function isIOSDevice(p) {
    // shortcut function to be reused internally
    // checks navigator.platform to see if it's an actual iOS device
    // this does not use the user-agent string because it is often spoofed
    // an actual iPad will return true, a chrome dev tools iPad will return false
    return p.testNavigatorPlatform('iphone|ipad|ipod');
}
