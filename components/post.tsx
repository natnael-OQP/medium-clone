import Link from "next/link";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "@sanity/client";
import { Post } from "../type";

interface props {
	post: Post;
}

export const configuredSanityClient = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	useCdn: true,
});

const Post = ({ post }: props) => {
	const mainImage = useNextSanityImage(
		configuredSanityClient,
		post.mainImage
	);

	const profile = useNextSanityImage(
		configuredSanityClient,
		post.author.image
	);
	const truncate = (str: string) => {
		return str.substring(0, 30) + " ...";
	};
	return (
		<Link href={`/post/${post.slug.current}`} passHref>
			{/* Image */}
			<div className="w-full sm:max-w-96 px-1  sm:px-3 mx-auto group  cursor-pointer">
				{post.mainImage && (
					<div className="w-full h-[200px] bg-gray-200 relative rounded-md overflow-hidden  ">
						<Img
							className="group-hover:scale-105 transition-transform duration-200 transform-gpu ease-in-out"
							src={mainImage.src}
							loader={mainImage.loader}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				)}
				<div className="flex justify-between items-center mt-2 gap-x-2">
					<div className="flex-grow">
						<h1 className="text-lg capitalize font-bold text-gray-800">
							{post.title}
						</h1>
						<p className="text-sm text-gray-600 ">
							{truncate(post.description)}{" "}
							<span className="text-gray-800">by</span>{" "}
							<span className="text-xs font-semibold italic">
								{post.author.name}
							</span>
						</p>
					</div>
					{/* author profile */}
					<div>
						{post.author.image && (
							<div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0 ">
								<Img
									src={profile.src}
									loader={profile.loader}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Post;
