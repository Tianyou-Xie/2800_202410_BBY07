import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { FcGoogle } from 'react-icons/fc';

interface Props {
	disabled?: boolean;
	text?: string;
	className?: string;
}

export const GoogleAuthButton = (props: Props) => {
	const [url, setUrl] = useState('');
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (props.disabled !== undefined) {
			setDisabled(props.disabled);
		}
	}, [props.disabled]);

	useEffect(() => {
		setDisabled(true);
		api.post('/user/oauth/google').then((res) => {
			const url = res.data?.value;
			if (url) setUrl(url);
			setDisabled(false);
		});
	}, []);

	function onClick() {
		location.assign(url);
	}

	return (
		<button
			onClick={() => onClick()}
			disabled={disabled}
			className={`${props.className} w-100 d-flex gap-2 align-items-center justify-content-center`}>
			<FcGoogle />
			{props.text ?? 'Authenticate with Google'}
		</button>
	);
};
