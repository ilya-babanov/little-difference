define(['services/article-interface'],
function (articleInterface) {

	var taskModel = Object.create(articleInterface);

	taskModel.getEmptyData = function () {
		return {task: {}, comments: []};
	};

	taskModel.update = function (id) {
		//TODO fetch data from server
		if (!this.data[id]) {
			this.data[id] = {
				task: {
					id: id,
					title: 'Organize Esperento Speaking Club',
					description: '<p>I think it would be cool if we create speaking clubs in our towns!</p> <ul> <li>find people</li> <li>find place </li> <li>come up with pastime</li> </ul>',
					requirements: '<p>It should be awesome!</p>',
					notes: '<p>When designing interfaces, break down the common design elements (buttons, form fields, layout components, etc) into reusable components with well-defined interfaces. That way, the next time you need to build some UI you can write much less code, which means faster development time, less bugs, and less bytes down the wire.</p>',
					trust: 100,
					autor: {name: 'lidi'}
				},
				comments: [
					{id: 1, author: 'Ork', content: '<p>Arrrnrgh</p>'},
					{id: 2, author: 'Mr. Oliver', content: '<p>When designing interfaces, break down the common design elements (buttons, form fields, layout components, etc) into reusable components with well-defined interfaces. That way, the next time you need to build some UI you can write much less code, which means faster development time, less bugs, and less bytes down the wire.</p>'}
				]
			};
			this.updated.dispatch(id);
		}
	};

	taskModel.init();

	return taskModel;
});




