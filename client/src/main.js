requirejs.config({
	paths: {
		react: ['../libs/react', 'http://fb.me/react-0.11.1.min'],
	}
});


require(['pages/project/project-ctrl', 'pages/task/task-ctrl', 'router'],
function (projectCtrl, taskCtrl, Router) {

	var contentBlock = document.querySelector('.content-block');

	function showProject(id) {
		console.log(id);
		projectCtrl(id, contentBlock);
	}

	function showTask(id) {
		taskCtrl(id, contentBlock);
	}

	var routes = {
		'/project/:id': showProject,
		'/task/:id': showTask
	};

	var router = new Router(routes);
	router.init();

	//showProject(123);

});

