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

let completeWhatsappClicks = [];
let isWhatsappVisited;
let completeRhombuse = 0;
let completePac = 0;
let completePacConcepts = 0;
let completeConcept = 0;
let completeArea = 0;
let completeCloudStages = 0;
let addingHapakImg;
let addingHomasImg;
let duplicateMithamHomas;
let num = 1; // carousel

let updatedScore = 0;
var score = 0;
const numOfQuestionsFor = {
    soldier: 4,
    commander: 9
};
var rhombuse1Pic = 'flammableGasesCheck';
var rhombuse2Pic = 'toxicGasesCheck';
var rhombuse3Pic = 'explosiveSubstancesCheck';

var scrollPercentage;
let dotSlider;

const scrollHeight = document.documentElement.scrollHeight;

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
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "questions-screen",
   "ending-screen"
];

var soldierUnit5 = [
   "map",
   "opening-screen",
   "handling-event-stages",
   "explaining-screen",
   "explaining-screen",
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
   "explaining-screen",
   "explaining-screen",
   "explaining-screen",
   "questions-screen",
   "ending-screen"
];

var commanderUnit5 = [
    "map",
    "opening-screen",
    "handling-event-stages",
    "explaining-screen",
    "explaining-screen",   
    "ending-screen"
];

window.addEventListener("load", () => { // Initializing the lomda
    unit = 1;
    role = sessionStorage.getItem("role");
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
    animate(`stopNum${unit}`);
})


const iOS = () => {
    return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
} // check if the user's device is ios

const displayScreens = (screenArrayName) => { 
    if (role == undefined) {alert("יש להתחבר לעמוד הראשי של הלומדה: \n https://madorpele1.github.io/HomasLomda/");} // alert that user is in the wrong page
    const loader = document.getElementById("loader");
    if (loader) {loader.style.display = "none";} // removing loader element
    document.querySelectorAll('.unit-screens').forEach(screen => screen.remove()); // removes the previous unit's screens
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
        document.getElementsByClassName("car-img")[1].style.display = "flex";
    } else {
        document.getElementsByClassName("car-video")[1].style.display = "block";
    }

    removeEventListeners(); // Remove previous event listeners
    addEventListeners(); // Add new event listeners
    addContent();
    changeSpecificDetails();
}


const addEventListeners = () => {
    document.body.addEventListener("click", clickHandler); // Attach event listener to the document because for some reason it doesn't work for separate elements
}
const removeEventListeners = () => {
    document.body.removeEventListener("click", clickHandler);
}

const changeSpecificDetails = () => {
    let allPanels;

    if (unit == 1) {
        conceptScreenHandle();
        var explainingTitle = document.querySelectorAll('.unit-screens .explaining-title'); 
        explainingTitle[3].style.fontSize = "19px";
        allPanels = document.getElementsByTagName('section');
        for (let index = 29; index < allPanels.length; index++) {
            allPanels[index].style.display = "none";
        }

        if (sessionStorage.getItem("answered-q1-1") && role == 'commander') {
            allPanels[49].style.display = "block";
    
        } else if (sessionStorage.getItem("answered-q1-1") && role == 'soldier') {
            allPanels[42].style.display = 'block';
        }
    }


    else if (unit == 2) {  
        whatsappContactsHandle();
        document.getElementsByClassName("back-to-map-car-button")[21].style.display = "none";
    
        allPanels = document.getElementsByTagName('section');

        let arrows = document.getElementsByClassName("down-arrows");          
        for (let lindex = 0; lindex < arrows.length; lindex++) {
            arrows[lindex].style.display = "none";              
        }

        if (sessionStorage.getItem("answered-q1-2") && role == 'commander') {
            allPanels[38].style.display = "block";
            if (sessionStorage.getItem("answered-q2-2")) {
                document.getElementsByTagName('section')[39].style.display = "block";
            }
    
        } else if (sessionStorage.getItem("answered-q1-2") && role == 'soldier') {
            allPanels[36].style.display = "block";
        }
    }


    else if (unit == 3) { 
        if (role == 'commander') { // change specific answers details
            document.getElementsByClassName("back-to-map-car-button")[14].style.display = "none";

            document.getElementsByTagName('section')[29].style.display = "none";
            document.getElementsByTagName('section')[30].style.display = "none";
            document.getElementsByTagName('section')[31].style.display = "none";
            document.getElementsByTagName('section')[32].style.display = "none";
            document.getElementsByTagName('section')[33].style.display = "none";
            document.getElementsByTagName('section')[34].style.display = "none";
           
                if (completePac === 2) {
                    document.getElementsByTagName('section')[29].style.display = "block";
                    document.getElementsByTagName('section')[30].style.display = "block";
                }

                if (sessionStorage.getItem("answered-q1-3")) {
                    document.getElementsByTagName('section')[29].style.display = "block";
                    document.getElementsByTagName('section')[30].style.display = "block";
                    document.getElementsByTagName('section')[31].style.display = "block";
                    if (sessionStorage.getItem("answered-q2-3")) {
                        document.getElementsByTagName('section')[32].style.display = "block";
                        if (sessionStorage.getItem("answered-q3-3")) {
                            document.getElementsByTagName('section')[33].style.display = "block";
                            if (sessionStorage.getItem("answered-q4-3")) {
                                document.getElementsByTagName('section')[34].style.display = "block";
                            }
                        }
                    }
            
                } 

        } else if (role == 'soldier') {
            document.getElementsByTagName('section')[29].style.display = "none";
            if (completePac === 2) {
                document.getElementsByTagName('section')[29].style.display = "block";
            }
        }   
    }


    else if (unit == 4) {  
        allPanels = document.getElementsByTagName('section');
        allPanels[36].style.display = "none";
        allPanels[37].style.display = "none";
        allPanels[38].style.display = "none";
        allPanels[39].style.display = "none";
        if (sessionStorage.getItem("completeDragAndDrop")) {
            const startDraggingBtn = document.getElementsByClassName("start-dragging-btn")[1]; 
            startDraggingBtn.style.display = "none";
            allPanels[36].style.display = "block";
            allPanels[37].style.display = "block";
            allPanels[38].style.display = "block";
            allPanels[39].style.display = "block";
            if (sessionStorage.getItem("answered-q1-4")) {
                allPanels[40].style.display = "block";
            }         
        }
        document.getElementsByClassName("character-body")[2].style.width = "50vw"
        document.getElementsByClassName("character-body")[4].style.width = "50vw"
        document.getElementsByClassName("character-body")[5].style.width = "55vw"
        document.getElementsByClassName("character-body")[6].style.width = "50vw"
        document.getElementsByClassName("character-body")[6].style.left = "58%"
        
        const titleToRemove = document.getElementsByClassName("title-background-general")
        for (let index = 1; index <= 7; index++) {
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

            if (role === 'soldier') {
                document.getElementsByTagName('section')[36].style.display = "none";
                document.getElementsByTagName('section')[37].style.display = "none";
            }
            document.getElementsByTagName('section')[40].style.display = "none";
            let arrows = document.getElementsByClassName("down-arrows"); 
            arrows[3].style.display = "none";
            arrows[4].style.display = "none";
            arrows[9].style.display = "none";
            arrows[10].style.display = "none";
            arrows[11].style.display = "none";
    
            document.getElementsByClassName("protection-tags")[7].style.display = "block";
            document.getElementsByClassName("protection-tags")[8].style.display = "block";
            document.getElementsByClassName("protection-tags")[9].style.display = "block";
            document.getElementsByClassName("protection-tags")[7].innerHTML = `<li class="list-risk-area">אזור סיכון מותר לפעולה: אזור חם</li><li class="list-risk-area">משימה כללית: סיור וחילוץ נפגעים בשטח פתוח בסמוך למוקד, סריקת מבנה הנגוע בחומ"ס</li><li class="list-risk-area">כוחות מצוידים: משטרה</li>`;
            document.getElementsByClassName("protection-tags")[8].innerHTML = `<li class="list-risk-area">אזור סיכון מותר לפעולה: אזור פושר</li><li class="list-risk-area"> משימה כללית: חילוץ נפגעים מאזור חם, סיור ועבודה בשטח פתוח שאיננו סמוך למוקד</li><li class="list-risk-area">כוחות מצוידים: משטרה, מד"א, פקע"ר</li>`;
            document.getElementsByClassName("protection-tags")[9].innerHTML = `<li class="list-risk-area">אזור סיכון מותר לפעולה: אזור פושר</li><li class="list-risk-area"> משימה כללית: חילוץ נפגעים מאזור חם, סיור ועבודה בשטח פתוח שאיננו סמוך למוקד</li><li class="list-risk-area">כוחות מצוידים: משטרה, מד"א, פקע"ר</li>`;
        
            if (sessionStorage.getItem("answered-q1-4")) {
                document.getElementsByTagName('section')[40].style.display = "block";
            }
        }


    else if (unit == 5) {  
        allPanels = document.getElementsByTagName('section');
        allPanels[29].style.display = "none";
        allPanels[30].style.display = "none";
        allPanels[31].style.display = "none";
        document.getElementsByClassName("back-btn")[3].style.display = "none"
        document.getElementsByClassName("ending-text")[1].style.fontSize = "3.5vw";
        document.getElementsByClassName("ending-text")[1].style.lineHeight = "4vh";

        if (document.getElementsByClassName("title-background-general")[2]) {
            document.getElementsByClassName("title-background-general")[2].style.display = "none";        
            document.getElementsByClassName("back-btn")[4].style.display = "none";        
        }
        if (role === 'commander') {
            allPanels[30].innerHTML = `<div id="table-scroll" class="table-scroll">
            <div class="table-wrap" id="table-wrap">
              <table class="main-table">
                  <tr class="little">
                    <td class="fixed-side top"><p id="dot-slider" class="dot-slider"><span class="selected-dot">●</span>●●●</p></td>
                    <td class="head-table">מ-פ' עד "פ+10"</td>
                    <td class="head-table">מ-"פ+10" עד "פ+30"</td>
                    <td class="head-table">מ-"פ+30" עד "פ+60"</td>
                    <td class="head-table">מ-"פ+60" עד תום האירוע</td>
                  </tr>
                  <tr>
                    <td class="fixed-side middle one">פעילות<br> בשטח</td>
                    <td class="reg">התרעה ופעולות איתור</td>
                    <td class="reg">הפעלת מענה משולב והקמת חפ"ק אחוד</td>
                    <td class="reg">ניטור ועדכון הע"ס דינאמית <br> פעולות להצלת חיים והכלת המוקד</td>
                    <td class="reg">סיום הטיפול במוקד <br> שלילת הסכנה והכרזה על תום אירוע</td>
                  </tr>
                  <tr>
                    <td class="fixed-side middle two">פעילות<br> במפקדה</td>
                    <td class="reg">חיתוך מצב <br> שלילה או הכרזה על אירוע חומ"ס</td>
                    <td class="reg">הפצת הנחיות מצילות חיים <br>והודעות משלימות ניתוח אזורי סיכון<br> ותכנון מענה</td>
                    <td class="reg">עדכון הנחיות בהתאם להע"ס דינאמית <br> תמיכה לוגיסטית בכוחות בשטח</td>
                    <td class="reg">שחרור האוכלוסייה <br> וידוא חזל"כ לכוחות</td>
                  </tr>
                  <tr>
                    <td class="fixed-side middle three">התנהגות<p>אוכלוסייה</p></td>
                    <td class="reg">התמגנות למשך 10 דקות</td>
                    <td class="reg">פעילות עפ"י ההנחיות <br> (הסתגרות, התפנות ועוד)</td>
                    <td class="reg">המשך פעילות עפ"י ההנחיות</td>
                    <td class="reg">חזרה לשגרה</td>
                  </tr>
                  <tr>
                    <td class="fixed-side bottom">תפקידי<br> הגדוד</td>
                    <td class="reg dif-color-td">קבלת התרעה על חשש לאירוע חומ"ס <br> בגזרת הגדוד</td>
                    <td class="reg dif-color-td">הגעה לאירוע והקמת חפ"ק אחוד, <br>ניהול האירוע, העברת מידע<br> לרמה הממונה באופן שוטף</td>
                    <td class="reg dif-color-td">בהתאם להערכת מצב - ביצוע סריקות<br> לפינוי נפגעים בשטח תחת סיכון מתן <br> טיפול ראשוני תומך בשטח <br>עד לפינוי הנפגעים</td>
                    <td class="reg dif-color-td">המשך ניהול האירוע <br>עד להכרזה על תום האירוע</td>
                  </tr>
              </table>
            </div>
          </div>`;
            } else {
                allPanels[30].innerHTML = `<div id="table-scroll" class="table-scroll">
                <div class="table-wrap" id="table-wrap">
                  <table class="main-table">
                      <tr class="little">
                        <td class="fixed-side top"><p id="dot-slider" class="dot-slider"><span class="selected-dot">●</span>●●●</p></td>
                        <td class="head-table">מ-פ' עד "פ+10"</td>
                        <td class="head-table">מ-"פ+10" עד "פ+30"</td>
                        <td class="head-table">מ-"פ+30" עד "פ+60"</td>
                        <td class="head-table">מ-"פ+60" עד תום האירוע</td>
                      </tr>
                      <tr>
                        <td class="fixed-side middle one">פעילות<br> בשטח</td>
                        <td class="reg">התרעה ופעולות איתור</td>
                        <td class="reg">הפעלת מענה משולב והקמת חפ"ק אחוד</td>
                        <td class="reg">ניטור ועדכון הע"ס דינאמית <br> פעולות להצלת חיים והכלת המוקד</td>
                        <td class="reg">סיום הטיפול במוקד <br> שלילת הסכנה והכרזה על תום אירוע</td>
                      </tr>
                      <tr>
                        <td class="fixed-side bottom">תפקידי<br> הגדוד</td>
                        <td class="reg dif-color-td">קבלת התרעה על חשש לאירוע חומ"ס <br> בגזרת הגדוד</td>
                        <td class="reg dif-color-td">הגעה לאירוע והקמת חפ"ק אחוד, <br>ניהול האירוע, העברת מידע<br> לרמה הממונה באופן שוטף</td>
                        <td class="reg dif-color-td">בהתאם להערכת מצב - ביצוע סריקות<br> לפינוי נפגעים בשטח תחת סיכון מתן <br> טיפול ראשוני תומך בשטח <br>עד לפינוי הנפגעים</td>
                        <td class="reg dif-color-td">המשך ניהול האירוע <br>עד להכרזה על תום האירוע</td>
                      </tr>
                  </table>
                </div>
              </div>`;
            }

            document.getElementById("table-wrap").addEventListener("scroll", scrolling);
            dotSlider = document.getElementById("dot-slider");
            document.getElementsByClassName("end-btn")[1].style.display = "none";
            
            let numOfQuestions = numOfQuestionsFor[role];
            updatedScore = sessionStorage.getItem("updated-score");
            score = Math.round((updatedScore / (numOfQuestions * 10)) * 100);
            if (score < 75 && sessionStorage.getItem("completeCloudStages")) {
                document.getElementsByClassName("ending-div")[1].innerHTML +=
                `<button id="start-over-btn" class="btn" style="bottom: 6vh;">נסו שנית</button>`;
                document.getElementsByClassName("score")[1].innerHTML = ` ציונכם הוא: ${score} <br> כדאי לכם לחזור על הלומדה... `;
                document.getElementById("start-over-btn").addEventListener("click", startOver);
            } else if (score > 75) {
                document.getElementsByClassName("score")[1].innerHTML = ` ציונכם הוא: ${score} <br> כל הכבוד! `;
            }
    }
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
                window.requestAnimationFrame(() => {
                    document.documentElement.scrollTop = scrollHeight*2;
                    document.body.scrollTop = scrollHeight*2; // For older browsers
                }); //scroll the bottom of the page
                conceptScreenHandle(-2, target);
            }
            whatsappContactsHandle();
            break;
        case "map-pin":
            mapAnimation();
            break;
        case "carStop1":
        case "carStop2":
        case "carStop3":
        case "carStop4":
        case "carStop5":
            animate(targetId);
            break;
        case "prev":
            carousel();
            break;
        case "next":
            carousel();
            break;
        case "cold":
        case "focus":
        case "heat":
        case "warm":
        case "cold-roles":
        case "focus-roles":
        case "heat-roles":
        case "warm-roles":
        case "pac-map-concepts":
            pacMap(targetId, target);
            break;
        case "definition1":
        case "definition2":
        case "definition3":
        case "definition4":
        case "definition5":
        case "definition6":
        case "definition7":
        case "definition8":
        case "definition9":
            conceptScreenHandle(parseInt(targetId.replace('definition', '')), target);
            break;
        case "end-concept-btn": 
            conceptScreenHandle(-1, target);
            break;
        case "rhombuse1":
        case "rhombuse2":
        case "rhombuse3":
            manageRhombuses(parseInt(targetId.replace('rhombuse', '')), target);
            break;
        case "back-rhombuse-btn":
            // Using requestAnimationFrame to ensure the scroll happens after rendering
            window.requestAnimationFrame(() => {
                document.documentElement.scrollTop = 2*scrollHeight;
                document.body.scrollTop = 2*scrollHeight; // For older browsers
            });
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
        case "mitham-homas":
            shualOpening();
            break;
            case "option1":
            case "option2":
            case "option3":
            case "option4":
                    questionAnswer(parseInt(targetId.replace('option', '')), target);
            break;
            case "heat-area":
            case "warm-area":
            case "mabar-area":
            case "cold-area":
                areaOrganizing(targetId, target);
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
           case "cloud1":
           case "cloud2":
           case "cloud3":
           case "cloud4":
           case "cloud5":
            stagesRoad(parseInt(targetId.replace('cloud', '')), target);
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

        if (unit == 2) {  
            answersText[0].style.fontSize = "calc(10px + 0.4svh)";
            answersText[1].style.fontSize = "calc(10px + 0.4svh)";
            answersText[2].style.fontSize = "calc(10px + 0.4svh)";
            answersText[3].style.fontSize = "calc(10px + 0.4svh)";
        } else if (unit == 3) {
            answersText[14].style.fontSize = "calc(9px + 0.4svh)";
        }
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
                clothingExplainingDiv[8].innerHTML = `<div transition-style="in:wipe:left" class="clothing-explaining suit">מסכה ומסנן/אבן ספיר</div><div class="clothing-explaining breath">חליפת סרבל</div><div class="clothing-explaining gloves">כפפות</div><div class="clothing-explaining boots">מגפיים</div>`
            } 
        } // adds the protection level explanation tags
    }
}

const endUnit = () => {
    unit++;
    document.getElementsByClassName(`carStop${unit}`)[0].style.display = "block";
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
    animate(`stopNum${unit}`);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if (unit == 5) {
        document.getElementsByClassName("end-btn")[1].style.display = "none";
        score = Math.round(score);

        if (score < 75) {
            document.getElementsByClassName("score")[1].innerHTML = ` ציונכם הוא: ${score} <br> כדאי לכם לחזור על הלומדה... `;
            if (!(document.getElementById("start-over-btn"))) {
                document.getElementsByClassName("ending-div")[1].innerHTML +=
                `<button id="start-over-btn" class="btn" style="bottom: 6vh;">נסו שנית</button>`;
                document.getElementById("start-over-btn").addEventListener("click", startOver); 
            }
        } else {
            document.getElementsByClassName("score")[1].innerHTML = ` ציונכם הוא: ${score} <br> כל הכבוד! `;
        }
    }
}

const backToMap = () => { // function for returning to map (by clicking the car) by changing the number of unit, also ables clicking on lower number of units the user already done
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const mapAnimation = () => {

    let imgBackground = document.getElementsByClassName("img-background"); 
    let explaineMap = document.getElementsByClassName("explaine-map"); 
    let mapPin = document.getElementsByClassName("map-pin"); 
    let mapSquare = document.getElementsByClassName("map-square"); 
    let xBtn = document.getElementsByClassName("x-btn-shual-unit1"); 

    mapPin[1].style.animation = "resize-pin 3s forwards"; 
    mapSquare[1].style.animation = "resize 2s forwards";
    xBtn[1].style.display = "block";

    setTimeout(() => { 
        imgBackground[1].style.display = "flex";
        imgBackground[1].style.animation = "fade-in 1s forwards";
        explaineMap[1].style.display = "block";
        explaineMap[1].style.animation = "fade-in 1s forwards";
    }, 2200);

    // closing the pop-up screen
    document.getElementsByClassName("x-btn-shual-unit1")[1].addEventListener("click", () => {
        mapPin[1].style.animation = ""; 
        mapSquare[1].style.animation = "";
        xBtn[1].style.display = "none";

        imgBackground[1].style.display = "none";
        imgBackground[1].animation = "";
        explaineMap[1].style.display = "none";
        explaineMap[1].animation = "";
    })
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

    else {
        for (var i = 0; i <= animationContainer.length -1; i++) {
            animationContainer[i].setAttribute('src', `assets/car/zoomOutCarStop${unit}.mp4`);
            document.getElementById('animation_container').currentTime = 0;
        };
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        setTimeout(() => { 
        window.requestAnimationFrame(() => {
            document.documentElement.scrollTop = scrollHeight;
            document.body.scrollTop = scrollHeight; // For older browsers
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
        });
    }, 2900);
    }
    if (unit == 5) {
        changeSpecificDetails();
    }
    screenArrayName = `${role}Unit${unit}`;
    displayScreens(screenArrayName);
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

const pacMap = (chosen, clickedTag) => {
    if (role == 'commander' && sessionStorage.getItem("answered-q1-3")) {
        document.getElementsByTagName('section')[31].style.display = "block";
        document.getElementsByTagName('section')[32].style.display = "block";
        document.getElementsByTagName('section')[33].style.display = "block";
        document.getElementsByTagName('section')[34].style.display = "block";
    }

    var explainContainer = document.getElementsByClassName("explaine-container"); 
    for (let i = 0; i < explainContainer.length; i++) {
         explainContainer[i].style.display = "none";
    }

    var specificExplainContainer = document.getElementsByClassName("explaine-container"); 
    for (let i = 0; i < specificExplainContainer.length; i++) {
        specificExplainContainer[i].style.display = "none";
   }

    if (chosen !== 'pac-map') {
        specificExplainContainer = document.getElementsByClassName(`${chosen}-explain`); 
        for (let i = 0; i < specificExplainContainer.length; i++) {
            specificExplainContainer[i].style.display = "block";
            if (chosen == "warm-roles" || chosen == "heat-roles") {
                 document.getElementsByClassName("warm-explain")[3].style.display = "block"; 
                 document.getElementsByClassName("heat-explain")[4].style.display = "block"; 
            }
        }
    }

    for (let index = 0; index < document.getElementsByClassName("pac").length; index++) {
        document.getElementsByClassName("pac")[index].style.backgroundColor = "";
    }
    clickedTag.style.backgroundColor = "#99c7cde3";

    if (unit == 1) {
            if (!(document.getElementById(`${chosen}`).classList.contains('visited-concept'))) {
                completePacConcepts++;
                document.getElementById(`${chosen}`).classList.add("visited-concept");
            }
            if (completePacConcepts === 4) {
                switch (role) {
                    case "commander":
                        document.getElementsByClassName("back-btn")[18].style.display = "block";
                        break;
                    case "soldier":
                        document.getElementsByClassName("back-btn")[11].style.display = "block";
                        break;
                
                    default:
                        break;
                }
            }
             
    }

 if (unit == 3) {
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
        chosen.replace('-roles', '');
        if (!(document.getElementById(`${chosen}`).classList.contains('visited-concept'))) {
            completePac++;
            document.getElementById(`${chosen}`).classList.add("visited-concept");
        }

        var explainText;
        switch (chosen) {
            case 'cold-roles':
                explainText = document.getElementsByClassName(`job1`);
                explainDiv = document.getElementsByClassName('cold-explain');
            break;

            case 'focus-roles':
                explainText = document.getElementsByClassName(`general-job`);
            break;

            case 'warm-roles':         
            case 'heat-roles':
                if (role === "commander") {
                    var explainText = document.getElementsByClassName(`job2`);
                } else {
                    var explainText = document.getElementsByClassName('job2');
                    var arrowHide = document.getElementsByClassName("forward-arrow");
                    var textHide = document.getElementsByClassName('job4');
                    var textDisplay = document.getElementsByClassName('job3');
                    for (let i = 0; i < arrowHide.length; i++) {
                        arrowHide[i].style.display = "none";
                        textHide[i].style.display = "none";
                        textDisplay[i].style.display = "block";
                    }
                }
            break;

            default:
                if (role === 'commander') {
                    explainText = document.getElementsByClassName(`general-job`);
                } else {
                    explainText = document.getElementsByClassName('none');
                }
            break;
        }

        for (let i = 0; i < explainText.length; i++) {
            explainText[i].style.display = "block";
        }
        if (completePac === 2) {
            document.getElementsByTagName('section')[29].style.display = "block";
            if (completeArea === 3) {
                document.getElementsByTagName('section')[30].style.display = "block";
            }
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
            textDisplay[i].style.display = "block";
            arrowHide[i].style.display = "none";
            arrowShow[i].style.display = "block";
        }
    } 
}

const conceptScreenHandle = (definitionNum, target) => { 

    let clickedConcept = target;
    let allPanels = document.getElementsByTagName('section');

    var checkMark = document.getElementsByClassName("checkMark1");
        for (let i = 0; i < checkMark.length; i++) { 
            if (completeRhombuse == 3) {
                checkMark[i].style.display = 'inline';
            }
        }

    if (role == "soldier") {
        document.getElementsByClassName("concept")[13].style.display = "none";
        document.getElementsByClassName("concept")[14].style.display = "none";
        document.getElementsByClassName("concept")[15].style.display = "none";
        document.getElementsByClassName("concept")[16].style.display = "none";
        // displaying "none" the non-relavent concepts for soldiers

        var endConceptButton = document.getElementsByClassName('end-concept-btn');
        for (let i = 0; i < endConceptButton.length; i++) { 
            if (completeConcept == 5) {
                endConceptButton[i].style.display = 'block';
            }
        }

        switch (definitionNum) {
            
            case -2:
                break;

            case -1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                    allPanels[41].style.display = 'block';
                        if (sessionStorage.getItem("answered-q1-1")) {
                            allPanels[42].style.display = 'block';
                        } else {
                            document.body.scrollTop = 0; // For Safari
                            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        }

            break;

            case 0:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            break;

            case 1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }

                allPanels[29].style.display = 'block';
                allPanels[30].style.display = 'block';
                allPanels[31].style.display = 'block';

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                document.getElementsByClassName("back-btn")[4].style.display = "none"; 
                document.getElementsByClassName("back-btn")[5].style.display = "none"; 
                document.getElementsByClassName("down-arrows")[6].style.display = "block"; 
                
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
            break;
                
            case 2:
                var checkMark = document.getElementsByClassName("checkMark2"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept2 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[35].style.display = 'block';
                allPanels[36].style.display = 'block';
                document.getElementsByClassName("back-btn")[6].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
            break;

            case 3:
                var checkMark = document.getElementsByClassName("checkMark3"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept3 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[37].style.display = 'block';
                document.getElementsByClassName("down-arrows")[5].style.display = "none";  
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
            break;

            case 4:
                var checkMark = document.getElementsByClassName("checkMark4"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept4 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }

                allPanels[39].style.display = 'block';
                document.getElementsByClassName("down-arrows")[6].style.display = "none"; 


                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
            break;

            case 9:
                var checkMark = document.getElementsByClassName("checkMark9"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept8 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[40].style.display = 'block'; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
                break;
            default:
                break;
            }

    } else if (role == "commander") {

        var endConceptButton = document.getElementsByClassName('end-concept-btn');
        for (let i = 0; i < endConceptButton.length; i++) { 
            if (completeConcept == 9) {
                endConceptButton[i].style.display = 'block';
            }
        }

        switch (definitionNum) {
            case -2:
                break;

            case -1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                allPanels[48].style.display = 'block';
                if (sessionStorage.getItem("answered-q1-1")) {
                    allPanels[49].style.display = 'block';
                }
            break;

            case 0:

                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[26].style.display = 'block';
                allPanels[27].style.display = 'block';
                allPanels[31].style.display = 'block';
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                break;

            case 1:
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[29].style.display = 'block';
                allPanels[30].style.display = 'block';
                allPanels[31].style.display = 'block';
                document.getElementsByClassName("back-btn")[4].style.display = "none"; 
                document.getElementsByClassName("back-btn")[5].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
                break;
                
            case 2:
                var checkMark = document.getElementsByClassName("checkMark2"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept2 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[35].style.display = 'block';
                allPanels[43].style.display = 'block';
                document.getElementsByClassName("back-btn")[6].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 3:
                var checkMark = document.getElementsByClassName("checkMark3"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept3 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[36].style.display = 'block';
                document.getElementsByClassName("down-arrows")[5].style.display = "none";  
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 4:
                var checkMark = document.getElementsByClassName("checkMark4"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept4 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[46].style.display = 'block';
                document.getElementsByClassName("down-arrows")[6].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 5:
                var checkMark = document.getElementsByClassName("checkMark5"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept5 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[38].style.display = 'block';  
                allPanels[39].style.display = 'block';  
                allPanels[40].style.display = 'block'; 
                document.getElementsByClassName("back-btn")[9].style.display = "none"; 
                document.getElementsByClassName("back-btn")[10].style.display = "none"; 
 
                if (!addingHapakImg) {
                    document.getElementsByClassName("character-body")[8].style.display = "none"
                    document.getElementsByClassName("down-arrows")[9].style.display = "none";  
                    allPanels[40].innerHTML += `<img src="assets/units/unit1/hapak.svg" alt="hapak" style="display: block; position: relative;bottom: 24%;border-radius: 6vh;background-color: white;">`
                    addingHapakImg = true;
                }

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 6:
                var checkMark = document.getElementsByClassName("checkMark6"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept6 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[41].style.display = 'block';  
                if (!addingHomasImg) {
                    document.getElementsByClassName("character-body")[9].style.display = "none"
                    document.getElementsByClassName("down-arrows")[10].style.display = "none"; 
                    allPanels[41].innerHTML += `<img src="assets/units/unit1/mithamHomas.png" id="mitham-homas" alt="mitham-homas" style="display: block; width: 99%; position: relative;bottom: 24%;border-radius: 6vh;">`
                    allPanels[41].innerHTML += `<div style="background-color: rgb(230 234 241);position: relative;padding: 10px;bottom: 55%;border-radius: 10vh;width: 86vw;margin: auto;">מתחם בז"ן <br> <b> לחצו על התמונה כדי להגדיל אותה</b></div>`
                    addingHomasImg = true;
                }
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 7:
                var checkMark = document.getElementsByClassName("checkMark7"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept7 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[44].style.display = 'block'; 
                allPanels[45].style.display = 'block'; 
                document.getElementsByClassName("character-body")[10].style.width = "55vw";
                document.getElementsByClassName("back-btn")[15].style.display = "none"; 
                document.getElementsByClassName('character-body')[11].setAttribute('src', `assets/units/unit1/pakal.svg`);
                document.getElementsByClassName("down-arrows")[13].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;

                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 8:
                var checkMark = document.getElementsByClassName("checkMark8"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept8 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[42].style.display = 'block'; 
                document.getElementsByClassName("down-arrows")[11].style.display = "none"; 
                document.getElementsByClassName("character-body")[10].style.width = "45svw"; 
                document.getElementsByClassName('character-body')[10].style.bottom = "16%";
                document.getElementsByClassName('character-body')[10].setAttribute('src', `assets/units/unit4/bmp/mask.svg`);
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
                break;

            case 9:
                var checkMark = document.getElementsByClassName("checkMark9"); 
                for (let i = 0; i < checkMark.length; i++) {
                    checkMark[i].style.display = 'inline';
                }
                visitedConcept8 = true;
                for (let i = 0; i < allPanels.length; i++) {
                    allPanels[i].style.display = 'none';
                }
                allPanels[47].style.display = 'block'; 
                document.getElementsByClassName("down-arrows")[12].style.display = "none"; 
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                if (!(clickedConcept.classList.contains('visited-concept'))) {
                    completeConcept++;
                }
                clickedConcept.classList.add("visited-concept");
                break;

            default:
                break;

            }
    }
       
}

const manageRhombuses = (rhombuseNum) => {
    var allPanels = document.getElementsByTagName('section');
    if (rhombuseNum === 0) {
        for (let i = 3; i < allPanels.length; i++) {
            allPanels[i].style.display = 'none';
            allPanels[29].style.display = 'block';
            allPanels[30].style.display = 'block';
            allPanels[31].style.display = 'block';
        }
    } else {
        var rhombuses = document.getElementsByClassName(`rhombuse${rhombuseNum}`); 
        for (let i = 0; i < rhombuses.length; i++) {
            rhombuses[i].setAttribute('src', `assets/units/unit1/homasTypes/${window[`rhombuse${rhombuseNum}Pic`]}.svg`);
            rhombuses[i].style.filter = "drop-shadow(rgb(15, 165, 40) 0px 0px 2px)";
        }
        for (let i = 0; i < allPanels.length; i++) {
            allPanels[i].style.display = 'none';
        }
        switch (rhombuseNum) {
            case 1:
                visitedRhombuse1 = true;
                allPanels[33].style.display = 'block';
                break;
            case 2:
                visitedRhombuse2 = true;
                allPanels[34].style.display = 'block';
                var flower = document.getElementsByClassName(`flower-animation`); 
                for (let i = 0; i < flower.length; i++) {
                    setTimeout(function() { flower[i].setAttribute('src', `assets/units/unit1/flowerAnimation.gif`); }, 0);
                }
                break;
            case 3:
                visitedRhombuse3 = true;
                allPanels[32].style.display = 'block';
                break;
            default:
                break;
        }
        rhombuseClicked = document.getElementById(`rhombuse${rhombuseNum}`);
        if (!(rhombuseClicked.classList.contains('visited-rhombuse'))) {
            completeRhombuse++;
        }
        rhombuseClicked.classList.add("visited-rhombuse");
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
    
    if (sessionStorage.getItem("completeDragAndDrop")) {
        // If already completed, do nothing
        startDraggingBtn.style.display = "none";
        return;
    }

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
            // Save the question as answered in sessionStorage
            sessionStorage.setItem("completeDragAndDrop", 'true');
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
            updatedScore = updatedScore + 10;
            sessionStorage.setItem("updated-score", updatedScore);
        }
        else {
            const failureMessage = document.getElementsByClassName("failure-message")[1];
            failureMessage.style.display = "revert"; 
            resetDraggingBtn.style.display = "none";
        }
        let allPanels = document.getElementsByTagName('section');
        allPanels[36].style.display = "block";
        allPanels[37].style.display = "block";
        allPanels[38].style.display = "block";
        allPanels[39].style.display = "block";
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
    if (unit == 2) {
        document.getElementsByClassName("fullpage")[1].style.display = "block";
        document.getElementsByClassName("shual-phone")[1].style.display = "none";
        document.getElementsByClassName("x-btn-shual")[1].addEventListener("click", () => {
            document.getElementsByClassName("fullpage")[1].style.display = "none";
            document.getElementsByClassName("shual-phone")[1].style.display = "block";
        });
    } 
    else if (unit == 1 && !duplicateMithamHomas) {
        document.getElementsByTagName("section")[41].innerHTML += `<img src="assets/units/unit1/mithamHomas.png" id="mitham-homas" alt="mitham-homas" style="display: block;width: 140%;height: 50%;position: relative;bottom: 24%;border-radius: 6vh;bottom: 55%;left: 31%;">`
        duplicateMithamHomas = true;
    }
    
}  

const questionAnswer = async (answer, clickedAnswer) => {
    // Fetch the data from the JSON file
    const response = await fetch('newText.json');
    const data = await response.json();
    const key = `${role}-unit${unit}`;
    
    // Extract question number from the class
    let questionNumber = clickedAnswer.classList[2];
    var correctAnswer = Number(data[key][questionNumber]["answer"]);

    // Check if the question has already been answered
    if (sessionStorage.getItem(`answered-${questionNumber}-${unit}`)) {
        // If already answered, do nothing
        return;
    }

    // Disable all options for the same question
    const questionOptions = document.querySelectorAll(`.${questionNumber}`);
    questionOptions.forEach(option => {
        option.classList.add('disabled');
        option.removeEventListener('click', clickHandler); // Remove click events from disabled options
    });

    // Set background color based on the answer
    if (answer == correctAnswer) {
        clickedAnswer.style.backgroundColor = "rgb(218, 248, 210)";
        updatedScore += 10;
        sessionStorage.setItem("updated-score", updatedScore);
    } else {
        clickedAnswer.style.backgroundColor = "rgb(255, 219, 219)";
    }

    // Save the question as answered in sessionStorage
    sessionStorage.setItem(`answered-${questionNumber}-${unit}`, 'true');

    // Display feedback if available
    if (data[key][questionNumber]["feedback"]) {
        let index = parseInt(questionNumber.replace('q', ''));
        const feedbackScreen = document.querySelectorAll(`.feedback-div`);
        
        if (answer !== correctAnswer) {
            feedbackScreen[index].style.display = "flex";
            feedbackScreen[index].innerHTML = data[key][questionNumber]["feedback"];
        }
    }
    
    changeSpecificDetails();
    if (unit == 1) {
        conceptScreenHandle(-1);
    }
}

const areaOrganizing = (areaClicked, clickedTag) => {
    for (let index = 0; index < document.getElementsByClassName("area").length; index++) {
        document.getElementsByClassName("area")[index].style.backgroundColor = "";
    }
        clickedTag.style.backgroundColor = "#99c7cde3";

    document.getElementsByClassName("area-explained")[1].style.display = "block";
    const areaExplained = document.getElementsByClassName("explaining-area");
    for (let i = 0; i <  areaExplained.length; i++) {
        areaExplained[i].style.display = "none";
    }
    if (!(document.getElementsByClassName(`${areaClicked}`)[0].classList.contains('visited-concept'))) {
        completeArea++;
    }
    document.getElementsByClassName(`${areaClicked}`)[0].classList.add("visited-concept");
    document.getElementsByClassName(`${areaClicked}`)[1].style.display = "block";
    let glowPath = areaClicked.replace('-area', '');
    document.getElementsByClassName("glow-area")[1].src = `assets/units/unit3/glow${glowPath}.png`

    if (areaClicked === "cold-area") {
        document.getElementsByClassName(`hapakim-area`)[1].style.display = "block";
        document.getElementsByClassName(`commanding-area`)[1].style.display = "block";
    } else {
        document.getElementsByClassName(`hapakim-area`)[1].style.display = "none";
        document.getElementsByClassName(`commanding-area`)[1].style.display = "none";
    }

    if (completeArea === 4) {
        document.getElementsByTagName('section')[30].style.display = "block";
    }
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

    if (role === 'commander') {
        document.getElementsByClassName('contact1')[0].style.display = "none";
        document.getElementById('contact2-name').innerText = 'את/ה - מפקד בפקע"ר';
    }
    if (contact) {
        allPanels[contact + 27].style.display = "block";

        // Scroll to the bottom of the page
        const scrollHeightWhatsapp = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.clientHeight,
            document.body.clientHeight
        );

        // Using requestAnimationFrame to ensure the scroll happens after rendering
        window.requestAnimationFrame(() => {
            document.documentElement.scrollTop = scrollHeightWhatsapp;
            document.body.scrollTop = scrollHeightWhatsapp; // For older browsers
        });

        if (!(contactClicked.classList.contains('visited-contact'))) {
            completeWhatsappClicks++;
        }
        contactClicked.classList.add("visited-contact");
        if (completeWhatsappClicks === 6) {
            document.getElementsByClassName("completeContactsMessage")[1].style.display = "block";
            document.getElementsByClassName("completeContactsMessage")[1].addEventListener("click", () => {

                let startScreen = 35;
                let endScreen;

                if (role == "commander") {
                    if (sessionStorage.getItem("answered-q1-2")) {
                        endScreen = 38;
                        if (sessionStorage.getItem("answered-q2-2")) {
                            endScreen = 39;
                        }
                    } else {
                        endScreen = 37;
                    }

                } else if (role == "soldier") {
                    if (sessionStorage.getItem("answered-q1-2")) {
                        endScreen = 36;
                    } else {
                        endScreen = 35;
                    }
                }

                for (startScreen; startScreen <= endScreen; startScreen++) {
                    isWhatsappVisited = true;
                    allPanels[startScreen].style.display = "block";

                        window.requestAnimationFrame(() => { // scroll to the bottom of the page
                            document.documentElement.scrollTop = 0.75*scrollHeightWhatsapp;
                            document.body.scrollTop = 0.75*scrollHeightWhatsapp; // For older browsers
                        });

                }      
        })
    }
}
}

const stagesRoad = (cloudNumber, targetCloud) => {
    targetCloud.style.animation = `growing-cloud${cloudNumber} 0s forwards`;
    targetCloud.style.zIndex = "3";
    document.getElementsByClassName("stages-explain-div")[1].style.display = "block";
    document.getElementsByClassName(`stage-div${cloudNumber}`)[1].style.display = "block";

    document.getElementsByClassName("display-map-btn")[1].addEventListener("click", () => { 
        document.getElementsByClassName("stages-explain-div")[1].style.display = "none";
        document.getElementsByClassName(`stage-div${cloudNumber}`)[1].style.display = "none";
        targetCloud.style.animation = '';
        targetCloud.style.zIndex = 0;
        if (!(targetCloud.classList.contains('visited-cloud-stage'))) {
            completeCloudStages++;
        }
        targetCloud.classList.add("visited-cloud-stage");
       if (completeCloudStages == 5 || sessionStorage.getItem("completeCloudStages")) {
            document.getElementsByClassName("explain-stages")[1].textContent = "המשיכו לגלול למטה";
            let allPanels = document.getElementsByTagName('section');
            allPanels[29].style.display = "block";
            allPanels[30].style.display = "block";
            allPanels[31].style.display = "block";
            sessionStorage.setItem("completeCloudStages", true);
       }
    });
}

const scrolling = (event) => {
    var scrollPercentage = -100 * event.target.scrollLeft / (event.target.scrollWidth-event.target.clientWidth);
    if ( scrollPercentage > 0 && scrollPercentage < 30 ) {
        dotSlider.innerHTML = "<span class='selected-dot'>●</span>●●●";
    } else if ( scrollPercentage > 30 && scrollPercentage < 60 ) {
        dotSlider.innerHTML = "●<span class='selected-dot'>●</span>●●";
    } else if ( scrollPercentage > 60 && scrollPercentage < 90 ) {
        dotSlider.innerHTML = "●●<span class='selected-dot'>●</span>●";
    } else if ( scrollPercentage > 90 ) {
        dotSlider.innerHTML = "●●●<span class='selected-dot'>●</span>";
    }
}

const startOver = () => {
    sessionStorage.clear();
    window.location.href = "index.html";
}
