import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';
import { Link } from 'wouter';
import { api } from '../../../lib/axios';
import style from './post-header.module.css';

interface Props {
	/** The username of the post author. */
	userName: string;
	/** Whether the time of posting should be displayed. */
	displayTime?: boolean;
	/** The ID of the post author, used for profile link. */
	authorId: string;
	/** The avatar of the post author, optional. */
	avatarUrl?: string;
	/** The date of creation of the post, optional. */
	createdAt?: Date;
	/** The location of creation of the post, optional. */
	location?: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
}

/**
 * Component representing the informational header of a post.
 *
 * Includes the userName, and can include the avatar, location and time of the
 * post.
 */
export const PostHeader = (props: Props) => {
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

	return (
		<div className='w-100 d-flex gap-2 align-items-center pb-1'>
			<If condition={props.avatarUrl}>
				<Then>
					<Link href={'/user/' + props.authorId ?? '/'}>
						<img
							src={props.avatarUrl}
							alt={props.userName + ' Avatar'}
							className='img-thumbnail rounded-circle'
							style={{ maxWidth: '64px', maxHeight: '64px' }}
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
		</div>
	);
};
