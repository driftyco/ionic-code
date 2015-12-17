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
var common_1 = require('angular2/common');
var nav_controller_1 = require('../nav/nav-controller');
var config_1 = require('../../config/config');
var form_1 = require('../../util/form');
var app_1 = require('../app/app');
var content_1 = require('../content/content');
var dom = require('../../util/dom');
var platform_1 = require('../../platform/platform');
/**
 * @name Input
 * @module ionic
 * @description
 * `ionInput` is a generic wrapper for both inputs and textareas. You can give `ion-input` to tell it how to handle a chile `ion-label` component
 * @property [fixed-labels] - a persistant label that sits next the the input
 * @property [floating-labels] - a label that will float about the input if the input is empty of looses focus
 * @property [stacked-labels] - A stacked label will always appear on top of the input
 * @usage
 * ```html
 *  <ion-input>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input>
 *    <input type="text" placeholder="Username">
 *  </ion-input>
 *
 *  <ion-input fixed-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input floating-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 * ```
 *
 */
var TextInput = (function () {
    function TextInput(form, elementRef, config, renderer, app, platform, scrollView, navCtrl, isFloating, isStacked, isFixed, isInset) {
        this.renderer = renderer;
        this.form = form;
        form.register(this);
        this.type = 'text';
        this.lastTouch = 0;
        // make more gud with pending @Attributes API
        this.displayType = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
        this.app = app;
        this.elementRef = elementRef;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.scrollView = scrollView;
        this.scrollAssist = config.get('scrollAssist');
        this.keyboardHeight = config.get('keyboardHeight');
    }
    /**
     * @private
     * This function is used to add the Angular css classes associated with inputs in forms
     */
    TextInput.prototype.addNgClass = function (className) {
        this.input && this.input.elementRef.nativeElement.classList.contains(className);
    };
    /**
     * @private
     */
    TextInput.prototype.registerInput = function (textInputElement) {
        if (this.displayType) {
            textInputElement.addClass(this.displayType + '-input');
        }
        this.input = textInputElement;
        this.type = textInputElement.type || 'text';
    };
    /**
     * @private
     */
    TextInput.prototype.registerLabel = function (label) {
        if (this.displayType) {
            label.addClass(this.displayType + '-label');
        }
        this.label = label;
    };
    /**
     * @private
     */
    TextInput.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.input && this.label) {
            // if there is an input and an label
            // then give the label an ID
            // and tell the input the ID of who it's labelled by
            this.input.labelledBy(this.label.id);
        }
        var self = this;
        self.scrollMove = function (ev) {
            if (!(_this.navCtrl && _this.navCtrl.isTransitioning())) {
                self.deregMove();
                if (self.hasFocus) {
                    self.input.hideFocus(true);
                    _this.scrollView.onScrollEnd(function () {
                        self.input.hideFocus(false);
                        if (self.hasFocus) {
                            self.regMove();
                        }
                    });
                }
            }
        };
    };
    /**
     * @private
     */
    TextInput.prototype.pointerStart = function (ev) {
        if (this.scrollAssist && this.app.isEnabled()) {
            // remember where the touchstart/mousedown started
            this.startCoord = dom.pointerCoord(ev);
        }
    };
    /**
     * @private
     */
    TextInput.prototype.pointerEnd = function (ev) {
        if (!this.app.isEnabled()) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (this.scrollAssist && ev.type === 'touchend') {
            // get where the touchend/mouseup ended
            var endCoord = dom.pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            // and the input doesn't already have focus
            if (!dom.hasPointerMoved(8, this.startCoord, endCoord) && !this.hasFocus) {
                ev.preventDefault();
                ev.stopPropagation();
                this.initFocus();
                // temporarily prevent mouseup's from focusing
                this.lastTouch = Date.now();
            }
        }
        else if (this.lastTouch + 999 < Date.now()) {
            ev.preventDefault();
            ev.stopPropagation();
            this.setFocus();
            this.regMove();
        }
    };
    /**
     * @private
     */
    TextInput.prototype.initFocus = function () {
        // begin the process of setting focus to the inner input element
        var _this = this;
        var scrollView = this.scrollView;
        if (scrollView && this.scrollAssist) {
            // this input is inside of a scroll view
            // find out if text input should be manually scrolled into view
            var ele = this.elementRef.nativeElement;
            var scrollData = TextInput.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getDimensions(), this.keyboardHeight, this.platform.height());
            if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
                // the text input is in a safe position that doesn't require
                // it to be scrolled into view, just set focus now
                this.setFocus();
                this.regMove();
                return;
            }
            // add padding to the bottom of the scroll view (if needed)
            scrollView.addScrollPadding(scrollData.scrollPadding);
            // manually scroll the text input to the top
            // do not allow any clicks while it's scrolling
            var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
            this.app.setEnabled(false, scrollDuration);
            this.navCtrl && this.navCtrl.setTransitioning(true, scrollDuration);
            // temporarily move the focus to the focus holder so the browser
            // doesn't freak out while it's trying to get the input in place
            // at this point the native text input still does not have focus
            this.input.relocate(true, scrollData.inputSafeY);
            // scroll the input into place
            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
                // the scroll view is in the correct position now
                // give the native text input focus
                _this.input.relocate(false);
                // all good, allow clicks again
                _this.app.setEnabled(true);
                _this.navCtrl && _this.navCtrl.setTransitioning(false);
                _this.regMove();
            });
        }
        else {
            // not inside of a scroll view, just focus it
            this.setFocus();
            this.regMove();
        }
    };
    /**
     * @private
     * @param {TODO} inputOffsetTop  TODO
     * @param {TODO} inputOffsetHeight  TODO
     * @param {TODO} scrollViewDimensions  TODO
     * @param {TODO} keyboardHeight  TODO
     * @returns {TODO} TODO
     */
    TextInput.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        // compute input's Y values relative to the body
        var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        var inputBottom = (inputTop + inputOffsetHeight);
        // compute the safe area which is the viewable content area when the soft keyboard is up
        var safeAreaTop = scrollViewDimensions.contentTop;
        var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
        safeAreaHeight /= 2;
        var safeAreaBottom = safeAreaTop + safeAreaHeight;
        var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        var inputTopAboveSafeArea = (inputTop < safeAreaTop);
        var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        /*
        Text Input Scroll To Scenarios
        ---------------------------------------
        1) Input top within safe area, bottom within safe area
        2) Input top within safe area, bottom below safe area, room to scroll
        3) Input top above safe area, bottom within safe area, room to scroll
        4) Input top below safe area, no room to scroll, input smaller than safe area
        5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
        6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
        7) Input top below safe area, no room to scroll, input larger than safe area
        */
        var scrollData = {
            scrollAmount: 0,
            scrollTo: 0,
            scrollPadding: 0,
            inputSafeY: 0
        };
        if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
            // Input top within safe area, bottom within safe area
            // no need to scroll to a position, it's good as-is
            return scrollData;
        }
        // looks like we'll have to do some auto-scrolling
        if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
            // Input top and bottom below safe area
            // auto scroll the input up so at least the top of it shows
            if (safeAreaHeight > inputOffsetHeight) {
                // safe area height is taller than the input height, so we
                // can bring it up the input just enough to show the input bottom
                scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
            }
            else {
                // safe area height is smaller than the input height, so we can
                // only scroll it up so the input top is at the top of the safe area
                // however the input bottom will be below the safe area
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            }
            scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
        }
        else if (inputTopAboveSafeArea) {
            // Input top above safe area
            // auto scroll the input down so at least the top of it shows
            scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            scrollData.inputSafeY = (safeAreaTop - inputTop) + 4;
        }
        // figure out where it should scroll to for the best position to the input
        scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
        if (scrollData.scrollAmount < 0) {
            // when auto-scrolling up, there also needs to be enough
            // content padding at the bottom of the scroll view
            // manually add it if there isn't enough scrollable area
            // figure out how many scrollable area is left to scroll up
            var availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
            var paddingSpace = availablePadding + scrollData.scrollAmount;
            if (paddingSpace < 0) {
                // there's not enough scrollable area at the bottom, so manually add more
                scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
            }
        }
        // if (!window.safeAreaEle) {
        //   window.safeAreaEle = document.createElement('div');
        //   window.safeAreaEle.style.position = 'absolute';
        //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.7)';
        //   window.safeAreaEle.style.padding = '2px 5px';
        //   window.safeAreaEle.style.textShadow = '1px 1px white';
        //   window.safeAreaEle.style.left = '0px';
        //   window.safeAreaEle.style.right = '0px';
        //   window.safeAreaEle.style.fontWeight = 'bold';
        //   window.safeAreaEle.style.pointerEvents = 'none';
        //   document.body.appendChild(window.safeAreaEle);
        // }
        // window.safeAreaEle.style.top = safeAreaTop + 'px';
        // window.safeAreaEle.style.height = safeAreaHeight + 'px';
        // window.safeAreaEle.innerHTML = `
        //   <div>scrollTo: ${scrollData.scrollTo}</div>
        //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
        //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
        //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
        //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
        //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
        //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
        // `;
        return scrollData;
    };
    /**
     * @private
     */
    TextInput.prototype.focusChange = function (hasFocus) {
        this.renderer.setElementClass(this.elementRef, 'input-focused', hasFocus);
        if (!hasFocus) {
            this.deregMove();
            this.input.hideFocus(false);
        }
    };
    /**
     * @private
     */
    TextInput.prototype.hasValue = function (inputValue) {
        this.renderer.setElementClass(this.elementRef, 'input-has-value', inputValue && inputValue !== '');
    };
    /**
     * @private
     */
    TextInput.prototype.setFocus = function () {
        if (this.input) {
            this.form.setAsFocused(this);
            // set focus on the actual input element
            this.input.setFocus();
            // ensure the body hasn't scrolled down
            document.body.scrollTop = 0;
        }
    };
    /**
     * @private
     */
    TextInput.prototype.regMove = function () {
        var _this = this;
        if (this.scrollAssist && this.scrollView) {
            setTimeout(function () {
                _this.deregMove();
                _this.deregScroll = _this.scrollView.addScrollEventListener(_this.scrollMove);
            }, 80);
        }
    };
    /**
     * @private
     */
    TextInput.prototype.deregMove = function () {
        this.deregScroll && this.deregScroll();
    };
    Object.defineProperty(TextInput.prototype, "hasFocus", {
        /**
         * @private
         */
        get: function () {
            return !!this.input && this.input.hasFocus;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TextInput.prototype.ngOnDestroy = function () {
        this.deregMove();
        this.form.deregister(this);
    };
    TextInput = __decorate([
        core_1.Component({
            selector: 'ion-input',
            host: {
                '(touchstart)': 'pointerStart($event)',
                '(touchend)': 'pointerEnd($event)',
                '(mouseup)': 'pointerEnd($event)',
                'class': 'item',
                '[class.ng-untouched]': 'addNgClass("ng-untouched")',
                '[class.ng-touched]': 'addNgClass("ng-touched")',
                '[class.ng-pristine]': 'addNgClass("ng-pristine")',
                '[class.ng-dirty]': 'addNgClass("ng-dirty")',
                '[class.ng-valid]': 'addNgClass("ng-valid")',
                '[class.ng-invalid]': 'addNgClass("ng-invalid")'
            },
            template: '<div class="item-inner">' +
                '<ng-content></ng-content>' +
                '<input [type]="type" aria-hidden="true" scroll-assist *ngIf="scrollAssist">' +
                '</div>',
            directives: [common_1.NgIf, core_1.forwardRef(function () { return InputScrollAssist; })]
        }),
        __param(6, core_1.Optional()),
        __param(6, core_1.Host()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Attribute('floating-label')),
        __param(9, core_1.Attribute('stacked-label')),
        __param(10, core_1.Attribute('fixed-label')),
        __param(11, core_1.Attribute('inset')), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object, (typeof (_e = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _e) || Object, (typeof (_f = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _f) || Object, (typeof (_g = typeof content_1.Content !== 'undefined' && content_1.Content) === 'function' && _g) || Object, (typeof (_h = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _h) || Object, String, String, String, String])
    ], TextInput);
    return TextInput;
    var _a, _b, _c, _d, _e, _f, _g, _h;
})();
exports.TextInput = TextInput;
/**
 * @private
 */
var TextInputElement = (function () {
    function TextInputElement(type, elementRef, renderer, wrapper, ngControl) {
        this.type = type;
        this.elementRef = elementRef;
        this.wrapper = wrapper;
        this.renderer = renderer;
        // all text inputs (textarea, input[type=text],input[type=password], etc)
        renderer.setElementClass(elementRef, 'text-input', true);
        if (wrapper) {
            // it's within ionic's ion-input, let ion-input handle what's up
            renderer.setElementClass(elementRef, 'item-input', true);
            wrapper.registerInput(this);
        }
        if (ngControl)
            this.ngControl = ngControl;
    }
    TextInputElement.prototype.ngOnInit = function () {
        if (this.ngControl)
            this.value = this.ngControl.value;
        this.wrapper && this.wrapper.hasValue(this.value);
    };
    TextInputElement.prototype.focusChange = function (changed) {
        this.wrapper && this.wrapper.focusChange(changed);
    };
    TextInputElement.prototype.onKeyup = function (ev) {
        this.wrapper && this.wrapper.hasValue(ev.target.value);
    };
    TextInputElement.prototype.labelledBy = function (val) {
        this.renderer.setElementAttribute(this.elementRef, 'aria-labelledby', val);
    };
    TextInputElement.prototype.setFocus = function () {
        this.getNativeElement().focus();
    };
    TextInputElement.prototype.relocate = function (shouldRelocate, inputRelativeY) {
        if (this._relocated !== shouldRelocate) {
            var focusedInputEle = this.getNativeElement();
            if (shouldRelocate) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-input');
                focusedInputEle.classList.add('hide-focused-input');
                focusedInputEle.style[dom.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                this.wrapper.setFocus();
            }
            else {
                focusedInputEle.classList.remove('hide-focused-input');
                focusedInputEle.style[dom.CSS.transform] = '';
                var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-input');
                if (clonedInputEle) {
                    clonedInputEle.parentNode.removeChild(clonedInputEle);
                }
            }
            this._relocated = shouldRelocate;
        }
    };
    TextInputElement.prototype.hideFocus = function (shouldHideFocus) {
        var focusedInputEle = this.getNativeElement();
        if (shouldHideFocus) {
            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-hidden');
            focusedInputEle.classList.add('hide-focused-input');
            focusedInputEle.style[dom.CSS.transform] = 'translate3d(-9999px,0,0)';
            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
        }
        else {
            focusedInputEle.classList.remove('hide-focused-input');
            focusedInputEle.style[dom.CSS.transform] = '';
            var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-hidden');
            if (clonedInputEle) {
                clonedInputEle.parentNode.removeChild(clonedInputEle);
            }
        }
    };
    Object.defineProperty(TextInputElement.prototype, "hasFocus", {
        get: function () {
            return dom.hasFocus(this.getNativeElement());
        },
        enumerable: true,
        configurable: true
    });
    TextInputElement.prototype.addClass = function (className) {
        this.renderer.setElementClass(this.elementRef, className, true);
    };
    TextInputElement.prototype.getNativeElement = function () {
        return this.elementRef.nativeElement;
    };
    TextInputElement = __decorate([
        core_1.Directive({
            selector: 'textarea,input[type=text],input[type=password],input[type=number],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=date],input[type=datetime],input[type=datetime-local],input[type=week],input[type=time]',
            inputs: ['value'],
            host: {
                '(focus)': 'focusChange(true)',
                '(blur)': 'focusChange(false)',
                '(keyup)': 'onKeyup($event)'
            }
        }),
        __param(0, core_1.Attribute('type')),
        __param(3, core_1.Optional()),
        __param(4, core_1.Optional()), 
        __metadata('design:paramtypes', [String, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object, TextInput, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object])
    ], TextInputElement);
    return TextInputElement;
    var _a, _b, _c;
})();
exports.TextInputElement = TextInputElement;
/**
 * @private
 */
var InputScrollAssist = (function () {
    function InputScrollAssist(form, textInput) {
        this.form = form;
        this.textInput = textInput;
    }
    InputScrollAssist.prototype.receivedFocus = function (ev) {
        this.form.focusNext(this.textInput);
    };
    InputScrollAssist = __decorate([
        core_1.Directive({
            selector: '[scroll-assist]',
            host: {
                '(focus)': 'receivedFocus($event)'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, TextInput])
    ], InputScrollAssist);
    return InputScrollAssist;
    var _a;
})();
function cloneInput(srcInput, addCssClass) {
    var clonedInputEle = srcInput.cloneNode(true);
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.classList.remove('hide-focused-input');
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    return clonedInputEle;
}
var SCROLL_ASSIST_SPEED = 0.4;
function getScrollAssistDuration(distanceToScroll) {
    //return 3000;
    distanceToScroll = Math.abs(distanceToScroll);
    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
    return Math.min(400, Math.max(100, duration));
}