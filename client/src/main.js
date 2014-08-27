requirejs.config({
	paths: {
		react: ['../libs/react', 'http://fb.me/react-0.11.1.min'],
	}
});


require(['router', 'i18n', 'oboe', 'pages/project/project-page', 'pages/task/task-page'],
function (Router, i18n, oboe, projectPage, taskPage) {

	i18n._init(function (error) {
		if (error) {
			console.error('i18n failed', error);
			return;
		}

		crank();
	});

	function crank() {
		var container = document.querySelector('.main-container');

		function showRoot() {
			location.hash = '/project/123/description';
			//projectPage({id: 123, section: 'description', content: contentBlock, brief: briefBlock});
		}

		function showProject(id, section) {
			projectPage({id: id, section: section, container: container});
		}

		function showTask(id, section) {
			taskPage({id: id, section: section, container: container});
		}

		new Router({
			'/': showRoot,
			'/project/:id/:section': showProject,
			'/task/:id/:section': showTask
		}).init();
	}

	if (!location.hash) {
		location.hash = '/';
	}

});

