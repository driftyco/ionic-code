/**
+* @ngdoc service
+* @name platform
+* @module ionic
+*/
var util_1 = require('../util/util');
var dom_1 = require('../util/dom');
/**
 * @name Platform
 * @description
 * Platform returns the availble information about your current platform.
 * @demo /docs/v2/demos/platform/
 */
var Platform = (function () {
    function Platform(platforms) {
        var _this = this;
        if (platforms === void 0) { platforms = []; }
        this._platforms = platforms;
        this._versions = {};
        this._onResizes = [];
        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
    }
    // Methods
    // **********************************************
    /**
     * @param {string} platformName
     * @returns {bool} returns true/false based on platform you place
     * @description
     * Depending on the platform name, isPlatform will return true or flase
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      if(this.platform.is('ios'){
     *        // what ever you need to do for
     *        // if the platfomr is ios
     *      }
     *    }
     * }
     * ```
     */
    Platform.prototype.is = function (platformName) {
        return (this._platforms.indexOf(platformName) > -1);
    };
    /**
     * @returns {array} the array of platforms
     * @description
     * Depending on what device you are on, `platforms` can return multiple values.
     * Each possible value is a hierarchy of platforms. For example, on an iPhone,
     * it would return mobile, ios, and iphone.
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.platforms());
     *      // This will return an array of all the availble platforms
     *      // From if your on mobile, to mobile os, and device name
     *    }
     * }
     * ```
     */
    Platform.prototype.platforms = function () {
        // get the array of active platforms, which also knows the hierarchy,
        // with the last one the most important
        return this._platforms;
    };
    /**
     * @param {string} optional platformName
     * @returns {object} An object with various platform info
     * - `{object=} `cordova`
     * - `{object=}` `platformOS` {str: "9.1", num: 9.1, major: 9, minor: 1}
     * - `{object=} `deviceName` Returns the name of the device
     * - `{object=}` `device platform` R
     * @description
     * Returns an object conta
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.versions());
     *      // or pass in a platform name
     *      console.log(this.platform.versions('ios'));
     *    }
     * }
     * ```
     *
     */
    Platform.prototype.versions = function (platformName) {
        if (arguments.length) {
            // get a specific platform's version
            return this._versions[platformName];
        }
        // get all the platforms that have a valid parsed version
        return this._versions;
    };
    Platform.prototype.version = function () {
        for (var platformName in this._versions) {
            if (this._versions[platformName]) {
                return this._versions[platformName];
            }
        }
        return {};
    };
    /**
     * @returns {promise}
     * @description
     * Returns a promise when the platform is ready and native functionality can be called
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      this.platform.ready().then(() => {
     *        console.log('Platform ready');
     *        // The platform is now ready, execute any native code you want
     *       });
     *    }
     * }
     * ```
     */
    Platform.prototype.ready = function () {
        return this._readyPromise;
    };
    /**
     * @private
     * TODO
     * @param {TODO} config  TODO
     * @returns {TODO} TODO
     */
    Platform.prototype.prepareReady = function (config) {
        var self = this;
        function resolve() {
            self._readyResolve(config);
        }
        if (this._engineReady) {
            // the engine provide a ready promise, use this instead
            this._engineReady(resolve);
        }
        else {
            // there is no custom ready method from the engine
            // use the default dom ready
            dom_1.ready(resolve);
        }
    };
    // Methods meant to be overridden by the engine
    // **********************************************
    // Provided NOOP methods so they do not error when
    // called by engines (the browser) doesn't provide them
    Platform.prototype.on = function () { };
    Platform.prototype.onHardwareBackButton = function () { };
    Platform.prototype.registerBackButtonAction = function () { };
    Platform.prototype.exitApp = function () { };
    Platform.prototype.fullScreen = function () { };
    Platform.prototype.showStatusBar = function () { };
    // Getter/Setter Methods
    // **********************************************
    Platform.prototype.url = function (val) {
        if (arguments.length) {
            this._url = val;
            this._qs = util_1.getQuerystring(val);
        }
        return this._url;
    };
    Platform.prototype.query = function (key) {
        return (this._qs || {})[key];
    };
    Platform.prototype.userAgent = function (val) {
        if (arguments.length) {
            this._ua = val;
        }
        return this._ua || '';
    };
    Platform.prototype.navigatorPlatform = function (val) {
        if (arguments.length) {
            this._bPlt = val;
        }
        return this._bPlt || '';
    };
    Platform.prototype.width = function () {
        return dom_1.windowDimensions().width;
    };
    Platform.prototype.height = function () {
        return dom_1.windowDimensions().height;
    };
    Platform.prototype.isPortrait = function () {
        return this.width() < this.height();
    };
    Platform.prototype.isLandscape = function () {
        return !this.isPortrait();
    };
    Platform.prototype.windowResize = function () {
        var self = this;
        clearTimeout(self._resizeTimer);
        self._resizeTimer = setTimeout(function () {
            dom_1.flushDimensionCache();
            for (var i = 0; i < self._onResizes.length; i++) {
                try {
                    self._onResizes[i]();
                }
                catch (e) {
                    console.error(e);
                }
            }
        }, 500);
    };
    Platform.prototype.onResize = function (cb) {
        this._onResizes.push(cb);
    };
    // Platform Registry
    // **********************************************
    /**
     * TODO
     * @param {TODO} platformConfig  TODO
     */
    Platform.register = function (platformConfig) {
        platformRegistry[platformConfig.name] = platformConfig;
    };
    Platform.registry = function () {
        return platformRegistry;
    };
    /**
     * TODO
     * @param {TODO} platformName  TODO
     * @returns {string} TODO
     */
    Platform.get = function (platformName) {
        return platformRegistry[platformName] || {};
    };
    Platform.setDefault = function (platformName) {
        platformDefault = platformName;
    };
    /**
     * TODO
     * @param {TODO} queryValue  TODO
     * @returns {boolean} TODO
     */
    Platform.prototype.testQuery = function (queryValue, queryTestValue) {
        var valueSplit = queryValue.toLowerCase().split(';');
        return valueSplit.indexOf(queryTestValue) > -1;
    };
    /**
     * TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {boolean} TODO
     */
    Platform.prototype.testUserAgent = function (userAgentExpression) {
        var rgx = new RegExp(userAgentExpression, 'i');
        return rgx.test(this._ua || '');
    };
    /**
     * TODO
     * @param {TODO} navigatorPlatformExpression  TODO
     * @returns {boolean} TODO
     */
    Platform.prototype.testNavigatorPlatform = function (navigatorPlatformExpression) {
        var rgx = new RegExp(navigatorPlatformExpression, 'i');
        return rgx.test(this._bPlt);
    };
    /**
     * TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {Object} TODO
     */
    Platform.prototype.matchUserAgentVersion = function (userAgentExpression) {
        if (this._ua && userAgentExpression) {
            var val = this._ua.match(userAgentExpression);
            if (val) {
                return {
                    major: val[1],
                    minor: val[2]
                };
            }
        }
    };
    /**
     * TODO
     * @param {TODO} queryValue  TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {boolean} TODO
     */
    Platform.prototype.isPlatform = function (queryTestValue, userAgentExpression) {
        if (!userAgentExpression) {
            userAgentExpression = queryTestValue;
        }
        var queryValue = this.query('ionicplatform');
        if (queryValue) {
            return this.testQuery(queryValue, queryTestValue);
        }
        return this.testUserAgent(userAgentExpression);
    };
    /**
     * TODO
     * @param {TODO} config  TODO
     */
    Platform.prototype.load = function (platformOverride) {
        var rootPlatformNode = null;
        var engineNode = null;
        var self = this;
        this.platformOverride = platformOverride;
        // figure out the most specific platform and active engine
        var tmpPlatform = null;
        for (var platformName in platformRegistry) {
            tmpPlatform = this.matchPlatform(platformName);
            if (tmpPlatform) {
                // we found a platform match!
                // check if its more specific than the one we already have
                if (tmpPlatform.isEngine) {
                    // because it matched then this should be the active engine
                    // you cannot have more than one active engine
                    engineNode = tmpPlatform;
                }
                else if (!rootPlatformNode || tmpPlatform.depth > rootPlatformNode.depth) {
                    // only find the root node for platforms that are not engines
                    // set this node as the root since we either don't already
                    // have one, or this one is more specific that the current one
                    rootPlatformNode = tmpPlatform;
                }
            }
        }
        if (!rootPlatformNode) {
            rootPlatformNode = new PlatformNode(platformDefault);
        }
        // build a Platform instance filled with the
        // hierarchy of active platforms and settings
        if (rootPlatformNode) {
            // check if we found an engine node (cordova/node-webkit/etc)
            if (engineNode) {
                // add the engine to the first in the platform hierarchy
                // the original rootPlatformNode now becomes a child
                // of the engineNode, which is not the new root
                engineNode.child(rootPlatformNode);
                rootPlatformNode.parent(engineNode);
                rootPlatformNode = engineNode;
                // add any events which the engine would provide
                // for example, Cordova provides its own ready event
                var engineMethods = engineNode.methods();
                engineMethods._engineReady = engineMethods.ready;
                delete engineMethods.ready;
                util_1.extend(this, engineMethods);
            }
            var platformNode = rootPlatformNode;
            while (platformNode) {
                insertSuperset(platformNode);
                platformNode = platformNode.child();
            }
            // make sure the root noot is actually the root
            // incase a node was inserted before the root
            platformNode = rootPlatformNode.parent();
            while (platformNode) {
                rootPlatformNode = platformNode;
                platformNode = platformNode.parent();
            }
            platformNode = rootPlatformNode;
            while (platformNode) {
                // set the array of active platforms with
                // the last one in the array the most important
                this._platforms.push(platformNode.name());
                // get the platforms version if a version parser was provided
                this._versions[platformNode.name()] = platformNode.version(this);
                // go to the next platform child
                platformNode = platformNode.child();
            }
        }
    };
    /**
     * TODO
     * @param {TODO} platformName  TODO
     * @returns {TODO} TODO
     */
    Platform.prototype.matchPlatform = function (platformName) {
        // build a PlatformNode and assign config data to it
        // use it's getRoot method to build up its hierarchy
        // depending on which platforms match
        var platformNode = new PlatformNode(platformName);
        var rootNode = platformNode.getRoot(this, 0);
        if (rootNode) {
            rootNode.depth = 0;
            var childPlatform = rootNode.child();
            while (childPlatform) {
                rootNode.depth++;
                childPlatform = childPlatform.child();
            }
        }
        return rootNode;
    };
    return Platform;
})();
exports.Platform = Platform;
function insertSuperset(platformNode) {
    var supersetPlaformName = platformNode.superset();
    if (supersetPlaformName) {
        // add a platform in between two exist platforms
        // so we can build the correct hierarchy of active platforms
        var supersetPlatform = new PlatformNode(supersetPlaformName);
        supersetPlatform.parent(platformNode.parent());
        supersetPlatform.child(platformNode);
        if (supersetPlatform.parent()) {
            supersetPlatform.parent().child(supersetPlatform);
        }
        platformNode.parent(supersetPlatform);
    }
}
var PlatformNode = (function () {
    function PlatformNode(platformName) {
        this.c = Platform.get(platformName);
        this.isEngine = this.c.isEngine;
    }
    PlatformNode.prototype.name = function () {
        return this.c.name;
    };
    PlatformNode.prototype.settings = function () {
        return this.c.settings || {};
    };
    PlatformNode.prototype.superset = function () {
        return this.c.superset;
    };
    PlatformNode.prototype.methods = function () {
        return this.c.methods || {};
    };
    PlatformNode.prototype.parent = function (val) {
        if (arguments.length) {
            this._parent = val;
        }
        return this._parent;
    };
    PlatformNode.prototype.child = function (val) {
        if (arguments.length) {
            this._child = val;
        }
        return this._child;
    };
    PlatformNode.prototype.isMatch = function (p) {
        if (p.platformOverride && !this.isEngine) {
            return (p.platformOverride === this.c.name);
        }
        else if (!this.c.isMatch) {
            return false;
        }
        return this.c.isMatch(p);
    };
    PlatformNode.prototype.version = function (p) {
        if (this.c.versionParser) {
            var v = this.c.versionParser(p);
            if (v) {
                var str = v.major + '.' + v.minor;
                return {
                    str: str,
                    num: parseFloat(str),
                    major: parseInt(v.major, 10),
                    minor: parseInt(v.minor, 10)
                };
            }
        }
    };
    PlatformNode.prototype.getRoot = function (p) {
        if (this.isMatch(p)) {
            var parents = this.getSubsetParents(this.name());
            if (!parents.length) {
                return this;
            }
            var platform = null;
            var rootPlatform = null;
            for (var i = 0; i < parents.length; i++) {
                platform = new PlatformNode(parents[i]);
                platform.child(this);
                rootPlatform = platform.getRoot(p);
                if (rootPlatform) {
                    this.parent(platform);
                    return rootPlatform;
                }
            }
        }
        return null;
    };
    PlatformNode.prototype.getSubsetParents = function (subsetPlatformName) {
        var platformRegistry = Platform.registry();
        var parentPlatformNames = [];
        var platform = null;
        for (var platformName in platformRegistry) {
            platform = platformRegistry[platformName];
            if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
                parentPlatformNames.push(platformName);
            }
        }
        return parentPlatformNames;
    };
    return PlatformNode;
})();
var platformRegistry = {};
var platformDefault = null;