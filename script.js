let role;
let solider;
let commander;

window.addEventListener("load", () => {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startLomda);
    soldier = document.getElementById('soldier');
    soldier.addEventListener("click", choose);
    commander = document.getElementById('commander');
    commander.addEventListener("click", choose);
    document.getElementById('question-button').addEventListener("click", aboutUsOpen);
})

const startLomda = () => {
    document.getElementById('panel1').style.animation = 'fade-out 1s forwards';
    setTimeout(() => { 
        document.getElementById('panel1').innerHTML = '<h1 class="main-title">השימוש בלומדה</h1><p class="instructions">המעבר בין עמוד לעמוד בלומדה יעשה באמצעות גלילה/החלקה מעלה.</p><p class="instructions">ניתן לחזור בכל עת למסלול ולחזור ליחידות הלימוד הקודמות באמצעות לחיצה על המכונית המופיעה בצד שמאל של המסך.</p><p class="instructions bold">גללו מטה כדי להמשיך..</p><p class="down-arrows">︾</p>';
        document.getElementById('panel1').style.animation = 'fade-in 1s forwards';
        document.getElementById('panel2').style.display = 'block';
        document.getElementById('panel2').style.animation = 'fade-in 1s forwards';
    }, 1000);
}

const choose = (event) => {
    soldier.classList.remove('picked');
    commander.classList.remove('picked');
    role = event.target.id;
    document.getElementById(role).classList.add('picked');
    document.getElementById('chosen-button').style.display = 'block';
    document.getElementById('chosen-button').addEventListener("click", confirmChocie);
}

const confirmChocie = () => {
    soldier.removeEventListener("click", choose);
    commander.removeEventListener("click", choose);
    document.getElementById('chosen-button').removeEventListener("click", confirmChocie);
    document.getElementById('animation-car').style.animation = 'back-car-drive 1s linear';
        setTimeout(() => { 
            document.getElementById('animation-car').style.animation = `${role}-car-drive 1s linear forwards`;
            document.getElementById('animation-car').setAttribute('src', 'assets/general/cars/sideView.svg');
        }, 900);
    sessionStorage.setItem("role", role);
    window.location.href = "general.html";
}

const aboutUsOpen = () => {
    document.getElementById('start-button').removeEventListener("click", startLomda);
    document.getElementById('info').style.display = 'block';
    document.getElementById('info').style.animation = 'circle-animation-open 1s forwards';
    setTimeout(() => {
        document.getElementById('about-title').style.display = 'block';
        document.getElementById('about-title').style.animation = `slide 1s forwards`;
    }, 800);
    setTimeout(() => { 
        document.getElementById('about-text').style.display = 'block';
        document.getElementById('about-text').style.animation = `fade-in 1s forwards`;
        document.getElementById('close-window').style.animation = `fade-in 1s forwards`;
        document.getElementById('close-window').addEventListener("click", aboutUsClose);
    }, 1200);
}

const aboutUsClose = () => {
    document.getElementById('info-text').style.animation = `fade-out 1s forwards`;
    document.getElementById('close-window').style.animation = `fade-out 1s forwards`;
    setTimeout(() => {
        document.getElementById('info').style.animation = 'circle-animation-close 1s forwards';
    }, 1000);
    setTimeout(() => { 
        document.getElementById('info').style.display = 'none';
        document.getElementById('start-button').addEventListener("click", startLomda);
        document.getElementById('question-button').addEventListener("click", aboutUsOpen);
        document.getElementById('info-text').style.animation = `none`;
        document.getElementById('about-text').style.animation = `none`;
        document.getElementById('close-window').style.animation = `none`;
        
    }, 1700);
}
