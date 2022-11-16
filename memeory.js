let images = ["images/1.JPG", "images/2.JPG", "images/3.JPG", "images/4.JPG", "images/5.JPG", "images/6.JPG"];
//cards ids
let ids = ["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9", "id10", "id11", "id12"]
//images ids
let idis = ["idi1", "idi2", "idi3", "idi4", "idi5", "idi6", "idi7", "idi8", "idi9", "idi10", "idi11", "idi12"]
let k = 0
let row, column;
let d = 1;
let replayVar = 0
let stopVar = 0
let hintCount = 1
let movesCount = 1
let flipAllCount =1
play(3, 4)
let flippedCards = []
let flipAllVar = 0
// 100% - seconds 60 
//       -seconds remaining   
//calculer score en fct du temps

function score(seconds) {
    secondsUsed = 60 - parseInt(seconds)
    scoreVar = (500 / movesCount) + (500/secondsUsed) +(500/(hintCount))^2 + (500/flipAllCount)
    return parseInt(scoreVar)
}
function unflipAll() {
    for (i = 0; i < idis.length; i++) {
        image = document.getElementById(idis[i])
        image.style.display = "none"
    }
    flipAllVar = 0
    timer(parseInt(document.getElementById("timer").innerHTML))


}
function flipAll() {
    flipAllCount+=1
    for (i = 0; i < idis.length; i++) {
        image = document.getElementById(idis[i])
        image.style.display = "block"
    }
    flipAllVar = 1

    setTimeout(unflipAll, 2000)
}

function hint() {
    hintCount += 1
    for (i = 0; i < idis.length; i++) {
        if (document.getElementById(idis[i]).style.display == "none") {
            console.log(document.getElementById(idis[i]))
            image1 = document.getElementById(idis[i])
            card1 = document.getElementById(ids[i])

            for (j = 0; j < idis.length; j++) {
                image2 = document.getElementById(idis[j])

                if ((image1.src == image2.src) && (image1.id != image2.id)) {
                    console.log("id1 " + image1.id)
                    console.log("id2 " + image2.id)
                    card1.firstChild.style.display = "block";
                    card2 = document.getElementById(ids[j])
                    card2.firstChild.style.display = "block";
                    return 0
                }
            }
        }
    }
}
function pause() {
    if (stopVar == 0) {
        document.getElementById("gameOver").innerHTML = "STOP"
        document.getElementById("gameOver").style.display = "block"
        stopVar = 1
    }
    else {
        document.getElementById("gameOver").style.display = "none"
        stopVar = 0
        timer(parseInt(document.getElementById("timer").innerHTML))

    }
}
function construct(a, b) {
    row = a
    column = b
    usedImages = []
    container = document.getElementById("container");
    for (i = 0; i < a; i++) {

        var ligne = document.createElement('div');
        container.append(ligne);
        ligne.style.display = "flex"
        for (j = 0; j < b; j++) {

            // create cards
            var carte = document.createElement('div');
            carte.className = "carte";
            carte.id = ids[k]
            carte.onclick = flip.bind(this, carte)
            ligne.append(carte);

            // create images
            var image = document.createElement('img');
            image.className = "image";
            image.style.display = "none"
            element = getRandomImage(images, usedImages);
            image.src = element
            image.id = idis[k]
            usedImages.push(element)
            carte.append(image);
            k += 1

        }

    }

}


// return a list of images npt used twice
function notUsedTwice(images, usedImages) {

    notUsedTwiceVar = []

    //checking how many times an image is repeated 
    for (var i = 0; i < images.length; i++) {

        var drapo = 0
        for (var j = 0; j < usedImages.length; j++) {

            if (images[i] == usedImages[j]) {

                drapo += 1;

            }
        }
        //if not repreated or repeated its added to the list
        if (drapo < 2) {
            notUsedTwiceVar.push(images[i])


        }

    }

    return notUsedTwiceVar;
}
function getRandomImage(images, usedImages) {

    notUsedTwiceVar = notUsedTwice(images, usedImages);

    randomIndex = Math.floor(Math.random() * notUsedTwiceVar.length);
    return notUsedTwiceVar[randomIndex]
}
function allFlipped() {
    for (i = 0; i < idis.length; i++) {
        if (document.getElementById(idis[i]).style.display == "none") {

            return 0
        }
    }
    return 1
}
function timer(seconds) {
    if (stopVar == 0) {

        if (allFlipped() == 0) {
            document.getElementById("timer").innerHTML = seconds

            seconds = seconds - 1
            if ((seconds >= 0) && (replayVar == 0)) {
                setTimeout(timer.bind("this", seconds), 1000)
            }
            else if (replayVar == 0) {
                document.getElementById("gameOver").innerHTML = "Game Over !"
                document.getElementById("gameOver").style.display = "block"
                setTimeout(replay.bind("this", 3, 4), 1000)
            }
            else {
                document.getElementById("gameOver").innerHTML = "START !"
                document.getElementById("gameOver").style.display = "block"
                replayVar = 0;
                setTimeout(replay.bind("this", 3, 4), 1000)

            }
            document.getElementById("replay").addEventListener("click", function checkReplay() {
                replayVar = 1
            })
        }
        else {
            flippedCards = []
            if (flipAllVar == 0) {
                document.getElementById("gameOver").innerHTML = "BRAVO! <br> vous avez gagne : " + score(seconds) +"points" 

                document.getElementById("gameOver").style.display = "block"
                document.getElementById("replay").addEventListener("click", replay.bind("this", 3, 4))
            }
            else {
                document.getElementById("replay").addEventListener("click", replay.bind("this", 3, 4))

            }
        }

    }
    else {
        document.getElementById("replay").addEventListener("click", replay.bind("this", 3, 4))
    }

}
function play(a, b) {

    construct(a, b);
    timer(60)

}

// add event if card is clicked
// sorry for this ugliness



function flip(card) {
    movesCount += 1
    if ((flippedCards.length != 2) && (stopVar == 0)) {

        image = card.firstChild;
        image.style.display = "block"
        flippedCards.push(image)
        if (flippedCards.length == 2) {

            if (flippedCards[0].id == flippedCards[1].id) {
                setTimeout(unflip, 400);

            }
            else
                if (isIdentical() == 0) {
                    setTimeout(unflip, 200);

                }

                else flippedCards = []
        }
    }

}
function unflip() {
    flippedCards[0].style.display = "none";
    flippedCards[1].style.display = "none";
    flippedCards = []
}
function isIdentical() {
    if (flippedCards[0].src == flippedCards[1].src)
        return 1
    else return 0
}

// setInterval(playAgain, 1000)
function replay(a, b) {
    stopVar = 0
    document.getElementById("gameOver").style.display = "none"
    for (var i = 0; i < ids.length; i++) {
        var carte = document.getElementById(ids[i]);
        var image = document.getElementById(idis[i]);
        carte.remove();
        image.remove();

    }
    flippedCards = []
    k = 0
    play(a, b)

}

