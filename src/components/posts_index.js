import _ from 'lodash';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from "react-router-dom";

class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}
	renderPosts() {
		//need lodash to map object
		return _.map(this.props.posts, post => {
			return (
				<Link to={`/posts/${post.id}`}>
					<li key={post.id} className="list-group-item">
						<span className="left">{post.title}</span> 
						<span className="right">#{post.categories}</span>
					</li>
				</Link>
			);
		})
	}
	render() {
		return (
			<div>

				<div className="header">
					<div className="text-xs-right">
						<Link className="btn btn-primary topBtn" to="/posts/new">
							Add a Song
						</Link>
					</div>
					<h1>Camp Song Book</h1>
				</div>
				
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts } )(PostsIndex);