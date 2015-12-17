import { ChangeDetectorRef, ElementRef, Compiler, AppViewManager, NgZone, Renderer } from 'angular2/core';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { NavController } from '../nav/nav-controller';
import { Tabs } from './tabs';
/**
 * @name Tab
 * @usage
 * ```html
 * <ion-tabs>
 * 	 <ion-tab tabTitle="Home" tabIcon="home" [root]="tabOneRoot"></ion-tab>
 * 	 <ion-tab tabTitle="Login" tabIcon="star" [root]="tabTwoRoot"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * @description
 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
 * of the Component docs._
 *
 * Tab components are basic navigation controllers used with Tabs.  Much like
 * Nav, they are a subclass of NavController and can be used to navigate
 * to pages in and manipulate the navigation stack of a particular tab.
 *
 * For more information on using navigation controllers like Tab or [Nav](../../nav/Nav/),
 * take a look at the [NavController API reference](../NavController/).
 *
 * See the [Tabs API reference](../Tabs/) for more details on configuring Tabs
 * and the TabBar.

 *
 * @property {any} [root] - set the root page for this tab
 * @property {any} [tabTitle] - set the title of this tab
 * @property {any} [tabIcon] - set the icon for this tab

 */
export declare class Tab extends NavController {
    constructor(parentTabs: Tabs, app: IonicApp, config: Config, keyboard: Keyboard, elementRef: ElementRef, compiler: Compiler, viewManager: AppViewManager, zone: NgZone, renderer: Renderer, cd: ChangeDetectorRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    load(opts: any, done: any): void;
    /**
     * @private
     */
    loadPage(viewCtrl: any, navbarContainerRef: any, opts: any, done: any): void;
    /**
     * @private
     */
    setSelected(isSelected: any): void;
    /**
     * @private
     */
    hideNavbars(shouldHideNavbars: any): void;
    /**
     *
     * ```ts
     * export class MyClass{
     *  constructor(tab: Tab){
     *    this.tab = tab;
     *    console.log(this.tab.index);
     *  }
     * }
     * ```
     *
     * @returns {Number} Returns the index of this page within its NavController.
     *
     */
    index: any;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
