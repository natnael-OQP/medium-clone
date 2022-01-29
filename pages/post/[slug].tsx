import { GetStaticProps } from "next";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { configuredSanityClient } from "../../components/post";
import { sanityClient } from "../../lib/sanity";
import { Post } from "../../type";

interface Props{ 
	post:Post
}

const Post = ({ post }: Props) => {

	// const mainImage = useNextSanityImage(
	// 	configuredSanityClient,
	// 	post.mainImage
	// );

	return (
		<div>
			<Header />
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == 'post']{ 
		_id, 
		slug{
			current
		}}`;

	const posts = await sanityClient.fetch(query);
	// Get the paths we want to pre-render based on posts
	const paths = posts.map((post: Post) => ({
		params: { slug: post.slug.current },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	
	const query = `*[_type == 'post' && slug.current == $slug  ][0]{ 
		_id, 
		title,
		_createdAt,
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

	const post = await sanityClient.fetch(query, { slug: params?.slug });
	if (!post) {
		return { notFound: true };
	}
	return {
		props: {
			post,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	};
};

export default Post;
