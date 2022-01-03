/*
USEFUL LINKS

CDN.JS
https://cdnjs.com/

SLIDERS
SWIPER(VANILLA JS) https://swiperjs.com/get-started
OWL CAROUSEL 2 SLIDER(JQUERY) https://owlcarousel2.github.io/OwlCarousel2/
FOTORAMA SLIDER(JQUERY) https://fotorama.io/#5264c896-cf01-4ad9-9216-114c20a388cc

GALLERY
LIGHT GALLERY(VANILLA JS) https://www.lightgalleryjs.com/
FANCY BOX(JQUERY) https://fancyapps.com/fancybox/3/

SCROLL ANIMATION
AOS(VANILLA JS) https://michalsnik.github.io/aos/

GRID SYSTEM
EG.JS(VANILLA JS) https://naver.github.io/egjs-infinitegrid/

POPUP
TINGLE(VANILLA JS) https://tingle.robinparisi.com/
POPUP(JQUERY) https://jquerymodal.com/

LAZY LOAD
JQUERY LAZY http://jquery.eisbehr.de/lazy/
LOZAD(VANILLA JS) https://github.com/ApoorvSaxena/lozad.js
LAYZR(VANILLA JS) https://github.com/callmecavs/layzr.js

*/

import { checkDevice } from "./modules/checkDevice.mjs"
import { isWebp } from "./modules/isWebp.mjs"
import { ibg } from "./modules/ibg.mjs"
import { spoilersActive } from "./modules/spoilers.mjs"

// VARIABLES
const menuLinksData = document.querySelectorAll('.menu__link[data-goto]')
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
const menuLinks = document.querySelectorAll('.menu__link')
const menuArrows = document.querySelectorAll('.menu__arrow')
const load = document.querySelector('.loading')
const sublists = document.querySelectorAll('.menu__sublist')

window.onload = (function () {
  load.classList.add('none');
})

document.addEventListener('DOMContentLoaded', function () {
  spoilersActive(menuArrows, sublists)
  ibg()
  isWebp()
  checkDevice(menuArrows)

  // SCROLL
  if (menuLinksData) {
    menuLinksData.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick)
    })
    function onMenuLinkClick(e) {
      const menuLink = e.target
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight
        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth'
        })
        e.preventDefault()
      }
    }
  }

  // BURGER
  if (iconMenu) {
    iconMenu.onclick = (() => {
      iconMenu.classList.toggle('_active')
      menuBody.classList.toggle('_active')
      document.body.classList.toggle('_lock')
    })
  }

  // CLOSE MENU WHEN CLICK ON LINK
  for (const link of menuLinks) {
    link.onclick = (() => {
      document.body.classList.remove('_lock')
      iconMenu.classList.remove('_active')
      menuBody.classList.remove('_active')
    })
  }
})