define(['react', 'i18n', 'ui/block-title', 'pages/project/brief/project-stat', 'pages/project/brief/project-tasks'],
function (r, i18n, BlockTitle, ProjectStat, ProjectTasks) {

	return r.createClass({
		displayName: 'ProjectBriefContainer',

		render: function () {
			return r.DOM.div(
				{className: "project-brief-container " + this.props.style},
				ProjectStat({style: 'block-title-hand'}),
				ProjectTasks({style: 'block-title-hand'})
			);
		}

	});

});
