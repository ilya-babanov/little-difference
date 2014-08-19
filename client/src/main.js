requirejs.config({
	paths: {
		react: ['../libs/react.min', 'http://fb.me/react-0.11.1.min'],
		signals: '../libs/signals.min',
		oboe: '../libs/oboe-browser.min',
		marked: '../libs/marked.min'
	}
});

require(['pages/project/project-ctrl'],
function (projectCtrl) {

	projectCtrl('projectId', document.querySelector('.content-block'));

});

