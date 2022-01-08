const request = require("request")
const cherrio = require("cheerio")

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("before")
request(url, cb);
function cb(err, response, html) {
   if (err) {
      console.log(err)
   } else {
      extractHTML(html)
   }
}


function extractHTML(html) {
   let $ = cherrio.load(html)
   let elmentArr = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
   let text = $(elmentArr[0]).text()
   let htmlData = $(elmentArr[0]).html()
   console.log("text data", text);
   console.log("html data", htmlData)
}
console.log("after")