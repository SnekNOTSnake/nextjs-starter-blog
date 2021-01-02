interface Post {
	id: string
	title: string
	date: string
}

interface PostWithContent extends Post {
	contentHtml: string
}

type PostPath = { params: { id: string } }
