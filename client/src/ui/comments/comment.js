define(['react', 'ui/raw-markup/raw-markup'],
function (r, RawMarkup) {
	return r.createClass({
		displayName: 'Comment',

		render: function() {
			return r.DOM.div(
				{className: "comment"},
				RawMarkup({style: "user-content comment-content", content: this.props.content}),
				r.DOM.div(
					{className: "comment-info"},
					//Avatar({owner: this.props.author}),
					r.DOM.span({className: "comment-author"}, this.props.author),
					r.DOM.span({className: "comment-date"}, new Date().toLocaleString())
				)
			);
		}
	});
});
