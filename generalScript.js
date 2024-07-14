// !* important note *!
// for some dumb reason, we can't get the id from the html (because we cloned the screens)
// to get the id's from the new screens, we recommend using this template:

//     var *element* = document.getElementsByClassName("*element-name-in-html*"); 
//     for (let i = 0; i < *element*.length; i++) {
//          *element*[i].style.*any style* = *style*;
//      }

// !* end of note *!

var role; //the role of the user
var unit; //the changing number of unit
var screenArrayName; //saving the name of the array that have the screens

var soldierUnit1 = [
    "map", 
    "opening-screen",
    "concepts-list",
    "explaining-screen",
    "explaining-screen",
    "rhombuses",
    "rhombuses",
    "rhombuses",
    "rhombuses",
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
    "rhombuses",
    "rhombuses",
    "rhombuses",
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
    role = sessionStorage.getItem("role");
    if (role === null) {
        role = 'soldier';
    };
    unit = 1;
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);  
})


const displayScreens = (screenArrayName) => { // function that gets the unit number and the role and displays the amount of the screens. The function creates a variable that contains the desired array and goes through each cell in the array and displays the screen with the corresponding name
    document.querySelectorAll('.unit-screens').forEach(screen => screen.remove()); // removes the previous screens
    var screenArray = window[screenArrayName];
    screenArray.forEach(screenId => {
        const screenNode = document.getElementById(screenId);
        const screenClone = screenNode.cloneNode(true);
        screenClone.classList.add('unit-screens');
        screenClone.style.display = 'block'; // Set display here
        document.body.appendChild(screenClone);
    });

    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
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
        default:
            break;
    }
}

const addContent = () => { // function that completes all the non-text content in the screen (background, chcracters)
    
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
    var endingText = document.getElementsByClassName("ending-text");
    var questionText = document.getElementsByClassName("question-text");
    var answersText = document.getElementsByClassName("answer-text");

    for (let i = 0; i < startText.length; i++) {
        startText[i].textContent = data[key]["opening-screen"];
    }

    for (let i = 0; i < endingText.length; i++) {
        endingText[i].textContent = data[key]["ending-screen"];
    }

    for (let i = 1; i < questionText.length; i++) {
        let questionKey = `q${i}`
        questionText[i].textContent =data[key][questionKey]["question-text"];
            
            for (let i = 1; i < answersText.length-3; i++) {
                answersText[i+3].textContent = data[key][questionKey]["options"][i-1];
            }
    }




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
    screenArrayName = `${role}Unit${unit}`;
    console.log(screenArrayName);
    displayScreens(screenArrayName);  
}

