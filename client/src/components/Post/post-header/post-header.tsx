import { useEffect, useState, useContext } from 'react';
import { If, Then } from 'react-if';
import { Link } from 'wouter';
import { api } from '../../../lib/axios';
import style from './post-header.module.css';
import { UserAuthContext } from '../../../lib/auth';
import UIBox from '../../UIBox/UIBox';
import ModalConfirmation from '../../ModalConfirmation/ModalConfirmation';
import { FaTrashAlt } from 'react-icons/fa';

/**
 * Interface that represents the arguments passed down to the PostHeader component.
 *
 * @params Covered on the component documentation.
 */
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
 * Post header component representing the header of the Post component.
 *
 * @param props._id string - Id of the post in the database.
 * @param props.authorId string - Id of the author of the post.
 * @param props.userName string - UserName of author of the post.
 * @param props.createdAt Date - (optional) Date in which the post was created.
 * @param props.displayTime boolean - If true, displays the time in which the post was displayed
 * @param props.avatarUrl string - Url for displaying the avatar picture
 * @param props.deleted boolean - If true, displays the post as a deleted post.
 * @param props.Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 * @returns JSX.Element - Post header as a JSX.Element
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

	/**
	 *
	 *
	 * @return {*}
	 */
	useEffect(() => {
		if (!props.createdAt) setDate(undefined);
		else setDate(new Date(props.createdAt));
	}, [props.createdAt]);

	const [locationName, setLocationName] = useState<string>();

	/**
	 *
	 *
	 * @return {*}
	 */
	useEffect(() => {
		if (!props.location) return setLocationName(undefined);
		api.get(`/planet/${props.location.planetId}`).then(({ data }) => setLocationName(data.value.name));
	}, [props.location?._id]);

	const [showModal, setShowModal] = useState(false);

	/**
	 *
	 *
	 * @return {*}
	 */
	const handleDeleteClick = () => {
		setShowModal(true);
	};

	/**
	 *
	 *
	 * @return {*}
	 */
	const handleCloseModal = () => {
		setShowModal(false);
	};

	/**
	 *
	 *
	 * @return {*}
	 */
	const handleConfirmDelete = async () => {
		try {
			await api.delete(`/post/${props._id}`);
			setShowModal(false);
			// Optionally, you can remove the post from the DOM here or refresh the feed
			window.location.reload(); // Simple way to refresh the feed
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
