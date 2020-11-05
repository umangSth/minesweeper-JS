import mines from "./models/mines"
import * as indexView from "./views/indexView"
import {
    elements
} from "./views/base";

import emptyArea from "./models/empty"


//git remote add origin https://github.com/umangSth/minesweeper-JS.git

//this is the state of the game where we have store every thing
const state = {
    length: 10,
    breath: 5,
    gameState: true,
};




//some function
//remove passed index array from state.allIndex[]
const removeIndex = (indexes) => indexes.forEach(el => {
    const index = state.AllIndex.indexOf(el);
    if (index > -1) {
        state.AllIndex.splice(index, 1);
    }
});






//
//
//
// Model section
//
//
//
//constructing new obj of mines class
const mine = new mines(state.length, state.breath);
//call the calculate all index method of mines and saving result in state.AllIndex
state.AllIndex = mine.calAllIndex();


//this will call all the mines index and to be state in state.mines
state.mines = mine.allocateMine(10);
removeIndex(state.mines);


//this will store all the caution area in state.allcautionarea, by calling mine.allovateCautionArea()
state.allCautionArea = mine.allocateCautionArea();


//this efi function will cut out repeated item, and store state.cautionArea
state.cautionArea = (function (array) {
    let uniqueArray = [];
    // Loop through array values
    for (let value of array) {
        if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
})(state.allCautionArea);


//this function will count the item repeated in state.allCautionArea
let count = (item) => state.allCautionArea.filter((el) => el === item).length;


//this function will store the repeat value in state.count
state.count = state.cautionArea.map(el => count(el));


//for testing the state in the window level
window.state = state;
console.log(state);


//this will create empObj object from the emptyArea class
const empObj = new emptyArea(state.cautionArea, state.length, state.breath);






//
//
//
// Model section End
//
//
//



//
//
//View Section
//
//
//

indexView.renderBody(state.length, state.breath);


//
//
//End View Section
//
//
//


//
//
//Event handling Section
//
//
//  

//this below function will listen to click event in the game
elements.game.addEventListener('click', e => {
    if(state.AllIndex === []){
        alert("you have won the game, awesome!!!");
    }
    else if (state.gameState) {
        //now the event (e) is passed to a function
        //storing the id of the target element at which the event was fire
        const id = e.target.id;
        //selecting that element
        const element = document.getElementById(id);
        //checking if the id is in state.mine 
        if (state.mines.includes(id)) {
            //if "yes", following the below code
            let child = document.createElement("img");
            child.src = "../img/hiclipart.com.png";
            element.appendChild(child);
            element.classList.add('buttonRed');
            state.gameState = false;
            alert("you Have lose");
            //
            //
            //still need stuff to do
        }
        //if id not found in the state.mine checking the state.cautionArea 
        else if (state.cautionArea.includes(id)) {
            //if "yes", following the code below
            let child = document.createElement("p");
            let index = state.count[state.cautionArea.indexOf(id)];
            child.textContent = index;
            element.appendChild(child);
            element.classList.add('buttonInactive');
            removeIndex([id]);
            //
            //
            //function to check if win 
        } else {
           state.empTmp = empObj.allocateEmpty(id);
           indexView.renderEmpty(state.empTmp);
           removeIndex(state.empTmp);
        }
    }
});