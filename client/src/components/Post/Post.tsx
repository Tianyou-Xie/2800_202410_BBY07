import styles from './Post.module.css';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

import Container from 'react-bootstrap/Container';
import Para from '../para/Para';
import { inherits } from 'util';

interface PostProp { username: string, text: string, postURL: string }

interface UserProp { username: string }

const User = (props: UserProp): JSX.Element => {
	return <>
		<Container className={styles.userContainer}>
			{props.username}
		</Container>
	</>;
};

const Post = (props: PostProp): JSX.Element => {
	return (
		<Container className={styles.postContainer}>
			<User username={props.username}/>
			<Container className={styles.paraContainer}>
				<a href={props.postURL} style={{textDecoration: 'none', color: 'inherit'}}>
					<Para className={styles.postText} text={props.text}/>
				</a>
			</Container>
		</Container>
	);
};

export default Post;