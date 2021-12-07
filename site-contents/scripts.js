function colorHandler() {
    let selectedColor = 0;
    const colors = [
        ["#e64a79ee", "#007bff99"],
        ["#e6e34aee", "#ff7b0099"],
        ["#e6904aee", "#00ffff99"],
        ["#d169dfee", "#3700ff99"],
    ];
    const darkColors = [
        ["#74233bee", "#01366e99"],
        ["#a7a536ee", "#a04d0099"],
        ["#8f5a2fee", "#02929299"],
        ["#8d2e99ee", "#2801b499"],
    ];

    return (darkMode, random) => {
        if (!random) {
            return darkMode ? darkColors[selectedColor] : colors[selectedColor];
        }
        let rnd = Math.floor(Math.random() * colors.length);
        while (rnd === selectedColor) {
            rnd = Math.floor(Math.random() * colors.length);
        }
        selectedColor = rnd;
        return darkMode ? darkColors[selectedColor] : colors[selectedColor];
    };
}

function onNavbarClick() {
    let selectedNavId = "header-nav";

    return (target) => {
        closeSidebar();
        const targetElement = document.getElementsByClassName(target)[0];
        targetElement.scrollIntoView({ behavior: "smooth" });
        prevNavItem = document.getElementById(selectedNavId);
        prevNavItem.classList.remove("active");
        selectedNavId = target + "-nav";
        targetNavItem = document.getElementById(selectedNavId);
        targetNavItem.classList.add("active");
    };
}

function addOrRemoveClassname(element, mode, classname) {
    if (mode) {
        element.classList.add(classname);
    } else {
        element.classList.remove(classname);
    }
}

function changeColor() {
    const colorHndlr = colorHandler();
    const setَGradientColor = (element, [col1, col2]) => {
        element.style.backgroundImage =
            "linear-gradient(" +
            "to right" +
            ", " +
            col1 +
            " 30%, " +
            col2 +
            " 100%)";
    };

    let darkMode = false;
    const bgIds = ["cards", "activities", "comments", "footer"];
    const cards = document.getElementsByClassName("card");

    return {
        toggleMode: () => {
            darkMode = !darkMode;

            bgIds.forEach((id) => {
                element = document.getElementById(id);
                addOrRemoveClassname(element, darkMode, "dark-background");
            });
            Array.prototype.forEach.call(cards, (el) => {
                addOrRemoveClassname(el, darkMode, "dark-card");
            });
            const waveElements = document.getElementsByClassName("wave");
            Array.prototype.forEach.call(waveElements, (el) => {
                addOrRemoveClassname(el, darkMode, "dark-wave");
            });

            const headerElement = document.getElementById("header");
            const headerGradientElement =
                document.getElementById("header-gradient");
            addOrRemoveClassname(headerElement, darkMode, "dark-header");
            const color = colorHndlr(darkMode, false);
            setَGradientColor(headerGradientElement, color);

            const changeBgColorBtn =
                document.getElementById("change-bg-button");
            addOrRemoveClassname(changeBgColorBtn, !darkMode, "btn-warning");
            addOrRemoveClassname(changeBgColorBtn, darkMode, "btn-secondary");
        },
        randomColor: () => {
            const color = colorHndlr(darkMode, true);
            const headerElement = document.getElementById("header-gradient");
            setَGradientColor(headerElement, color);
        },
    };
}

function moveComments() {
    let currentCustomer = 0;

    const doScroll = (move) => {
        if (move === "prev") {
            currentCustomer += 2;
        } else {
            currentCustomer += 1;
        }
        currentCustomer %= 3;
        const customersElement = document.getElementById("customers");
        const scrollWidth = customersElement.scrollWidth;
        customersElement.scrollLeft = -(scrollWidth / 3) * currentCustomer;
    };

    window.setInterval(function () {
        doScroll("next");
    }, 3000);

    return (move) => doScroll(move);
}

function moveImagess() {
    let currentImage = 0;

    const doScroll = (move) => {
        if (move === "prev") {
            currentImage += 4;
        } else {
            currentImage += 1;
        }
        currentImage %= 5;
        const imagesElement = document.getElementById("images");
        const scrollWidth = imagesElement.scrollWidth;
        imagesElement.scrollLeft = (scrollWidth / 5) * currentImage;
    };

    return (move) => doScroll(move);
}

function openSidebar() {
    const sideMenuElement = document.getElementById("sidemenu");
    addOrRemoveClassname(sideMenuElement, true, "open");
}

function closeSidebar() {
    const sideMenuElement = document.getElementById("sidemenu");
    addOrRemoveClassname(sideMenuElement, false, "open");
}

function onConfirmSubmit() {
    const myToastEl = document.getElementById("myToastEl");
    const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
    myToast.show();
}

const navItemClick = onNavbarClick();
const colorHandlerObj = changeColor();
const onToggleModeClick = colorHandlerObj.toggleMode;
const onRandomColorClick = colorHandlerObj.randomColor;
const onMoveComments = moveComments();
const onMoveImages = moveImagess();
