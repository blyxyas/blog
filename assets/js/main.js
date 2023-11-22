window.onload = function () {

    let maintitle = document.getElementById("mainTitle");
    console.log(maintitle);
    document.addEventListener("mousemove", (event) => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
    
        let mouseX = Math.round((event.clientX / winWidth) * 100);
        let mouseY = Math.round((event.clientY / winHeight) * 100);
    
        maintitle.style.setProperty(
            "--mouse-x",
            mouseX.toString() + "%"
        )
    
        maintitle.style.setProperty(
            "--mouse-y",
            mouseY.toString() + "%"
        )
    })
}