
define(['react'],
function (r) {
	return r.createClass({
		displayName: 'RawMarkup',

		render: function() {
			return r.DOM.div({className: "raw-markup " + this.props.style, dangerouslySetInnerHTML: {__html: this.props.content}});
		}
	});
});
