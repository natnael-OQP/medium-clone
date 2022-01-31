// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: "mdmgzj2t",
	useCdn: process.env.NODE_ENV === "production",
	token: process.env.SANITY_API_TOKEN,
	apiVersion: '2021-08-31',
};

const client = sanityClient(config);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { _id, name, email, comment } = JSON.parse(req.body);
	try {
		await client.create({
			_type: "comment",
			post: {
				_type: "reference",
				_ref: _id,
			},
			name,
			email,
			comment,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Couldn't not Submit Comment", error });
	}
	return res.status(200).json({ message: "Comment Submitted" });

}
