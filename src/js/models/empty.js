export default class emptyArea {
    constructor(CautionArea, length, breath) {
        this.CautionArea = CautionArea;
        this.length = length;
        this.breath = breath;
    }



    //1 version method to call type 1 algorithm to find the empty area
    allocateEmpty(index) {
        const empArr = [];
        const Arr = [index];
        do {
            const emptyXArr = Arr.map((e) => allocateEmpty(e, 'x', this.length, this.breath, this.CautionArea));
            empArr.push(...emptyXArr);

            const emptyYArr = emptyXArr.map(el => allocateEmpty(el, "y", this.length, this.breath, this.CautionArea));
            emptyYArr.forEach(e => empArr.push(...e));


        } while (Arr !== []);
        return empArr;
    }


//2 version method to call type 2 algorithm to find the empty area
    otherEmptyAllocate(index) {
        let arr = [index];
        let i = this.length;
        do {
            arr.map(el => allocateOtherEmpty(el, this.length, this.breath, this.CautionArea, arr)).forEach(e => {
                if (!arr.includes(...e)) {
                    arr.push(...e);
                }
            });
            --i;
        }
        while (i > 0);
        return arr;
    }
}


//type 2 algorithm to find the empty area
// other algorithm to find the empty area
const allocateOtherEmpty = (index, length, breath, CautionArea, emp) => {

    let a = index.split('');

    let con = (aa) => parseInt(aa, 10);
    let ren = (i) => [con(a[i]) - 1, con(a[i]), con(a[i]) + 1];

    let b = ren(0);
    let c = ren(2);

    let arr = [];

    for (let j = 0; j < 3; ++j) {
        for (let k = 0; k < 3; ++k) {
            if (b[j] > length || c[k] > breath || b[j] < 0 || c[k] < 0) {
                continue;
            }
            let str = b[j] + "-" + c[k];

            if (CautionArea.includes(str) || emp.includes(str)) {

                continue;

            } else {
                arr.push(str);
            }
        }
    }
    return arr;
}


//type 1 algorithm to find the empty area
const allocateEmpty = (index, flag, length, breath, CautionArea) => {
    let f;
    let arr = [];
    let len = 0;

    if (flag === 'x') {
        f = 0;
        arr = [index];
        len = parseInt(length, 10);
    } else if (flag === 'y') {
        f = 2;
        arr = [];
        len = parseInt(breath, 10);

    }
    let iArr = index.split('');
    let i = parseInt(iArr[f], 10);
    while (i >= 0) {
        if (typeof (iArr) === "string") {
            iArr = iArr.split("");
        }

        iArr[f] = (--i).toString();
        if (iArr[f] < 0) {
            break;
        }
        iArr = iArr.join('');
        if (!CautionArea.includes(iArr)) {
            arr.push(iArr);
        } else {
            break;
        }
    }

    let iAd = index.split('');

    let j = parseInt(iAd[f], 10);

    while (j < len) {
        if (typeof (iAd) === "string") {
            iAd = iAd.split("");

        }
        // console.log(len);
        iAd[f] = (++j).toString();
        if (iAd[f] >= len) {
            break;
        }
        iAd = iAd.join("");
        // console.log(iAd);

        if (!CautionArea.includes(iAd)) {
            arr.push(iAd);
        } else {
            break;
        }
    }
    return arr;
}