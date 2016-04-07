var request = require('request');
var cheerio = require('cheerio');

request('http://sitcon.kktix.cc/events/sitcon2016', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var res = {}
    var $ = cheerio.load(html);
    
    res.attendees = [];

    res.count = $(".event-attendees > h2 > em").text();

    $(".attendee a").each(function(i, element) {
      tmp = {};
      pieces = $(element).attr("href").split('/');
      tmp.username = pieces[pieces.length - 1];
      tmp.displayname = $(element).find('.nickname').text();
      res.attendees.push(tmp);
    });

    res.time = new Date().toISOString();

    console.log(JSON.stringify(res));
  }
});
