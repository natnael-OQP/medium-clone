import { GetStaticProps } from "next";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import Header from "../../components/Header";
import { configuredSanityClient } from "../../components/post";
import { sanityClient } from "../../lib/sanity";
import PortableText from "react-portable-text";
import { Post } from "../../type";

interface Props {
	post: Post;
}
const Post = ({ post }: Props) => {
	const mainImage = useNextSanityImage(
		configuredSanityClient,
		post.mainImage
	);
	const profile = useNextSanityImage(
		configuredSanityClient,
		post.author.image
	);

	return (
		<div className="pb-10">
			<Header />
			<main className="max-w-[730px] mx-auto  sm:p-5  space-y-5 md:space-y-8 ">
				<div>
					<h1 className=" text-4xl sm:text-5xl mt-10 mb-3 font-extrabold text-gray-800 capitalize">
						{post.title}
					</h1>
					{/* author profile */}
					<div className="flex items-center mt-5 space-x-3">
						{post.author.image && (
							<div className="w-8 h-8 relative rounded-full overflow-hidden shrink-0 ">
								<Img
									src={profile.src}
									loader={profile.loader}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)}
						<span className="text-sm font-mono text-gray-400">
							{post.author.name}
						</span>
						<span className="text-sm font-mono text-gray-400">
							{new Date(post._createdAt).toDateString()}
						</span>
					</div>
				</div>
				{post.mainImage && (
					<div className="w-full h-[330px] xl:h-[500px] bg-gray-200 relative  overflow-hidden  ">
						<Img
							className="group-hover:scale-105 transition-transform duration-200 transform-gpu ease-in-out"
							src={mainImage.src}
							loader={mainImage.loader}
							layout="fill"
							quality={100}
							objectFit="cover"
							alt={post.title}
						/>
					</div>
				)}
				{/* description */}
				<h3 className="text-sm md:text-xl font-normal text-gray-600">
					{post.description}
				</h3>
				<div>
					<PortableText
						content={post.body}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						serializers={{
							h1: (props: any) => (
								<h1
									className="text-2xl font-bold my-5 text-gray-500"
									{...props}
								/>
							),
							h2: (props: any) => (
								<h1
									className="text-xl font-bold my-5 text-gray-500"
									{...props}
								/>
							),
							p: (props: any) => (
								<p
									className="text-xl font-bold my-5 text-gray-500"
									{...props}
								/>
							),
							li: ({ children }: any) => (
								<li className="ml-4 list-disc" {...children} />
							),
							link: ({ href, children }: any) => (
								<a
									href={href}
									className="text-blue-500 hover:underline"
									{...children}
								/>
							),
						}}
					/>
				</div>
				<div className="max-w-sm  border border-yellow-500 mx-auto my-14" />
				{/* Comment */}
				<form className="flex flex-col max-w-sm mx-auto my-10">
					<h3>Enjoy The Article ? </h3>
					<h4>Live a Comment Below</h4>
					<hr className="py-3 mt-2" />
					<label className="space-x-2 label">
						<span className="text-sm text-gray-600 font-semibold">
							Name 
						</span>
						<input
							className="input"
							type="text"
							placeholder="Full name"
						/>
					</label>
					<label className="space-x-2 label">
						<span className="text-sm text-gray-600 font-semibold">
							Email
						</span>
						<input
							className="input"
							type="email"
							placeholder="Email Address"
						/>
					</label>
					<label className="space-x-2 flex flex-col ">
						<span className="text-sm text-gray-600 font-semibold p-1">
							Comment
						</span>
						<textarea
							className="w-full input text-slate-100"
							rows={5}
							placeholder="Wright your comment"
						/>
					</label>
				</form>
			</main>
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
		},
		body,
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
		revalidate: 300, // In seconds
	};
};

export default Post;
