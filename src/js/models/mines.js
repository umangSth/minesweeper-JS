export default class mines {
    constructor(length, breath) {
        this.indexes = [];
        this.length = length;
        this.breath = breath;
        this.mines = [];
        this.cautionArea = [];
    }

    //this generate 50 index in [x-axis, y-axis] formate in string 
    calAllIndex() {
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.breath; j++) {
                let index = i + "-" + j;
                this.indexes.push(index);
            }
        }
        return this.indexes;
    }


    //this generate two random numbers one number between 1-10 and other 1-5
    randomNum() {
        let i = Math.floor(Math.random() * this.length);
        let j = Math.floor(Math.random() * this.breath);
        return i + "-" + j;
    }

    //this will allocate mines as given mineNo on random
    allocateMine(mineNo) {
        for (let i = 0; i < mineNo; i++) {
            let mine = this.randomNum();
            if (!this.mines.includes(mine)) {
                this.mines.push(mine);
            } else {
                i--;
            }
        }
        return this.mines;
    }

    //this will call all the cautionArea around all mines 
    allocateCautionArea() {
        const calNum = (n) => [n - 1, n, n + 1];
        const calCasIndex = (index) => {
            let [a , b] = index.split('-');
            let front = calNum(parseInt(a, 10));
            const frontcheck = (n) => n < this.length && n > -1;
            let back = calNum(parseInt(b, 10));
            const backcheck = (n) => n < this.length && n > -1;
            let Indexes = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (frontcheck(front[i]) && backcheck(back[j])) {
                        Indexes.push(front[i] + '-' + back[j]);
                    }
                }
            }
            let resultIndex = [];
            Indexes.map((el) => {
                if (!this.mines.includes(el)) {
                    resultIndex.push(el);
                    return true;
                } else {
                    return false;
                }
            });
            return resultIndex;
        }
        const C = [];
        this.mines.map((el) => calCasIndex(el)).map(e => C.push(...e));    
        return  C;
    }
}