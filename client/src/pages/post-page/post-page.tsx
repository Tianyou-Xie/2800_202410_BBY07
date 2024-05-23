import style from './post-page.module.css';
import Page from '../../components/Page/Page';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import Post from '../../components/Post/Post';

interface PostProps {}

const PostPage = function (props: PostProps) {
	let content: JSX.Element = <>{/* <Post/> */}</>;

	return (
		<>
			<Page logoHeader={false} pageName='Post' content={content} />
		</>
	);
};

export default PostPage;
