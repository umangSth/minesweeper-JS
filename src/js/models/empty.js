export default class emptyArea {
    constructor(CautionArea, length, breath) {
        this.CautionArea = CautionArea;
        this.length = length;
        this.breath = breath;
    }
    allocateEmpty(index){
        const empArr = [];
        const emptyXArr = allocateEmpty(index, 'x', this.length, this.breath, this.CautionArea);
        empArr.push(...emptyXArr);
        const emptyYArr = emptyXArr.map(el=> allocateEmpty(el,"y", this.length, this.breath, this.CautionArea));
        emptyYArr.forEach(e=>empArr.push(...e));   
        return empArr;
    }
}

const allocateEmpty = (index, flag, length, breath, CautionArea) => {
    let f;
    let arr = [];
    let len=0;
   
    if (flag === 'x') {
        f = 0;
        arr = [index];
        len = parseInt(length,10);
    } else if (flag === 'y') {
        f = 2;
        arr = [];
        len = parseInt(breath,10);
    }
    let iArr = index.split(''); 
    let i = parseInt(iArr[f], 10);
    while (i >= 0) {  
        if(typeof(iArr) === "string"){
            iArr = iArr.split("");
        }
        console.log(iArr);
        iArr[f] = (--i).toString();       
        if(iArr[f] <=0){
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
        if(typeof(iAd) === "string"){
            iAd = iAd.split("");
        }
        iAd[f] = (++j).toString();
        if(iAd[f] >= len){
            break;
        }
        iAd = iAd.join("");
        
        if (!CautionArea.includes(iAd)) {
            arr.push(iAd);
        } else {
            break;
        }
    }
    return arr;
}