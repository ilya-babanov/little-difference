define(['react'],
function (r) {

	return function (view, viewOptions, container, callback) {
			return r.renderComponent(
				view(viewOptions),
				container,
				callback
			);
	};

});

