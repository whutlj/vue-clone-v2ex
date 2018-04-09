function addClass (elem, name) {
  if (!hasClass(elem, name)) {
    let cur = attr(elem, 'class').trim()
    let res = (cur + ' ' + name).trim()
    attr(elem, 'class', res)
  }
}

function removeClass (elem, name) {
  let reg = new RegExp('\\s*\\b' + name + '\\b\\s*', 'g')
  let res = attr(elem, 'class').replace(reg, ' ').trim()
  attr(elem, 'class', res)
}

function hasClass (elem, name) {
  return (new RegExp('\\b' + name + '\\b')).test(attr(elem, 'class'))
}

function getRandomColor () {
  let color = ''
  for (let i = 0; i < 3; i++) {
    let c = Math.floor(Math.random() * 256).toString(16)
    c = c.length === 1 ? '0' + c : c
    color += c 
  }
  return '#' + color
}

function on (ele, type, listener, useCapture = false) {
  ele.addEventListener(type, listener, useCapture)
}

function off (ele, type, listener, useCapture = false) {
  ele.removeEventListener(type, listener, useCapture)
}

const ItemFactory = (() => {
  let lastIndex = 0
  function generateItem (count) {
    let arr = []
    count = ~~count
    if (count <= 0) return arr
    for (let i = 0; i < count; i++) {
      let id = lastIndex ++
      let height =50 + Math.floor(Math.random() * 250)
      let background = getRandomColor()
      let item = {
        id: id,
        height: height,
        background: background 
      }
      arr.push(item)
    }
    return arr
  }


  return {
    generateItem: generateItem,
  }
})()

export {ItemFactory, on, off}