define(
function () {

	return {
		generateUniqueId: function(data) {
			var id = 0;
			for (var i = 0, l = data.length; i < l; i ++) {
				var comment = data[i];
				id = Math.max(id, comment.id);
			}
			return id+10;
		}
	};

});

