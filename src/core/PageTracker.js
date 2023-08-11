import { lazyReport } from '../utils/report';

class PageTracker {
    beforeTime = Date.now(); // 进入页面的时间
    beforePage = ''; // 上一个页面
    constructor() {}

    getStayTime () {
        let curTime = Date.now();
        let stayTime = curTime - beforeTime;
        beforeTime = curTime;
        return stayTime;
    }

    listener () {
        const stayTime = getStayTime(); // 停留时间
        const currentPage = window.location.href; // 页面路径
        lazyReport('visit', {
          stayTime,
          page: beforePage,
        })
        beforePage = currentPage;
    }

    createHistoryEvent (name) {
        const origin = window.history[name];
        return function() {            
            let res = origin.apply(this, arguments);
            let e = new Event(name);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return res;
        };
    };

    hashPageTrackerReport () {
        window.addEventListener('hashchange', function () {
            listener()
        });
    
        // 页面load监听
        window.addEventListener('load', function () {
            listener()
        });
        window.history.pushState = createHistoryEvent('pushState');

        // history.pushState
        window.addEventListener('pushState', function () {
            listener()
        });
    }

    historyPageTrackerReport () {
        // history.pushState
        window.addEventListener('pushState', function () {
            listener()
        });

        // history.replaceState
        window.addEventListener('replaceState', function () {
            listener()
        });

        window.history.pushState = createHistoryEvent('pushState');
        window.history.replaceState = createHistoryEvent('replaceState');
        
        // 页面load监听
        window.addEventListener('load', function () {
            // beforePage = location.href;
            listener()
        });

        // unload监听
        window.addEventListener('unload', function () {
            listener()
        });

        // history.go()、history.back()、history.forward() 监听
        window.addEventListener('popstate', function () {
            listener()
        });
    }
};

export default PageTracker;
