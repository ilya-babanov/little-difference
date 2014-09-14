define(['react', 'i18n', 'ui/comments/comment-list', 'ui/comments/comment-editor', 'ui//block-title/block-title'],
function (r, i18n, CommentList, CommentEditor, BlockTitle) {

	return r.createClass({
		displayName: 'CommentBlock',

		render: function () {
			return r.DOM.div(
				{className: 'comment-block'},
				BlockTitle({style: 'block-title-red', title: i18n('article.discussion')}),
				CommentList({list: this.props.comments || []}),
				CommentEditor({addComment: this.props.addComment})
			);
		}

	});

});
