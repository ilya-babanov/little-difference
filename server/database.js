var knex = require('knex')({
	client: 'pg',
	connection: {
		host     : '127.0.0.1',
		user     : 'ilya-b',
		password : '',
		database : 'ilya-b'
	}
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
