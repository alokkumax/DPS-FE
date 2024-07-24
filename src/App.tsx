import dpsLogo from './assets/dps_favicon.png';
import UserData from './components/UserData.tsx';
import './App.css';

function App() {
	
	return (
		<>
			<div className='header'>
				<img className='dps' src={dpsLogo} alt="" />
				<p className='brand'>CRM Dashboard</p>
			</div>
			<UserData/>
		</>
	);
}

export default App;
