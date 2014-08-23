define(['pages/task/task-model', 'pages/task/task-view', 'services/react-render'],
function (taskModel, taskView, renderView) {

	return function (taskId, container) {
		renderView(taskView, {model: taskModel, id: taskId}, container);
		taskModel.update(taskId);
	};

});
