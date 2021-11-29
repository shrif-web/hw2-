function navItemClick(target) {
    const targetElement = document.getElementsByClassName(target)[0];
    targetElement.scrollIntoView({behavior: 'smooth'})
}
