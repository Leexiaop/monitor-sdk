/*
 * @Author: Leexiaop 282191344@qq.com
 * @Date: 2023-08-11 15:08:45
 * @LastEditors: Leexiaop 282191344@qq.com
 * @LastEditTime: 2023-08-11 17:52:48
 * @FilePath: \monitor-sdk\src\core\ActionTracker.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { lazyReport } from '../utils/report';
import { getPath } from '../utils/utils';

class ActionTracker {
    constructor() {}
    /**
     * 手动上报
     */
    tracker (actionType, data) {
        lazyReport('action', {
            actionType,
            data
        })
    }
    /**
     * 自动上报
     */
    autoTracker () {
        // 自动上报
        document.body.addEventListener('click', function (e) {
            const clickedDom = e.target;

            // 获取标签上的data-target属性的值
            let target = clickedDom?.getAttribute('data-target');

            // 获取标签上的data-no属性的值
            let no = clickedDom?.getAttribute('data-no');
            // 避免重复上报
            if (no) {
                return;
            }

            if (target) {
                lazyReport('action', {
                    actionType: 'click',
                    data: target
                });
            } else {
                // 获取被点击元素的dom路径
                const path = getPath(clickedDom);
                lazyReport('action', {
                    actionType: 'click',
                    data: path
                });
            }
        }, false);
    }
};

export default ActionTracker;