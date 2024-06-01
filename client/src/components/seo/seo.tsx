import { Helmet } from 'react-helmet';

interface Props {
	/** The page title. */
	title: string;
	/** The page description */
	description: string;

	/** Open Graph properties (for Facebook and other sites) */
	og?: {
		type: string;
		image: string;
		imageAlt: string;
	};
}

/**
 * An SEO component to render a Helmet instance and change the SEO
 * information when this component is rendered.
 *
 * Adapted from https://www.freecodecamp.org/news/react-helmet-examples/
 */
export default function SEO(props: Props) {
	return (
		<Helmet>
			<title>{props.title}</title>
			<meta name='description' content={props.description} />

			<meta property='og:title' content={props.title} />
			<meta property='og:description' content={props.description} />
			<meta property='og:type' content={props.og?.type} />
			<meta property='og:image' content={props.og?.image} />
			<meta property='og:image:alt' content={props.og?.imageAlt} />

			{/* <meta name='twitter:creator' content={name} />
			<meta name='twitter:card' content={type} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} /> */}
		</Helmet>
	);
}
