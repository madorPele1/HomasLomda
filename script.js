let role;

window.addEventListener("load", () => {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startLomda);
    document.getElementById('soldier').addEventListener("click", choose);
    document.getElementById('commander').addEventListener("click", choose);
    document.getElementById('chosen-button').addEventListener("click", chosen);
})

const startLomda = () => {
    document.getElementById('panel1').style.animation = 'fade-out 1s forwards';
    setTimeout(() => { 
        document.getElementById('panel1').innerHTML = '<h1 class="main-title">השימוש בלומדה</h1><p class="instructions">המעבר בין עמוד לעמוד בלומדה יעשה באמצעות גלילה/החלקה מעלה.</p><p class="instructions">ניתן לחזור בכל עת למסלול ולחזור ליחידות הלימוד הקודמות באמצעות לחיצה על המכונית המופיעה בצד שמאל של המסך.</p><p class="instructions bold">גללו מטה כדי להמשיך..</p><p class="down-arrows">︾</p>';
        document.getElementById('panel1').style.animation = 'fade-in 1s forwards';    
    }, 1000);
}

const choose = (event) => {
    document.getElementById('soldier').classList.remove('picked');
    document.getElementById('commander').classList.remove('picked');
    role = event.target.id;
    document.getElementById(role).classList.add('picked');
}

const chosen = () => {
    document.getElementById('animation-car').style.animation = 'back-car-drive 1s linear';
    setTimeout(() => { 
        document.getElementById('animation-car').style.animation = 'right-car-drive 1s linear forwards';    
        document.getElementById('animation-car').setAttribute('src', 'assets/general/cars/sideView.svg');
    }, 900);
}
