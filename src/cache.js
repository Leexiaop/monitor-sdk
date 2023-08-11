class Cache {
    cache = [];

    getCache () {
        return this.cache;
    }

    addCache (data) {
        this.cache.push(data);
    }

    clearCache () {
        this.cache.length = 0;
    }
};

export default Cache;
