var express = require('express'),
	http = require('http'),
	path = require('path'),
	WebSocketServer = require('ws').Server,
	RedisStore = require('connect-redis')(express),
	mongoose = require('mongoose'),
	app = express();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('mongoDB connection open');
});

app.set('port', process.env.PORT || 4004);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('caramba'));
app.use(express.session({
	store: new RedisStore({
		host: '127.0.0.1',
		port: 6379,
		db: 16
	}),
	secret: 'caramba',
	cookie: {
		maxAge: 86400000*2 //two days
	}
}));
app.use(function(req, res, next){
	res.locals.session = req.session;
	next();
});
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

require('./routes/session')(app);
require('./routes/user')(app);
require('./routes/posts')(app);


var server = http.createServer(app);


server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

/*var wss = new WebSocketServer({server: server});
 wss.on('connection', function(ws) {
 console.log('ws connection open!');
 var id = setInterval(function() {
 ws.send(JSON.stringify(process.memoryUsage()), function() { *//* ignore errors *//* });
 }, 10000);
 console.log('started client interval');

 ws.on('headers', function (headers) {
 console.log('headers: ',headers);
 });

 ws.on('close', function() {
 console.log('stopping client interval');
 clearInterval(id);
 });
 });*/
