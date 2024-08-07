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
let visitedConcept5 = false;
let visitedConcept6 = false;
let visitedConcept7 = false;
let visitedConcept8 = false;
let updatedScore = 0;
var score = 0;
const numOfQuestionsFor = {
    soldier: 4,
    commander: 9
};
let completeWhatsappClicks = [];
let isWhatsappVisited;


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
   "questions-screen",
//    "risk-areas-levels",
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
    "rhombuses",
    "rhombuses1",
    "rhombuses2",
    "rhombuses3",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
    "explaining-screen",
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
   "questions-screen",
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
    whatsappContactsHandle();
})


const iOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

const displayScreens = (screenArrayName) => { 
    if (role == undefined) {
        alert("יש להתחבר לעמוד הראשי של הלומדה: \n https://madorpele1.github.io/HomasLomda/");
    }
    
    document.querySelectorAll('.unit-screens').forEach(screen => screen.remove()); // removes the previous screens
    var screenArray = window[screenArrayName];
    screenArray.forEach(screenId => {
        const screenNode = document.getElementById(screenId);
        const screenClone = screenNode.cloneNode(true);
        screenClone.classList.add('unit-screens');
        screenClone.style.display = 'block'; 
        document.body.appendChild(screenClone);
    });

    if (iOS()) {
        // The user is on an iOS device.
        document.getElementsByClassName("car-video")[1].style.display = "none";
        document.getElementsByClassName("car-img")[1].style.display = "flex";
    } else {
        document.getElementsByClassName("car-video")[1].style.display = "block";
    }

    removeEventListeners(); // Remove previous event listeners
    addEventListeners(); // Add new event listeners
    addContent();

    let numOfQuestions = numOfQuestionsFor[role];
    score = (updatedScore / (numOfQuestions * 10)) * 100;
}


const addEventListeners = () => {
    document.body.addEventListener("click", clickHandler); // Attach event listener to the document because for some reason it doesn't work for separate elements
}
const removeEventListeners = () => {
    document.body.removeEventListener("click", clickHandler);
}

const clickHandler = (event) => {
    const targetId = event.target.id;
    const target = event.target;
    switch (targetId) {
        case "end-btn":
            endUnit();
            break;
        case "back-btn":
            if (unit == 1) {
                conceptScreenHandle(0);
            }
            pacMap('pac-map');
            whatsappContactsHandle();
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
        case "definition2":
        case "definition3":
        case "definition4":
        case "definition5":
        case "definition6":
        case "definition7":
        case "definition8":
            conceptScreenHandle(parseInt(targetId.replace('definition', '')));
            break;
        case "end-concept-btn": 
            conceptScreenHandle(-1);
            break;
        case "rhombuse1":
        case "rhombuse2":
        case "rhombuse3":
            manageRhombuses(parseInt(targetId.replace('rhombuse', '')));
            break;
        case "back-rhombuse-btn":
            manageRhombuses(0);
            break;
        case "back-arrow":
            changeTextPac('back');
            break;
        case "forward-arrow":
            changeTextPac('next');
            break;
        case "start-dragging-btn":
            setupDragAndDrop();
            break;
        case "shual-computer-img":
            shualOpening();
            break;
            case "option1":
            case "option2":
            case "option3":
            case "option4":
                    questionAnswer(parseInt(targetId.replace('option', '')), target);
            break;
            case "heat-area":
                areaOrganizing("heat-area");
                break;
            case "warm-area":
                areaOrganizing("warm-area");
                break;
            case "mabar-area":
                areaOrganizing("mabar-area");
                break;
           case "contact1":
           case "contact2":
           case "contact3":
           case "contact4":
           case "contact5":
           case "contact6":
           case "contact7":
            whatsappContactsHandle(parseInt(targetId.replace('contact', '')), target);
                break;
        default:
            break
    }
}

const addContent = () => { // function that completes all the non-text content in the screen (background, characters)
    
    var characterBody = document.getElementsByClassName("character-body"); //change the main character body
    for (let i = 0; i < characterBody.length; i++) {
        document.getElementsByClassName("character-body")[i].src = `assets/general/characters/allCharacters/${role}.svg`;
    }
    if (unit == 4) { // change specific details
        document.getElementsByClassName("character-body")[2].style.width = "50vw"
        document.getElementsByClassName("character-body")[4].style.width = "50vw"
        document.getElementsByClassName("character-body")[5].style.width = "55vw"
        document.getElementsByClassName("character-body")[6].style.width = "50vw"
        document.getElementsByClassName("character-body")[6].style.left = "58%"
        
        const titleToRemove = document.getElementsByClassName("title-background-general")
        for (let index = 1; index <= 6; index++) {
            titleToRemove[index].style.display = "none";
        }

        const btnsToRemove = document.getElementsByClassName("back-btn")
        for (let jindex = 1; jindex < btnsToRemove.length; jindex++) {
            btnsToRemove[jindex].style.display = "none";
        }

        document.getElementsByTagName("section")[29].innerHTML +=
            `<img class="example-clothing" style="" src="assets/units/unit4/bmp/boots.svg" alt="boots">
            <img class="example-clothing" style="" src="assets/units/unit4/bmp/mask.svg" alt="mask">
            <img class="example-clothing" style="" src="assets/units/unit4/bmp/gloves.svg" alt="gloves">`;

        document.getElementsByTagName("section")[30].innerHTML +=
            `<img class="example-clothing" style="" src="assets/units/unit4/bmp/mask.svg" alt="mask">
            <img class="example-clothing" style="" src="assets/units/unit4/m15.svg" alt="m15-mask">`;
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
    var answersDiv = document.querySelectorAll('.unit-screens .answers'); 
    questionText.forEach((questionElement, index) => {
        let questionKey = `q${index + 1}`;
        questionElement.textContent = data[key][questionKey]["question-text"];
        
        let options = data[key][questionKey]["options"];
        answersText[index * options.length].textContent = options[0]; 
        answersText[index * options.length + 1].textContent = options[1];
        answersText[index * options.length + 2].textContent = options[2];
        answersText[index * options.length + 3].textContent = options[3];

        answersDiv[index * options.length].classList.add(questionKey);
        answersDiv[index * options.length + 1].classList.add(questionKey);
        answersDiv[index * options.length + 2].classList.add(questionKey);
        answersDiv[index * options.length + 3].classList.add(questionKey);

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
    unit++;
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
    animate(`stopNum${unit}`);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if (unit == 5) {
        document.getElementsByClassName("end-btn")[1].style.display = "none";
        score = Math.round(score);

        if (score <= 50) {
            document.getElementsByClassName("score")[1].innerHTML = `${score} <br> כדאי לך לחזור על הלומדה... `;
            document.getElementsByClassName("ending-div")[1].innerHTML +=
            `<button id="start-over-btn" class="btn" style="bottom: 6vh;">נסו שנית</button>`;
            document.getElementById("start-over-btn").addEventListener("click", startOver);
        } else {
            document.getElementsByClassName("score")[1].innerHTML = `כל הכבוד! ${score}`;
        }
    }
}

const backToMap = () => { // function for returning to map (by clicking the car) by changing the number of unit, also ables clicking on lower number of units the user already done
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
    var carImg = document.getElementsByClassName('car-img');

    if (iOS()) {
        for (var i = 0; i <= carImg.length -1; i++) {
            carImg[i].setAttribute('src', `assets/car/zoomOutCarStop${unit}.jpg`);
        };     
    }

    else if (!(iOS())) {
        for (var i = 0; i <= animationContainer.length -1; i++) {
            animationContainer[i].setAttribute('src', `assets/car/zoomOutCarStop${unit}.mp4`);
            document.getElementById('animation_container').currentTime = 0;
        };
    }

    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
    if (unit === '1') {
        conceptScreenHandle(0);
    }
    else if (unit === '2') {
        whatsappContactsHandle();
    } else if (unit === '5') {
            document.getElementsByClassName("end-btn")[1].style.display = "none";
            score = Math.round(score);
    
            if (score <= 50) {
                document.getElementsByClassName("score")[1].innerHTML = `${score} <br> כדאי לך לחזור על הלומדה... `;
                document.getElementsByClassName("ending-div")[1].innerHTML +=
                `<button id="start-over-btn" class="btn" style="bottom: 6vh;">נסו שנית</button>`;
                document.getElementById("start-over-btn").addEventListener("click", startOver);
            } else {
                document.getElementsByClassName("score")[1].innerHTML = `כל הכבוד! ${score}`;
            }
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
    let allPanels = document.getElementsByTagName('section');

    if (role == "soldier") {
        document.getElementsByClassName("concept")[12].style.display = "none";
        document.getElementsByClassName("concept")[13].style.display = "none";
        document.getElementsByClassName("concept")[14].style.display = "none";
        document.getElementsByClassName("concept")[15].style.display = "none";
        // displaying "none" the non-relavent concepts for soldiers

        switch (definitionNum) {
            case -1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[40].style.display = 'block';
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
                }
                break;
            default:
                break;

            }

    } else if (role == "commander") {
        switch (definitionNum) {
            case -1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[46].style.display = 'block';
                    allPanels[47].style.display = 'block';
                    allPanels[48].style.display = 'block';
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
                    if (visitedConcept1 &&  visitedConcept2 && visitedConcept3 && visitedConcept4 && visitedConcept5 && visitedConcept6 && visitedConcept7 && visitedConcept8) {
                        endConceptButton[i].style.display = 'block';
                    }
                }
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'block';
                    allPanels[26].style.display = 'block';
                    allPanels[27].style.display = 'block';
                    allPanels[31].style.display = 'block';
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
                    allPanels[42].style.display = 'block';
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
                    allPanels[36].style.display = 'block';
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
                    allPanels[37].style.display = 'block';
                    allPanels[45].style.display = 'block';
                }
                break;

            case 5:
                var checkMark = document.getElementsByClassName("checkMark5"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept5 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[38].style.display = 'block';  
                    allPanels[39].style.display = 'block';  // add graphics of hapak here
                }
                break;

            case 6:
                var checkMark = document.getElementsByClassName("checkMark6"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept6 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[40].style.display = 'block';  // add graphics of mitham homas here
                }
                break;

            case 7:
                var checkMark = document.getElementsByClassName("checkMark7"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept7 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[43].style.display = 'block'; 
                    allPanels[44].style.display = 'block'; 
                }
                break;

            case 8:
                var checkMark = document.getElementsByClassName("checkMark8"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept8 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                    allPanels[41].style.display = 'block'; 
                }
                break;

            default:
                break;

            }

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

const setupDragAndDrop = () => {
    const resetDraggingBtn = document.getElementsByClassName("reset-dragging-btn")[1]; 
    const finishDraggingBtn = document.getElementsByClassName("finish-dragging-btn")[1];
    
    const draggableClothing = document.getElementsByClassName("dragging-character-body");
    const droppedClothing = document.getElementsByClassName("character-body-part");
    const nums = document.getElementsByClassName("num");
    
    const startDraggingBtn = document.getElementsByClassName("start-dragging-btn")[1]; 
    startDraggingBtn.style.display = "none";
    
    for (let i = 0; i < nums.length; i++) {
        nums[i].style.display = "block";
    }

    let draggedItem = null;
    let selectedOrder = []; // Array to track the order of selected items

    // Add event listeners for touching the dragged element
    for (let i = 0; i < draggableClothing.length; i++) {
        draggableClothing[i].addEventListener("touchstart", touchStart);
    }

    function touchStart(e) {
        draggedItem = this;
        draggedItem.style.display = "none";
    }

    // Add event listeners for dropping the dragged element
    for (let i = 0; i < draggableClothing.length; i++) {
        draggableClothing[i].addEventListener("touchend", touchEnd);
    }

    function touchEnd(e) {
        if (!draggedItem) return;
        let type = draggedItem.alt.replace("protection-character-", "");
        selectedOrder.push(type);

        // Find the corresponding character part to change
        const characterPart = document.getElementsByClassName(type);
        if (characterPart.length) {
            for (let i = 0; i < characterPart.length; i++) {
                characterPart[i].src = draggedItem.src;
                const numElement = characterPart[i].nextElementSibling;
                if (numElement && numElement.classList.contains('num')) {
                    numElement.innerHTML = selectedOrder.length;
                }
            }
        }
        
        if (selectedOrder.length === 5) {
            finishDraggingBtn.style.display = "block";
            finishDraggingBtn.addEventListener("click", checkOrder);
        }
        draggedItem = null;
    }

    function checkOrder() {
        finishDraggingBtn.style.display = "none";
        if (
            selectedOrder[0] === "pants" && 
            selectedOrder[1] === "shoes" && 
            selectedOrder[2] === "shirt" && 
            selectedOrder[3] === "head" && 
            selectedOrder[4] === "hands"
        ) {
            const successMessage = document.getElementsByClassName("success-message")[1]; 
            successMessage.style.display = "block";
            resetDraggingBtn.style.display = "none";
            updatedScore = updatedScore  + 10;
        }
        else {
            const failureMessage = document.getElementsByClassName("failure-message")[1];
            failureMessage.style.display = "revert"; 
            resetDraggingBtn.style.display = "none";
        }
    }

    function resetGame() {
        // Reset the array and game state
        selectedOrder = [];
        
        // Reset draggable clothing elements
        for (let i = 0; i < draggableClothing.length; i++) {
            draggableClothing[i].style.display = "block"; // Ensure they are visible
            // Optionally, you could reset their positions if needed
        }
        
        // Reset character body parts and nums
        for (let i = 0; i < droppedClothing.length; i++) {
            droppedClothing[i].src = "assets/units/unit4/drag-drop/" + droppedClothing[i].classList[1] + ".svg";
        }
        for (let i = 0; i < nums.length; i++) {
            nums[i].innerHTML = "";
        }
        
        // Hide messages
        const successMessage = document.getElementsByClassName("success-message")[1]; 
        const failureMessage = document.getElementsByClassName("failure-message")[1];
        if (successMessage) successMessage.style.display = "none";
        if (failureMessage) failureMessage.style.display = "none";
        finishDraggingBtn.style.display = "none";
    }

    resetDraggingBtn.addEventListener("click", resetGame);
}

const shualOpening = () => {
    document.getElementsByClassName("fullpage")[1].style.display = "block";
    document.getElementsByClassName("shual-phone")[1].style.display = "none";
    document.getElementsByClassName("x-btn-shual")[1].addEventListener("click", () => {
        document.getElementsByClassName("fullpage")[1].style.display = "none";
        document.getElementsByClassName("shual-phone")[1].style.display = "block";
    });
}

const questionAnswer = async (answer, clickedAnswer) => {
    const response = await fetch('newText.json');
    const data = await response.json();
    const key = `${role}-unit${unit}`;
    
    // Extract question number from the class
    let questionNumber = (clickedAnswer.classList[2]);
    var correctAnswer = Number(data[key][questionNumber]["answer"]);

    // Disable all options for the same question
    const questionOptions = document.querySelectorAll(`.${questionNumber}`);
    questionOptions.forEach(option => {
        option.classList.add('disabled');
        option.removeEventListener('click', clickHandler); // Remove click events from disabled options
    });

    // Set background color based on the answer
    if (answer == correctAnswer) {
        clickedAnswer.style.backgroundColor = "rgb(218, 248, 210)";
        updatedScore = updatedScore+10;
    } else {
        clickedAnswer.style.backgroundColor = "rgb(255, 219, 219)";
    }

    if (data[key][questionNumber]["feedback"]) {
        let index = parseInt(questionNumber.replace('q', ''));
        const feedbackScreen = document.querySelectorAll(`.feedback-div`);
        
        if (answer !== correctAnswer) {
            feedbackScreen[index].style.display = "flex";
            feedbackScreen[index].innerHTML = data[key][questionNumber]["feedback"];
        }
        
    }
}

const areaOrganizing = (areaClicked) => {
    document.getElementsByClassName("area-explained")[1].style.display = "block";
    const areaExplained = document.getElementsByClassName("explaining-area");
    for (let i = 0; i <  areaExplained.length; i++) {
        areaExplained[i].style.display = "none";
    }
    document.getElementsByClassName(`${areaClicked}`)[1].style.display = "block";
}

const whatsappContactsHandle = (contact, target) => {
    let allPanels = document.getElementsByTagName('section');
    let contactClicked = target;

    if (isWhatsappVisited) {
        return;
    }

    // Hide all panels
    for (let i = 0; i < allPanels.length; i++) {
        allPanels[i].style.display = "none";
    }

    // Show specific panels
    allPanels[26].style.display = "block";
    allPanels[27].style.display = "block";
    allPanels[28].style.display = "block";

    if (contact) {
        allPanels[contact + 27].style.display = "block";

        // Scroll to the bottom of the page
        const scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.clientHeight,
            document.body.clientHeight
        );

        // Using requestAnimationFrame to ensure the scroll happens after rendering
        window.requestAnimationFrame(() => {
            document.documentElement.scrollTop = scrollHeight;
            document.body.scrollTop = scrollHeight; // For older browsers
        });

        if (!(contactClicked.classList.contains('visited-contact'))) {
            completeWhatsappClicks++;
        }
        contactClicked.classList.add("visited-contact");
        if (completeWhatsappClicks === 6) {
            document.getElementsByClassName("completeContactsMessage")[1].style.display = "block";
            document.getElementsByClassName("completeContactsMessage")[1].addEventListener("click", () => {

                let startScreen;
                let endScreen;
                if (role == "commander") {
                    startScreen = 35;
                    endScreen = 39;
                } else if (role == "soldier") {
                    startScreen = 35;
                    endScreen = 36;
                }
                for (startScreen; startScreen <= endScreen ; startScreen++) {
                    isWhatsappVisited = true;
                    allPanels[startScreen].style.display = "block";
                        window.requestAnimationFrame(() => { // scroll to the bottom of the page
                            document.documentElement.scrollTop = 0.75*scrollHeight;
                            document.body.scrollTop = 0.75*scrollHeight; // For older browsers
                        });
                }
                  
        })
    }
}
}

const startOver = () => {
    num = 1;
    role = sessionStorage.getItem("role");
    unit = 1;
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
    conceptScreenHandle(0);
    whatsappContactsHandle();
    animate("stopNum1");
}