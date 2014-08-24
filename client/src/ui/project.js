define(['react', 'i18n', 'ui/raw-markup', 'ui/block-title'],
function (r, i18n, RawMarkup, BlockTitle) {

	return r.createClass({
		displayName: 'Project',

		render: function () {
			return r.DOM.div(
				{className: "article project"},
				r.DOM.h1({className: "project-title"}, this.props.title),

				BlockTitle({title: i18n('article.problem')}),
				RawMarkup({style: 'project-content', content: this.props.problems}),

				BlockTitle({title: i18n('article.requirements')}),
				RawMarkup({style: 'project-content', content: this.props.requirements}),

				BlockTitle({title: i18n('article.solution')}),
				RawMarkup({style: 'project-content', content: this.props.solutions}),

				BlockTitle({title: i18n('article.additional')}),
				RawMarkup({style: 'project-content', content: this.props.notes})
			);
		},

	});

});
