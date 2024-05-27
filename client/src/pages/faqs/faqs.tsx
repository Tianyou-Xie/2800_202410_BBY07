import styles from './faqs.module.css';

import Page from '../../components/Page/Page';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';

const FAQs = () => {
	const [searchQuery, setSearch] = useState('');
	const [quesToDisplay, setQuestions] = useState(Array<JSX.Element>());

	useEffect(() => {
        const displayQuestions = () => {
            
        }
    }, []);

	const findQuestions = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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
						<Accordion>{quesToDisplay}</Accordion>
					</div>
				}
			/>
		</>
	);
};

export default FAQs;
