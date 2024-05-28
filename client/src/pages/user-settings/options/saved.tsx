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

const SavedPage = () => {
    const user = useContext(UserAuthContext);
    const [savedPosts, setSavedPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (user) {
            fetchSavedPosts(page);
        }
    }, [user, page]);

    const fetchSavedPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await api.get<{ savedPosts: PostType[] }>('/user/saved', { params: { page, limit: 20 } });
            const savedPostsData = response.data.value.savedPosts;
            setSavedPosts(savedPostsData);
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page
            pageName='Saved Posts'
            content={
                <>
                    <div className='w-100 px-3 d-flex flex-column align-items-center justify-content-center'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : savedPosts.length === 0 ? (
                            <div>No Saved posts found.</div>
                        ) : (
                            <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-3'>
                                {savedPosts.map((post) => (
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
                    </div>
                </>
            }
        />
    );
};

export default SavedPage;
