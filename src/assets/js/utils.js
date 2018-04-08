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

