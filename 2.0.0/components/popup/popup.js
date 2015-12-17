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
var common_1 = require('angular2/common');
var overlay_controller_1 = require('../overlay/overlay-controller');
var config_1 = require('../../config/config');
var animation_1 = require('../../animations/animation');
var nav_controller_1 = require('../nav/nav-controller');
var button_1 = require('../button/button');
var util_1 = require('../../util/util');
/**
 * The Ionic Popup service allows the creation of popup windows that require the user to respond in order to continue.
 *
 * The popup service has support for more flexible versions of the built in `alert()`, `prompt()`, and `confirm()` functions that users are used to, in addition to allowing popups with completely custom content and look.
 *
 * @usage
 * ```ts
 * class myApp {
 *
 *   constructor(popup: Popup) {
 *     this.popup = popup;
 *   }
 *
 *   doAlert() {
 *     this.popup.alert({
 *       title: "New Friend!",
 *       template: "Your friend, Obi wan Kenobi, just accepted your friend request!",
 *       cssClass: 'my-alert'
 *     }).then(() => {
 *       console.log('Alert closed');
 *     });
 *   }
 *
 *   doPrompt() {
 *     this.popup.prompt({
 *       title: "New Album",
 *       template: "Enter a name for this new album you're so keen on adding",
 *       inputPlaceholder: "Title",
 *       okText: "Save",
 *       okType: "secondary"
 *     }).then((name) => {
 *       console.log('Name entered:', name);
 *     }, () => {
 *       console.error('Prompt closed');
 *     });
 *   }
 *
 *   doConfirm() {
 *     this.popup.confirm({
 *       title: "Use this lightsaber?",
 *       subTitle: "You can't exchange lightsabers",
 *       template: "Do you agree to use this lightsaber to do good across the intergalactic galaxy?",
 *       cancelText: "Disagree",
 *       okText: "Agree"
 *     }).then((result, ev) => {
 *       console.log('Confirmed!', result);
 *     }, () => {
 *       console.error('Not confirmed!');
 *     });
 *   }
 * }
 * ```
 * @demo /docs/v2/demos/popup/
 * @see {@link /docs/v2/components#popups Popup Component Docs}
 */
var Popup = (function () {
    function Popup(ctrl, config) {
        this.ctrl = ctrl;
        this.config = config;
    }
    /**
     * TODO
     * @param {TODO} opts  TODO
     * @returns {object} A promise
     */
    Popup.prototype.open = function (opts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            opts.promiseResolve = resolve;
            opts.promiseReject = reject;
            opts = util_1.extend({
                pageType: OVERLAY_TYPE,
                enterAnimation: _this.config.get('popupEnter'),
                leaveAnimation: _this.config.get('popupLeave')
            }, opts);
            return _this.ctrl.open(PopupCmp, opts, opts);
        });
    };
    /**
     * Show a simple alert popup with a message and one button
     * that the user can tap to close the popup.
     *
     * @param {object} opts The options for showing the alert, of the form:
     *
     * ```
     * {
     *   title: '', // String. The title of the popup.
     *   cssClass: '', // String (optional). The custom CSS class name.
     *   subTitle: '', // String (optional). The sub-title of the popup.
     *   template: '', // String (optional). The html template to place in the popup body.
     *   okText: '', // String (default: 'OK'). The text of the OK button.
     *   okType: '', // String (default: ''). The type of the OK button.
     * }
     * ```
     *
     * @returns {object} A promise which is resolved when the popup is closed.
     */
    Popup.prototype.alert = function (opts) {
        if (opts === void 0) { opts = {}; }
        if (typeof opts === 'string') {
            opts = {
                title: opts
            };
        }
        var button = {
            text: opts.okText || 'OK',
            type: opts.okType || '',
            onTap: function (event, popupRef) {
                // Allow it to close
                //resolve();
            }
        };
        opts = util_1.extend({
            showPrompt: false,
            cancel: function () {
                //reject();
            },
            buttons: [
                button
            ]
        }, opts);
        return this.open(opts);
    };
    /**
     * Show a simple confirm popup with a message, Cancel and OK button.
     *
     * Resolves the promise with true if the user presses the OK button, and false if the user presses the Cancel button.
     *
     * @param {object} opts The options for showing the confirm, of the form:
     *
     * ```
     * {
     *   title: '', // String. The title of the popup.
     *   cssClass: '', // String (optional). The custom CSS class name.
     *   subTitle: '', // String (optional). The sub-title of the popup.
     *   template: '', // String (optional). The html template to place in the popup body.
     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
     *   cancelType: '', // String (default: ''). The type of the Cancel button.
     *   okText: '', // String (default: 'OK'). The text of the OK button.
     *   okType: '', // String (default: ''). The type of the OK button.
     * }
     * ```
     *
     * @returns {object} A promise which is resolved when the popup is closed.
     */
    Popup.prototype.confirm = function (opts) {
        if (opts === void 0) { opts = {}; }
        if (typeof opts === 'string') {
            opts = {
                title: opts
            };
        }
        var okButton = {
            text: opts.okText || 'OK',
            type: opts.okType || '',
            onTap: function (event, popupRef) {
                // Allow it to close
            }
        };
        var cancelButton = {
            text: opts.cancelText || 'Cancel',
            type: opts.cancelType || '',
            isCancel: true,
            onTap: function (event, popupRef) {
                // Allow it to close
            }
        };
        opts = util_1.extend({
            showPrompt: false,
            cancel: function () {
            },
            buttons: [
                cancelButton, okButton
            ]
        }, opts);
        return this.open(opts);
    };
    /**
     * Show a simple prompt popup with a message, input, Cancel and OK button.
     *
     * Resolves the promise with the value of the input if the user presses OK, and with undefined if the user presses Cancel.
     *
     * @param {object} opts The options for showing the prompt, of the form:
     *
     * ```
     * {
     *   title: '', // String. The title of the popup.
     *   cssClass: '', // String (optional). The custom CSS class name.
     *   subTitle: '', // String (optional). The sub-title of the popup.
     *   template: '', // String (optional). The html template to place in the popup body.
     *   inputType: // String (default: 'text'). The type of input to use.
     *   inputPlaceholder: // String (default: ''). A placeholder to use for the input.
     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
     *   cancelType: '', // String (default: ''). The type of the Cancel button.
     *   okText: '', // String (default: 'OK'). The text of the OK button.
     *   okType: '', // String (default: ''). The type of the OK button.
     * }
     * ```
     *
     * @returns {object} A promise which is resolved when the popup is closed.
     */
    Popup.prototype.prompt = function (opts) {
        if (opts === void 0) { opts = {}; }
        if (typeof opts === 'string') {
            opts = {
                title: opts
            };
        }
        var okButton = {
            text: opts.okText || 'OK',
            type: opts.okType || '',
            onTap: function (event, popupRef) {
                // Allow it to close
            }
        };
        var cancelButton = {
            text: opts.cancelText || 'Cancel',
            type: opts.cancelType || '',
            isCancel: true,
            onTap: function (event, popupRef) {
                // Allow it to close
            }
        };
        opts = util_1.extend({
            showPrompt: true,
            promptPlaceholder: '',
            cancel: function () {
            },
            buttons: [
                cancelButton, okButton
            ]
        }, opts);
        return this.open(opts);
    };
    /**
     * TODO
     * @param {TODO} handle  TODO
     * @returns {TODO} TODO
     */
    Popup.prototype.get = function (handle) {
        if (handle) {
            return this.ctrl.getByHandle(handle);
        }
        return this.ctrl.getByType(OVERLAY_TYPE);
    };
    Popup = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
    ], Popup);
    return Popup;
    var _a, _b;
})();
exports.Popup = Popup;
var OVERLAY_TYPE = 'popup';
// TODO add button type to button: [type]="button.type"
var PopupCmp = (function () {
    function PopupCmp(elementRef, params, renderer) {
        this.elementRef = elementRef;
        this.d = params.data;
        if (this.d.cssClass) {
            renderer.setElementClass(elementRef, this.d.cssClass, true);
        }
    }
    PopupCmp.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            // TODO: make more better, no DOM BS
            _this.promptInput = _this.elementRef.nativeElement.querySelector('input');
            if (_this.promptInput) {
                _this.promptInput.value = '';
            }
        });
    };
    PopupCmp.prototype.buttonTapped = function (button, ev) {
        var promptValue = this.promptInput && this.promptInput.value;
        var retVal = button.onTap && button.onTap(ev, this, {
            promptValue: promptValue
        });
        // If the event.preventDefault() wasn't called, close
        if (!ev.defaultPrevented) {
            // If this is a cancel button, reject the promise
            if (button.isCancel) {
                this.d.promiseReject();
            }
            else {
                // Resolve with the prompt value
                this.d.promiseResolve(promptValue);
            }
            return this.close();
        }
    };
    PopupCmp.prototype.cancel = function (ev) {
        this.d.cancel && this.d.cancel(event);
        if (!ev.defaultPrevented) {
            this.d.promiseReject();
            return this.close();
        }
    };
    PopupCmp = __decorate([
        core_1.Component({
            selector: 'ion-popup',
            template: '<div (click)="cancel($event)" tappable disable-activated class="backdrop"></div>' +
                '<div class="popup-wrapper">' +
                '<div class="popup-head">' +
                '<h2 class="popup-title" [innerHTML]="d.title" *ngIf="d.title"></h2>' +
                '<h3 class="popup-sub-title" [innerHTML]="d.subTitle" *ngIf="d.subTitle"></h3>' +
                '</div>' +
                '<div class="popup-body">' +
                '<div [innerHTML]="d.template" *ngIf="d.template"></div>' +
                '<input type="{{d.inputType || \'text\'}}" placeholder="{{d.inputPlaceholder}}" *ngIf="d.showPrompt" class="prompt-input">' +
                '</div>' +
                '<div class="popup-buttons" *ngIf="d.buttons.length">' +
                '<button clear *ngFor="#btn of d.buttons" (click)="buttonTapped(btn, $event)" [innerHTML]="btn.text" class="popup-button"></button>' +
                '</div>' +
                '</div>',
            host: {
                'role': 'dialog'
            },
            directives: [common_1.FORM_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.NgFor, button_1.Button]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof nav_controller_1.NavParams !== 'undefined' && nav_controller_1.NavParams) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
    ], PopupCmp);
    return PopupCmp;
    var _a, _b, _c;
})();
/**
 * Animations for popups
 */
var PopupPopIn = (function (_super) {
    __extends(PopupPopIn, _super);
    function PopupPopIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
        backdrop.fromTo('opacity', '0.01', '0.3');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return PopupPopIn;
})(animation_1.Animation);
animation_1.Animation.register('popup-pop-in', PopupPopIn);
var PopupPopOut = (function (_super) {
    __extends(PopupPopOut, _super);
    function PopupPopOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
        backdrop.fromTo('opacity', '0.3', '0');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return PopupPopOut;
})(animation_1.Animation);
animation_1.Animation.register('popup-pop-out', PopupPopOut);
var PopupMdPopIn = (function (_super) {
    __extends(PopupMdPopIn, _super);
    function PopupMdPopIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
        backdrop.fromTo('opacity', '0.01', '0.5');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return PopupMdPopIn;
})(animation_1.Animation);
animation_1.Animation.register('popup-md-pop-in', PopupMdPopIn);
var PopupMdPopOut = (function (_super) {
    __extends(PopupMdPopOut, _super);
    function PopupMdPopOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
        backdrop.fromTo('opacity', '0.5', '0');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return PopupMdPopOut;
})(animation_1.Animation);
animation_1.Animation.register('popup-md-pop-out', PopupMdPopOut);