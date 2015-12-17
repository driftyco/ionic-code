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
var form_1 = require('../../util/form');
/**
 * The checkbox is no different than the HTML checkbox input, except it's styled differently.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
 *
 * @property [checked] - whether or not the checkbox is checked (defaults to false)
 * @property [value] - the value of the checkbox component
 * @property [disabled] - whether or not the checkbox is disabled or not.
 *
 * @usage
 * ```html
 * <ion-checkbox checked="true" value="isChecked" ngControl="htmlCtrl">
 *   HTML5
 * </ion-checkbox>
 * ```
 * @demo /docs/v2/demos/checkbox/
 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
 */
var Checkbox = (function () {
    function Checkbox(form, ngControl, elementRef) {
        this.form = form;
        this.form = form;
        form.register(this);
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        this.ngControl = ngControl;
        if (ngControl)
            ngControl.valueAccessor = this;
    }
    /**
     * @private
     */
    Checkbox.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'chk-' + this.form.nextId();
        }
        this.labelId = 'lbl-' + this.id;
    };
    /**
     * @private
     * Toggle the checked state of the checkbox. Calls onChange to pass the updated checked state to the model (Control).
     */
    Checkbox.prototype.toggle = function () {
        this.checked = !this.checked;
        this.onChange(this.checked);
    };
    /**
     * @private
     * Click event handler to toggle the checkbox checked state.
     * @param {MouseEvent} ev  The click event.
     */
    Checkbox.prototype.click = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.toggle();
    };
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    Checkbox.prototype.writeValue = function (value) {
        this.checked = value;
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    Checkbox.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Checkbox.prototype.ngOnDestroy = function () {
        this.form.deregister(this);
    };
    Checkbox = __decorate([
        core_1.Component({
            selector: 'ion-checkbox',
            inputs: [
                'value',
                'checked',
                'disabled',
                'id'
            ],
            host: {
                'role': 'checkbox',
                'tappable': 'true',
                '[attr.id]': 'id',
                '[attr.tab-index]': 'tabIndex',
                '[attr.aria-checked]': 'checked',
                '[attr.aria-disabled]': 'disabled',
                '[attr.aria-labelledby]': 'labelId',
                '(click)': 'click($event)',
                'class': 'item'
            },
            template: '<div class="item-inner">' +
                '<div class="checkbox-media" disable-activated>' +
                '<div class="checkbox-icon"></div>' +
                '</div>' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '</div>'
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object])
    ], Checkbox);
    return Checkbox;
    var _a, _b, _c;
})();
exports.Checkbox = Checkbox;