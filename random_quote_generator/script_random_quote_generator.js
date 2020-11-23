window.onload = function() {
    document.getElementById("container").style.height = (document.documentElement.clientHeight - 100) + "px";

    function randomQuote() {
        var quoteArr = ["An inconvenience is only an adventure wrongly considered; an adventure is an inconvenience rightly considered.", "When one person suffers from a delusion it is called insanity; when many people suffer from a delusion it is called religion.", "Of all the gin joints in all the towns in all the world, she walks into mine.", "A friendship founded on business is better than a business founded on friendship.", "There are no facts, only interpretations.", "Love means never having to say you're sorry."];
        var citeArr = ["- Gilbert Keith Chesterton", "- Robert Pirsig", "- Casablanca", "- John D. Rockefeller", "- Friedrich Nietzsche", "- Love Story"];
        var bgColorArr = ["#F39C12", "#9B59B6", "#E74C3C", "#27AE60", "#9B59B6", "#73A857"];
        var randomNum = Math.floor(Math.random() * quoteArr.length);
        document.getElementById("quote").innerHTML = quoteArr[randomNum];
        document.getElementById("cite").innerHTML = citeArr[randomNum];
        document.getElementById("quoteMark").style.color = bgColorArr[randomNum];
        document.getElementById("quote").style.color = bgColorArr[randomNum];
        document.getElementById("cite").style.color = bgColorArr[randomNum];
        document.getElementById("facebook").style.backgroundColor = bgColorArr[randomNum];
        document.getElementById("twitter").style.backgroundColor = bgColorArr[randomNum];
        document.getElementById("random").style.backgroundColor = bgColorArr[randomNum];
        document.body.style.backgroundColor = bgColorArr[randomNum];
    }

    document.getElementById("random").addEventListener("click", randomQuote);
};