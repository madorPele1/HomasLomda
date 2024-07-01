window.addEventListener("load", () => {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startLomda);
})

const startLomda = () => {
    document.getElementById('panel').style.animation = 'fade-out 1s forwards';
    setTimeout(() => { 
        document.getElementById('panel').innerHTML = '<p class="instructions">המעבר בין עמוד לעמוד בלומדה יעשה באמצעות גלילה/החלקה מעלה.</p><p class="instructions">ניתן לחזור בכל עת למסלול ולחזור ליחידות הלימוד הקודמות באמצעות לחיצה על המכונית המופיעה בצד שמאל של המסך.</p><p class="instructions bold">גללו מטה כדי להמשיך..</p><p class="down-arrows">︾</p>';
        document.getElementById('panel').style.animation = 'fade-in 1s forwards';    
    }, 1000);
}
