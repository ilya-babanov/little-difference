define(['react', 'pages/task/task-model', 'pages/task/full/task-view', 'pages/task/brief/task-brief-view', 'services/react-render'],
function (r, taskModel, TaskView, TaskBriefView, renderView) {

	var taskPageView = r.createClass({
		displayName: 'TaskPageView',

		componentDidMount: function () {
			this.props.model.updated.add(this.onModelChange, this);
			console.log('TaskPage: did mount');
		},

		componentWillUnmount: function () {
			this.props.model.updated.remove(this.onModelChange, this);
			console.log('TaskPage: will unmount');
		},

		componentWillUpdate: function () {
			console.time('TaskPage: update');
		},

		componentDidUpdate: function () {
			console.timeEnd('TaskPage: update');
		},

		onModelChange: function (id) {
			if (this.props.id !== id) {
				return;
			}
			console.log('TaskPage: onModelChange');
			renderPage();
		},

		render: function () {
			return r.DOM.div(
				{className: "row task-page"},
				TaskBriefView({
					style: 'col-small',
					projectId: this.props.data.task.projectId
				}),
				TaskView({
					style: 'col-big',
					task: this.props.data.task,
					comments: this.props.data.comments,
					addComment: this.props.model.addComment.bind(this.props.model, this.props.id)
				})
			);
		}
	});


	var cachedOptions;
	function renderPage(options) {
		if (options) {
			cachedOptions = options;
		}

		renderView(taskPageView, {
			model: taskModel,
			data: taskModel.getData(cachedOptions.id),
			id: cachedOptions.id,
			section: cachedOptions.section
		}, cachedOptions.container);

		taskModel.update(cachedOptions.id);
	}

	return renderPage;
});

