import styles from './Para.module.css';

interface Props {
	text: string,
	className?: CSSModuleClasses[string] // Apply outside style
}

const Para = (props: Props) => {
	// Code to apply default or outside style
	let paraClass = (props.className) ? props.className : styles.paraRed;
	return <p className={paraClass}>{props.text}</p>;
};

export default Para;
