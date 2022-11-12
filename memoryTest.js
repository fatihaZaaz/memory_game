let images = ["images/1.JPG", "images/2.JPG", "images/3.JPG", "images/4.JPG", "images/5.JPG", "images/6.JPG"];
let ids = ["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9", "id10", "id11", "id12"]
let idis = ["idi1", "idi2", "idi3", "idi4", "idi5", "idi6", "idi7", "idi8", "idi9", "idi10", "idi11", "idi12"]
let k = 0
let row, column;
play(3, 4)


let flippedCards = []

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
            ligne.append(carte);

            // create images
            var image = document.createElement('img');
            image.className = "image";
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
function play(a, b) {
    construct(a, b);
}

// add event if card is clicked
// sorry for this ugliness

card1 = document.getElementById("id1");
card1.addEventListener('click', flip.bind(this, card1));
card2 = document.getElementById("id2");
card2.addEventListener('click', flip.bind(this, card2));
card3 = document.getElementById("id3");
card3.addEventListener('click', flip.bind(this, card3));
card4 = document.getElementById("id4");
card4.addEventListener('click', flip.bind(this, card4));
card5 = document.getElementById("id5");
card5.addEventListener('click', flip.bind(this, card5));
card6 = document.getElementById("id6");
card6.addEventListener('click', flip.bind(this, card6));
card7 = document.getElementById("id7");
card7.addEventListener('click', flip.bind(this, card7));
card8 = document.getElementById("id8");
card8.addEventListener('click', flip.bind(this, card8));
card9 = document.getElementById("id9");
card9.addEventListener('click', flip.bind(this, card9));
card10 = document.getElementById("id10");
card10.addEventListener('click', flip.bind(this, card10));
card11 = document.getElementById("id11");
card11.addEventListener('click', flip.bind(this, card11));
card12 = document.getElementById("id12");
card12.addEventListener('click', flip.bind(this, card12));
function flip(card) {
    if (flippedCards.length != 2)
    {

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
// function playAgain(a, b) {

//     for (var i = 0; i < ids.length; i++) {
//         console.log[ids[i]]
//         var carte = document.getElementById(ids[i]);
//         var image = document.getElementById(idis[i]);
    
//         carte.remove();
//         image.remove();

//     }
//     flippedCards = []


//     play(a, b)
// 