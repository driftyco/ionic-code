var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var platform_1 = require('../../platform/platform');
/**
 * @private
 */
var DisplayWhen = (function () {
    function DisplayWhen(conditions, platform, ngZone) {
        var _this = this;
        this.isMatch = false;
        this.platform = platform;
        if (!conditions)
            return;
        this.conditions = conditions.split(',');
        // check if its one of the matching platforms first
        // a platform does not change during the life of an app
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] && platform.is(this.conditions[i])) {
                this.isMatch = true;
                return;
            }
        }
        if (this.orientation()) {
            // add window resize listener
            platform.onResize(function () {
                ngZone.run(function () {
                    _this.orientation();
                });
            });
            return;
        }
    }
    DisplayWhen.prototype.orientation = function () {
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] == 'portrait') {
                this.isMatch = this.platform.isPortrait();
                return true;
            }
            if (this.conditions[i] == 'landscape') {
                this.isMatch = this.platform.isLandscape();
                return true;
            }
        }
    };
    return DisplayWhen;
})();
exports.DisplayWhen = DisplayWhen;
/**
 *
 * The `showWhen` attribute takes a string that represents a plaform or screen orientation.
 * The element the attribute is added to will only be shown when that platform or screen orientation is active.
 * Complements the [hideWhen attribute](../HideWhen).
 * @usage
 * ```html
 * <div showWhen="ios">I am only visible on iOS!</div>
 * ```
 * @demo /docs/v2/demos/show-when/
 * @see {@link ../HideWhen HideWhen API Docs}
 */
var ShowWhen = (function (_super) {
    __extends(ShowWhen, _super);
    function ShowWhen(showWhen, platform, ngZone) {
        _super.call(this, showWhen, platform, ngZone);
    }
    Object.defineProperty(ShowWhen.prototype, "hidden", {
        /**
         * @private
         */
        get: function () {
            return !this.isMatch;
        },
        enumerable: true,
        configurable: true
    });
    ShowWhen = __decorate([
        core_1.Directive({
            selector: '[showWhen]',
            host: {
                '[hidden]': 'hidden'
            }
        }),
        __param(0, core_1.Attribute('showWhen')), 
        __metadata('design:paramtypes', [String, (typeof (_a = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object])
    ], ShowWhen);
    return ShowWhen;
    var _a, _b;
})(DisplayWhen);
exports.ShowWhen = ShowWhen;
/**
 *
 * The `hideWhen` attribute takes a string that represents a plaform or screen orientation.
 * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
 * Complements the [showWhen attribute](../ShowWhen).
 * @usage
 * ```html
 * <div hideWhen="android">I am hidden on Android!</div>
 * ```
 * @demo /docs/v2/demos/hide-when/
 * @see {@link ../ShowWhen ShowWhen API Docs}
 */
var HideWhen = (function (_super) {
    __extends(HideWhen, _super);
    function HideWhen(hideWhen, platform, ngZone) {
        _super.call(this, hideWhen, platform, ngZone);
    }
    Object.defineProperty(HideWhen.prototype, "hidden", {
        /**
         * @private
         */
        get: function () {
            return this.isMatch;
        },
        enumerable: true,
        configurable: true
    });
    HideWhen = __decorate([
        core_1.Directive({
            selector: '[hideWhen]',
            host: {
                '[hidden]': 'hidden'
            }
        }),
        __param(0, core_1.Attribute('hideWhen')), 
        __metadata('design:paramtypes', [String, (typeof (_a = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object])
    ], HideWhen);
    return HideWhen;
    var _a, _b;
})(DisplayWhen);
exports.HideWhen = HideWhen;