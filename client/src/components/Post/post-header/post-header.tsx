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
import ModalConfirmation from '../../modal-confirmation/modal-confirmation';

/* Import from UI components */
import UIBox from '../../UIBox/UIBox';

/* Define the Props interface */
interface Props {
	userName: string;
	format: 'short' | 'expanded';
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
 * @param props.format short | long - If true, displays extra information and actions about the post
 * @param props.avatarUrl string - Url for displaying the avatar picture
 * @param props.deleted boolean - If true, displays the post as a deleted post.
 * @param props.Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 * @returns JSX.Element - Post header as a JSX.Element
 */
export const PostHeader = (props: Props) => {
	const user = useContext(UserAuthContext);
	const currentUserId = user?._id; // Assuming user object has _id property

	const timeOptions: Intl.DateTimeFormatOptions =
		props.format === 'expanded' ? { hour: 'numeric', minute: 'numeric' } : {};

	const dateFormatter = Intl.DateTimeFormat(navigator.language, {
		month: 'long',
		day: 'numeric',
		...timeOptions,
	});

	const [date, setDate] = useState<Date>();

	/**
	 * Used to properly format the date the post was created from the database
	 * once the createdAt attribute changes.
	 */
	useEffect(() => {
		if (!props.createdAt) setDate(undefined);
		else setDate(new Date(props.createdAt));
	}, [props.createdAt]);

	const [locationName, setLocationName] = useState<string>();

	/**
	 * Used to properly fetch and store the planet the post was created from
	 * the database once the location attribute changes.
	 */
	useEffect(() => {
		if (!props.location) return setLocationName(undefined);
		api.get(`/planet/${props.location.planetId}`).then(({ data }) => setLocationName(data.value.name));
	}, [props.location?._id]);

	const [showModal, setShowModal] = useState(false);

	/**
	 * Handles the delete post request to the frontend.
	 *
	 * @return void
	 */
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

				<div className='d-flex flex-column align-items-start gap-1 w-100 position-relative'>
					<Link
						href={'/user/' + props.authorId ?? '/'}
						className='text-decoration-none text-white bg-black rounded-4 px-2 py-1'>
						<span>@{props.userName}</span>
					</Link>

					<div className={`d-flex gap-2 ps-1 ${style.infoList} align-items-center flex-wrap me-5`}>
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

					<If
						condition={
							props.format === 'expanded' &&
							(props.authorId === currentUserId || user.admin) &&
							!props.deleted
						}>
						<Then>
							<button className='position-absolute end-0 bottom-0' onClick={() => setShowModal(true)}>
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
			</div>

			<ModalConfirmation
				show={showModal}
				onHide={() => setShowModal(false)}
				title='Delete Post'
				body={<p>Are you sure you want to delete this post?</p>}
				disableFooter={false}
				onContinue={handleConfirmDelete}
			/>
		</>
	);
};
