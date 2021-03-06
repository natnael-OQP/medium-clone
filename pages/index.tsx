import Head from "next/head";
import Banner from "../components/banner";
import Header from "../components/Header";
import PostsPreview from "../components/postsPreview";
import { sanityClient } from "../lib/sanity";
import { Post } from "../type";
export interface Props {
	posts: [Post];
}

const Home = ({posts}: Props) => {
	return (
		<div className="max-w-6xl mx-auto  ">
			<Head>
				<title>Medium Clone</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Banner />
			<PostsPreview posts={posts} />
		</div>
	);
};

export const getServerSideProps = async () => {
	const query = `*[_type == 'post']{ 
		_id, 
		title,
		description,
		mainImage,
		slug,
		author->{
			name,
			slug,
			image,
			bio
		}
	} `;

	const posts = await sanityClient.fetch(query);
	return {
		props: {
			posts,
		},
	};
};

export default Home;
