/* Import from React */
import { useEffect, useState, useContext } from 'react';
import { If, Then } from 'react-if';
import { FaTrashAlt } from 'react-icons/fa';

/* Import from wouter */
import { Link } from 'wouter';

/* Imports for frontend api call and authentication verification */
import { api } from '../../../lib/axios';

/* Stylesheet imports */
import style from './post-header.module.css';

/* Import from other components created */
import { UserAuthContext } from '../../../lib/auth';
import ModalConfirmation from '../../ModalConfirmation/ModalConfirmation';

/* Import from UI components */
import UIBox from '../../UIBox/UIBox';

/* Define the Props interface */
interface Props {
	userName: string;
	displayTime?: boolean;
	authorId: string;
	avatarUrl?: string;
	createdAt?: Date;
	deleted?: boolean;
	location?: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	_id: string; // Add postId prop to identify the post
}

/**
 * PostHeader component representing the header of a post.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.authorId - The ID of the author of the post.
 * @param {string} props.avatarUrl - The URL of the author's avatar image.
 * @param {string} props.userName - The username of the author.
 * @param {boolean} props.displayTime - Flag to indicate whether to display the time.
 * @param {string} props.createdAt - The creation date of the post.
 * @param {Object} props.location - The location object.
 * @param {string} props.location.planetId - The ID of the planet where the post was created.
 * @param {string} props._id - The ID of the post.
 * @param {boolean} props.deleted - Flag to indicate if the post has been deleted.
 *
 * @return {JSX.Element} The PostHeader component.
 */
export const PostHeader = (props: Props) => {
	const user = useContext(UserAuthContext);
	const currentUserId = user?._id; // Assuming user object has _id property
	const timeOptions: Intl.DateTimeFormatOptions =
		props.displayTime === true ? { hour: 'numeric', minute: 'numeric' } : {};
	const dateFormatter = Intl.DateTimeFormat(navigator.language, {
		month: 'long',
		day: 'numeric',
		...timeOptions,
	});

	const [date, setDate] = useState<Date>();
	useEffect(() => {
		if (!props.createdAt) setDate(undefined);
		else setDate(new Date(props.createdAt));
	}, [props.createdAt]);

	const [locationName, setLocationName] = useState<string>();
	useEffect(() => {
		if (!props.location) return setLocationName(undefined);
		api.get(`/planet/${props.location.planetId}`).then(({ data }) => setLocationName(data.value.name));
	}, [props.location?._id]);

	const [showModal, setShowModal] = useState(false);

	const handleDeleteClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleConfirmDelete = async () => {
		try {
			await api.delete(`/post/${props._id}`);
			setShowModal(false);
			window.location.reload();
		} catch (error) {
			console.error('Failed to delete post:', error);
		}
	};

	return (
		<>
			<div className={`w-100 d-flex gap-2 align-items-center pb-1 ${style.postHeaderContainer}`}>
				<If condition={props.avatarUrl}>
					<Then>
						<Link href={'/user/' + props.authorId ?? '/'}>
							<img
								src={props.avatarUrl}
								alt={props.userName + ' Avatar'}
								className='img-thumbnail rounded-circle'
								style={{ maxWidth: '64px', maxHeight: '64px', aspectRatio: '1' }}
							/>
						</Link>
					</Then>
				</If>

				<div className='d-flex flex-column align-items-start gap-1'>
					<Link
						href={'/user/' + props.authorId ?? '/'}
						className='text-decoration-none text-white bg-black rounded-4 px-2 py-1'>
						<span>@{props.userName}</span>
					</Link>

					<div className={`d-flex gap-2 ps-1 ${style.infoList}`}>
						<If condition={!!date}>
							<Then>
								<small className='text-muted'>{dateFormatter.format(date)}</small>
							</Then>
						</If>

						<If condition={!!locationName}>
							<Then>
								<small className='text-muted'>{locationName}</small>
							</Then>
						</If>
					</div>
				</div>

				<If condition={(props.authorId === currentUserId || user.admin) && !props.deleted}>
					<Then>
						<button className={style.deleteButton} onClick={handleDeleteClick}>
							<UIBox
								className={`${style.buttons} p-1 h-100 d-flex align-items-center`}
								content={
									<div className='d-flex gap-1 align-items-center'>
										<FaTrashAlt />
									</div>
								}
								curved
								clickable
								dark
							/>
						</button>
					</Then>
				</If>
			</div>

			<ModalConfirmation
				show={showModal}
				onHide={handleCloseModal}
				title='Delete Post'
				body={<p>Are you sure you want to delete this post?</p>}
				disableFooter={false}
				onContinue={handleConfirmDelete}
			/>
		</>
	);
};
