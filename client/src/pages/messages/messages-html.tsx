import styles from './messages.module.css';

const MessagesHtml = () => {
	return (
		<>
			<div className='container'>
				<header className='border-bottom lh-1 py-3'>
					<div className='row flex-nowrap justify-content-between align-items-center'>
						<div className='col-4 pt-1'>
							<a className='link-secondary' href='#'>
								Logo
							</a>
						</div>
						<div className='col-4 text-center'>
							<a className='blog-header-logo text-body-emphasis text-decoration-none' href='#'>
								User
							</a>
						</div>
						<div className='col-4 d-flex justify-content-end align-items-center'>
							<a className='link-secondary' href='#' aria-label='Search'></a>
							<a className='btn btn-sm btn-outline-secondary' href='#'>
								Sign up
							</a>
						</div>
					</div>
				</header>

				<div className='nav-scroller py-1 mb-3 border-bottom'>
					<nav className='nav nav-underline justify-content-between'>
						<a className='nav-item nav-link link-body-emphasis active' href='#'>
							World
						</a>
					</nav>
				</div>
			</div>
		</>
	);
};

export default MessagesHtml;
