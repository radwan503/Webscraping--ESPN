const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

const request = require("request")
const cheerio = require("cheerio");

request(url, cb)

function cb(err, response, html) {
   if (err) {
      console.log(err)
   } else {
      extractHTML(html)
   }
}


function extractHTML(html) {
   let $ = cheerio.load(html);
   let inngsArr = $('.card.content-block.match-scorecard-table>.Collapsible');
   //team name
   for (let i = 0; i < inngsArr.length; i++) {
      let teamNameElement = $(inngsArr[i]).find('.header-title.label')
      let teamName = teamNameElement.text();
      teamName = teamName.split('INNINGS')[0];
      teamName = teamName.trim()
      console.log(teamName);
      //table batsman
      let tableEle = $(inngsArr[i]).find('.table.batsman');
      let allBatsman = $(tableEle).find('tr');
      for (let j = 0; j < allBatsman.length; j++) {
         let allColOfPlayer = $(allBatsman[j]).find('td');
         let isBatsManCol = $(allColOfPlayer[0]).hasClass('batsman-cell');

         if (isBatsManCol == true) {
            let name = $(allColOfPlayer[0]).text();
            let href = $(allColOfPlayer[0]).find('a').attr('href');
            let fullLink = 'https://www.espncricinfo.com' + href
            console.log(fullLink)
            getBirthdayPage(fullLink, name, teamName)
         }
      }
   }
}


function getBirthdayPage(url, name, teamName) {

   request(url, cb);

   function cb(err, response, html) {
      if (err) {

      } else {
         extractBirthDay(html, name, teamName)
      }
   }

}


function extractBirthDay(html, name, teamName) {
   let $ = cheerio.load(html)
   let details = $('.player-card-description');
   let birthday = $(details[1]).text();
   console.log(`NAME:${name} Team:${teamName} Birthday:${birthday}`)

}