define(['react', 'marked'],
function (r, marked) {

	var ENTER_KEY = 13;

	return r.createClass({
		displayName: 'CommentEditor',

		getInitialState: function () {
			return {content: ''};
		},

		handleSubmit: function () {
			var value = this.refs.input.getDOMNode().value.trim();
			if (value.length === 0) {
				return;
			}
			console.time('markdown process');
			this.props.addComment({content: marked(value)});
			this.setState({content: ''});
			console.timeEnd('markdown process');
		},

		handleKeyDown: function (event) {
			if (event.ctrlKey && event.which === ENTER_KEY) {
				this.handleSubmit();
				return false;
			}
			return true;
		},

		handleChange: function () {
			var value = this.refs.input.getDOMNode().value;
			this.setState({content: value});
		},

		render: function() {
			return r.DOM.div(
				{className: "comment-editor"},
				r.DOM.textarea({
					className: "input comment-editor-input",
					ref: 'input',
					value: this.state.content,
					onChange: this.handleChange,
					onKeyDown: this.handleKeyDown
				}),
				r.DOM.button({
					className: 'button comment-editor-button', 
					onClick: this.handleSubmit
				}, "Add")
			);
		}
	});

});
