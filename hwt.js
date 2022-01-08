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

   //full page search
   let teamArr = $(".match-info-MATCH .team");
   let winningTeam;
   for (let i = 0; i < teamArr.length; i++) {
      let hasClass = $(teamArr[i]).hasClass("team-gray");
      if (hasClass == false) {
         let teamNameEle = $(teamArr[i]).find('.name')
         winningTeam = teamNameEle.text().trim()
      }
   }

   //shorter form html
   let inngsArr = $('.card.content-block.match-scorecard-table>.Collapsible');
   let htmlStr = '';

   for (let i = 0; i < inngsArr.length; i++) {
      let cHTML = $(inngsArr[i]).html();
      htmlStr += cHTML;
      //console.log(htmlStr)

      let teamNameElement = $(inngsArr[i]).find('.header-title.label')
      let teamName = teamNameElement.text();
      teamName = teamName.split('INNINGS')[0];
      teamName = teamName.trim()
      console.log(teamName);

      let higestWicketTakerName = '';
      let higestWicketTaker = 0;
      if (winningTeam == teamName) {
         console.log(teamName)
         let tableEle = $(inngsArr[i]).find('.table.bowler');
         let allBolwers = $(tableEle).find('tr');

         for (let j = 0; j < allBolwers.length; j++) {
            let allColOfPlayer = $(allBolwers[j]).find('td');
            let playerName = $(allColOfPlayer[0]).text();
            let wickets = $(allColOfPlayer[4]).text();

            if (wickets >= higestWicketTaker) {
               higestWicketTaker = wickets;
               higestWicketTakerName = playerName;
            }
         }
         console.log(`Winning Team ${winningTeam} Wickets ${higestWicketTaker} Higest wicket Taker ${higestWicketTakerName}`)


      }

   }
   //console.log(htmlStr)

}