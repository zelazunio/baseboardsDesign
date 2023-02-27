export default class Slat {
    #cuts = [];
    #scrap = 0;

    constructor(initialLength, sawWidth, debug = false) {
        this.initialLength = initialLength;
        this.sawWidth = sawWidth;
        this.debug = debug;
        this.#scrap = this.initialLength;
        this.log('Created new slat.')
        return this;
    }

    log(msg) {
        if (this.debug) console.log(msg);
    }

    cut(length, reference) {
        if (this.#scrap >= length) {
            this.#cuts.push({ length, reference });
            this.#scrap -= (length + this.sawWidth);
            this.#scrap = Math.max(0, this.#scrap);
            this.log(`slat.cut: ${length}; cuts: ${this.#cuts}, scrap: ${this.#scrap}`);
            return this;
        }
    }

    get cuts() {
        return this.#cuts;
    }

    get scrap() {
        return this.#scrap;
    }

} 