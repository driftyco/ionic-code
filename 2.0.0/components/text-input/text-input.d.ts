import { ElementRef, Renderer } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { NavController } from '../nav/nav-controller';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { IonicApp } from '../app/app';
import { Content } from '../content/content';
import { Platform } from '../../platform/platform';
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
export declare class TextInput {
    constructor(form: Form, elementRef: ElementRef, config: Config, renderer: Renderer, app: IonicApp, platform: Platform, scrollView: Content, navCtrl: NavController, isFloating: string, isStacked: string, isFixed: string, isInset: string);
    /**
     * @private
     * This function is used to add the Angular css classes associated with inputs in forms
     */
    addNgClass(className: any): void;
    /**
     * @private
     */
    registerInput(textInputElement: any): void;
    /**
     * @private
     */
    registerLabel(label: any): void;
    /**
     * @private
     */
    ngAfterViewInit(): void;
    /**
     * @private
     */
    pointerStart(ev: any): void;
    /**
     * @private
     */
    pointerEnd(ev: any): void;
    /**
     * @private
     */
    initFocus(): void;
    /**
     * @private
     * @param {TODO} inputOffsetTop  TODO
     * @param {TODO} inputOffsetHeight  TODO
     * @param {TODO} scrollViewDimensions  TODO
     * @param {TODO} keyboardHeight  TODO
     * @returns {TODO} TODO
     */
    static getScrollData(inputOffsetTop: any, inputOffsetHeight: any, scrollViewDimensions: any, keyboardHeight: any, plaformHeight: any): {
        scrollAmount: number;
        scrollTo: number;
        scrollPadding: number;
        inputSafeY: number;
    };
    /**
     * @private
     */
    focusChange(hasFocus: any): void;
    /**
     * @private
     */
    hasValue(inputValue: any): void;
    /**
     * @private
     */
    setFocus(): void;
    /**
     * @private
     */
    regMove(): void;
    /**
     * @private
     */
    deregMove(): void;
    /**
     * @private
     */
    hasFocus: any;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
/**
 * @private
 */
export declare class TextInputElement {
    constructor(type: string, elementRef: ElementRef, renderer: Renderer, wrapper: TextInput, ngControl: NgControl);
    ngOnInit(): void;
    focusChange(changed: any): void;
    onKeyup(ev: any): void;
    labelledBy(val: any): void;
    setFocus(): void;
    relocate(shouldRelocate: any, inputRelativeY: any): void;
    hideFocus(shouldHideFocus: any): void;
    hasFocus: boolean;
    addClass(className: any): void;
    getNativeElement(): any;
}
