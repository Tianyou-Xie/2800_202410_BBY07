import styles from './UIBox.module.css';
import { Container } from 'react-bootstrap';

interface UIBoxProp {
	content: JSX.Element | string;
	curved?: boolean;
	dark?: boolean;
	clickable?: boolean;
	className?: string;
}

/**
 * Component representing a general interface box.
 *
 * @param props.content - Content inside the UIBox.
 * @param props.curved - (Optional) Applies a curved border instead of a square one.
 * @param props.dark - (Optional) Applies a dark theme to the interface box.
 * @param props.clickable - (Optional) Creates a click animation.
 * @param props.className - (Optional) Extra className for the component.
 */
const UIBox = (props: UIBoxProp): JSX.Element => {
	let classes = props.className ?? ' ';
	classes += props.curved ? ' ' + styles.curved : ' ';
	classes += props.dark
		? ' ' + styles.darkTheme + ' '
		: props.curved
		? ' ' + styles.lightThemeCurved + ' '
		: ' ' + styles.lightThemeSquare + ' ';
	classes += props.clickable ? styles.clickable : ' ';

	return (
		<>
			<div className={classes}>{props.content}</div>
		</>
	);
};

export default UIBox;
