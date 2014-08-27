define(['react', 'pages/project/project-model', 'pages/project/full/project-view', 'pages/project/brief/project-brief-view', 'services/react-render'],
function (r, projectModel, ProjectView, ProjectBriefView, renderView) {

	var projectPageView = r.createClass({
		displayName: 'ProjectPageView',

		componentDidMount: function () {
			this.props.model.updated.add(this.onModelChange, this);
			console.log('ProjectPage: did mount');
		},

		componentWillUnmount: function () {
			this.props.model.updated.remove(this.onModelChange, this);
			console.log('ProjectPage: will unmount');
		},

		componentWillUpdate: function () {
			console.time('ProjectPage: update');
		},

		componentDidUpdate: function () {
			console.timeEnd('ProjectPage: update');
		},

		onModelChange: function (id) {
			if (this.props.id !== id) {
				return;
			}
			console.log('ProjectPage: onModelChange');
			renderPage();
		},

		render: function () {
			return r.DOM.div(
				{className: "row project-page"},
				ProjectBriefView({
					style: 'col-small',
					data: {}
				}),
				ProjectView({
					style: 'col-big',
					project: this.props.data.project,
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

		renderView(projectPageView, {
			model: projectModel,
			data: projectModel.getData(cachedOptions.id),
			id: cachedOptions.id,
			section: cachedOptions.section
		}, cachedOptions.container);

		projectModel.update(cachedOptions.id);
	}

	return renderPage;
});
