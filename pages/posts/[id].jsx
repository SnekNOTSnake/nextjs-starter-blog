import Head from 'next/head';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import { getPostIds, getPostData } from '../../lib/posts';
import styleUtils from '../../styles/utils.module.css';

/**
 * @typedef {{ id: String, title: String, date: String }} Post
 * @typedef {{ contentHtml: String }} PostContent
 * @typedef {Post & PostContent} PostWithContent
 */

/**
 * `param` is from `getStaticProps()`
 * @param {{ postData: PostWithContent }} param
 */
export default function Post({ postData }) {
	return (
		<Layout className="Post">
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
	);
}

export async function getStaticPaths() {
	const paths = getPostIds();
	return {
		paths,
		fallback: false, // Show 404 page when enter non-existing post
	};
}

/**
 * `param` is from `getStaticPaths()`
 * @param {{ params: { id: String } }} param
 */
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: { postData },
	};
}
