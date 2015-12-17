var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('../components/app/app');
var config_1 = require('./config');
var platform_1 = require('../platform/platform');
var overlay_controller_1 = require('../components/overlay/overlay-controller');
var form_1 = require('../util/form');
var keyboard_1 = require('../util/keyboard');
var action_sheet_1 = require('../components/action-sheet/action-sheet');
var modal_1 = require('../components/modal/modal');
var popup_1 = require('../components/popup/popup');
var events_1 = require('../util/events');
var nav_registry_1 = require('../components/nav/nav-registry');
var translate_1 = require('../translation/translate');
var click_block_1 = require('../util/click-block');
var feature_detect_1 = require('../util/feature-detect');
var tap_click_1 = require('../components/tap-click/tap-click');
var dom_1 = require('../util/dom');
/**
 * @private
 */
function ionicProviders(args) {
    if (args === void 0) { args = {}; }
    var platform = new platform_1.Platform();
    var navRegistry = new nav_registry_1.NavRegistry(args.pages);
    var config = args.config;
    if (!(config instanceof config_1.Config)) {
        config = new config_1.Config(config);
    }
    platform.url(window.location.href);
    platform.userAgent(window.navigator.userAgent);
    platform.navigatorPlatform(window.navigator.platform);
    platform.load();
    config.setPlatform(platform);
    var clickBlock = new click_block_1.ClickBlock(config.get('clickBlock'));
    var events = new events_1.Events();
    var featureDetect = new feature_detect_1.FeatureDetect();
    setupDom(window, document, config, platform, clickBlock, featureDetect);
    bindEvents(window, document, platform, events);
    // prepare the ready promise to fire....when ready
    platform.prepareReady(config);
    return [
        app_1.IonicApp,
        core_1.provide(click_block_1.ClickBlock, { useValue: clickBlock }),
        core_1.provide(config_1.Config, { useValue: config }),
        core_1.provide(platform_1.Platform, { useValue: platform }),
        core_1.provide(feature_detect_1.FeatureDetect, { useValue: featureDetect }),
        core_1.provide(events_1.Events, { useValue: events }),
        core_1.provide(nav_registry_1.NavRegistry, { useValue: navRegistry }),
        tap_click_1.TapClick,
        form_1.Form,
        keyboard_1.Keyboard,
        overlay_controller_1.OverlayController,
        action_sheet_1.ActionSheet,
        modal_1.Modal,
        popup_1.Popup,
        translate_1.Translate,
        router_1.ROUTER_PROVIDERS,
        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
        http_1.HTTP_PROVIDERS,
    ];
}
exports.ionicProviders = ionicProviders;
function setupDom(window, document, config, platform, clickBlock, featureDetect) {
    var bodyEle = document.body;
    var mode = config.get('mode');
    // if dynamic mode links have been added the fire up the correct one
    var modeLinkAttr = mode + '-href';
    var linkEle = document.head.querySelector('link[' + modeLinkAttr + ']');
    if (linkEle) {
        var href = linkEle.getAttribute(modeLinkAttr);
        linkEle.removeAttribute(modeLinkAttr);
        linkEle.href = href;
    }
    // set the mode class name
    // ios/md
    bodyEle.classList.add(mode);
    var versions = platform.versions();
    platform.platforms().forEach(function (platformName) {
        // platform-ios
        var platformClass = 'platform-' + platformName;
        bodyEle.classList.add(platformClass);
        var platformVersion = versions[platformName];
        if (platformVersion) {
            // platform-ios9
            platformClass += platformVersion.major;
            bodyEle.classList.add(platformClass);
            // platform-ios9_3
            bodyEle.classList.add(platformClass + '_' + platformVersion.minor);
        }
    });
    // touch devices should not use :hover CSS pseudo
    // enable :hover CSS when the "hoverCSS" setting is not false
    if (config.get('hoverCSS') !== false) {
        bodyEle.classList.add('enable-hover');
    }
    if (config.get('clickBlock')) {
        clickBlock.enable();
    }
    // run feature detection tests
    featureDetect.run(window, document);
}
/**
 * Bind some global events and publish on the 'app' channel
 */
function bindEvents(window, document, platform, events) {
    window.addEventListener('online', function (ev) {
        events.publish('app:online', ev);
    }, false);
    window.addEventListener('offline', function (ev) {
        events.publish('app:offline', ev);
    }, false);
    window.addEventListener('orientationchange', function (ev) {
        events.publish('app:rotated', ev);
    });
    // When that status taps, we respond
    window.addEventListener('statusTap', function (ev) {
        // TODO: Make this more better
        var el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
        if (!el) {
            return;
        }
        var content = dom_1.closest(el, 'scroll-content');
        if (content) {
            var scrollTo = new ScrollTo(content);
            scrollTo.start(0, 0, 300, 0);
        }
    });
    // start listening for resizes XXms after the app starts
    setTimeout(function () {
        window.addEventListener('resize', function () {
            platform.windowResize();
        });
    }, 2000);
}