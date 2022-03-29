import { extendType, inputObjectType, nonNull } from 'nexus';
import { Comment } from '../../models';

export const CommentMutation = extendType({
	type: 'Mutation',
	definition: (type) => {
		type.field('comment', {
			type: Comment.name,
			args: {
				data: nonNull(CommentInput),
			},
			resolve: (_root, args, context) => {
				const { data } = args;
				return context.db.comment.upsert({
					where: { name: data.name },
					update: {
						link_id: data.link_id,
						id: data.id,
						author_fullname: data.author_fullname,
						parent_id: data.parent_id,
						body: data.body,
						permalink: data.permalink,
						name: data.name,
						created: data.created,
						created_utc: data.created_utc,
						depth: data.depth,
						edited: true,
					},
					create: {
						link_id: data.link_id,
						id: data.id,
						parent_id: data.parent_id,
						body: data.body,
						permalink: data.permalink,
						name: data.name,
						created: data.created,
						created_utc: data.created_utc,
						depth: data.depth,
						edited: data.edited || false,

						// sub: create user
						author: {
							connectOrCreate: {
								where: {
									fullname: data.author_fullname,
								},
								create: {
									fullname: data.author_fullname,
									name: data.author_name,
									author_flair_background_color:
										data.author_flair_background_color,
									author_flair_richtext:
										data.author_flair_richtext,
									author_flair_template_id:
										data.author_flair_template_id,
									author_flair_text: data.author_flair_text,
									author_flair_type: data.author_flair_type,
								},
							},
						},
					},
				});
			},
		});
	},
});

export const CommentInput = inputObjectType({
	name: 'CommentInput',
	definition: (t) => {
		t.nonNull.string('link_id');
		t.nonNull.string('id');
		t.nonNull.string('author_fullname');
		t.nonNull.string('author_name');
		t.string('author_flair_type');
		t.string('author_flair_template_id');
		t.string('author_flair_richtext');
		t.string('author_flair_text');
		t.string('author_flair_background_color');
		t.nonNull.string('parent_id');
		t.nonNull.string('body');
		t.nonNull.string('permalink');
		t.nonNull.string('name');
		t.nonNull.int('created');
		t.nonNull.int('created_utc');
		t.nonNull.int('depth');
		t.boolean('edited', { default: false });
	},
});
