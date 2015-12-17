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
var common_1 = require('angular2/common');
var config_1 = require('../../config/config');
var ion_1 = require('../ion');
var list_1 = require('../list/list');
var form_1 = require('../../util/form');
/**
 * A radio group is a group of radio components.
 *
 * Selecting a radio button in the group unselects all others in the group.
 *
 * New radios can be registered dynamically.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group ngControl="clientside">
 *
 *   <ion-list-header>
 *     Clientside
 *   </ion-list-header>
 *
 *   <ion-radio value="ember">
 *     Ember
 *   </ion-radio>
 *
 *   <ion-radio value="angular1">
 *     Angular 1
 *   </ion-radio>
 *
 *   <ion-radio value="angular2" checked="true">
 *     Angular 2
 *   </ion-radio>
 *
 *   <ion-radio value="react">
 *     React
 *   </ion-radio>
 *
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
*/
var RadioGroup = (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(elementRef, config, ngControl, headerQuery) {
        _super.call(this, elementRef, config);
        this.headerQuery = headerQuery;
        this.radios = [];
        this.ngControl = ngControl;
        this.id = ++radioGroupIds;
        this.radioIds = -1;
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        if (ngControl)
            this.ngControl.valueAccessor = this;
    }
    /**
     * @private
     */
    RadioGroup.prototype.ngOnInit = function () {
        var header = this.headerQuery.first;
        if (header) {
            if (!header.id) {
                header.id = 'radio-header-' + this.id;
            }
            this.describedById = header.id;
        }
    };
    /**
     * @private
     * Register the specified radio button with the radio group.
     * @param {RadioButton} radio  The radio button to register.
     */
    RadioGroup.prototype.registerRadio = function (radio) {
        radio.id = radio.id || ('radio-' + this.id + '-' + (++this.radioIds));
        this.radios.push(radio);
        if (this.value == radio.value) {
            radio.check(this.value);
        }
        if (radio.checked) {
            this.value = radio.value;
            this.onChange(this.value);
            this.activeId = radio.id;
        }
    };
    /**
     * @private
     * Update which radio button in the group is checked, unchecking all others.
     * @param {RadioButton} checkedRadio  The radio button to check.
     */
    RadioGroup.prototype.update = function (checkedRadio) {
        this.value = checkedRadio.value;
        this.activeId = checkedRadio.id;
        for (var _i = 0, _a = this.radios; _i < _a.length; _i++) {
            var radio = _a[_i];
            radio.checked = (radio === checkedRadio);
        }
        this.onChange(this.value);
    };
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    RadioGroup.prototype.writeValue = function (value) {
        this.value = value;
        for (var _i = 0, _a = this.radios; _i < _a.length; _i++) {
            var radio = _a[_i];
            radio.checked = (radio.value == value);
        }
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    RadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RadioGroup = __decorate([
        core_1.Directive({
            selector: '[radio-group]',
            host: {
                'role': 'radiogroup',
                '[attr.aria-activedescendant]': 'activeId',
                '[attr.aria-describedby]': 'describedById',
            }
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Query(list_1.ListHeader)), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object, (typeof (_d = typeof core_1.QueryList !== 'undefined' && core_1.QueryList) === 'function' && _d) || Object])
    ], RadioGroup);
    return RadioGroup;
    var _a, _b, _c, _d;
})(ion_1.Ion);
exports.RadioGroup = RadioGroup;
/**
 * @description
 * A single radio component.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-radio value="isChecked" checked="true">
 *   Radio Label
 * </ion-radio>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 */
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(group, elementRef, config, form) {
        _super.call(this, elementRef, config);
        this.form = form;
        this.group = group;
        this.tabIndex = 0;
    }
    /**
     * @private
     */
    RadioButton.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.id) {
            this.id = 'rb-' + this.form.nextId();
        }
        this.labelId = 'lbl-' + this.id;
        if (this.group) {
            this.group.registerRadio(this);
        }
        else {
            console.error('<ion-radio> must be within a <ion-list radio-group>');
        }
    };
    /**
     * @private
     */
    RadioButton.prototype.click = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.check();
    };
    /**
     * Update the checked state of this radio button.
     * TODO: Call this toggle? Since unchecks as well
     */
    RadioButton.prototype.check = function () {
        this.checked = !this.checked;
        this.group.update(this);
    };
    RadioButton = __decorate([
        core_1.Component({
            selector: 'ion-radio',
            inputs: [
                'value',
                'checked',
                'disabled',
                'id'
            ],
            host: {
                'role': 'radio',
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
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '<div class="radio-media">' +
                '<div class="radio-icon"></div>' +
                '</div>' +
                '</div>'
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [RadioGroup, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _c) || Object])
    ], RadioButton);
    return RadioButton;
    var _a, _b, _c;
})(ion_1.Ion);
exports.RadioButton = RadioButton;
var radioGroupIds = -1;