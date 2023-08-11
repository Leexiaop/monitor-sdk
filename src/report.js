import Cache from './cache';
const { clearCache, addCache, getCache } = new Cache();
const timer = null;

/**
 * 上报
 * @param {*上报的类型} type 
 * @param {*上报的参数} params 
 */
export const lazyReport = (type, params) => {
    const appId = window['_monitor_app_id'];
    const userId = window['_monitor_user_id'];
    const delay = window['_monitor_delay'];
    const logParams = {
        appId,
        userId,
        type,
        data: params,
        currentTime: new Date().getTime(),
        currentPage: window.location.href,
        ua: navigator.userAgent
    };
    let logParamsStr = JSON.stringify(logParams);
    addCache({type, data: logParamsStr});
    const data = getCache();
    
    //  直接上报,不延迟
    if (!delay) {
        report(data);
        return;
    }

    // if (data.length > 10) {
    //     report(data);
    //     clearCache();
    //     return;
    // }
    //  延迟上报
    clearTimeout(timer);
    timer = setTimeout(() => {
        report(data);
    }, delay);
};
/**
 * 数据上报
 */
export const report = (data) => {
    const url = window['_monitor_url'];
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, data);
    } else {
        const oImage = new Image();
        oImage.src = `${url}?log=${data}`;
    }
    clearCache();
};
