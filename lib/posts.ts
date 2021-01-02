import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.resolve(process.cwd(), 'posts')

export const getSortedPostData = (): Post[] => {
	// Get file names inside `postsDirectory`
	const fileNames = fs.readdirSync(postsDirectory)
	const postsData = fileNames.map((fileName) => {
		// Remove '.md' from file to get the post id
		const id = fileName.replace('.md', '')

		// Read the file as string
		const fullPath = path.join(postsDirectory, fileName)
		const fileString = fs.readFileSync(fullPath, 'utf8')

		// Parse the frontmatter inside the file
		const matterResult = matter(fileString)

		return { id, date: matterResult.data.date, title: matterResult.data.title }
	})

	// Sort posts by date
	return postsData.sort((postA, postB) => {
		return new Date(postA.date).getTime() - new Date(postB.date).getTime()
	})
}

export const getPostIds = (): PostPath[] => {
	const fileNames = fs.readdirSync(postsDirectory)
	const postPaths = fileNames.map((fileName) => ({
		params: { id: fileName.replace('.md', '') },
	}))
	return postPaths
}

export const getPostData = async (id: string): Promise<PostWithContent> => {
	const fullPath = path.join(postsDirectory, `${id}.md`)
	const fileString = fs.readFileSync(fullPath)

	const matterResult = matter(fileString)
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content)
	const contentHtml = processedContent.toString()

	return {
		id,
		title: matterResult.data.title,
		date: matterResult.data.date,
		contentHtml,
	}
}
