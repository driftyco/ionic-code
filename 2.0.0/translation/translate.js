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
 * @private
 * Provide multi-language and i18n support in your app. Translate works by
 * mapping full strings to language translated ones. That means that you don't need
 * to provide strings for your default language, just new languages.
 *
 * @usage
 * ```js
 * Translate.translations({
 *   'de': {
 *     'Welcome to MyApp': 'Willkommen auf'
 *   }
 * })
 *
 * Changing the default language:
 *
 * Translate.setLanguage('de');
 * ```
 *
 * Usage in a template:
 *
 * ```js
 * <span>{{ 'Welcome to MyApp' | translate }}
 * ```
 */
var Translate = (function () {
    function Translate() {
        this._transMap = {};
    }
    Translate.prototype.translations = function (lang, map) {
        this._transMap[lang] = map;
    };
    Translate.prototype.setLanguage = function (lang) {
        this._language = lang;
    };
    Translate.prototype.getTranslations = function (lang) {
        return this._transMap[lang];
    };
    Translate.prototype.translate = function (key, lang) {
        // If the language isn't specified and we have no overridden one, return the string passed.
        if (!lang && !this._language) {
            return key;
        }
        var setLanguage = lang || this._language;
        var map = this.getTranslations(setLanguage);
        if (!map) {
            console.warn('I18N: No translation for key', key, 'using language', setLanguage);
            return '';
        }
        return this._getTranslation(map, key);
    };
    Translate.prototype._getTranslation = function (map, key) {
        return map && map[key] || '';
    };
    Translate = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Translate);
    return Translate;
})();
exports.Translate = Translate;