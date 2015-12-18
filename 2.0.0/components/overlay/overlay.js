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
var core_1 = require('angular2/core');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var keyboard_1 = require('../../util/keyboard');
var overlay_controller_1 = require('./overlay-controller');
var nav_controller_1 = require('../nav/nav-controller');
/**
 * @private
 */
var OverlayNav = (function (_super) {
    __extends(OverlayNav, _super);
    function OverlayNav(overlayCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
        _super.call(this, null, app, config, keyboard, elementRef, null, compiler, viewManager, zone, renderer, cd);
        if (overlayCtrl.anchor) {
            throw ('An app should only have one <ion-overlay></ion-overlay>');
        }
        this.initZIndex = 1000;
        overlayCtrl.nav = this;
    }
    OverlayNav = __decorate([
        core_1.Component({
            selector: 'ion-overlay',
            template: ''
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _d) || Object, (typeof (_e = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof core_1.Compiler !== 'undefined' && core_1.Compiler) === 'function' && _f) || Object, (typeof (_g = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _h) || Object, (typeof (_j = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _j) || Object, (typeof (_k = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _k) || Object])
    ], OverlayNav);
    return OverlayNav;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
})(nav_controller_1.NavController);
exports.OverlayNav = OverlayNav;