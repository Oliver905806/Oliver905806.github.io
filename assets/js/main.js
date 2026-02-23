document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");
    const heroSection = document.querySelector(".case-hero");
    const progressCircle = document.querySelector(".progress-ring__circle");

    if (!backToTop || !heroSection || !progressCircle) {
        console.log("Back to top elements not found.");
        return;
    }

    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const heroBottom = heroSection.getBoundingClientRect().bottom;

        // Show button after hero
        if (heroBottom <= 0) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

        // Scroll progress
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        const offset = circumference - scrollPercent * circumference;
        progressCircle.style.strokeDashoffset = offset;

        // Fade when scrolling up
        if (scrollTop < lastScroll) {
            backToTop.classList.add("fade");
        } else {
            backToTop.classList.remove("fade");
        }

        lastScroll = scrollTop;
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});