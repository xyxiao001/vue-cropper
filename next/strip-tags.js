/**
 * Strip specific tags from a string of HTML
 * From https://github.com/jonschlinkert/strip-tags/blob/master/index.js
 */
 const cheerio = require('cheerio')

 module.exports = (str, tags) => {
   const $ = cheerio.load(str, { decodeEntities: false })
 
   if (!tags || tags.length === 0) {
     return str
   }
 
   tags = !Array.isArray(tags) ? [tags] : tags
   let len = tags.length
 
   while (len--) {
     $(tags[len]).remove()
   }
 
   return $.html()
 }