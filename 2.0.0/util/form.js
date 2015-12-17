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
/**
 * The Input component is used to focus text input elements.
 *
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Name</ion-label>
 *   <input value="Name" type="text">
 * </ion-input>
 * ```
 */
var Form = (function () {
    function Form() {
        this._inputs = [];
        this._ids = -1;
        this._focused = null;
        this.focusCtrl(document);
    }
    Form.prototype.register = function (input) {
        this._inputs.push(input);
    };
    Form.prototype.deregister = function (input) {
        var index = this._inputs.indexOf(input);
        if (index > -1) {
            this._inputs.splice(index, 1);
        }
        if (input === this._focused) {
            this._focused = null;
        }
    };
    Form.prototype.focusCtrl = function (document) {
        // raw DOM fun
        var focusCtrl = document.createElement('focus-ctrl');
        focusCtrl.setAttribute('aria-hidden', true);
        this._blur = document.createElement('button');
        this._blur.tabIndex = -1;
        focusCtrl.appendChild(this._blur);
        document.body.appendChild(focusCtrl);
    };
    Form.prototype.focusOut = function () {
        console.debug('focusOut');
        document.activeElement && document.activeElement.blur();
        this._blur.focus();
    };
    Form.prototype.setAsFocused = function (input) {
        this._focused = input;
    };
    /**
     * Focuses the next input element, if it exists.
     */
    Form.prototype.focusNext = function (currentInput) {
        console.debug('focusNext');
        var index = this._inputs.indexOf(currentInput);
        if (index > -1 && (index + 1) < this._inputs.length) {
            var nextInput = this._inputs[index + 1];
            if (nextInput !== this._focused) {
                return nextInput.initFocus();
            }
        }
        index = this._inputs.indexOf(this._focused);
        if (index > 0) {
            var previousInput = this._inputs[index - 1];
            if (previousInput) {
                previousInput.initFocus();
            }
        }
    };
    Form.prototype.nextId = function () {
        return ++this._ids;
    };
    Form = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Form);
    return Form;
})();
exports.Form = Form;