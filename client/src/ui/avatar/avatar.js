define(['react'],
function (r) {
	return r.createClass({
		displayName: 'Avatar',

		render: function() {
			return r.DOM.div(
				{className: "avatar"},
				r.DOM.img({className: "avatar", href: 'avatars/'+this.props.author+'.png'})
			);
		}
	});
});

