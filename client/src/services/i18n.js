define(['i18njs', 'oboe'],
function (i18njs, oboe) {

	i18njs._init = function (callback) {
		var lang = navigator.language || navigator.browserLanguage;

		if (/^en-/i.test(lang)) {
			lang = 'en';
		} else if (/^ru-?/i.test(lang)) {
			lang = 'ru';
		} else {
			lang = 'en';
		}

		oboe('/i18n/'+lang+'/main.json')
		.fail(function() {
			callback(true);
		})
		.done(function(data) {
			i18njs.add(data);
			callback();
		});

	};

	return i18njs;
});

