;(function () {


    var arrowHours = document.getElementById("hours");
    var arrowMinutes = document.getElementById("minutes");
    var arrowSeconds = document.getElementById("seconds");


    setInterval(function (e) {
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        arrowHours.style.transform = 'rotate(' + (hours * 30 + 90) + 'deg' + ')';
        arrowMinutes.style.transform = 'rotate(' + (min * 6) + 'deg' + ') ';
        arrowSeconds.style.transform = 'rotate(' + (sec * 6) + 'deg' + ')';
    }, 1000);

})();

