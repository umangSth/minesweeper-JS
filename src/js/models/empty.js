export default class emptyArea {
    constructor(CautionArea, length, breath) {
        this.CautionArea = CautionArea;
        this.length = length;
        this.breath = breath;
    }

    //2 version method to call type 2 algorithm to find the empty area
    otherEmptyAllocate(index) {
        let arr = [index];
        let tmp = arr;

        do {

            tmp = allocateOtherEmpty(tmp, this.length, this.breath, this.CautionArea, arr);
            tmp.forEach(el => arr.push(el));

        }
        while (tmp.length > 0);
        return arr;
    }
}



//type 2 algorithm to find the empty area
const allocateOtherEmpty = (index, length, breath, CautionArea, emp) => {

    let indexArray = [];

    let tmpArr = index.map((el) => {
        let a = el.split('');

        let con = (aa) => parseInt(aa, 10);
        let ren = (i) => [con(a[i]) - 1, con(a[i]), con(a[i]) + 1];

        let b = ren(0);
        let c = ren(2);

        let arr = [];

        for (let j = 0; j < 3; ++j) {
            for (let k = 0; k < 3; ++k) {
                if (b[j] >= length || c[k] >= breath || b[j] < 0 || c[k] < 0) {
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
    });

    tmpArr.forEach(e => {
        e.forEach(el => {

            if (!emp.includes(el) && !indexArray.includes(el)) {
                indexArray.push(el);
            }
        });
    });
    return indexArray;
}