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
var ion_1 = require('../ion');
var config_1 = require('../../config/config');
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places were you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * @usage
 * ```html
 * <ion-scroll scroll-x="true">
 * </ion-scroll>
 *
 * <ion-scroll scroll-y="true">
 * </ion-scroll>
 *
 * <ion-scroll scroll-x="true" scroll-y="true">
 * </ion-scroll>
 * ```
 *@property {boolean} [scroll-x] - whether to enable scrolling along the X axis
 *@property {boolean} [scroll-y] - whether to enable scrolling along the Y axis
 *@property {boolean} [zoom] - whether to enable zooming
 *@property {number} [max-zoom] - set the max zoom amount for ion-scroll
 * @demo /docs/v2/demos/scroll/
 */
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(elementRef, Config) {
        _super.call(this, elementRef, Config);
        this.maxScale = 3;
        this.zoomDuration = 250;
    }
    /**
     * @private
     */
    Scroll.prototype.ngOnInit = function () {
        this.scrollElement = this.getNativeElement().children[0];
    };
    /**
     * Add a scroll event handler to the scroll element if it exists.
     * @param {Function} handler  The scroll handler to add to the scroll element.
     * @returns {?Function} a function to remove the specified handler, otherwise
     * undefined if the scroll element doesn't exist.
     */
    Scroll.prototype.addScrollEventListener = function (handler) {
        var _this = this;
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return function () {
            _this.scrollElement.removeEventListener('scroll', handler);
        };
    };
    Scroll = __decorate([
        core_1.Component({
            selector: 'ion-scroll',
            inputs: [
                'scrollX', 'scrollY', 'zoom', 'maxZoom'
            ],
            host: {
                '[class.scroll-x]': 'scrollX',
                '[class.scroll-y]': 'scrollY'
            },
            template: '<scroll-content>' +
                '<div class="scroll-zoom-wrapper">' +
                '<ng-content></ng-content>' +
                '</div>' +
                '</scroll-content>'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
    ], Scroll);
    return Scroll;
    var _a, _b;
})(ion_1.Ion);
exports.Scroll = Scroll;