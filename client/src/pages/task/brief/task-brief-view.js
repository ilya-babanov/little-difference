define(['react', 'i18n', 'ui/block-title', 'pages/project/brief/project-stat', 'pages/project/brief/project-tasks'],
function (r, i18n, BlockTitle, ProjectStat, ProjectTasks) {

	return r.createClass({
		displayName: 'TaskBriefContainer',

		render: function () {
			return r.DOM.div(
				{className: "task-brief-container " + this.props.style},
				r.DOM.a({href: '#/project/'+this.props.projectId+'/description'}, 'Back to Project'),
				ProjectStat({style: 'block-title-hand'}),
				ProjectTasks({style: 'block-title-hand'})
			);
		}

	});

});
