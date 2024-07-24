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
let visitedRhombuse1 = false;
let visitedRhombuse2 = false;
let visitedRhombuse3 = false;
let visitedConcept1 = false;
let visitedConcept2 = false;
let visitedConcept3 = false;
let visitedConcept4 = false;

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
    conceptScreenHandle(0);
})


const displayScreens = (screenArrayName) => { // function that gets the unit number and the role and displays the amount of the screens. The function creates a variable that contains the desired array and goes through each cell in the array and displays the screen with the corresponding name
    if (role == undefined) {
        alert("יש להתחבר לעמוד הראשי של הלומדה: \n https://madorpele1.github.io/HomasLomda/")
    }
    
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
            conceptScreenHandle(0);
            pacMap('pac-map');
            break;
        case "map-pin":
            mapAnimation();
            break;
        case "carStop1":
            animate('carStop1');
            pacMap('pac-map');
            break;
        case "carStop2":
            animate('carStop2');
            pacMap('pac-map');
            break;
        case "carStop3":
            animate('carStop3');
            pacMap('pac-map');
            break;
        case "carStop4":
            animate('carStop4');
            pacMap('pac-map');
            break;
        case "carStop5":
            animate('carStop5');
            pacMap('pac-map');
            break;
        case "prev":
            carousel();
            break;
        case "next":
            carousel();
            break;
        case "cold":
            pacMap('cold');
            break;
        case "focus":
            pacMap('focus');
            break;
        case "heat":
            pacMap('heat');
            break;
        case "warm":
            pacMap('warm');
            break;
        case "pac-map":
            pacMap('pac-map');
            break;
                case "definition1":
            conceptScreenHandle(1);
            break;
        case "definition2":
            conceptScreenHandle(2);
            break;
        case "definition3":
            conceptScreenHandle(3);
            break;
        case "definition4":
            conceptScreenHandle(4);
            break;
        case "end-concept-btn": 
            conceptScreenHandle(-1);
            break;
        case "rhombuse1":
            manageRhombuses(1);
            break;
        case "rhombuse2":
            manageRhombuses(2);
            break;
        case "rhombuse3":
            manageRhombuses(3);
            break;
        case "back-rhombuse-btn":
            manageRhombuses(0);
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
    for (let i = 0; i < explainingText.length; i++) {
        explainingTitle[i].textContent = data[key]["explaining-screens"][i]["title"];
        explainingText[i].textContent = data[key]["explaining-screens"][i]["text"]; // adds the explanation text
        
        let newRole = data[key]["explaining-screens"][i]["role"];
        if (newRole) {
            document.getElementsByClassName("character-body")[i+1].src = `assets/general/characters/allCharacters/${newRole}.svg`; // changes hte relevent characters
            
            if (newRole == "protectionLevelA" || newRole == "protectionLevelB" || newRole == "protectionLevelC") {
                var clothingExplainingDiv = document.querySelectorAll('.unit-screens .clothing-explaining-div'); 
                clothingExplainingDiv[6].innerHTML = `<div transition-style="in:wipe:left" class="clothing-explaining suit">חליפה כמוסה</div><div class="clothing-explaining breath">מנ"פ</div><div class="clothing-explaining gloves">כפפות</div><div class="clothing-explaining boots">מגפיים</div>`
                clothingExplainingDiv[7].innerHTML = `<div transition-style="in:wipe:left" class="clothing-explaining suit">חליפת סרבל</div><div class="clothing-explaining breath">מנפ</div><div class="clothing-explaining gloves">כפפות</div><div class="clothing-explaining boots">מגפיים</div>`
                clothingExplainingDiv[8].innerHTML = `<div transition-style="in:wipe:left" class="clothing-explaining suit">"מסכה ומסנן/אבן ספיר"</div><div class="clothing-explaining breath">חליפת סרבל</div><div class="clothing-explaining gloves">כפפות</div><div class="clothing-explaining boots">מגפיים</div>`
            } 
        } // adds the protection level explanation tags
    }
}


const endUnit = () => {
    if (unit <= 4) {
        unit++;
        screenArrayName = `${role}Unit${unit}`;
        displayScreens(screenArrayName);
    }
    animate(`stopNum${unit}`);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
    displayScreens(screenArrayName);
    if (unit === '1') {
        conceptScreenHandle(0);
    }
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

const pacMap = (chosen) => {
    var explainContainer = document.getElementsByClassName("explaine-container"); 
    for (let i = 0; i < explainContainer.length; i++) {
         explainContainer[i].style.display = "none";
    }
    if (chosen !== 'pac-map') {
        var specificExplainContainer = document.getElementsByClassName(`${chosen}-explain`); 
        for (let i = 0; i < specificExplainContainer.length; i++) {
            specificExplainContainer[i].style.display = "block";
        }
    }
    if (unit === '3') {
        var explainText = document.getElementsByClassName(`general-job`); 
        for (let i = 0; i < explainText.length; i++) {
                explainText[i].style.display = "none";
        }
        for (let x = 1; x <= 2; x++) {
            var explainText = document.getElementsByClassName(`job${x}`);
            for (let i = 0; i < explainText.length; i++) {
                explainText[i].style.display = "none";
            } 
        }
        if (chosen === 'cold') {
            var explainText = document.getElementsByClassName(`job1`);
        } else if (chosen === 'pac-map') {
            var explainText = document.getElementsByClassName(`general-job`);
        } else {
            var explainText = document.getElementsByClassName(`job2`);
        }
        for (let i = 0; i < explainText.length; i++) {
            explainText[i].style.display = "block";
        } 
    }
}

const changeTextPac = (chosen) => {
    switch (chosen) {
        case 'next':
            var textDisplay = document.getElementsByClassName("job4");
            var arrowHide = document.getElementsByClassName("forward-arrow");
            var arrowShow = document.getElementsByClassName("back-arrow");
            break;
        case 'back':
            var textDisplay = document.getElementsByClassName("job3");
            var arrowHide = document.getElementsByClassName("back-arrow");
            var arrowShow = document.getElementsByClassName("forward-arrow");

            break;
    }
    for (let x = 3; x <= 4; x++) {
        var explainText = document.getElementsByClassName(`job${x}`);
        for (let i = 0; i < explainText.length; i++) {
            explainText[i].style.display = "none";
        }
    } 
    for (let i = 0; i < textDisplay.length; i++) {
        textDisplay[i].style.display = "block";
    }
    for (let i = 0; i < arrowHide.length; i++) {
        arrowHide[i].style.display = "none";
    }
    for (let i = 0; i < arrowShow.length; i++) {
        arrowShow[i].style.display = "block";
    }
}
const conceptScreenHandle = (definitionNum) => {
    var allPanels = document.getElementsByTagName('section');
    switch (definitionNum) {
        case -1:
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[41].style.display = 'block';
                allPanels[42].style.display = 'block';
            }
            break;
        case 0:
            var checkMark = document.getElementsByClassName("checkMark1");
            for (let i = 0; i < checkMark.length; i++) { 
                if (visitedRhombuse1 &&  visitedRhombuse2 && visitedRhombuse3) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept1 = true;
            }
            var endConceptButton = document.getElementsByClassName('end-concept-btn');
            for (let i = 0; i < endConceptButton.length; i++) { 
                if (visitedConcept1 &&  visitedConcept2 && visitedConcept3 && visitedConcept4) {
                    endConceptButton[i].style.display = 'block';
                }
            }
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[26].style.display = 'block';
                allPanels[27].style.display = 'block';
                allPanels[28].style.display = 'block';
            }
            break;
        case 1:
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[29].style.display = 'block';
                allPanels[30].style.display = 'block';
                allPanels[31].style.display = 'block';
            }
            break;
        case 2:
            var checkMark = document.getElementsByClassName("checkMark2"); 
            for (let i = 0; i < checkMark.length; i++) {
                checkMark[i].style.display = 'inline';
            }
            visitedConcept2 = true;
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[35].style.display = 'block';
                allPanels[36].style.display = 'block';
            }
            break;
        case 3:
            var checkMark = document.getElementsByClassName("checkMark3"); 
            for (let i = 0; i < checkMark.length; i++) {
                checkMark[i].style.display = 'inline';
            }
            visitedConcept3 = true;
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[37].style.display = 'block';
            }
            break;
        case 4:
            var checkMark = document.getElementsByClassName("checkMark4"); 
            for (let i = 0; i < checkMark.length; i++) {
                checkMark[i].style.display = 'inline';
            }
            visitedConcept4 = true;
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[38].style.display = 'block';
                allPanels[39].style.display = 'block';
                allPanels[40].style.display = 'block';
            }
            break;
        default:
            break;
    }   
}

const manageRhombuses = (rhombuseNum) => {
    var allPanels = document.getElementsByTagName('section');
    switch (rhombuseNum) {
        case 0:
            for (let i = 3; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[29].style.display = 'block';
                allPanels[30].style.display = 'block';
                allPanels[31].style.display = 'block';
            }
            break;
        case 1:
            var rhombuses = document.getElementsByClassName("rhombuse1"); 
            for (let i = 0; i < rhombuses.length; i++) {
                rhombuses[i].setAttribute('src', 'assets/units/unit1/homasTypes/flammableGasesCheck.svg');
            }
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[33].style.display = 'block';
            }
            visitedRhombuse1 = true;
            break;
        case 2:
            var rhombuses = document.getElementsByClassName("rhombuse2"); 
            for (let i = 0; i < rhombuses.length; i++) {
                rhombuses[i].setAttribute('src', 'assets/units/unit1/homasTypes/toxicGasesCheck.svg');
            }
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[34].style.display = 'block';
            }
            visitedRhombuse2 = true;
            break;
        case 3:
            var rhombuses = document.getElementsByClassName("rhombuse3"); 
            for (let i = 0; i < rhombuses.length; i++) {
                rhombuses[i].setAttribute('src', 'assets/units/unit1/homasTypes/explosiveSubstancesCheck.svg');
            }
            for (let i = 0; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[32].style.display = 'block';
            }
            visitedRhombuse3 = true;
            break;
        default:
            break;
    }   
}

const contactManager = (contact) => {
    var allPanels = document.getElementsByTagName('section');
    switch (rhombuseNum) {
        case 0:
            break;
        case 1:
            for (let i = 3; i < allPanels.length; i++) {
                allPanels[i].style.display = 'none';
                allPanels[29].style.display = 'block';
            }
            break;
    }
}
