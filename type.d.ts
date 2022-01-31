export interface Post {
	_id: string;
	_createdAt: string;
	title: string;
	author: {
		name: string;
		image: string;
		bio?: string;
	};
	comment:comment[];
	description: string;
	mainImage: {
		asset: {
			url: string;
		};
	};
	slug: {
		current: string;
	};
	body?: [object] | undefined;
}

export interface comment {
	comment: string;
	email: string;
	name: string;
	approved: boolean;
	post: {
		_ref: string;
		_type: string;
	};
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
}