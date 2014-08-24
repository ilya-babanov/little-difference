define(['react', 'i18n', 'ui/project', 'ui/comment-list', 'ui/comment-editor', 'ui/block-title'],
function (r, i18n, Project, CommentList, CommentEditor, BlockTitle) {

	return r.createClass({
		displayName: 'ProjectContainer',

		componentDidMount: function () {
			this.props.model.updated.add(this.onModelChange, this);
		},

		componentWillUnmount: function () {
			this.props.model.updated.remove(this.onModelChange);
			console.log('ProjectView will unmount');
		},

		componentWillUpdate: function () {
			console.time('update Project');
		},

		componentDidUpdate: function () {
			console.timeEnd('update Project');
		},

		getInitialState: function() {
			return this.getDataFromModel();
		},

		onModelChange: function (id) {
			if (this.props.id !== id) {
				return;
			}
			console.log('ProjectView - onModelChenge');
			this.setState(this.getDataFromModel());
		},

		getDataFromModel: function () {
			return this.props.model.getData(this.props.id);
		},

		render: function () {
			return r.DOM.div(
				{className: "project-container"},
				Project(this.state.project),
				BlockTitle({style: 'block-title-light block-title-tall', title: i18n('article.discussion')}),
				CommentList({list: this.state.comments}),
				CommentEditor({addComment: this.props.model.addComment.bind(this.props.model, this.props.id)})
			);
		}

	});

});
