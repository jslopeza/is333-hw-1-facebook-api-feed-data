var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');
var fs = require('fs');
var Feed = require('./models/Feed');

mongoose.connect('mongodb://localhost:27017/is333-hw1');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.route('/api/feed')
  .get(function(req, res){
    Feed.find({}, function(err, data){
      if(err) throw err;
      res.json(data);
      console.log(data);
      var i = 1;
      var options = { encoding: 'utf8' };
      var file = fs.createWriteStream('output.txt', options);

      data.forEach(function(d){
        var txt = i + ' ' + d.created_time + ' : ' + d.message + '\n';
        file.write(txt, 'utf8');
        i++;
      });

      file.end();
    })
  })
  .post(function(req, res){
    var time = moment(req.body.time);
    var newFeed = Feed({
      created_time : time._d,
      message : req.body.message
    });

    newFeed.save(function(err, data){
      if(err) throw err;
      res.end('done');
    })
  })

app.get('/', function(req, res){
  res.sendFile('public/index.html');
})

app.listen(3000);

console.log('Server listening on port 3000');
