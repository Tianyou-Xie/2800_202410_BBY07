import Page from '../../components/Page/Page';
import styles from './messages.module.css';

const MessagesAll = () => {
	return (
		<Page
			pageName='Messages'
			content={
				<div className='container mt-5'>
					<ul className='list-group'>
						<li className='list-group-item d-flex justify-content-between align-items-center'>
							<div className='d-flex align-items-center'>
								<div className={`${styles.messageIcon} mr-3`}>
									<span>A</span>
								</div>
								<div>
									<h5 className='mb-0'>Alice Johnson</h5>
								</div>
							</div>
							<small className='text-muted'>2024-05-21</small>
						</li>
						<li className='list-group-item d-flex justify-content-between align-items-center'>
							<div className='d-flex align-items-center'>
								<div className={`${styles.messageIcon} mr-3`}>
									<span>B</span>
								</div>
								<div>
									<h5 className='mb-0'>Bob Smith</h5>
								</div>
							</div>
							<small className='text-muted'>2024-05-20</small>
						</li>
					</ul>
				</div>
			}
		/>
	);
};

export default MessagesAll;
