define(['react', 'ui/project', 'ui/comment-list', 'ui/comment-editor', 'ui/block-title'],
function (r, Project, CommentList, CommentEditor, BlockTitle) {

	return r.createClass({
		displayName: 'ProjectContainer',

		componentDidMount: function () {
			this.props.model.updated.add(this.onModelChange, this);
		},

		componentWillUnmount: function () {
			this.props.model.updated.remove(this.onModelChange);
		},

		componentWillUpdate: function () {
			console.time('update Project');
		},

		componentDidUpdate: function () {
			console.timeEnd('update Project');
		},

		getInitialState: function() {
			return this.props.model.getData();
		},

		onModelChange: function () {
			this.setState(this.props.model.getData());
		},

		render: function () {
			return r.DOM.div(
				{className: "project-container"},
				Project(this.state.project),
				BlockTitle({style: 'block-title-light block-title-tall', title: 'Discussion'}),
				CommentList({list: this.state.comments}),
				CommentEditor({addComment: this.props.model.addComment.bind(this.props.model)})
			);
		}

	});

});
