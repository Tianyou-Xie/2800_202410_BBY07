import { useEffect, useState } from "react";
import { Link } from "wouter";  // Import Link from wouter
import { api } from "../../lib/axios";
import Page from "../../components/Page/Page";
import styles from './follower.module.css';  // Import the CSS module

interface PostResponse {
    statusCode: number;
    statusMessage: string;
    value: UserProp[];
    success: boolean;
}

interface UserProp {
    _id: string;
    userName: string;
    followerCount: number;
    followingCount: number;
    postCount: number;
    avatarUrl?: string;
}

const FollowerPage = () => {
    const [followerUsers, setFollowerUsers] = useState<UserProp[]>([]);

    useEffect(() => {
        const fetchFollower = async () => {
            try {
                const response = await api.get<PostResponse>(`/user/follower`);
                if (response.data.success) setFollowerUsers(response.data.value);
            } catch { }
        };

        fetchFollower();
    }, []);

    return (
        <Page
            pageName='Follower'
            content={
                <div className={styles.userList}>
                    {followerUsers.map((user) => (
                        <Link key={user._id} href={`/user/${user._id}`} className={styles.userLink}>
                            <div className={styles.userItem}>
                                <img src={user.avatarUrl} alt={user.userName} className={styles.avatar} />
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>{user.userName}</p>
                                    <p>Followers: {user.followerCount}</p>
                                    <p>Following: {user.followingCount}</p>
                                    <p>Posts: {user.postCount}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        />
    );
};

export default FollowerPage;
