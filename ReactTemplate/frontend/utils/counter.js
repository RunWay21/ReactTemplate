class Counter {
    constructor(init) {
        this.value = init;
    }

    next() {
        return ++this.value;
    }

    get current() {
        return this.value;
    }
}

const counter = new Counter(0);

export default counter;