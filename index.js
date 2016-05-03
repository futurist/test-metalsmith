var path = require('path')
var metal = require('metalsmith')
var markdown = require('metalsmith-markdown')
var permalinks = require('metalsmith-permalinks')
var layouts = require('metalsmith-layouts')
var inPlace = require('metalsmith-in-place')
var highlighter = require('highlighter')

function my_plugin(options) {

  // Initialise plugin with options.
  // The plugin could need an instance of a library to process the data.

  return function (files, metalsmith, done) {
    // Metalsmith metadata usage:
    var metadata = metalsmith.metadata();
    // Loop through files
    Object.keys(files).forEach(function (file, asdf, sdf, j) {
      var file_data = files[file]
      console.log('checking file: %s', JSON.stringify(options), file, path.dirname(file), metadata, file_data.contents.toString('utf8'))
    })

    // Call done() to tell Metalsmith it has finished.
    // This allows us to work asynchronously and call it when we are done.
    done();
  }
}

metal(__dirname)
  .source('./src/partials')
  .use(markdown({outext:'.hbs'}))
  .destination('./partials')
  .build(function(e){
    if(e) console.log(e)
    build()
  })

function build(){
  metal(__dirname)
    .source('./src')
    .use(markdown({
      smartypants: true,
      gfm: true,
      tables: true,
      highlight: highlighter()
    }))
  // .use(my_plugin({a:1,b:2}))
    .use(inPlace({ engine: 'handlebars' }))
    .use(layouts({
      engine: 'handlebars',
      directory: 'templates',
      partials: 'partials'
    }))
    .destination('./build')
    .build(function (e) {
      if (e) console.log(e)
    })
}
