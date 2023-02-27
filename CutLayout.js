import Slat from "./Slat.js";

export default class CutLayout {
    #cutLayout = [];

    constructor(requiredDimmensions, initialLength, sawWidth, debug = false) {
        this.requiredDimmensions = [...requiredDimmensions];
        this.initialLength = initialLength;
        this.sawWidth = sawWidth;
        this.debug = debug;
        return this;
    }

    get cutLayout() {
        return this.#cutLayout;
    }

    get totalScrap() {
        return this.#cutLayout.reduce((a,b) => a += b.scrap, 0);
    }
    sortRequiredDimmensionsDescending() {
        this.requiredDimmensions.sort((a, b) => b.length - a.length);
    }
    
    getWholeSlats() {
        this.sortRequiredDimmensionsDescending();
        this.requiredDimmensions.forEach(element => {
            let fullSlatsNeeded = Math.floor(element.length / this.initialLength);
            while (fullSlatsNeeded > 0) {
                this.#cutLayout.push(new Slat(this.initialLength, this.sawWidth, this.debug).cut(this.initialLength, element.reference));
                element.length -= this.initialLength;
                fullSlatsNeeded--;
            }
        })
        return this.cutLayout;
    }

    cutNotWholeSlats() {
        do {
            this.sortRequiredDimmensionsDescending();
            this.requiredDimmensions.forEach(element => {
                let slatLongEnoughIndex = this.#cutLayout.findIndex(slat => slat.scrap >= element.length);
                if (slatLongEnoughIndex >= 0) {
                    this.#cutLayout[slatLongEnoughIndex].cut(element.length, element.reference);
                    element.length = 0;
                }
                else {
                    this.#cutLayout.push(new Slat(this.initialLength, this.sawWidth, this.debug).cut(element.length, element.reference));
                    element.length = 0; 
                }
            })
        }
        while (this.requiredDimmensions.every(element => element.length !== 0));
    }
    
    generateLayout() {
        this.getWholeSlats();
        this.cutNotWholeSlats();
    }

    printTabular() {
        console.log('Result:');
        this.#cutLayout.forEach((slat, index) => {
            console.log(`Slat ${index} - scrap ${slat.scrap} - cuts:`);
            console.table([...slat.cuts])
        }) 
        console.log(`Total scrap: ${this.totalScrap}`);
    }

    printPrintable() {
        console.log('Result:');
        this.#cutLayout.forEach((slat, index) => {
            console.log(`Slat ${index} - scrap ${slat.scrap} - cuts:`);
            slat.cuts.forEach(cut => {
                console.log(`\t${cut.reference}: ${cut.length}`);
            })
        })
        console.log(`Total scrap: ${this.totalScrap}`); 
    }
}