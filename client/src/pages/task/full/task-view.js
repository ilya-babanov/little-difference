define(['react', 'i18n', 'pages/task/full/task', 'ui/comment-block'],
function (r, i18n, Task, CommentBlock) {

	return r.createClass({
		displayName: 'TaskContainer',

		render: function () {
			return r.DOM.div(
				{className: 'task-container ' + this.props.style},
				Task(this.props.task),
				CommentBlock({
					comments: this.props.comments,
					addComment: this.props.addComment
				})
			);
		}

	});

});
