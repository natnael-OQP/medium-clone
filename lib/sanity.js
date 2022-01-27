// lib/sanity.server.js
import {
	createImageUrlBuilder,
	createCurrentUserHook,
	createClient,
} from "next-sanity";
import { config } from "./config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// generate image urls 
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

//  helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);