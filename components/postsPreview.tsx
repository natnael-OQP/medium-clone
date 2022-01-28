import React from "react";
import { Props } from "../pages";
import Post from "./post";

const PostsPreview = ({ posts }: Props) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto pt-6 pb-36 gap-y-10">
            {posts.map(post => (
                <Post key={post._id} post={post}/>
            ))}
		</div>
	);
};

export default PostsPreview;
