define(['react', 'i18n', 'ui/raw-markup', 'ui/block-title'],
function (r, i18n, RawMarkup, BlockTitle) {

	return r.createClass({
		displayName: 'Task',

		render: function () {
			return r.DOM.div(
				{className: "article task"},
				r.DOM.h1({className: "task-title"}, this.props.title),

				BlockTitle({title: i18n('article.description')}),
				RawMarkup({style: 'task-content', content: this.props.description}),

				BlockTitle({title: i18n('article.requirements')}),
				RawMarkup({style: 'task-content', content: this.props.requirements}),

				BlockTitle({title: i18n('article.additional')}),
				RawMarkup({style: 'task-content', content: this.props.notes})
			);
		},

	});

});
