// domo

module.exports = function domo () {
  var tree = []
  var html = function () {
    var args = [].slice.call(arguments)
      , arg, last = tree[tree.length - 1]
    if (!args.length) return (last.up && last.up++ || (last.up = 1)) && html
    
    while (arg = args.shift()) {
      switch (typeof arg) {
        case 'object':
          if (Array.isArray(arg)) last.content = arg
          else last.attrs = arg
          break
        default:
          last.content = last.content && last.content + arg || arg
          break
      }
    }
    return html
  }

  var selfClosing = 'meta img link input area base col br hr'.split(' ')

  ;('a abbr acronym address area article aside audio b bdi bdo big '
  + 'blockquote body br button canvas caption cite code col colgroup command '
  + 'datalist dd del details dfn div dl dt em embed fieldset figcaption figure '
  + 'footer form frame frameset h1 h2 h3 h4 h5 h6 hr head header hgroup html i '
  + 'iframe img input ins kbd keygen label legend li link map mark meta meter '
  + 'nav noscript object ol optgroup option output p param pre progress q rp rt '
  + 'ruby samp script section select small source span strong style sub summary '
  + 'sup table tbody td textarea tfoot th thead time title tr track tt ul var '
  + 'video wbr'
  ).split(' ').forEach(function (tag) {
    html[tag] = html
    html[tag.toUpperCase()] = html
    html.__defineGetter__(tag, function () {
      tree.push({ tag: tag })
      return html
    })
    html.__defineGetter__(tag.toUpperCase(), function () {
      tree.push({ tag: tag, parent: true })
      return html
    })
  })

  html.toString = function () {
    var open = []
      , body = []
    tree.forEach(function (item) {
      if (item.parent) {
        body.push('<' + item.tag + toAttrs(item.attrs) + '>')
        body.push('undefined' === typeof item.content ? '' : item.content)
        open.push(item)
      } else {
        if (Array.isArray(item.content)) {
          body.push(item.content.map(function (i) {
            return '<' + item.tag + toAttrs(item.attrs) + '>'
              + i
              + (!~selfClosing.indexOf(item.tag) && '</' + item.tag + '>' || '')
          }).join(''))
        } else {
          body.push('<' + item.tag + toAttrs(item.attrs) + '>')
          body.push('undefined' === typeof item.content ? '' : item.content)
          if (!~selfClosing.indexOf(item.tag))
            body.push('</' + item.tag + '>')          
        }
      }
      while (item.up--) {
        body.push('</' + open.pop().tag + '>')
      }
    })
    open.reverse().forEach(function (i) {
      body.push('</' + i.tag + '>')
    })
    return body.join('')
  }
  return html
}

function toAttrs (obj) {
  var keys = obj && Object.keys(obj)
  return keys
    ? ' ' + keys.map(function (key) {
        return key + '="' + safe(obj[key]) + '"'
      }).join(' ')
    : ''
}

function safe (string) {
  return String(string)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')  
}