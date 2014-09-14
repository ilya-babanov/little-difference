define(['react', 'i18n', 'ui/block-title/block-title'],
function (r, i18n, BlockTitle) {
	return r.createClass({
		displayName: 'ProjectTasks',

		render: function() {
			return r.DOM.div(
				{className: 'brief-block'},
				BlockTitle({title: i18n('brief.tasks')}),
				r.DOM.div(
					{className: 'brief-block-content'},
					r.DOM.a({href: '#/task/1/description'}, 'Task 1'),
					r.DOM.a({href: '#/task/2/description'}, 'Task 2'),
					r.DOM.a({href: '#/task/3/description'}, 'Task 3')
				)
			);
		}
	});
});
