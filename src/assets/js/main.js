


window.onload = function () {
// XMLHttpRequest
let
    url= 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    response = '',
    list,
    cy = document.getElementById("cy"),
    type,
    selected,
    newDate,
    savedCy;

function request() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        response = xhr.responseText;
    }

    //  JSON.parse + Fill select
    list = JSON.parse(response);

    if (cy.children.length != 0){
        cy.innerHTML = '';
    }

    for(let item in list ){

        let opt = document.createElement('option');
        opt.innerHTML = opt.value = list[item].ccy;
        // if  (list[item].ccy === "BTC") {
        //     opt.insertAdjacentHTML("afterbegin", 'даже ');
        // }
        cy.appendChild(opt);
    }

    newTimeOfRequest();

}

request();

// update

let update = document.getElementById('update');

 update.addEventListener('click', request);



// convert

let input = document.getElementById('input');
input.addEventListener('keyup', convert);

input.addEventListener('keyup', function(){
	 localStorage.input = input.value;
});

function convert() {
    let result = document.getElementById('result');
    result.value = input.value * list[selected][type] + ' ' + list[selected].base_ccy;
}

//  change  and save cy

let selectedCy;

if (localStorage.input){
	input.value = localStorage.input;
}

if (localStorage.selectedCy) {
	savedCy = localStorage.selectedCy.slice(1,-1);
	localStorage.selectedCy = cy.value = savedCy;
}



function cyChange() {
    selected = cy.selectedIndex;
    convert(selected);
    saveSelectedCy();
}

function saveSelectedCy() {
    selectedCy = list[selected].ccy;
    selectedCy = JSON.stringify(selectedCy);
    localStorage.selectedCy = selectedCy;
}

cyChange();

cy.addEventListener('change', cyChange);


// change type

let cyType = document.getElementById("type");

function cyTypeChange() {
    type = cyType.options[cyType.selectedIndex].value;
    convert( type);
}

cyTypeChange();

cyType.addEventListener('change', cyTypeChange);


// initial CY

// let initialCy = [
//     {"ccy":"USD","base_ccy":"UAH","buy":"26.05000","sale":"26.30000"},
//     {"ccy":"EUR","base_ccy":"UAH","buy":"30.20000","sale":"30.70000"},
//     {"ccy":"RUR","base_ccy":"UAH","buy":"0.40300","sale":"0.42500"},
//     {"ccy":"BTC","base_ccy":"USD","buy":"6005.7896","sale":"6637.9780"}
//     ];


// Data


function addDateFormat(int) {
    int = int.toString();
    if (int.charAt(1)) {
        return int;
    } else {
        return int = '0' + int;
    }
}

function newTimeOfRequest() {

    let today    = document.getElementById('today'),
        newDate  = new Date();
    today.innerText = '00:00:00 00.00.0000';


    today.innerText =
        addDateFormat(newDate.getHours()) + ':' +
        addDateFormat(newDate.getMinutes()) + ':' +
        addDateFormat(newDate.getSeconds()) + ' ' +
        newDate.toLocaleDateString();
}

function initialCy() {
    let cyLength = cy.options.length;
    for (let i = 0; i < cyLength; i++){
        // cy.options[i].value = i;
    }
    let localCy = localStorage.getItem(selectedCy);
    console.log(localCy);
}
}
