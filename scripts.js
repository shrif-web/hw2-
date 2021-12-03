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
        const targetElement = document.getElementsByClassName(target)[0];
        targetElement.scrollIntoView({ behavior: "smooth" });
        prevNavItem = document.getElementById(selectedNavId);
        prevNavItem.classList.remove("active");
        selectedNavId = target + "-nav";
        targetNavItem = document.getElementById(selectedNavId);
        targetNavItem.classList.add("active");
    };
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
    const bgIds = ["cards", "activities", "comments", "footer", "contact-us"];
    const cards = document.getElementsByClassName("card");

    const func = (element, mode, classname) => {
        if (mode) {
            element.classList.add(classname);
        } else {
            element.classList.remove(classname);
        }
    };

    return {
        toggleMode: () => {
            darkMode = !darkMode;

            bgIds.forEach((id) => {
                element = document.getElementById(id);
                func(element, darkMode, "dark-background");
            });
            Array.prototype.forEach.call(cards, (el) => {
                func(el, darkMode, "dark-card");
            });
            const waveElement = document.getElementById("wave");
            func(waveElement, darkMode, "dark-wave");

            const headerElement = document.getElementById("header");
            const headerGradientElement = document.getElementById("header-gradient");
            func(headerElement, darkMode, "dark-header");
            const color = colorHndlr(darkMode, false);
            setَGradientColor(headerGradientElement, color);

            const changeBgColorBtn =
                document.getElementById("change-bg-button");
            func(changeBgColorBtn, !darkMode, "btn-warning");
            func(changeBgColorBtn, darkMode, "btn-secondary");
        },
        randomColor: () => {
            const color = colorHndlr(darkMode, true);
            const headerElement = document.getElementById("header-gradient");
            setَGradientColor(headerElement, color);
        },
    };
}

const navItemClick = onNavbarClick();

const colorHandlerObj = changeColor();
const onToggleModeClick = colorHandlerObj.toggleMode;
const onRandomColorClick = colorHandlerObj.randomColor;
