var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var ion_1 = require('../ion');
var navbar_1 = require('../navbar/navbar');
var button_1 = require('../button/button');
/**
 * @private
 */
var ToolbarBase = (function (_super) {
    __extends(ToolbarBase, _super);
    function ToolbarBase(elementRef) {
        _super.call(this, elementRef);
        this.itemRefs = [];
        this.titleRef = null;
    }
    /**
     * @private
     */
    ToolbarBase.prototype.setTitleCmp = function (titleCmp) {
        this.titleCmp = titleCmp;
    };
    /**
     * @private
     * Returns the toolbar title text if it exists or an empty string
     */
    ToolbarBase.prototype.getTitleText = function () {
        return (this.titleCmp && this.titleCmp.getTitleText()) || '';
    };
    /**
     * @private
     */
    ToolbarBase.prototype.getTitleRef = function () {
        return this.titleCmp && this.titleCmp.elementRef;
    };
    /**
     * @private
     * A toolbar items include the left and right side `ion-buttons`,
     * and every `menu-toggle`. It does not include the `ion-title`.
     * @returns {TODO} Array of this toolbar's item ElementRefs.
     */
    ToolbarBase.prototype.getItemRefs = function () {
        return this.itemRefs;
    };
    /**
     * @private
     */
    ToolbarBase.prototype.addItemRef = function (itemElementRef) {
        this.itemRefs.push(itemElementRef);
    };
    return ToolbarBase;
})(ion_1.Ion);
exports.ToolbarBase = ToolbarBase;
/**
 * @name Toolbar
 * @description
 * The toolbar is generic bar that sits above or below content.
 * Unlike an `Navbar`, `Toolbar` can be used for a subheader as well.
 * Since it's based on flexbox, you can place the toolbar where you
 * need it and flexbox will handle everything else. Toolbars will automatically
 * assume they should be placed before an `ion-content`, so to specify that you want it
 * below, you can add the property `placement="bottom"`. This will change the flex order
 * property.
 *
 * @usage
 * ```html
 * <ion-toolbar>
 *   <ion-title>My Toolbar Title</ion-title>
 * </ion-toolbar>
 *
 * <ion-toolbar>
 *   <ion-title>I'm a subheader</ion-title>
 * </ion-toolbar>
 *
 *  <ion-content></ion-content>
 *
 * <ion-toolbar position="bottom>
 *   <ion-title>I'm a subfooter</ion-title>
 * </ion-toolbar>
 *
 * <ion-toolbar position="bottom>
 *   <ion-title>I'm a footer</ion-title>
 * </ion-toolbar>
 *
 *  ```
 *
 * @property {any} [placement] - set position of the toolbar, top or bottom
 * @demo /docs/v2/demos/toolbar/
 * @see {@link ../../navbar/Navbar/ Navbar API Docs}
 */
var Toolbar = (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(elementRef) {
        _super.call(this, elementRef);
    }
    Toolbar = __decorate([
        core_1.Component({
            selector: 'ion-toolbar',
            template: '<div class="toolbar-background"></div>' +
                '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
                '<ng-content select="ion-buttons[start]"></ng-content>' +
                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
                '<div class="toolbar-content">' +
                '<ng-content></ng-content>' +
                '</div>',
            host: {
                'class': 'toolbar'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Toolbar);
    return Toolbar;
})(ToolbarBase);
exports.Toolbar = Toolbar;
/**
 * @name Title
 * @description
 * `ion-title` is a component that sets the title of the `Toolbar` or `Navbar`
 * @usage
 * ```html
 * <ion-navbar *navbar>
 *    <ion-title>Tab 1</ion-title>
 * </ion-navbar>
 *
 *<!-- or if you wanted to create a subheader title-->
 * <ion-navbar *navbar>
 *    <ion-title>Tab 1</ion-title>
 * </ion-navbar>
 * <ion-toolbar>
 *   <ion-title>SubHeader</ion-title>
 * </ion-toolbar>
 *  ```
 * @demo /docs/v2/demos/toolbar/
 */
var ToolbarTitle = (function (_super) {
    __extends(ToolbarTitle, _super);
    function ToolbarTitle(elementRef, toolbar, navbar) {
        _super.call(this, elementRef);
        toolbar && toolbar.setTitleCmp(this);
        navbar && navbar.setTitleCmp(this);
    }
    /**
     * @private
     */
    ToolbarTitle.prototype.getTitleText = function () {
        return this.getNativeElement().textContent;
    };
    ToolbarTitle = __decorate([
        core_1.Component({
            selector: 'ion-title',
            template: '<div class="toolbar-title">' +
                '<ng-content></ng-content>' +
                '</div>'
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Toolbar, navbar_1.Navbar])
    ], ToolbarTitle);
    return ToolbarTitle;
})(ion_1.Ion);
exports.ToolbarTitle = ToolbarTitle;
/**
 * @private
 */
var ToolbarItem = (function () {
    function ToolbarItem(elementRef, toolbar, navbar) {
        toolbar && toolbar.addItemRef(elementRef);
        navbar && navbar.addItemRef(elementRef);
        this.inToolbar = !!(toolbar || navbar);
        // Deprecation warning
        if (elementRef.nativeElement.tagName === 'ION-NAV-ITEMS') {
            if (elementRef.nativeElement.hasAttribute('primary')) {
                void 0;
                elementRef.nativeElement.setAttribute('start', '');
            }
            else if (elementRef.nativeElement.hasAttribute('secondary')) {
                void 0;
                elementRef.nativeElement.setAttribute('end', '');
            }
            else {
                void 0;
            }
        }
    }
    Object.defineProperty(ToolbarItem.prototype, "_buttons", {
        set: function (buttons) {
            if (this.inToolbar) {
                button_1.Button.setRoles(buttons, 'bar-button');
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChildren(button_1.Button), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ToolbarItem.prototype, "_buttons", null);
    ToolbarItem = __decorate([
        core_1.Directive({
            selector: 'ion-buttons,[menuToggle],ion-nav-items'
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Toolbar, navbar_1.Navbar])
    ], ToolbarItem);
    return ToolbarItem;
})();
exports.ToolbarItem = ToolbarItem;
