define(['react', 'ui/task', 'ui/comment-list', 'ui/comment-editor', 'ui/block-title'],
function (r, Task, CommentList, CommentEditor, BlockTitle) {

	return r.createClass({
		displayName: 'TaskContainer',

		componentDidMount: function () {
			this.props.model.updated.add(this.onModelChange, this);
		},

		componentWillUnmount: function () {
			this.props.model.updated.remove(this.onModelChange);
			console.log('TaskView will unmount');
		},

		componentWillUpdate: function () {
			console.time('update Task');
		},

		componentDidUpdate: function () {
			console.timeEnd('update Task');
		},

		getInitialState: function() {
			return this.getDataFromModel();
		},

		onModelChange: function (id) {
			if (this.props.id !== id) {
				return;
			}
			console.log('TaskView - onModelChenge');
			this.setState(this.getDataFromModel());
		},

		getDataFromModel: function () {
			return this.props.model.getData(this.props.id);
		},

		render: function () {
			return r.DOM.div(
				{className: "task-container"},
				Task(this.state.task),
				BlockTitle({style: 'block-title-light block-title-tall', title: 'Discussion'}),
				CommentList({list: this.state.comments}),
				CommentEditor({addComment: this.props.model.addComment.bind(this.props.model, this.props.id)})
			);
		}

	});

});
