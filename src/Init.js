/*
 * @Author: Leexiaop 282191344@qq.com
 * @Date: 2023-08-11 11:04:53
 * @LastEditors: Leexiaop 282191344@qq.com
 * @LastEditTime: 2023-08-11 17:32:40
 * @FilePath: \parcel-sdk\src\Init.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cache from './cache';
import { lazyReport } from './report';
import ActionTracker from './ActionTracker';
import ErrorTracker from './ErrorTracker';
import PageTracker from './PageTracker';

const { autoTracker } = new ActionTracker();
const { hashPageTrackerReport, historyPageTrackerReport } = new PageTracker();
const { errorTrackerReport } = new ErrorTracker();

class Init {
    config;

    constructor(config) {
        this.config = config;
    }

    init () {
        const {appId, userId, url, isAutoTracker, delay, isHash, isError} = this.config;
        if (appId) {
            window['_monitor_app_id'] = appId;
        }
        if (userId) {
            window['_monitor_user_id'] = userId;
        }
        if (url) {
            window['_monitor_url'] = url;
        }
        if (delay) {
            window['_monitor_delay'] = delay;
        }
        if (isError) {
            errorTrackerReport();
        }
        if (isHash) {
            hashPageTrackerReport();
        } else {
            historyPageTrackerReport();
        }
        if (isAutoTracker) {
            autoTracker();
        }
        lazyReport('user', '加载应用');
        window.addEventListener('upload', () => {
            const { getCache } = new Cache();
            const data = getCache();
            lazyReport(data.type, data.data);
        });
    };
};

export default Init;
