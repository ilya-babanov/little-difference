define(['react', 'ui/comments/comment'],
function (r, Comment) {
	return r.createClass({
		displayName: 'Comment',

		render: function() {
			var commentNodes = this.props.list.map(function (comment) {
				comment.key = comment.id;
				return Comment(comment);
			});
			return r.DOM.div({className: 'comment-list'}, commentNodes);
		}
	});
});
