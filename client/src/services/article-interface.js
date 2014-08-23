define(['signals', 'services/utils'],
function (Signal, utils) {

	return {
		init: function (type) {
			this.type = type;
			this.data = {};
			this.updated = new Signal();
		},

		getData: function (id) {
			return this.data[id] || this.getEmptyData();
		},

		getEmptyData: function () {
			return {};
		},

		update: function (id) {
			this.updated.dispatch(id);
		},

		addComment: function (id, newComment) {
			var project = this.data[id];
			if (!project) {
				return;
			}

			//TODO load comment to server, catch errors
			project.comments.push({id: utils.generateUniqueId(project.comments), author: 'Me', content: newComment.content});
			this.updated.dispatch(id);
		}
	};

});




