/* Stylesheet imports */
import styles from './ques-accordion.module.css';

/* Imports from react-bootstrap */
import { Accordion } from 'react-bootstrap';

/**
 * The props types for the QuestionAccordion.
 */
interface Props {
	question: string;
	answer: string;
	eventKey: string;
}

/**
 * Returns the customized Accordion for a question in the FAQ.
 *
 * @param props the props for this accordion, as seen outlined in the interface.
 * @param props.question the question that will go in the header of the accordion.
 * @param props.answer the answer that will go in the body of the accordion.
 * @param props.eventKey the event key that is unique to this accordion so it is not to be confused with others.
 * @requires eventKey to be a string. Example: "0", "1", "2", "3" etc..
 */
const QuestionAccordion = (props: Props) => {
	return (
		<>
			<Accordion.Item className={`${styles.accordionItem} mb-3`} eventKey={props.eventKey}>
				<Accordion.Header>{props.question}</Accordion.Header>
				<Accordion.Body className={styles.accordionBody}>{props.answer}</Accordion.Body>
			</Accordion.Item>
		</>
	);
};

/**
 * Exports the accordion for external use.
 */
export default QuestionAccordion;
