import './signup.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

const Signup = () => {
	return (
		<div className='signup-container'>
			<div className='px-4 pb-2 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>SKY.NET</h1>
				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className='signup-upperdiv mb-1'></div>
				<div className='signup-form'>
					<form>
						<input name='username' placeholder='USERNAME' type='email' />
						<input name='email' placeholder='EMAIL' type='email' />
						<input name='password' placeholder='********' type='password' />
						<select name='planets' id='planets'>
							<option value='select'>Select Location</option>
							<option value='mercury'>Mercury</option>
							<option value='venus'>Venus</option>
							<option value='earth'>Earth</option>
							<option value='mars'>Mars</option>
							<option value='jupiter'>Jupiter</option>
							<option value='saturn'>Saturn</option>
							<option value='uranus'>Uranus</option>
							<option value='neptune'>Neptune</option>
							<option value='moon'>Moon</option>
							<option value='xenos-prime'>Xenos Prime</option>
						</select>
					</form>
					<div className='text-center'>
						<button>LOG IN</button>
						<button>SIGN UP</button>
					</div>
				</div>
				<div className='signup-bottomdiv mt-2'></div>
			</div>
		</div>
	);
};

export default Signup;
