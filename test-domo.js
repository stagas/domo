var domo = require('./domo')

var images = [
  { file: 'a.jpg', text: 'A nice image' }
, { file: 'b.jpg', text: 'Another image' }
, { file: 'c.jpg', text: 'Yet another image' }
]

var body = '' +

domo()
  .HTML
    .HEAD
      .link({ rel: 'stylesheet', href: '/css/style.css' })
      .title('Some title')
    ()
    .BODY
      .HEADER
        .h1('Some header')
        .DIV({ id: 'language-select' })
          .UL
            .LI.a('English', { href: '/en' })()
            .LI.a('Greek',   { href: '/el' })()
          ()
        ()
      ()
      .DIV({ id: 'container' })
        .UL
          .li(images.map(function (image) {
            return domo().DIV({ class: 'image-container' }).img({ src: image.file }).span(image.text)
          }))
        ()
      ()
      .DIV({ id: 'footer' })
        .span('Just a footer')

require('assert').equal(body, 
  '<html>'
  + '<head>'
    + '<link rel="stylesheet" href="/css/style.css">'
    + '<title>Some title</title>'
  + '</head>'
  + '<body>'
    + '<header>'
      + '<h1>Some header</h1>'
      + '<div id="language-select">'
        + '<ul>'
          + '<li><a href="/en">English</a></li>'
          + '<li><a href="/el">Greek</a></li>'
        + '</ul>'
      + '</div>'
    + '</header>'
    + '<div id="container">'
      + '<ul><li>'
          + '<div class="image-container"><img src="a.jpg"><span>A nice image</span></div>'
        + '</li><li>'
          + '<div class="image-container"><img src="b.jpg"><span>Another image</span></div>'
        + '</li><li>'
          + '<div class="image-container"><img src="c.jpg"><span>Yet another image</span></div></li>'
      + '</ul>'
    + '</div>'
    + '<div id="footer">'
      + '<span>Just a footer</span>'
    + '</div>'
  + '</body>'
+ '</html>'
)

console.log(body)