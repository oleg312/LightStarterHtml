document.addEventListener('DOMContentLoaded', function () {
   const spollersArray = document.querySelectorAll('[data-spollers]')
   const menuLinksData = document.querySelectorAll('.menu__link[data-goto]')
   const iconMenu = document.querySelector('.menu__icon')
   const menuBody = document.querySelector('.menu__body')
   const menuLinks = document.querySelectorAll('.menu__link')
   let menuArrows = document.querySelectorAll('.menu__arrow')
   
   // CHECK THE DEVICE
   const isMobile = {
      Android: function () {
         return navigator.userAgent.match(/Android/i)
      },
      BlackBerry: function () {
         return navigator.userAgent.match(/BlackBerry/i)
      },
      IOS: function () {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i)
      },
      Opera: function () {
         return navigator.userAgent.match(/Opera Mini/i)
      },
      Windows: function () {
         return navigator.userAgent.match(/IEMobile/i)
      },
      any: function () {
         return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
      }
   }

   if (isMobile.any()) {
      document.body.classList.add('_touch')
      if (menuArrows.length > 0) {
         for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.onclick = (() => {
               menuArrow.parentElement.classList.toggle('_active')
            })

         }
      }
   } else {
      document.body.classList.add('_pc')
   }

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

   // SPOLLERS
   // FOR PARENT WRITE data-spollers
   // FOR TITLE WRITE data-spoller, ADAPTIVE data-spoller="992,max" or data-spoller="992,min"
   if (spollersArray.length > 0) {
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
         return !item.dataset.spollers.split(',')[0]
      })
      if (spollersRegular.length > 0) {
         initSpollers(spollersRegular)
      }
      const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
         return item.dataset.spollers.split(',')[0]
      })

      if (spollersMedia.length > 0) {
         const breakpointsArray = []
         spollersMedia.forEach(item => {
            const params = item.dataset.spollers
            const breakpoint = []
            const paramsArray = params.split(',')
            breakpoint.value = paramsArray[0]
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
            breakpoint.item = item
            breakpointsArray.push(breakpoint)
         })

         let mediaQuaries = breakpointsArray.map(function (item) {
            return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
         })
         mediaQuaries = mediaQuaries.filter(function (item, index, self) {
            return self.indexOf(item) === index
         })

         mediaQuaries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(',')
            const mediaBreakpoint = paramsArray[1]
            const mediaType = paramsArray[2]
            const matchMedia = window.matchMedia(paramsArray[0])

            const spollersArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true
               }
            })

            matchMedia.addListener(function () {
               initSpollers(spollersArray, matchMedia)
            })
            initSpollers(spollersArray, matchMedia)
         })
      }

      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_init')
               initSpollerBody(spollersBlock)
               spollersBlock.addEventListener('click', setSpollerAction)
            } else {
               spollersBlock.classList.remove('_init')
               initSpollerBody(spollersBlock, false)
               spollersBlock.removeEventListener('click', setSpollerAction)
            }
         })
      }

      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         const spollerTitles = spollersBlock.querySelectorAll('[data-spoller')
         if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex')
                  if (!spollerTitle.classList.contains('_active')) {
                     spollerTitle.nextElementSibling.hidden = true
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1')
                  spollerTitle.nextElementSibling.hidden = false
               }
            });
         }
      }

      function setSpollerAction(e) {
         const el = e.target
         if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
            const spollersBlock = spollerTitle.closest('[data-spollers]')
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                  hideSpollersBody(spollersBlock)
               }
               spollerTitle.classList.toggle('_active')
               _slideToggle(spollerTitle.nextElementSibling, 500)
            }
            e.preventDefault()
         }
      }

      function hideSpollersBody(spollersBLock) {
         const spollerActiveTitle = spollersBLock.querySelector('[data-spoller]._active')
         if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active')
            _slideUp(spollerActiveTitle.nextElementSibling, 500)
         }
      }
   }

   let _slideUp = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide')
         target.style.transitionProperty = 'height, margin, padding'
         target.style.transitionDuration = duration + 'ms'
         target.style.height = target.offsetHeight + 'px'
         target.offsetHeight
         target.style.overflow = 'hidden'
         target.style.height = 0
         target.style.paddingTop = 0
         target.style.paddingBottom = 0
         target.style.marginTop = 0
         target.style.marginBottom = 0
         window.setTimeout(() => {
            target.hidden = true
            target.style.removeProperty('height')
            target.style.removeProperty('padding-top')
            target.style.removeProperty('padding-bottom')
            target.style.removeProperty('margin-top')
            target.style.removeProperty('margin-bottom')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
         }, duration)
      }
   }

   let _slideDown = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide')
         if (target.hidden) {
            target.hidden = false
         }
         let height = target.offsetHeight
         target.style.overflow = 'hidden'
         target.style.height = 0
         target.style.paddingTop = 0
         target.style.paddingBottom = 0
         target.style.marginTop = 0
         target.style.marginBottom = 0
         target.offsetHeight
         target.style.transitionProperty = 'height, margin, padding'
         target.style.transitionDuration = duration + 'ms'
         target.style.height = height + 'px'
         target.style.removeProperty('padding-top')
         target.style.removeProperty('padding-bottom')
         target.style.removeProperty('margin-top')
         target.style.removeProperty('margin-bottom')
         window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
         }, duration)
      }
   }

   let _slideToggle = (target, duration = 500) => {
      if (target.hidden) {
         return _slideDown(target, duration)
      } else {
         return _slideUp(target, duration)
      }
   }


   // IBG METHOD
   // function ibg() {
   //    let ibg = document.querySelectorAll(".ibg");
   //    for (var i = 0; i < ibg.length; i++) {
   //       if (ibg[i].querySelector('img')) {
   //          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
   //       }
   //    }
   // }
   // ibg();

   //  DYNAMIC ADAPTIVE
   // data - da = "WHERE TO MOVE (CLASS), WHICH ACCOUNT, AT WHAT SCREEN SIZE"
   //    (function() {
   //       var index;
   //       var daBreakpoint;
   //       var daType;
   //       var customAdapt, daArray, daBreakpoint, daDestination, daElement, daElements, daElementsArray, daMatchMedia, daMove, daPlace, daType, dynamicAdapt, dynamicAdaptBack, dynamicAdaptSort, el, index, indexInParent, indexOfElements, number, originalPositions;
   //       originalPositions = [];
   //       daElements = document.querySelectorAll('[data-da]');
   //       daElementsArray = [];
   //       daMatchMedia = [];
   //       dynamicAdapt = function(e) {
   //          var actualIndex, daBreakpoint, daClassname, daDestination, daElement, daPlace, el, index;
   //          index = 0;
   //          while (index < daElementsArray.length) {
   //             el = daElementsArray[index];
   //             daElement = el.element;
   //             daDestination = el.destination;
   //             daPlace = el.place;
   //             daBreakpoint = el.breakpoint;
   //             daClassname = '_dynamic_adapt_' + daBreakpoint;
   //             if (daMatchMedia[index].matches) {
   //                if (!daElement.classList.contains(daClassname)) {
   //                   actualIndex = indexOfElements(daDestination)[daPlace];
   //                   if (daPlace === 'first') {
   //                      actualIndex = indexOfElements(daDestination)[0];
   //                   } else if (daPlace === 'last') {
   //                      actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
   //                   }
   //                   daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
   //                   daElement.classList.add(daClassname);
   //                } else {

   //                }
   //             }
   //             if (daElement.classList.contains(daClassname)) {
   //                dynamicAdaptBack(daElement);
   //                daElement.classList.remove(daClassname);
   //             }
   //             index++;
   //          }
   //          customAdapt();
   //       };
   //       dynamicAdaptBack = function(el) {
   //          var actualIndex, daIndex, indexPlace, originalPlace, parentPlace;
   //          daIndex = el.getAttribute('data-da-index');
   //          originalPlace = originalPositions[daIndex];
   //          parentPlace = originalPlace['parent'];
   //          indexPlace = originalPlace['index'];
   //          actualIndex = indexOfElements(parentPlace, true)[indexPlace];
   //          parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   //       };
   //       indexInParent = function(el) {
   //          var children;
   //          children = Array.prototype.slice.call(el.parentNode.children);
   //          return children.indexOf(el);
   //       };
   //       indexOfElements = function(parent, back) {
   //          var children, childrenArray, childrenElement, i;
   //          children = parent.children;
   //          childrenArray = [];
   //          i = 0;
   //          while (i < children.length) {
   //             childrenElement = children[i];
   //             if (back) {
   //                childrenArray.push(i);
   //             } else {

   //             }
   //             if (childrenElement.getAttribute('data-da') === null) {
   //                childrenArray.push(i);
   //             }
   //             i++;
   //          }
   //          return childrenArray;
   //       };
   //       dynamicAdaptSort = function(arr) {
   //          arr.sort(function(a, b) {
   //             if (a.breakpoint > b.breakpoint) {
   //                return -1;
   //             } else {
   //                return 1;
   //             }
   //          });
   //          arr.sort(function(a, b) {
   //             if (a.place > b.place) {
   //                return 1;
   //             } else {
   //                return -1;
   //             }
   //          });
   //       };
   //       customAdapt = function() {
   //          var viewport_width;
   //          viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   //       };
   //       if (daElements.length > 0) {
   //          number = 0;
   //          index = 0;
   //          while (index < daElements.length) {
   //             daElement = daElements[index];
   //             daMove = daElement.getAttribute('data-da');
   //             if (daMove !== '') {
   //                daArray = daMove.split(',');
   //                daPlace = daArray[1] ? daArray[1].trim() : 'last';
   //                daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
   //                daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
   //                daDestination = document.querySelector('.' + daArray[0].trim());
   //             }
   //             if (daArray.length > 0 && daDestination) {
   //                daElement.setAttribute('data-da-index', number);
   //                originalPositions[number] = {
   //                   'parent': daElement.parentNode,
   //                   'index': indexInParent(daElement)
   //                };
   //                daElementsArray[number] = {
   //                   'element': daElement,
   //                   'destination': document.querySelector('.' + daArray[0].trim()),
   //                   'place': daPlace,
   //                   'breakpoint': daBreakpoint,
   //                   'type': daType
   //                };
   //                number++;
   //             }
   //             index++;
   //          }
   //          dynamicAdaptSort(daElementsArray);
   //          index = 0;
   //          while (index < daElementsArray.length) {
   //             el = daElementsArray[index];
   //             daBreakpoint = el.breakpoint;
   //             daType = el.type;
   //             daMatchMedia.push(window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)'));
   //             daMatchMedia[index].addListener(dynamicAdapt);
   //             index++;
   //          }
   //       }
   //       dynamicAdapt();
   //    })();

});

// PRELOADER
// let load = document.querySelector('.loading');
// window.onload = (function () {
//   load.classList.add('none');
// });