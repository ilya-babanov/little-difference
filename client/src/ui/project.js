define(['react', 'ui/raw-markup', 'ui/block-title'],
function (r, RawMarkup, BlockTitle) {

	return r.createClass({
		displayName: 'Project',

		render: function () {
			return r.DOM.div(
				{className: "article project"},
				r.DOM.h1({className: "project-title"}, this.props.title),

				BlockTitle({title: 'Poblem Definition'}),
				RawMarkup({style: 'project-content', content: this.props.problems}),

				BlockTitle({title: 'Requirements'}),
				RawMarkup({style: 'project-content', content: this.props.requirements}),

				BlockTitle({title: 'Proposed Solution'}),
				RawMarkup({style: 'project-content', content: this.props.solutions}),

				BlockTitle({title: 'Notes'}),
				RawMarkup({style: 'project-content', content: this.props.notes})
			);
		},

	});

});
