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
 * Events is a pub/sub style event system for sending and responding to application-level
 * events across your app.
 * @usage
 * ```ts
 * // first page (publish an event when a user is created)
 * function createUser(user) {
 *   console.log('User created!')
 *   events.publish('user:created', user);
 * }
 *
 * // second page (listen for the user created event)
 * events.subscribe('user:created', (user) => {
 *   console.log('Welcome', user);
 * });
 *
 * ```
 */
var Events = (function () {
    function Events() {
        this.channels = [];
    }
    /**
     * Subscribe to an event topic. Events that get posted to that topic
     * will trigger the provided handler.
     *
     * @param topic the topic to subscribe to
     * @param handler the event handler
     */
    Events.prototype.subscribe = function (topic) {
        var _this = this;
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        if (!this.channels[topic]) {
            this.channels[topic] = [];
        }
        handlers.forEach(function (handler) {
            _this.channels[topic].push(handler);
        });
    };
    /**
     * Unsubscribe from the given topic. Your handler will
     * no longer receive events published to this topic.
     *
     * @param topic the topic to unsubscribe from
     * @param handler the event handler
     *
     * @return true if a handler was removed
     */
    Events.prototype.unsubscribe = function (topic, handler) {
        var t = this.channels[topic];
        if (!t) {
            // Wasn't found, wasn't removed
            return false;
        }
        if (!handler) {
            // Remove all handlers for this topic
            delete this.channels[topic];
            return true;
        }
        // We need to find and remove a specific handler
        var i = t.indexOf(handler);
        if (i < 0) {
            // Wasn't found, wasn't removed
            return false;
        }
        t.splice(i, 1);
        // If the channel is empty now, remove it from the channel map
        if (!t.length) {
            delete this.channels[topic];
        }
        return true;
    };
    /**
     * Publish an event to the given topic.
     *
     * @param topic the topic to publish to
     * @param eventData the data to send as the event
     */
    Events.prototype.publish = function (topic) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var t = this.channels[topic];
        if (!t) {
            return null;
        }
        var responses = [];
        t.forEach(function (handler) {
            responses.push(handler(args));
        });
        return responses;
    };
    Events = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Events);
    return Events;
})();
exports.Events = Events;