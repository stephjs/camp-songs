import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePost, deletePost } from '../actions';

class FullPost extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchSinglePost(id);
	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}
	render() {
		const { post } = this.props;

		if (!post) {
			return (
				<div>Loading...</div>
			);
		}
		return(
			<div>

				<div className="header">
					<div className="text-xs-right">
						<Link className="btn btn-primary topBtn" to="/">
							&#x2190; Home
						</Link>
					</div>
					<h1>{post.title}</h1>
				</div>

				<div className="ctn">
					<strong>#{post.categories}</strong>
					
					<br /><br />
					<p>{post.content}</p>
					
					<br /><br />

					<button
						className="btn btn-danger"
						onClick={this.onDeleteClick.bind(this)}>
						Delete '{post.title}'
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps( { posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchSinglePost, deletePost } )(FullPost);