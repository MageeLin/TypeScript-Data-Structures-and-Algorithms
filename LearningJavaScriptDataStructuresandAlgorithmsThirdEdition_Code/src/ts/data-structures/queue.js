"use strict";
exports.__esModule = true;
var Queue = /** @class */ (function () {
    function Queue() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = new Map();
    }
    /**
     * @description: 在count方向（队列底部）入队
     * @param {T} element
     */
    Queue.prototype.enqueue = function (element) {
        this.items.set(this.count, element);
        this.count++;
    };
    /**
     * @description: 在lowestCount方向（队列顶部）出队
     * @return {T} element
     */
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        var result = this.items.get(this.lowestCount);
        this.items["delete"](this.lowestCount);
        this.lowestCount++;
        return result;
    };
    /**
     * @description: 返回队列顶部的元素
     * @return {T} element
     */
    Queue.prototype.peek = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.get(this.lowestCount);
    };
    /**
     * @description: 返回队列是否为空
     * @return {Boolean}
     */
    Queue.prototype.isEmpty = function () {
        return this.items.size === 0;
    };
    /**
     * @description: 清空队列
     */
    Queue.prototype.clear = function () {
        this.items = new Map();
        this.count = 0;
        this.lowestCount = 0;
    };
    /**
     * @description: 返回队列元素的数目
     * @return {Number}
     */
    Queue.prototype.size = function () {
        return this.items.size;
    };
    /**
     * @description: 覆盖Object默认的toString
     * @return {String}
     */
    Queue.prototype.toString = function () {
        if (this.isEmpty()) {
            return "";
        }
        var objString = "" + this.items.get(this.lowestCount);
        for (var i = this.lowestCount + 1; i < this.count; i++) {
            objString = objString + "," + this.items.get(i);
        }
        return objString;
    };
    return Queue;
}());
exports["default"] = Queue;
