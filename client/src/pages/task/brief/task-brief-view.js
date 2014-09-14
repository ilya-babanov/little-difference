define(['react', 'i18n', 'ui/block-title/block-title', 'pages/project/brief/project-stat', 'pages/project/brief/project-tasks'],
function (r, i18n, BlockTitle, ProjectStat, ProjectTasks) {

	return r.createClass({
		displayName: 'TaskBriefContainer',

		render: function () {
			return r.DOM.div(
				{className: "brief-view task-brief-container " + this.props.style},
				r.DOM.h1({className: "article-title"}, i18n('global.task')),
				ProjectStat(null),
				ProjectTasks(null),
				r.DOM.a({href: '#/project/'+this.props.projectId+'/description'}, 'Back to Project')
			);
		}

	});

});
