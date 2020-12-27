import styles from './Layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Head from 'next/head';
import Link from 'next/link';

const name = 'SnekNOTSnake';
const siteTitle = 'Something Cool!';

/**
 * @param {{ children: Object, home: Boolean }} param
 */
const Layout = ({ children, home = false }) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.now.sh/${encodeURI(
						siteTitle,
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta property="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			{home ? (
				<header className={styles.header}>
					<img
						src="/images/profile.jpg"
						alt={name}
						className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
					/>
					<h1 className={utilStyles.heading2Xl}>{name}</h1>
				</header>
			) : (
				<header className={styles.header}>
					<Link href="/">
						<a>
							<img
								src="/images/profile.jpg"
								alt={name}
								className={`${styles.headerImage} ${utilStyles.borderCircle}`}
							/>
						</a>
					</Link>
					<h1 className={utilStyles.headingLg}>
						<Link href="/">
							<a className={utilStyles.colorInherit}>{name}</a>
						</Link>
					</h1>
				</header>
			)}

			<main>{children}</main>

			{!home ? (
				<div className={styles.backToHome}>
					<Link href="/">
						<a>Home</a>
					</Link>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Layout;
