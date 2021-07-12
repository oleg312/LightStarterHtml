document.addEventListener 'DOMContentLoaded', ->
   # IBG METHOD
   # ibg = ->
   #    `var ibg`
   #    ibg = document.querySelectorAll('.ibg')
   #    i = 0
   #    while i < ibg.length
   #       if ibg[i].querySelector('img')
   #          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
   #          i++
   #    return

   # ibg()
# PRELOADER
# load = document.querySelector('.loading')
# window.onload = (->
#   load.classList.add 'none'
#   return
# )
# DYNAMIC ADAPTIVE
#  data-da="КУДА ПЕРЕМІСТИТИ(КЛАС),ЯКИМ ПО РАХУНКУ,ПРИ ЯКОМУ РОЗМІРІ ЕКРАНА"
# (do ->
#    `var index`
#    `var daBreakpoint`
#    `var daType`
#    originalPositions = []
#    daElements = document.querySelectorAll('[data-da]')
#    daElementsArray = []
#    daMatchMedia = []

#    dynamicAdapt = (e) ->
#       index = 0
#       while index < daElementsArray.length
#          el = daElementsArray[index]
#          daElement = el.element
#          daDestination = el.destination
#          daPlace = el.place
#          daBreakpoint = el.breakpoint
#          daClassname = '_dynamic_adapt_' + daBreakpoint
#          if daMatchMedia[index].matches
#          if !daElement.classList.contains(daClassname)
#             actualIndex = indexOfElements(daDestination)[daPlace]
#             if daPlace == 'first'
#                actualIndex = indexOfElements(daDestination)[0]
#             else if daPlace == 'last'
#                actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length]
#             daDestination.insertBefore daElement, daDestination.children[actualIndex]
#             daElement.classList.add daClassname
#          else
#          if daElement.classList.contains(daClassname)
#             dynamicAdaptBack daElement
#             daElement.classList.remove daClassname
#          index++
#       customAdapt()
#       return

#    dynamicAdaptBack = (el) ->
#       daIndex = el.getAttribute('data-da-index')
#       originalPlace = originalPositions[daIndex]
#       parentPlace = originalPlace['parent']
#       indexPlace = originalPlace['index']
#       actualIndex = indexOfElements(parentPlace, true)[indexPlace]
#       parentPlace.insertBefore el, parentPlace.children[actualIndex]
#       return

#    indexInParent = (el) ->
#       children = Array::slice.call(el.parentNode.children)
#       children.indexOf el

#    indexOfElements = (parent, back) ->
#       children = parent.children
#       childrenArray = []
#       i = 0
#       while i < children.length
#          childrenElement = children[i]
#          if back
#          childrenArray.push i
#          else
#          if childrenElement.getAttribute('data-da') == null
#             childrenArray.push i
#          i++
#       childrenArray

#    dynamicAdaptSort = (arr) ->
#       arr.sort (a, b) ->
#          if a.breakpoint > b.breakpoint
#          -1
#          else
#          1
#       arr.sort (a, b) ->
#          if a.place > b.place
#          1
#          else
#          -1
#       return

#    customAdapt = ->
#       viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth or 0)
#       return

#    if daElements.length > 0
#       number = 0
#       index = 0
#       while index < daElements.length
#          daElement = daElements[index]
#          daMove = daElement.getAttribute('data-da')
#          if daMove != ''
#          daArray = daMove.split(',')
#          daPlace = if daArray[1] then daArray[1].trim() else 'last'
#          daBreakpoint = if daArray[2] then daArray[2].trim() else '767'
#          daType = if daArray[3] == 'min' then daArray[3].trim() else 'max'
#          daDestination = document.querySelector('.' + daArray[0].trim())
#          if daArray.length > 0 and daDestination
#             daElement.setAttribute 'data-da-index', number
#             originalPositions[number] =
#                'parent': daElement.parentNode
#                'index': indexInParent(daElement)
#             daElementsArray[number] =
#                'element': daElement
#                'destination': document.querySelector('.' + daArray[0].trim())
#                'place': daPlace
#                'breakpoint': daBreakpoint
#                'type': daType
#             number++
#          index++
#       dynamicAdaptSort daElementsArray
#       index = 0
#       while index < daElementsArray.length
#          el = daElementsArray[index]
#          daBreakpoint = el.breakpoint
#          daType = el.type
#          daMatchMedia.push window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)')
#          daMatchMedia[index].addListener dynamicAdapt
#          index++
#    dynamicAdapt()
#    return
# )
