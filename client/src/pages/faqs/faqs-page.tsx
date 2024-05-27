import styles from './faqs.module.css';

import Page from '../../components/Page/Page';
import QuestionAccordion from '../../components/ques-accordion/ques-accordion';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

const FAQs = () => {
	const [searchQuery, setSearch] = useState('');
	const [quesToDisplay, setQuestions] = useState(Array<JSX.Element>());

	useEffect(() => {
		const displayInitialQues = async () => {
			const response = await api.get('/faqs');
			const ques = response.data.value;

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
			setQuestions(newQues);
			console.log(searchQuery);
		};

		displayInitialQues();
	}, []);

	const findQuestions = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setQuestions([]);

		
	};

	return (
		<>
			<Page
				logoHeader={false}
				pageName='FAQs'
				content={
					<div className='w-100'>
						<form className='w-100' onSubmit={findQuestions}>
							<input
								className='mb-2 w-100'
								name='password'
								placeholder='What can we help you with?'
								value={searchQuery}
								onChange={(event) => setSearch(event.target.value)}
								type='text'
							/>
							<div className='text-center'>
								<button className='btn btn-primary' type='submit'>
									Search
								</button>
							</div>
						</form>
						<Accordion className='mt-3' defaultActiveKey='0' flush>
							{quesToDisplay}
						</Accordion>
					</div>
				}
			/>
		</>
	);
};

export default FAQs;
