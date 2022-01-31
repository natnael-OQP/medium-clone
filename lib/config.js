// lib/config.js
export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: "mdmgzj2t",
	apiVersion: "2021-10-21", 
	useCdn: process.env.NODE_ENV === "production",
};
