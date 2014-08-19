define(['pages/project/project-model', 'pages/project/project-view', 'services/react-render'],
function (projectModel, projectView, renderView) {

	return function (projectId, container) {
		renderView(projectView, {model: projectModel}, container);
		projectModel.loadProject(projectId);
	};

});
