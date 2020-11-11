import {
    elements
} from "./base";

//this function will load all the button with id [X-axis, Y-axis] format
export const renderBody = (length, breath) => {
    elements.game.innerHTML ="";
    let body = '';
    for (let i = 0; i < length; i++) {
        body += '<tr>';
        for (let j = 0; j < breath; j++) {
            body += `<td>
        <div class="button" id="${i+'-'+j}">                   
        </div>                  
      </td>   `;
        }
        body += '</tr>';
    }
    elements.game.insertAdjacentHTML('afterbegin', body);
}


export const renderEmpty = (index) => {
    index.map(el => {
            if (document.getElementById(el) !== null) {
                document.getElementById(el).classList.add('buttonInactive');
            }
        }

    );
};