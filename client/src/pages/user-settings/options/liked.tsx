import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../../lib/auth';
import Page from '../../../components/Page/Page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';
import Post from '../../../components/Post/Post';
import { api } from '../../../lib/axios';

// Define the Post interface
interface PostType {
    _id: string;
    authorId: string;
    content: string;
    likeCount: number;
    commentCount: number;
    repostCount: number;
    location: {
        planetId: string;
        latitude: number;
        longitude: number;
        _id: string;
    };
    media: any[];
    createdAt: Date;
    deleted: boolean;
    isRoot: boolean;
    userName: string;
}

const LikedPage = () => {
    const user = useContext(UserAuthContext);
    const [likedPosts, setLikedPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (user) {
            fetchLikedPosts(page);
        }
    }, [user, page]);

    const fetchLikedPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await api.get<{
                value: any; likedPosts: PostType[]
            }>('/user/liked', { params: { page, limit: 20 } });
            setLikedPosts(response.data.value.likedPosts);
        } catch (error) {
            console.error('Error fetching liked posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page
            pageName='Liked Posts'
            content={
                <>
                    <div className='w-100 px-3 d-flex flex-column align-items-center justify-content-center'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : likedPosts.length === 0 ? (
                            <div>No liked posts found.</div>
                        ) : (
                            <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-3'>
                                {likedPosts.map((post) => (
                                    <Post
                                        key={post._id}
                                        _id={post._id}
                                        authorId={post.authorId}
                                        content={post.content}
                                        likeCount={post.likeCount}
                                        commentCount={post.commentCount}
                                        location={post.location}
                                        createdAt={post.createdAt}
                                        isRoot={post.isRoot}
                                        userName={post.userName}
                                    />
                                ))}
                            </div>
                        )}

                        {/* <PaginatedPostFeed
                            feedKey='liked'
                            fetchPage={(page) => api.get(`/user/liked?page=${page}`).then((res) => res.data.value)}
                        /> */}
                    </div>
                </>
            }
        />
    );
};

export default LikedPage;
