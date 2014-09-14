define(['react', 'i18n', 'pages/project/full/project', 'ui/comments/comment-block'],
function (r, i18n, Project, CommentBlock) {

	return r.createClass({
		displayName: 'ProjectContainer',

		render: function () {
			return r.DOM.div(
				{className: "project-container " + this.props.style},
				Project(this.props.project),
				CommentBlock({
					comments: this.props.comments,
					addComment: this.props.addComment
				})
			);
		}

	});

});
