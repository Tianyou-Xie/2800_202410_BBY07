import styles from './Para.module.css';

interface Props {
	text: string;
}

const Para = (props: Props) => {
	return <p className={styles.paraRed}>{props.text}</p>;
};

export default Para;
