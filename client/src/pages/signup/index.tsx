import './index.css';

const Signup = () => {
	return (
		<>
			<div className='px-4 pb-2 text-center'>
				<img className='thumbnail img-fluid' src='./src/assets/images/SkynetLogo.png' alt='' />
				<h1>SKY.NET</h1>
				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
			</div>
			<div className='signup-upperdiv mb-1'></div>
			<div className='signup-form'>
				<form>
					<input name='username' placeholder='USERNAME' type='email' />
					<input name='email' placeholder='EMAIL' type='email' />
					<input name='password' placeholder='********' type='password' />
					<select name='cars' id='cars'>
						<option value='volvo'>Volvo</option>
						<option value='saab'>Saab</option>
						<option value='opel'>Opel</option>
						<option value='audi'>Audi</option>
					</select>
					<div className='signup-button-wrapper'>
						<button>LOG IN</button>
						<button>SIGN UP</button>
					</div>
				</form>
			</div>
			<div className='signup-bottomdiv mt-2'></div>
		</>
	);
};

export default Signup;
