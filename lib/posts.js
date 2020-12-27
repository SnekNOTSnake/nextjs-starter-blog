import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.resolve(process.cwd(), 'posts');

/**
 * @typedef {{ id: String, title: String, date: String }} Post
 * @typedef {{ contentHtml: Object }} PostContent
 * @typedef {Post & PostContent} PostWithContent
 */

/**
 * @returns {Post[]}
 */
export const getSortedPostData = () => {
	// Get file names inside `postsDirectory`
	const fileNames = fs.readdirSync(postsDirectory);
	const postsData = fileNames.map((fileName) => {
		// Remove '.md' from file to get the post id
		const id = fileName.replace('.md', '');

		// Read the file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileString = fs.readFileSync(fullPath, 'utf8');

		// Parse the frontmatter inside the file
		const matterResult = matter(fileString);

		return { id, ...matterResult.data };
	});

	// Sort posts by date
	return postsData.sort((postA, postB) => {
		return new Date(postA.date) - new Date(postB.date);
	});
};

/**
 * @returns {{ id: String }[]} PostIds
 */
export const getPostIds = () => {
	const fileNames = fs.readdirSync(postsDirectory);
	const postIds = fileNames.map((fileName) => {
		return { params: { id: fileName.replace('.md', '') } };
	});
	return postIds;
};

/**
 * @param {String} id
 * @returns {PostWithContent}
 */
export const getPostData = async (id) => {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileString = fs.readFileSync(fullPath);

	const matterResult = matter(fileString);
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	return {
		id,
		...matterResult.data,
		contentHtml,
	};
};
