define(['signals'],
function (Signal) {

	var data = {
		project: {},
		comments: []
	};

	var lastCommentId = 2;

	return {
		getData: function () {
			return data;
		},

		loadProject: function (projectId) {
			//TODO fetch data from server
			data.project = {
				id: projectId,
				title: 'Esperanto - World Language',
				problems: '<p>When designing interfaces, break down the common design elements (buttons, form fields, layout components, etc) into reusable components with well-defined interfaces. That way, the next time you need to build some UI you can write much less code, which means faster development time, less bugs, and less bytes down the wire.</p>',
				requirements: '<h2 id="installation">Installation</h2> <pre><code class="lang-sh">git clone [git-repo-url] dillinger cd dillinger npm i -d mkdir -p public/files/{md,html,pdf} </code></pre> <h5 id="configure-plugins-instructions-in-following-readme-md-files">Configure Plugins. Instructions in following README.md files</h5> <ul> <li>plugins/dropbox/README.md</li> <li>plugins/github/README.md</li> <li>plugins/googledrive/README.md</li> </ul> <pre><code class="lang-sh">node app </code></pre> <h2 id="license">License</h2> <p>MIT</p> <p><strong>Free Software, Hell Yeah!</strong></p>',
				solutions: 'Make that, make this, and we all will be happy',
				notes: '<p>When designing interfaces, break down the common design elements (buttons, form fields, layout components, etc) into reusable components with well-defined interfaces. That way, the next time you need to build some UI you can write much less code, which means faster development time, less bugs, and less bytes down the wire.</p>',
				trust: 100,
				autor: {name: 'lidi'}
			};

			data.comments = [
				{id: 1, author: 'Ork', content: '<p>Arrrnrgh</p>'},
				{id: 2, author: 'Mr. Oliver', content: '<p>When designing interfaces, break down the common design elements (buttons, form fields, layout components, etc) into reusable components with well-defined interfaces. That way, the next time you need to build some UI you can write much less code, which means faster development time, less bugs, and less bytes down the wire.</p>'}
			];
			lastCommentId = 2;

			this.updated.dispatch();
		},

		getTempCommentId: function () {
			var id = 0;
			for (var i = 0, l = data.comments.length; i < l; i ++) {
				var comment = data.comments[i];
				id = Math.max(id, comment.id);
			}
			return id+10;
		},

		addComment: function (newComment) {
			data.comments.push({id: this.getTempCommentId(), author: 'Me', content: newComment.content});
			this.updated.dispatch();
		},

		updated: new Signal()
	};

});




