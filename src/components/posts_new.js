import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewPost extends Component {
	renderField(field) {
		const { meta: { touched, error} } = field;
		const checkDanger = `form-group ${(touched && error) ? 'has-danger' : ''}`;
		return (
			<div className={checkDanger}>
				<label>{field.label}</label>
				{field.type == "textarea" ?
					<textarea 
						className="form-control"
						rows="6"
						{...field.input}
					/>	
				:
					<input 
						className="form-control"
						rows="6"
						{...field.input}
					/>
				}
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}
	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		// handleSubmit is part of redux-form
		const { handleSubmit } = this.props;
		return (
			<div>
				<div className="header">
					<div className="text-xs-right">
						<Link className="btn btn-primary topBtn" to="/">
							&#x2190; Home
						</Link>
					</div>
					<h1>Add a New Song</h1>
				</div>

				<form className="ctn" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					<Field 
						name="title"
						label="Song Title"
						type="text"
						component={this.renderField}
					/>
					<Field 
						name="categories"
						label="Categories"
						type="text"
						component={this.renderField}
					/>
					<Field 
						name="content"
						label="Lyrics"
						type="textarea"
						component={this.renderField}
					/>
					<button type="submit" className="btn btn-primary">Submit</button>
					
				</form>
			</div>
		);
	}
}

//automaticaly called by redux form
function validate(values) {
	const errors = {};
	
	if (!values.title) {
		errors.title = "Please enter the song title.";
	}

	if (!values.categories) {
		errors.categories = "Song or Chant?";
	}
	
	if (!values.content) {
		errors.content = "What are the song lyrics?";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'NewPostsForm'
})(
	connect( null, { createPost } )(NewPost)
);