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
var overlay_controller_1 = require('../overlay/overlay-controller');
var config_1 = require('../../config/config');
var animation_1 = require('../../animations/animation');
var util_1 = require('../../util');
/**
 * @name Modal
 * @description
 * The Modal is a content pane that can go over the user's current page.
 * Usually used for making a choice or editing an item. A modal can be opened
 * similar to how {@link /docs/v2/api/components/nav/NavController/#push NavController.push}  works,
 * where it is passed a Page component, along with optional Page params,
 * and options for presenting the modal.
 *
 * @usage
 * ```ts
 * class MyApp {
 *
 *  constructor(modal: Modal) {
 *    this.modal = modal;
 *  }
 *
 *  openContactModal() {
 *    this.modal.open(ContactUs);
 *  }
 *
 *  openProfileModal() {
 *    this.modal.open(Profile, { userId: 8675309 }, {
 *      enterAnimation: 'my-fade-in',
 *      leaveAnimation: 'my-fade-out',
 *      handle: 'profile-modal'
 *    });
 *  }
 *
 * }
 * ```
 * @demo /docs/v2/demos/modal/
 * @see {@link /docs/v2/components#modals Modal Component Docs}
 */
var Modal = (function () {
    function Modal(ctrl, config) {
        this.ctrl = ctrl;
        this.config = config;
    }
    /**
     * Opens a new modal using the page component is was pass as the first
     * argument. This is similar to how NavController's `push` method works.
     * Currently you must have `<ion-overlay>` in the `@App` component's template
     * for the modal to work correctly. (This is something that will
     * be hopefully be removed in the near future.)
     *
     * @param pageComponent  The Page component to load in the modal.
     * @param {Object} [params={}]  Optional data which can be passed to the page
     * component, which can be read from the constructor's `NavParams`.
     * @param {Object} [opts={}]  Additional options for this one modal instance of.
     * Options include `enterAnimation` and `leaveAnimation`, which
     * allows customization of which animation to use.
     * @returns {Promise} Returns a promise which resolves when the modal has
     * loaded and its entering animation has completed. The resolved promise's
     * value is the instance of the newly created modal.
     */
    Modal.prototype.open = function (pageComponent, params, opts) {
        if (params === void 0) { params = {}; }
        if (opts === void 0) { opts = {}; }
        opts = util_1.extend({
            pageType: OVERLAY_TYPE,
            enterAnimation: this.config.get('modalEnter'),
            leaveAnimation: this.config.get('modalLeave'),
        }, opts);
        return this.ctrl.open(pageComponent, params, opts);
    };
    /**
     * Get the instance of a modal. This is usually helpful to getting ahold of a
     * certain modal, from anywhere within the app, and closing it. By calling
     * just `get()` without a `handle` argument, it'll return the active modal
     * on top (it is possible to have multipe modals opened at the same time).
     * If getting just the active modal isn't enough, when creating
     * a modal, it's options can be given a `handle`, which is simply a string-based
     * name for the modal instance. You can later get a reference to that modal's
     * instance by calling this method with the same handle name.
     * @param  [handle]  Optional string name given in the modal's options when it was opened.
     * @returns Returns the instance of the modal if it is found, otherwise `null`.
     */
    Modal.prototype.get = function (handle) {
        if (handle) {
            return this.ctrl.getByHandle(handle);
        }
        return this.ctrl.getByType(OVERLAY_TYPE);
    };
    Modal = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
    ], Modal);
    return Modal;
    var _a, _b;
})();
exports.Modal = Modal;
var OVERLAY_TYPE = 'modal';
/**
 * Animations for modals
 */
var ModalSlideIn = (function (_super) {
    __extends(ModalSlideIn, _super);
    function ModalSlideIn(enteringView, leavingView, opts) {
        _super.call(this, enteringView.pageRef(), opts);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(400)
            .fromTo('translateY', '100%', '0%')
            .before.addClass('show-page');
    }
    return ModalSlideIn;
})(animation_1.Animation);
animation_1.Animation.register('modal-slide-in', ModalSlideIn);
var ModalSlideOut = (function (_super) {
    __extends(ModalSlideOut, _super);
    function ModalSlideOut(enteringView, leavingView, opts) {
        _super.call(this, leavingView.pageRef(), opts);
        this
            .easing('ease-out')
            .duration(250)
            .fromTo('translateY', '0%', '100%');
    }
    return ModalSlideOut;
})(animation_1.Animation);
animation_1.Animation.register('modal-slide-out', ModalSlideOut);
var ModalMDSlideIn = (function (_super) {
    __extends(ModalMDSlideIn, _super);
    function ModalMDSlideIn(enteringView, leavingView, opts) {
        _super.call(this, enteringView.pageRef(), opts);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(280)
            .fromTo('translateY', '40px', '0px')
            .fadeIn()
            .before.addClass('show-page');
    }
    return ModalMDSlideIn;
})(animation_1.Animation);
animation_1.Animation.register('modal-md-slide-in', ModalMDSlideIn);
var ModalMDSlideOut = (function (_super) {
    __extends(ModalMDSlideOut, _super);
    function ModalMDSlideOut(enteringView, leavingView, opts) {
        _super.call(this, leavingView.pageRef(), opts);
        this
            .duration(200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)')
            .fromTo('translateY', '0px', '40px')
            .fadeOut();
    }
    return ModalMDSlideOut;
})(animation_1.Animation);
animation_1.Animation.register('modal-md-slide-out', ModalMDSlideOut);