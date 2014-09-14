define(['react', 'i18n', 'ui/block-title/block-title'],
function (r, i18n, BlockTitle) {
	return r.createClass({
		displayName: 'ProjectStat',

		render: function() {
			return r.DOM.div(
				{className: "brief-block"},
				BlockTitle({title: i18n('brief.statistics')}),
				r.DOM.div(
					{className: 'brief-block-content'},
					"Some statistics (active users, tasks, reports etc.) Ble Blu Bla This is 143 percent!"
				)
			);
		}
	});
});
