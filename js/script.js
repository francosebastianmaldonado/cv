// Detiene ejecucion de codigo ante errores
// "use strict";





// ____________________________
//
//    Constantes y Variables
// ____________________________
const root = document.querySelector(":root");
const body = document.getElementsByTagName("body")[0];
const main = document.getElementsByTagName("main")[0];
const logo = document.getElementsByClassName("logo")[0];
const nav = document.getElementsByTagName("nav")[0];
const navMenu = document.getElementsByClassName("nav-menu")[0];
const menuButton = document.getElementsByClassName("nav-menu-button")[0];
const menuButtonIcon = menuButton.childNodes[1];
const homeSection = document.getElementById("inicio");

// Obtengo valor de variable en "style.css" y remuevo letras con replace() y regex
const animationTime = getComputedStyle(root).getPropertyValue("--animation-timing").replace(/\D/g, "");

// El semaforo limita multiple ejecuciones del codigo a la vez
var sem_menu = true;





// __________
//
//    Main   
// __________
nav.addEventListener("click", (e) => {
  // Si se presiona un elemento '<a>' en '<nav>'   &&   sem_menu == 'true'
  if (e.target.tagName === "A" && sem_menu) {

    // Si existe atributo 'data-set' en elemento
    if (e.target.dataset.id) {
      scrollToElement(e.target.dataset.id);
    }

    // Si se presiona el logo   &&   El menu no es visible
    if (e.target.id === logo.id && !isMenuVisible()) {
      // Entonces finaliza la ejecucion
      return;
    }

    // Alterna menu, barra desplazamiento
    sem_menu = false;
    toggleMenu();
    toggleScrollBar();

    // Retrasa el cambio del icono de menu
    setTimeout(() => {
      toggleMenuButtonIcon();
      sem_menu = true;
    }, animationTime);
  }
});





// _______________
//
//    Funciones   
// _______________
const toggleMenu = () => {
  /**
   * Muestra/Oculta el menu
   */

  if (isMenuVisible()) {
    // Ocultar
    main.style.filter = "blur(0px)";
    navMenu.classList.remove("slideIn");
    navMenu.classList.add("slideOut");
    setTimeout(() => {
      // Espera a que termine la animacion
      navMenu.style.display = "none";
    }, animationTime - 50);
  } else {
    // Mostrar
    main.style.filter = "blur(5px)";
    navMenu.classList.remove("slideOut");
    navMenu.classList.add("slideIn");
    navMenu.style.display = "flex";
  }
}


const toggleMenuButtonIcon = () => {
  /**
   * Alterna icono de menu
   */

  let name = menuButtonIcon.name;
  menuButtonIcon.name = (name === "menu-outline" ? "close-outline" : "menu-outline");
}


const toggleScrollBar = () => {
  /**
   * Alterna la barra de desplazamiento
   */

  body.style.overflow = (isScrollBarVisible() ? "hidden" : "overlay");
}


const scrollToElement = (id, inset = "top", offset = 0) => {
  /**
   * Scrollea hacia la posicion de un elemento en el HTML
   * Calculo: nuevaPosicion = TopActualVentana - Desplazamiento + Elemento Inset
   * @param {String} id - Elemento hacia donde scrollear
   * @param {String} inset - Sector del recuadro del elemento
   * @param {Number} offset - Desplazamiento adicional en 'px'
   */
  
  let element = document.getElementById(id);
  let newPosition = window.scrollY - offset;

  // Direccion desde donde desplazarse
  switch (inset) {
    case "top":
      newPosition += element.getBoundingClientRect().top;
      break;
    case "right":
      newPosition += element.getBoundingClientRect().right;
      break;
    case "bottom":
      newPosition += element.getBoundingClientRect().bottom;
      break;
    case "left":
      newPosition += element.getBoundingClientRect().left;
      break;
    default:
      break;
  }

  // Desplaza hacia la posicion con animacion de desplazamiento suave
  window.scrollTo({
    top: newPosition,
    behavior: "smooth"
  });
}


const isMenuVisible = () => {
  /**
   * Retorna 'true' si el menu es visible
  */

  return (navMenu.style.display !== "none");
}


const isScrollBarVisible = () => {
  /**
   * Retorna 'true' si la barra de desplazamiento es visible
   */

  return (body.style.overflow !== "hidden");
}