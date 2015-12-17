import { ElementRef } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Form } from '../../util/form';
import { Config } from '../../config/config';
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device. Ionic prefers to wrap the checkbox input with the `<label>` in order to make the entire toggle easy to tap or drag.
 * Togglees can also have colors assigned to them, by adding any color attribute to them.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 * @property {any} [value] - the inital value of the toggle
 * @property {boolean} [checked] - whether the toggle it toggled or not
 * @property {boolean} [disabled] - whether the toggle is disabled or not
 * @property {string} [id] - a unique ID for a toggle
 * @usage
 * ```html
 * // Create a single toggle
 *  <ion-toggle checked="true">
 *    Pineapple
 *  </ion-toggle>
 *
 * // Create a list of togglees:
 *  <ion-list>
 *
 *    <ion-toggle checked="true">
 *      Apple
 *    </ion-toggle>
 *
 *     <ion-toggle checked="false">
 *       Banana
 *     </ion-toggle>
 *
 *     <ion-toggle disabled="true">
 *       Cherry
 *     </ion-toggle>
 *
 *  </ion-list>
 * ```
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
export declare class Toggle {
    private ngControl;
    constructor(form: Form, elementRef: ElementRef, config: Config, ngControl: NgControl);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * Set checked state of this toggle.
     * @param {boolean} value  Boolean to set this toggle's checked state to.
     * @private
     */
    check(value: any): void;
    /**
     * Toggle the checked state of this toggle.
     * @private
     */
    toggle(ev: any): void;
    /**
     * @private
     */
    writeValue(value: any): void;
    /**
     * @private
     */
    pointerDown(ev: any): void;
    /**
     * @private
     */
    pointerUp(ev: any): void;
    /**
     * @private
     */
    registerOnChange(fn: any): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @private
     */
    isDisabled(ev: any): boolean;
    /**
     * @private
     */
    initFocus(): void;
}
