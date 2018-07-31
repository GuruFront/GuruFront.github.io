;(function () {


    var arrowHours = document.getElementById("hours");
    var arrowMinutes = document.getElementById("minutes");
    var arrowSeconds = document.getElementById("seconds");


    // setInterval(function (e) {
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        arrowHours.style.transform = 'rotate(' + (hours * 15 - 90) + 'deg' + ')';
        arrowMinutes.style.transform = 'rotate(' + (min * 6 - 90) + 'deg' + ') ';
        arrowSeconds.style.transform = 'rotate(' + ((sec / 60) * 360 + 90) + 'deg' + ')';
    // }, 1000);

})();

