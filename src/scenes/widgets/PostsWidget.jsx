import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // const posts=[];
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);



  const getPosts = async () => {
    const response = await fetch("https://yujinchoi.p-e.kr/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (isProfile){
      const userPosts = data.filter((post)=>{
        return post.userId === userId;
      })
      dispatch(setPosts({ posts: userPosts }));
    }else {
      dispatch(setPosts({ posts: data }));
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://yujinchoi.p-e.kr/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    // if (isProfile) {
    //   getUserPosts();
    // } else {
    //   getPosts();
    // }
    getPosts();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile = {isProfile}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
