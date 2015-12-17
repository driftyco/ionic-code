/**
 * @name Platform
 * @description
 * Platform returns the availble information about your current platform.
 * @demo /docs/v2/demos/platform/
 */
export declare class Platform {
    constructor(platforms?: any[]);
    /**
     * @param {string} platformName
     * @returns {bool} returns true/false based on platform you place
     * @description
     * Depending on the platform name, isPlatform will return true or flase
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      if(this.platform.is('ios'){
     *        // what ever you need to do for
     *        // if the platfomr is ios
     *      }
     *    }
     * }
     * ```
     */
    is(platformName: any): boolean;
    /**
     * @returns {array} the array of platforms
     * @description
     * Depending on what device you are on, `platforms` can return multiple values.
     * Each possible value is a hierarchy of platforms. For example, on an iPhone,
     * it would return mobile, ios, and iphone.
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.platforms());
     *      // This will return an array of all the availble platforms
     *      // From if your on mobile, to mobile os, and device name
     *    }
     * }
     * ```
     */
    platforms(): any;
    /**
     * @param {string} optional platformName
     * @returns {object} An object with various platform info
     * - `{object=} `cordova`
     * - `{object=}` `platformOS` {str: "9.1", num: 9.1, major: 9, minor: 1}
     * - `{object=} `deviceName` Returns the name of the device
     * - `{object=}` `device platform` R
     * @description
     * Returns an object conta
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.versions());
     *      // or pass in a platform name
     *      console.log(this.platform.versions('ios'));
     *    }
     * }
     * ```
     *
     */
    versions(platformName: any): any;
    version(): any;
    /**
     * @returns {promise}
     * @description
     * Returns a promise when the platform is ready and native functionality can be called
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      this.platform.ready().then(() => {
     *        console.log('Platform ready');
     *        // The platform is now ready, execute any native code you want
     *       });
     *    }
     * }
     * ```
     */
    ready(): any;
    /**
     * @private
     * TODO
     * @param {TODO} config  TODO
     * @returns {TODO} TODO
     */
    prepareReady(config: any): void;
    on(): void;
    onHardwareBackButton(): void;
    registerBackButtonAction(): void;
    exitApp(): void;
    fullScreen(): void;
    showStatusBar(): void;
    url(val: any): any;
    query(key: any): any;
    userAgent(val: any): any;
    navigatorPlatform(val: any): any;
    width(): any;
    height(): any;
    isPortrait(): boolean;
    isLandscape(): boolean;
    windowResize(): void;
    onResize(cb: any): void;
    /**
     * TODO
     * @param {TODO} platformConfig  TODO
     */
    static register(platformConfig: any): void;
    static registry(): {};
    /**
     * TODO
     * @param {TODO} platformName  TODO
     * @returns {string} TODO
     */
    static get(platformName: any): any;
    static setDefault(platformName: any): void;
    /**
     * TODO
     * @param {TODO} queryValue  TODO
     * @returns {boolean} TODO
     */
    testQuery(queryValue: any, queryTestValue: any): boolean;
    /**
     * TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {boolean} TODO
     */
    testUserAgent(userAgentExpression: any): boolean;
    /**
     * TODO
     * @param {TODO} navigatorPlatformExpression  TODO
     * @returns {boolean} TODO
     */
    testNavigatorPlatform(navigatorPlatformExpression: any): boolean;
    /**
     * TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {Object} TODO
     */
    matchUserAgentVersion(userAgentExpression: any): {
        major: any;
        minor: any;
    };
    /**
     * TODO
     * @param {TODO} queryValue  TODO
     * @param {TODO} userAgentExpression  TODO
     * @returns {boolean} TODO
     */
    isPlatform(queryTestValue: any, userAgentExpression: any): boolean;
    /**
     * TODO
     * @param {TODO} config  TODO
     */
    load(platformOverride: any): void;
    /**
     * TODO
     * @param {TODO} platformName  TODO
     * @returns {TODO} TODO
     */
    matchPlatform(platformName: any): any;
}
