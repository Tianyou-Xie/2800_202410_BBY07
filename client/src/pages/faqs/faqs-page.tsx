/* Stylesheet imports */
import styles from './faqs.module.css';

/* Imports from React */
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* Imports from react-bootstrap */
import Accordion from 'react-bootstrap/Accordion';

/* Imports from other components created */
import QuestionAccordion from '../../components/ques-accordion/ques-accordion';
import Page from '../../components/kebab-page/kebab-page';
import UIBox from '../../components/kebab-uibox/kebab-uibox';

/* Import for Axios */
import { api } from '../../lib/axios';

const emptyMessage =
	"Your search didn't match to any result. Try rewording your search." +
	" It may also be possible that we don't have what you are looking for yet";

/**
 * Constructs, manages, and returns the FAQs page.
 *
 * @returns the FAQs page as a JSX.Element.
 */
const FAQs = () => {
	const [searchQuery, setSearch] = useState('');
	const [quesToDisplay, setQuestions] = useState(Array<JSX.Element>());
	const [emptyMsg, setEmptyMsg] = useState(false);

	const clearBtn = useRef<HTMLButtonElement>(null);

	/* Calls displayInitialQues() when the page loads */
	useEffect(() => {
		displayInitialQues();
	}, []);

	/**
	 * Displays the FAQs from the database.
	 */
	const displayInitialQues = async () => {
		const response = await api.get('/faqs');
		const ques = response.data.value;
		let questions: Array<JSX.Element> = renderQuestions(ques);
		setQuestions(questions);
	};

	/**
	 * Sends a post request to recieve all FAQs that match the query body provided.
	 *
	 * @param event the form event from onSubmit.
	 */
	const findQuestions = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (searchQuery) clearBtn.current!.toggleAttribute('hidden');
		try {
			const response = await api.post(`/faqs`, {
				query: searchQuery,
			});
			checkEmptyResult(response.data.value);
			let questions: Array<JSX.Element> = renderQuestions(response.data.value);
			setQuestions(questions);
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	/**
	 * Check to see if the given result is empty.
	 *
	 * @param result the result to check.
	 */
	const checkEmptyResult = (result: any) => {
		if (result.length == 0) {
			setEmptyMsg(true);
		} else {
			setEmptyMsg(false);
		}
	};

	/**
	 * Renders the given questions as QuestionAccordions into an array and returns the array.
	 *
	 * @param ques The questions to render.
	 * @returns an array of the QuestionAccordions as a Array<JSX.Element>.
	 */
	const renderQuestions = (ques: any): Array<JSX.Element> => {
		setQuestions([]);
		let num = 0;
		let newQues: Array<JSX.Element> = [];
		ques.map((ques: any) => {
			newQues.push(
				<QuestionAccordion
					key={ques._id}
					question={ques.question}
					answer={ques.answer}
					eventKey={num.toString()}
				/>,
			);
			num++;
		});
		return newQues;
	};

	/**
	 * Resets the FAQ page by clearing the search bar, removing the clear button, and dispalying the intital questions again.
	 */
	const resetPage = () => {
		setSearch('');
		clearBtn.current!.toggleAttribute('hidden');
		setEmptyMsg(false);
		displayInitialQues();
	};

	return (
		<>
			<Page
				logoHeader={false}
				pageName='FAQs'
				content={
					<div className='w-75'>
						<h3 className={`${styles.faqHeader} w-100`}>What can we help you with?</h3>
						<form className='w-100' onSubmit={findQuestions}>
							<UIBox
								className='mb-3 w-100 mx-auto'
								dark
								content={
									<input
										name='password'
										placeholder='Search...'
										value={searchQuery}
										onChange={(event) => setSearch(event.target.value)}
										type='text'
									/>
								}
							/>

							<div className='d-flex justify-content-evenly align-items-center'>
								<button className={`${styles.searchBtn} btn btn-primary`} type='submit'>
									Search
								</button>
								<button
									className={`${styles.clearBtn} btn btn-danger`}
									type='button'
									ref={clearBtn}
									onClick={() => resetPage()}
									hidden>
									Clear
								</button>
							</div>
						</form>
						{emptyMsg ? (
							<div className={`${styles.emptyMsgCard} w-100 card mt-5 p-3`}>
								<h4 className='w-100 text-center'>{emptyMessage}</h4>
							</div>
						) : (
							<>
								<Accordion className='mt-3' defaultActiveKey='0' flush>
									{quesToDisplay}
								</Accordion>
							</>
						)}
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the FAQs page for external use.
 */
export default FAQs;
