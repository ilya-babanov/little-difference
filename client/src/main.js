requirejs.config({
	paths: {
		react: ['../libs/react', 'http://fb.me/react-0.11.1.min'],
	}
});


require(['router', 'i18n', 'oboe', 'pages/project/project-ctrl', 'pages/task/task-ctrl'],
function (Router, i18n, oboe, projectCtrl, taskCtrl) {

	i18n._init(function (error) {
		if (error) {
			console.error('i18n failed');
			return;
		}

		var routes = {
			'/': showRoot,
			'/project/:id': showProject,
			'/task/:id': showTask
		};

		new Router(routes).init();
	});

	var contentBlock = document.querySelector('.content-block');

	function showRoot() {
		projectCtrl(123, contentBlock);
	}

	function showProject(id) {
		projectCtrl(id, contentBlock);
	}

	function showTask(id) {
		taskCtrl(id, contentBlock);
	}

	if (!location.hash) {
		location.hash = '/';
	}

});

