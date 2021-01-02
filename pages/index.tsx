import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import Date from '../components/Date'
import styleUtils from '../styles/utils.module.css'
import { getSortedPostData } from '../lib/posts'

const siteTitle = 'Something Cool!'

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section className={styleUtils.headingMd}>
				<p>
					Say something cool when you throw it! What? Say something cool!
					Something cool!
				</p>
			</section>

			<section className={`${styleUtils.headingMd} ${styleUtils.padding1px}`}>
				<h2 className={styleUtils.headingLg}>Posts</h2>
				<ul className={styleUtils.list}>
					{posts.map(({ title, id, date }) => (
						<li className={styleUtils.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={styleUtils.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}

type Props = { props: { posts: Post[] } }
export const getStaticProps = async (): Promise<Props> => {
	const posts = getSortedPostData()
	return { props: { posts } }
}

export default Home
