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
var config_1 = require('../../config/config');
/**
  * @name Button
  * @module ionic
  * @property [outline] - for an unfilled outline button
  * @property [clear] - for a transparent button that only shows text and icons
  * @property [round] - for a button with rounded corners
  * @property [block] - for a block button that fills it's parent container
  * @property [full] - for a full width button
  * @property [small] - sets button size to small
  * @property [large] - sets button size to large
  * @property [disabled] - disables the button
  * @property [fab] - for a floating action button
  * @property [fab-left] - position a fab button to the left
  * @property [fab-right] - position a fab button to the right
  * @property [fab-center] - position a fab button towards the center
  * @property [fab-top] - position a fab button towards the top
  * @property [fab-bottom] - position a fab button towards the bottom
  * @description
  * Buttons are simple components in Ionic, can consist of text, an icon, or both, and can be enhanced with a wide range of attributes.
  * @demo /docs/v2/demos/buttons/
  * @see {@link /docs/v2/components#buttons Button Component Docs}

 */
var Button = (function () {
    function Button(config, elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._role = 'button'; // bar-button/item-button
        this._size = null; // large/small
        this._style = 'default'; // outline/clear/solid
        this._shape = null; // round/fab
        this._display = null; // block/full
        this._colors = []; // primary/secondary
        this._icon = null; // left/right/only
        this._disabled = false; // disabled
        var element = elementRef.nativeElement;
        if (config.get('hoverCSS') === false) {
            renderer.setElementClass(elementRef, 'disable-hover', true);
        }
        if (element.hasAttribute('ion-item')) {
            // no need to put on these classes for an ion-item
            this._role = null;
            return;
        }
        if (element.hasAttribute('disabled')) {
            this._disabled = true;
        }
        this._readAttrs(element);
        this._readIcon(element);
    }
    /**
     * @private
     */
    Button.prototype.ngAfterContentInit = function () {
        this._assignCss(true);
    };
    /**
     * @private
     */
    Button.prototype.setRole = function (val) {
        this._role = val;
    };
    Button.prototype._readIcon = function (element) {
        // figure out if and where the icon lives in the button
        var childNodes = element.childNodes;
        var childNode;
        var nodes = [];
        for (var i = 0, l = childNodes.length; i < l; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 3) {
                // text node
                if (childNode.textContent.trim() !== '') {
                    nodes.push(TEXT);
                }
            }
            else if (childNode.nodeType === 1) {
                if (childNode.nodeName === 'ICON') {
                    // icon element node
                    nodes.push(ICON);
                }
                else {
                    // element other than an <icon>
                    nodes.push(TEXT);
                }
            }
        }
        if (nodes.length > 1) {
            if (nodes[0] === ICON && nodes[1] === TEXT) {
                this._icon = 'icon-left';
            }
            else if (nodes[0] === TEXT && nodes[1] === ICON) {
                this._icon = 'icon-right';
            }
        }
        else if (nodes.length === 1 && nodes[0] === ICON) {
            this._icon = 'icon-only';
        }
    };
    Button.prototype._readAttrs = function (element) {
        var elementAttrs = element.attributes;
        var attrName;
        for (var i = 0, l = elementAttrs.length; i < l; i++) {
            if (elementAttrs[i].value !== '')
                continue;
            attrName = elementAttrs[i].name;
            if (BUTTON_STYLE_ATTRS.indexOf(attrName) > -1) {
                this._style = attrName;
            }
            else if (BUTTON_DISPLAY_ATTRS.indexOf(attrName) > -1) {
                this._display = attrName;
            }
            else if (BUTTON_SHAPE_ATTRS.indexOf(attrName) > -1) {
                this._shape = attrName;
            }
            else if (BUTTON_SIZE_ATTRS.indexOf(attrName) > -1) {
                this._size = attrName;
            }
            else if (!(IGNORE_ATTRS.test(attrName))) {
                this._colors.push(attrName);
            }
        }
    };
    Button.prototype._assignCss = function (assignCssClass) {
        var _this = this;
        var role = this._role;
        if (role) {
            this.renderer.setElementClass(this.elementRef, role, assignCssClass); // button
            this._setClass(this._style, assignCssClass); // button-clear
            this._setClass(this._shape, assignCssClass); // button-round
            this._setClass(this._display, assignCssClass); // button-full
            this._setClass(this._size, assignCssClass); // button-small
            this._setClass(this._icon, assignCssClass); // button-icon-left
            var colorStyle = (this._style !== 'default' ? this._style + '-' : '');
            this._colors.forEach(function (colorName) {
                _this._setClass(colorStyle + colorName, assignCssClass); // button-secondary, button-clear-secondary
            });
        }
    };
    Button.prototype._setClass = function (type, assignCssClass) {
        if (type) {
            this.renderer.setElementClass(this.elementRef, this._role + '-' + type, assignCssClass);
        }
    };
    /**
     * @private
     */
    Button.setRoles = function (contentButtonChildren, role) {
        var buttons = contentButtonChildren.toArray();
        buttons.forEach(function (button) {
            button.setRole(role);
        });
    };
    Button = __decorate([
        core_1.Directive({
            selector: 'button,[button]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
    ], Button);
    return Button;
    var _a, _b, _c;
})();
exports.Button = Button;
var BUTTON_SIZE_ATTRS = ['large', 'small'];
var BUTTON_STYLE_ATTRS = ['clear', 'outline', 'solid'];
var BUTTON_SHAPE_ATTRS = ['round', 'fab'];
var BUTTON_DISPLAY_ATTRS = ['block', 'full'];
var IGNORE_ATTRS = /_ng|button|left|right/;
var TEXT = 1;
var ICON = 2;