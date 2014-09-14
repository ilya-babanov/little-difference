
define(['react'],
function (r) {
	return r.createClass({
		displayName: 'BlockTitle',

		render: function() {
			return r.DOM.div({className: "block-title " + this.props.style}, this.props.title);
		}
	});
});
