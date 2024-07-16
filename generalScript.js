// !* important note *!
// for some dumb reason, we can't get the id from the html (because we cloned the screens)
// to get the id's from the new screens, we recommend using this template:

//     var *element* = document.getElementsByClassName("*element-name-in-html*"); 
//     for (let i = 0; i < *element*.length; i++) {
//          *element*[i].style.*any style* = *style*;
//      }

// !* end of note *!

var role = "soldier"; //the role of the user
var unit; //the changing number of unit
var screenArrayName; //saving the name of the array that have the screens

var soldierUnit1 = [
    "map", 
    "opening-screen",
    "concepts-list",
    "explaining-screen",
    "explaining-screen",
    "rhombuses",
    "rhombuses1",
    "rhombuses2",
    "rhombuses3",
    "explaining-screen",
    "hazardous-material-factory",
    "explaining-screen",
    "explaining-screen",
    "hazardous-material-incident",
    "risk-areas-concept",
    "questions-screen",
    "ending-screen"
];

var soldierUnit2 = [
    "map",
    "opening-screen",
    "whatsapp", 
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "questions-screen",
    "ending-screen"
];

var soldierUnit3 = [
    "map",
    "opening-screen",
    "rescue-roles",
    "ending-screen"
];

var soldierUnit4 = [
    "map",
    "opening-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "drag-drop-game",
   "drag-drop-game",
   "questions-screen",
   "risk-areas-levels",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "ending-screen"
];

var soldierUnit5 = [
    "map",
    "opening-screen",
    "haremez",
   "ending-screen"
];

var commanderUnit1 = [
    "map", 
    "opening-screen",
    "concepts-list",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "rhombuses",
    "rhombuses1",
    "rhombuses2",
    "rhombuses3",
    "explaining-screen",
    "hazardous-material-factory",
    "explaining-screen",
    "explaining-screen",
    "hazardous-material-incident",
    "risk-areas-concept",
    "questions-screen",
   "ending-screen"     
];

var commanderUnit2 = [
   "map",
   "opening-screen",
   "whatsapp",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "hapak-whatsApp",
   "shual-opening",
   "questions-screen",
   "questions-screen",
   "ending-screen"
];

var commanderUnit3 = [
    "map",
   "opening-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "rescue-roles",
   "area-organizing",
   "questions-screen",
   "questions-screen",
   "questions-screen",
   "questions-screen",
   "ending-screen"
];

var commanderUnit4 = [
    "map",
    "opening-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "protection-wearing",
   "drag-drop-game",
   "drag-drop-game",
   "questions-screen",
   "risk-areas-levels",
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "ending-screen"
];

var commanderUnit5 = [
    "map",
    "opening-screen",
    "haremez",
   "ending-screen"
];

window.addEventListener("load", () => { // Initializing the lomda
    num = 1;
    role = sessionStorage.getItem("role");
    unit = 1;
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
})


const displayScreens = (screenArrayName) => { // function that gets the unit number and the role and displays the amount of the screens. The function creates a variable that contains the desired array and goes through each cell in the array and displays the screen with the corresponding name
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.unit-screens').forEach(screen => screen.remove()); // removes the previous screens
    var screenArray = window[screenArrayName];
    screenArray.forEach(screenId => {
        const screenNode = document.getElementById(screenId);
        const screenClone = screenNode.cloneNode(true);
        screenClone.classList.add('unit-screens');
        screenClone.style.display = 'block'; 
        document.body.appendChild(screenClone);
    });

    removeEventListeners(); // Remove previous event listeners
    addEventListeners(); // Add new event listeners
    addContent();
}

const addEventListeners = () => {
    document.body.addEventListener("click", clickHandler); // Attach event listener to the document because for some reason it doesn't work for separate elements
}
const removeEventListeners = () => {
    document.body.removeEventListener("click", clickHandler);
}

const clickHandler = (event) => {
    const targetId = event.target.id;
    switch (targetId) {
        case "end-btn":
            endUnit();
            break;
        case "back-btn":
            backToMap();
            break;
        case "map-pin":
            mapAnimation();
            break;
        case "carStop1":
            animate('carStop1');
            break;
        case "carStop2":
            animate('carStop2');
            break;
        case "carStop3":
            animate('carStop3');
            break;
        case "carStop4":
            animate('carStop4');
            break;
        case "carStop5":
            animate('carStop5');
            break;
        case "prev":
            carousel();
            break;
        case "next":
            carousel();
            break;
        default:
            break;
    }
}

const addContent = () => { // function that completes all the non-text content in the screen (background, characters)
    
    var characterBody = document.getElementsByClassName("character-body"); //change the main character body
    for (let i = 0; i < characterBody.length; i++) {
        document.getElementsByClassName("character-body")[i].src = `assets/general/characters/allCharacters/${role}.svg`;
    }
    
    var characterCircle = document.getElementsByClassName("character-circle"); //change the main character circles
    for (let i = 0; i < characterCircle.length; i++) {
        characterCircle[i].src = `assets/general/characters/circles/${role}.svg`;
    }
    
    var panelBackground = document.getElementsByClassName("panel"); //change the backgrounds
    for (let i = 0; i < panelBackground.length; i++) {
        panelBackground[i].style.backgroundImage = `url(assets/units/unit${unit}/background.svg)`;
    }

    addText();
}

const addText = async () => {
    const response = await fetch('newText.json');
    const data = await response.json();
    const key = `${role}-unit${unit}`;

    var startText = document.getElementsByClassName("start-text"); 
    for (let i = 0; i < startText.length; i++) {
        startText[i].textContent = data[key]["opening-screen"];
    } // adds the start text
    
    var endingText = document.getElementsByClassName("ending-text"); 
    for (let i = 0; i < endingText.length; i++) {
        endingText[i].textContent = data[key]["ending-screen"];
    } // adds the ending text

    var questionText = document.querySelectorAll('.unit-screens .question-text'); 
    var answersText = document.querySelectorAll('.unit-screens .answer-text'); 
    questionText.forEach((questionElement, index) => {
        let questionKey = `q${index + 1}`;
        questionElement.textContent = data[key][questionKey]["question-text"];
        
        let options = data[key][questionKey]["options"];
        answersText[index * options.length].textContent = options[0]; 
        answersText[index * options.length + 1].textContent = options[1];
        answersText[index * options.length + 2].textContent = options[2];
        answersText[index * options.length + 3].textContent = options[3];
    });  // adds the questions and answers text

    var explainingTitle = document.querySelectorAll('.unit-screens .explaining-title'); 
    var explainingText = document.querySelectorAll('.unit-screens .explaining-text'); 
    // var clothingExplaining = document.querySelectorAll('.unit-screens .clothing-explaining');

    for (let i = 0; i < explainingText.length; i++) {
        explainingTitle[i].textContent = data[key]["explaining-screens"][i]["title"];
        explainingText[i].textContent = data[key]["explaining-screens"][i]["text"];
        
        let newRole = data[key]["explaining-screens"][i]["role"];
        if (newRole) {
            document.getElementsByClassName("character-body")[i+1].src = `assets/general/characters/allCharacters/${newRole}.svg`;
            if (newRole == "protectionLevelA" || newRole == "protectionLevelB" || newRole == "protectionLevelC") {
                 var clothingExplainingDiv = document.querySelectorAll('.unit-screens .clothing-explaining-div'); 
                    for (let i = 0; i < clothingExplainingDiv.length; i++) {
                        clothingExplainingDiv[i].innerHTML = 
                        `<div class="clothing-explaining suit">חליפה כמוסה</div>
                        <div class="clothing-explaining breath">מנפ</div>
                        <div class="clothing-explaining gloves">כפפות</div>
                        <div class="clothing-explaining boots">מגפיים</div>` 
                    }       
        
            }
        }// Adding clothing explanations
       
        

    }   // adds the explaining text
}


const endUnit = () => {
    if (unit <= 4) {
        unit++;
        screenArrayName = `${role}Unit${unit}`;
        displayScreens(screenArrayName);
    }
}

// onclick functions
const backToMap = () => { // function for returning to map (by clicking the car) by changing the number of unit, also ables clicking on lower number of units the user already done

}

const mapAnimation = () => {
    var mapPin = document.getElementsByClassName("map-pin"); 
    var mapSquare = document.getElementsByClassName("map-square"); 

    for (let i = 0; i < mapPin.length; i++) {
        mapPin[i].style.animation = "resize-pin 3s forwards";
    }

    for (let i = 0; i < mapSquare.length; i++) {
        mapSquare[i].style.animation = "resize 2s forwards";
    }

    setTimeout(() => { 
        var imgBackground = document.getElementsByClassName("img-background"); 
        var explaineMap = document.getElementsByClassName("explaine-map"); 
    
        for (let i = 0; i < imgBackground.length; i++) {
            imgBackground[i].style.display = "flex";
            imgBackground[i].style.animation = "fade-in 1s forwards";
        }
        for (let i = 0; i < explaineMap.length; i++) {
            explaineMap[i].style.display = "block";
            explaineMap[i].style.animation = "fade-in 1s forwards";
        }
    }, 2200);
}

const animate = (stopNum) => {
    unit = stopNum.charAt(7);
    var animationContainer = document.getElementsByClassName('animation_container');
    for (var i = 0; i < animationContainer.length; i++) {
        animationContainer[i].setAttribute('src', `assets/car/zoomOutCarStop${unit}.mp4`);
        document.getElementById('animation_container').currentTime = 0;
    };
    if (unit === '2') {
        unit = 3
    } else if (unit === '3') {
        unit = 4
    } else if (unit === '4') {
        unit = 2
    }
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName)  
}

const carousel = (side) => {
    if (side === 'prev') {
        num--;
        if (num === 0) {
            num = 8;
        }
    } else {
        num++;
        if (num === 9) {
            num = 1;
        }
    }
    document.getElementById('img-container').innerHTML = '';
    document.getElementById('pic-shown').setAttribute('src', `assets/units/unit1/Picture${num}.jpg`);
}
