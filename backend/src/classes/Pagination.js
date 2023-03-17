class Pagination {
    #page = 1;
    #maxCount = 0;
    #maxPages = 0;
    #hasNext = false;
    #hasLast = false;
    #limit = 7;
    #skip = 0;

    constructor(page, maxCount) {
        this.#page = page;
        this.#maxCount = maxCount;
        this.#maxPages = Math.ceil(this.#maxCount / this.#limit);

        if(this.#page > this.#maxPages) {
            this.#page = this.#maxPages;
        }

        this.#skip = this.#page * this.#limit - this.#limit;
        this.#skip = this.#skip <= 0 ? 0 : this.#skip;
        
        this.#hasLast = this.#page > 1 ? true : false;
        this.#hasNext = this.#page <= this.#maxPages - 1 ? true : false;
    }

    getPage() {
        return this.#page;
    }

    getMaxPages() {
        return this.#maxPages;
    }

    getMaxCount() {
        return this.#maxCount;
    }

    hasNext() {
        return this.#hasNext;
    }

    hasLast() {
        return this.#hasLast;
    }

    getLimit() {
        return this.#limit;
    }

    getSkip() {
        return this.#skip;
    }

    getAsObject() {
        return {
            page: this.getPage(),
            maxPages: this.getMaxPages(),
            maxCount: this.getMaxCount(),
            hasLast: this.hasLast(),
            hasNext: this.hasNext(),
            limit: this.getLimit()
        }
    }
}

module.exports = Pagination;