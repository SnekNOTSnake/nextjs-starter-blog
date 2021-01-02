import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Date from '../../components/Date'
import { getPostIds, getPostData } from '../../lib/posts'
import styleUtils from '../../styles/utils.module.css'

type Props = { postData: PostWithContent }

/** `param` is from `getStaticProps()` **/
const Post: React.FC<Props> = ({ postData }) => (
	<Layout>
		<Head>
			<title>{postData.title}</title>
		</Head>

		<article>
			<h1 className={styleUtils.headingXl}>{postData.title}</h1>
			<div className={styleUtils.lightText}>
				<Date dateString={postData.date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</article>
	</Layout>
)

export const getStaticPaths = async (): Promise<{
	paths: PostPath[]
	fallback: boolean
}> => {
	const paths = getPostIds()
	return {
		paths,
		fallback: false, // Show 404 page when enter non-existing post
	}
}

type Props2 = { params: { id: string } }
type Return = { props: { postData: PostWithContent } }

/**`param` is from `getStaticPaths()` **/
export const getStaticProps = async ({ params }: Props2): Promise<Return> => {
	const postData = await getPostData(params.id)
	return { props: { postData } }
}

export default Post
