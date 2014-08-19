define(['react'],
function (r) {

	return function (view, viewOptions, container) {
			return r.renderComponent(
				view(viewOptions),
				container
			);
	};

});

