define(['react', 'ui/raw-markup', 'ui/block-title'],
function (r, RawMarkup, BlockTitle) {

	return r.createClass({
		displayName: 'Task',

		render: function () {
			return r.DOM.div(
				{className: "article task"},
				r.DOM.h1({className: "task-title"}, this.props.title),

				BlockTitle({title: 'Description'}),
				RawMarkup({style: 'task-content', content: this.props.description}),

				BlockTitle({title: 'Requirements'}),
				RawMarkup({style: 'task-content', content: this.props.requirements}),

				BlockTitle({title: 'Notes'}),
				RawMarkup({style: 'task-content', content: this.props.notes})
			);
		},

	});

});
