/*
 * @Author: Leexiaop 282191344@qq.com
 * @Date: 2023-07-24 10:03:16
 * @LastEditors: Leexiaop 282191344@qq.com
 * @LastEditTime: 2023-08-11 17:51:22
 * @FilePath: \monitor-sdk\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Init from './core/Init';
import ErrorTracker from './core/ErrorTracker';
import ActionTracker from './core/ActionTracker';

window.$L = {
    Init,
    ErrorTracker,
    ActionTracker
}