// document.addEventListener('DOMContentLoaded', function () {
//   // IBG METHOD
//   function ibg() {
//     let ibg = document.querySelectorAll(".ibg");
//     for (var i = 0; i < ibg.length; i++) {
//       if (ibg[i].querySelector('img')) {
//         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
//       }
//     }
//   }
//   ibg();
// });

// // PRELOADER
// let load = document.querySelector('.loading');
// window.onload = (function () {
//   load.classList.add('none');
// });
// //  DYNAMIC ADAPTIVE
// // data - da="КУДА ПЕРЕМІСТИТИ(КЛАС),ЯКИМ ПО РАХУНКУ,ПРИ ЯКОМУ РОЗМІРІ ЕКРАНА"
// (function () {
//   var index;
//   var daBreakpoint;
//   var daType;
//   var customAdapt, daArray, daBreakpoint, daDestination, daElement, daElements, daElementsArray, daMatchMedia, daMove, daPlace, daType, dynamicAdapt, dynamicAdaptBack, dynamicAdaptSort, el, index, indexInParent, indexOfElements, number, originalPositions;
//   originalPositions = [];
//   daElements = document.querySelectorAll('[data-da]');
//   daElementsArray = [];
//   daMatchMedia = [];
//   dynamicAdapt = function (e) {
//     var actualIndex, daBreakpoint, daClassname, daDestination, daElement, daPlace, el, index;
//     index = 0;
//     while (index < daElementsArray.length) {
//       el = daElementsArray[index];
//       daElement = el.element;
//       daDestination = el.destination;
//       daPlace = el.place;
//       daBreakpoint = el.breakpoint;
//       daClassname = '_dynamic_adapt_' + daBreakpoint;
//       if (daMatchMedia[index].matches) {
//         if (!daElement.classList.contains(daClassname)) {
//           actualIndex = indexOfElements(daDestination)[daPlace];
//           if (daPlace === 'first') {
//             actualIndex = indexOfElements(daDestination)[0];
//           } else if (daPlace === 'last') {
//             actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
//           }
//           daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
//           daElement.classList.add(daClassname);
//         } else {

//         }
//       }
//       if (daElement.classList.contains(daClassname)) {
//         dynamicAdaptBack(daElement);
//         daElement.classList.remove(daClassname);
//       }
//       index++;
//     }
//     customAdapt();
//   };
//   dynamicAdaptBack = function (el) {
//     var actualIndex, daIndex, indexPlace, originalPlace, parentPlace;
//     daIndex = el.getAttribute('data-da-index');
//     originalPlace = originalPositions[daIndex];
//     parentPlace = originalPlace['parent'];
//     indexPlace = originalPlace['index'];
//     actualIndex = indexOfElements(parentPlace, true)[indexPlace];
//     parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
//   };
//   indexInParent = function (el) {
//     var children;
//     children = Array.prototype.slice.call(el.parentNode.children);
//     return children.indexOf(el);
//   };
//   indexOfElements = function (parent, back) {
//     var children, childrenArray, childrenElement, i;
//     children = parent.children;
//     childrenArray = [];
//     i = 0;
//     while (i < children.length) {
//       childrenElement = children[i];
//       if (back) {
//         childrenArray.push(i);
//       } else {

//       }
//       if (childrenElement.getAttribute('data-da') === null) {
//         childrenArray.push(i);
//       }
//       i++;
//     }
//     return childrenArray;
//   };
//   dynamicAdaptSort = function (arr) {
//     arr.sort(function (a, b) {
//       if (a.breakpoint > b.breakpoint) {
//         return -1;
//       } else {
//         return 1;
//       }
//     });
//     arr.sort(function (a, b) {
//       if (a.place > b.place) {
//         return 1;
//       } else {
//         return -1;
//       }
//     });
//   };
//   customAdapt = function () {
//     var viewport_width;
//     viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//   };
//   if (daElements.length > 0) {
//     number = 0;
//     index = 0;
//     while (index < daElements.length) {
//       daElement = daElements[index];
//       daMove = daElement.getAttribute('data-da');
//       if (daMove !== '') {
//         daArray = daMove.split(',');
//         daPlace = daArray[1] ? daArray[1].trim() : 'last';
//         daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
//         daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
//         daDestination = document.querySelector('.' + daArray[0].trim());
//       }
//       if (daArray.length > 0 && daDestination) {
//         daElement.setAttribute('data-da-index', number);
//         originalPositions[number] = {
//           'parent': daElement.parentNode,
//           'index': indexInParent(daElement)
//         };
//         daElementsArray[number] = {
//           'element': daElement,
//           'destination': document.querySelector('.' + daArray[0].trim()),
//           'place': daPlace,
//           'breakpoint': daBreakpoint,
//           'type': daType
//         };
//         number++;
//       }
//       index++;
//     }
//     dynamicAdaptSort(daElementsArray);
//     index = 0;
//     while (index < daElementsArray.length) {
//       el = daElementsArray[index];
//       daBreakpoint = el.breakpoint;
//       daType = el.type;
//       daMatchMedia.push(window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)'));
//       daMatchMedia[index].addListener(dynamicAdapt);
//       index++;
//     }
//   }
//   dynamicAdapt();
// })();
