window.onload = function () {
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

    // JSON.parse
    list = JSON.parse(response);
    // Set new time
    newTimeOfRequest();

}

request();


(function () {
    for(let item in list ){

        let opt = document.createElement('option');
        opt.innerHTML = opt.value = list[item].ccy;
        // if  (list[item].ccy === "BTC") {
        //     opt.insertAdjacentHTML("afterbegin", 'даже ');
        // }
        cy.appendChild(opt);
    }
})();


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
}
