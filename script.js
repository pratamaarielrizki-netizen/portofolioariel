/* =========================================================
   ARIEL FUTURE PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initPreloader();

        initNavbar();

        initMobileMenu();

        initSmoothScroll();

        initReveal();

        initProjectFilter();

        initProjectModal();

        initCursor();

        initClock();

        initCoreInteraction();

        initButtons();

        initMusic();

    }
);


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.querySelector(
            "#preloader"
        );

    const progress =
        document.querySelector(
            ".preloader-line span"
        );

    const percent =
        document.querySelector(
            "[data-loader-percent]"
        );


    if (!preloader) return;


    let value = 0;


    const timer =
        setInterval(
            () => {

                value +=
                    Math.floor(
                        Math.random() * 8
                    ) + 3;


                if (value >= 100) {

                    value = 100;

                }


                if (progress) {

                    progress.style.width =
                        `${value}%`;

                }


                if (percent) {

                    percent.textContent =
                        `${value}%`;

                }


                if (value >= 100) {

                    clearInterval(timer);


                    setTimeout(
                        () => {

                            preloader.classList.add(
                                "hidden"
                            );

                        },
                        450
                    );

                }

            },
            80
        );

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        links.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {
                threshold: .35
            }
        );


    sections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.querySelector(
            ".mobile-menu"
        );

    const navigation =
        document.querySelector(
            ".navigation"
        );


    if (!button || !navigation) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                    }
                );

            }
        );

}


/* =========================================================
   REVEAL
========================================================= */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   PROJECT FILTER
========================================================= */

function initProjectFilter() {

    const buttons =
        document.querySelectorAll(
            ".filter-button"
        );

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;


                    buttons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    cards.forEach(
                        card => {

                            const category =
                                card.dataset.category;


                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                card.classList.remove(
                                    "hidden"
                                );

                            } else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   PROJECT MODAL
========================================================= */

function initProjectModal() {

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    const projectModal =
        document.querySelector(
            ".project-modal"
        );

    const modalOverlay =
        document.querySelector(
            ".modal-overlay"
        );

    const modalClose =
        document.querySelector(
            ".modal-close"
        );


    const modalTitle =
        document.querySelector(
            "[data-modal-title]"
        );

    const modalDescription =
        document.querySelector(
            "[data-modal-description]"
        );

    const modalTags =
        document.querySelector(
            "[data-modal-tags]"
        );

    const modalImage =
        document.querySelector(
            "[data-modal-image]"
        );

    const modalYear =
        document.querySelector(
            "[data-modal-year]"
        );

    const modalRole =
        document.querySelector(
            "[data-modal-role]"
        );

    const modalStatus =
        document.querySelector(
            "[data-modal-status]"
        );

    const modalLink =
        document.querySelector(
            "[data-modal-link]"
        );


    if (!projectModal) {
        return;
    }


    function openProject(card) {

        const title =
            card.dataset.title ||
            "UNTITLED PROJECT";


        const description =
            card.dataset.description ||
            "No project description available.";


        const tags =
            card.dataset.tags ||
            "";


        const image =
            card.dataset.image ||
            "";


        const year =
            card.dataset.year ||
            "2026";


        const role =
            card.dataset.role ||
            "Developer";


        const status =
            card.dataset.status ||
            "Completed";


        const link =
            card.dataset.link ||
            "#";


        if (modalTitle) {

            modalTitle.textContent =
                title;

        }


        if (modalDescription) {

            modalDescription.textContent =
                description;

        }


        if (modalYear) {

            modalYear.textContent =
                year;

        }


        if (modalRole) {

            modalRole.textContent =
                role;

        }


        if (modalStatus) {

            modalStatus.textContent =
                status;

        }


        if (
            modalImage &&
            image
        ) {

            modalImage.src =
                image;

            modalImage.alt =
                `${title} project preview`;

        }


        if (modalLink) {

            modalLink.href =
                link;


            if (link === "#") {

                modalLink.style.display =
                    "none";

            } else {

                modalLink.style.display =
                    "inline-flex";

            }

        }


        if (modalTags) {

            modalTags.innerHTML =
                "";


            tags
                .split(",")
                .map(
                    tag =>
                        tag.trim()
                )
                .filter(Boolean)
                .forEach(
                    tag => {

                        const element =
                            document.createElement(
                                "span"
                            );


                        element.textContent =
                            tag;


                        modalTags.appendChild(
                            element
                        );

                    }
                );

        }


        projectModal.classList.add(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    function closeProject() {

        projectModal.classList.remove(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    projectCards.forEach(
        card => {

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "a"
                        )
                    ) {

                        return;

                    }


                    openProject(
                        card
                    );

                }
            );

        }
    );


    document
        .querySelectorAll(
            ".project-open"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const card =
                            button.closest(
                                ".project-card"
                            );


                        if (card) {

                            openProject(
                                card
                            );

                        }

                    }
                );

            }
        );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProject
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProject
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeProject();

            }

        }
    );

}


/* =========================================================
   CURSOR
========================================================= */

function initCursor() {

    const cursor =
        document.querySelector(
            ".cursor"
        );

    const ring =
        document.querySelector(
            ".cursor-ring"
        );


    if (
        !cursor ||
        !ring ||
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    let mouseX = 0;

    let mouseY = 0;

    let ringX = 0;

    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        }
    );


    function animateRing() {

        ringX +=
            (mouseX - ringX) *
            .16;

        ringY +=
            (mouseY - ringY) *
            .16;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateRing
        );

    }


    animateRing();


    document
        .querySelectorAll(
            "a, button"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        ring.style.width =
                            "42px";

                        ring.style.height =
                            "42px";

                        ring.style.borderColor =
                            "rgba(0,229,255,.9)";

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        ring.style.width =
                            "28px";

                        ring.style.height =
                            "28px";

                        ring.style.borderColor =
                            "rgba(0,229,255,.5)";

                    }
                );

            }
        );

}


/* =========================================================
   CLOCK
========================================================= */

function initClock() {

    const clock =
        document.querySelector(
            "[data-clock]"
        );


    if (!clock) {
        return;
    }


    function updateClock() {

        const now =
            new Date();


        const hours =
            String(
                now.getHours()
            ).padStart(
                2,
                "0"
            );


        const minutes =
            String(
                now.getMinutes()
            ).padStart(
                2,
                "0"
            );


        const seconds =
            String(
                now.getSeconds()
            ).padStart(
                2,
                "0"
            );


        clock.textContent =
            `${hours}:${minutes}:${seconds}`;

    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );

}


/* =========================================================
   CORE INTERACTION
========================================================= */

function initCoreInteraction() {

    const core =
        document.querySelector(
            ".core-system"
        );


    if (!core) {
        return;
    }


    core.addEventListener(
        "mousemove",
        event => {

            const rect =
                core.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                .5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                .5;


            core.style.transform =
                `
                rotateX(${y * -5}deg)
                rotateY(${x * 5}deg)
                scale(1.02)
                `;

        }
    );


    core.addEventListener(
        "mouseleave",
        () => {

            core.style.transform =
                "";

        }
    );

}


/* =========================================================
   BUTTON EFFECTS
========================================================= */

function initButtons() {

    document
        .querySelectorAll(
            ".button, .contact-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        button.style.setProperty(
                            "--mx",
                            `${x}px`
                        );


                        button.style.setProperty(
                            "--my",
                            `${y}px`
                        );

                    }
                );

            }
        );

}


/* =========================================================
   MUSIC PLAYER
========================================================= */

function initMusic() {

    const audio =
        document.querySelector(
            "#audioPlayer"
        );


    const playButton =
        document.querySelector(
            ".music-play"
        );


    const previousButton =
        document.querySelector(
            "[data-music-prev]"
        );


    const nextButton =
        document.querySelector(
            "[data-music-next]"
        );


    const progress =
        document.querySelector(
            "#musicProgress"
        );


    const volume =
        document.querySelector(
            "#musicVolume"
        );


    const title =
        document.querySelector(
            "#musicTitle"
        );


    const artist =
        document.querySelector(
            "#musicArtist"
        );


    const cover =
        document.querySelector(
            "#musicCover"
        );


    const coverIndex =
        document.querySelector(
            "#coverIndex"
        );


    const currentTime =
        document.querySelector(
            "#currentTime"
        );


    const duration =
        document.querySelector(
            "#duration"
        );


    const musicSystem =
        document.querySelector(
            ".music-system"
        );


    const playlistTracks =
        document.querySelectorAll(
            ".playlist-track"
        );


    if (
        !audio ||
        !playButton
    ) {

        return;

    }


    const tracks = [

        {
            title:
                "Shut it down",

            artist:
                "Drake",

            cover:
                "shutitdown.webp",

            source:
                "shutitdown.webp"
        },

        {
            title:
                "Jatuh Hati",

            artist:
                "Raisa",

            cover:
                "jatuhhati.webp",

            source:
                "jatuhhati.webp"
        },

        {
            title:
                "thanK you alMee",

            artist:
                "Taylor Swift",

            cover:
                "thankyoualmee.webp",

            source:
                "thankyoualmee.webp"
        }

    ];


    let currentTrack =
        0;


    let isPlaying =
        false;


    audio.volume =
        .8;


    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds)
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remaining =
            Math.floor(
                seconds % 60
            );


        return `${minutes}:${String(
            remaining
        ).padStart(2,"0")}`;

    }


    function updatePlayIcon() {

        const icon =
            playButton.querySelector(
                "i"
            );


        if (!icon) {
            return;
        }


        if (isPlaying) {

            icon.className =
                "fa-solid fa-pause";

        } else {

            icon.className =
                "fa-solid fa-play";

        }

    }


    function loadTrack(
        index,
        shouldPlay = false
    ) {

        if (
            index < 0
        ) {

            index =
                tracks.length - 1;

        }


        if (
            index >= tracks.length
        ) {

            index =
                0;

        }


        currentTrack =
            index;


        const track =
            tracks[
                currentTrack
            ];


        audio.src =
            track.source;


        audio.load();


        if (title) {

            title.textContent =
                track.title;

        }


        if (artist) {

            artist.textContent =
                track.artist;

        }


        if (cover) {

            cover.src =
                track.cover;

            cover.alt =
                `${track.title} cover`;

        }


        if (coverIndex) {

            coverIndex.textContent =
                String(
                    currentTrack + 1
                ).padStart(
                    2,
                    "0"
                );

        }


        playlistTracks.forEach(
            (trackElement, index) => {

                trackElement.classList.toggle(
                    "active",
                    index === currentTrack
                );

            }
        );


        progress.value =
            0;


        if (currentTime) {

            currentTime.textContent =
                "0:00";

        }


        if (duration) {

            duration.textContent =
                "0:00";

        }


        if (shouldPlay) {

            const playPromise =
                audio.play();


            if (
                playPromise &&
                typeof playPromise.catch ===
                "function"
            ) {

                playPromise.catch(
                    () => {

                        isPlaying =
                            false;

                        updatePlayIcon();

                    }
                );

            }

        }

    }


    function togglePlay() {

        if (
            !audio.src ||
            audio.src.endsWith("/")
        ) {

            loadTrack(
                currentTrack,
                false
            );

        }


        if (
            audio.paused
        ) {

            const playPromise =
                audio.play();


            if (
                playPromise &&
                typeof playPromise.then ===
                "function"
            ) {

                playPromise
                    .then(
                        () => {

                            isPlaying =
                                true;

                            musicSystem?.classList.add(
                                "playing"
                            );

                            updatePlayIcon();

                        }
                    )
                    .catch(
                        () => {

                            isPlaying =
                                false;

                            updatePlayIcon();

                        }
                    );

            }

        } else {

            audio.pause();

            isPlaying =
                false;

            musicSystem?.classList.remove(
                "playing"
            );

            updatePlayIcon();

        }

    }


    playButton.addEventListener(
        "click",
        togglePlay
    );


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                loadTrack(
                    currentTrack - 1,
                    isPlaying
                );

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                loadTrack(
                    currentTrack + 1,
                    isPlaying
                );

            }
        );

    }


    playlistTracks.forEach(
        trackElement => {

            trackElement.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            trackElement.dataset.trackIndex
                        );


                    loadTrack(
                        index,
                        true
                    );

                }
            );

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "timeupdate",
        () => {

            if (
                !Number.isFinite(
                    audio.duration
                )
            ) {

                return;

            }


            const percentage =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;


            if (progress) {

                progress.value =
                    percentage;

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }


            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    if (progress) {

        progress.addEventListener(
            "input",
            () => {

                if (
                    !Number.isFinite(
                        audio.duration
                    )
                ) {

                    return;

                }


                audio.currentTime =
                    (
                        Number(
                            progress.value
                        ) / 100
                    ) *
                    audio.duration;

            }
        );

    }


    if (volume) {

        volume.addEventListener(
            "input",
            () => {

                audio.volume =
                    Number(
                        volume.value
                    );

            }
        );

    }


    audio.addEventListener(
        "play",
        () => {

            isPlaying =
                true;

            musicSystem?.classList.add(
                "playing"
            );

            updatePlayIcon();

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            isPlaying =
                false;

            musicSystem?.classList.remove(
                "playing"
            );

            updatePlayIcon();

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            loadTrack(
                currentTrack + 1,
                true
            );

        }
    );


    audio.addEventListener(
        "error",
        () => {

            isPlaying =
                false;

            musicSystem?.classList.remove(
                "playing"
            );

            updatePlayIcon();

        }
    );


    loadTrack(
        0,
        false
    );

}


/* =========================================================
   PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document
                .querySelectorAll(
                    ".core-ring, .core-orbit"
                )
                .forEach(
                    element => {

                        element.style.animationPlayState =
                            "paused";

                    }
                );

        } else {

            document
                .querySelectorAll(
                    ".core-ring, .core-orbit"
                )
                .forEach(
                    element => {

                        element.style.animationPlayState =
                            "running";

                    }
                );

        }

    }
);