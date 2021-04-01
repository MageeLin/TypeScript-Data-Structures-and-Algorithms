"use strict";
exports.__esModule = true;
exports.hotPotato = void 0;
var queue_1 = require("../data-structures/queue");
/**
 * @description: 击鼓传花算法
 * @param {Array<T>} 传花的元素数组
 * @param {number} 每次传花的次数
 * @return {HotPotatoResult<T>} 返回算法结果
 */
function hotPotato(elementsList, num) {
    var queue = new queue_1["default"]();
    var elimitatedList = [];
    // 初始化队列
    for (var i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]);
    }
    while (queue.size() > 1) {
        // 循环队列旋转固定num次数
        for (var i = 0; i < num; i++) {
            // 元素出队的同时又入队，形成循环队列
            queue.enqueue(queue.dequeue());
        }
        // 被抽中的元素则被出队淘汰
        elimitatedList.push(queue.dequeue());
    }
    return {
        elimitated: elimitatedList,
        winner: queue.dequeue()
    };
}
exports.hotPotato = hotPotato;
