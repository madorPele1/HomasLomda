var role; //the role of the user
var unit; //the changing number of unit

window.addEventListener("load", () => {
    role = sessionStorage.getItem("role");
})

// functions for building the lomda
const changeByRole = () => { // function that checks whether the user is a soldier or a commander (called once at start) and change the content accordingly (other screens and character)

}

const changeByUnit = () => { // function that gets the unit number and completes all the missing content from the json (background, text?)

}
//

// onclick functions
const startUnit = () => { // function called when click on "start-btn" starts the unit
    //not necessary because of the ending func
}

const endUnit = () => { // function called when click on "end-btn" that changes the number of unit 
    unit++;
}

const backToMap = () => { // function for returning to map (by clicking the car) by changing the number of unit
    //also ables clicking on lower number of units the user already done
}
//
