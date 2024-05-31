import styles from './user-info.module.css';
import UIBox from '../kebabui-box/kebabui-box';

interface UserProp {
    _id: string;
    userName: string;
    followerCount: number;
    followingCount: number;
    postCount: number;
    avatarUrl?: string;
}

const UserInfo = (props: UserProp): JSX.Element => {
    return (
        <>
            <div className={`container`}>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-7'>
                        <div className='card text-center'>
                            <UIBox
                                content={
                                    <>
                                        <div className={`col-md-7 ${styles.borderRight} no-gutters`}>
                                            <div className='py-3'>
                                                <img
                                                    src={props.avatarUrl}
                                                    width='210'
                                                    className='rounded-circle'
                                                />
                                                <div className='stats'></div>
                                                <div className='mt-4'>
                                                    <h4 className={styles.username}>@{props.userName}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <div className='py-3'>
                                                <div className='mt-4'>
                                                    <span className='d-block head'>{props.followerCount} followers</span>
                                                </div>
                                                <div className='mt-4'>
                                                    <span className='d-block head'>{props.followingCount} following</span>
                                                </div>
                                                <div className='mt-4'>
                                                    <span className='d-block head'>{props.postCount} posts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                className={styles.profileInfoBox}
                                curved
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.line}></div>
        </>
    );
};

export default UserInfo;