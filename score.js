let url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard';

const request = require('request');
const cheerio = require('cheerio');

request(url,cb)

function cb(err,response,html){
    if(err){
        console.log(err)
    }else{
       extractMatchDetails(html)
    }
}

function extractMatchDetails(html){
    let $ = cheerio.load(html);
    let desc = $('.match-info-MATCH .description');
    let value = desc.text()

    console.log(value)

}
