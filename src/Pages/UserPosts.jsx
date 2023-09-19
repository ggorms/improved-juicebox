import {
  useGetPostsByUserIdQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} from "../reducers/api";
import { useSelector } from "react-redux";
import { useState } from "react";

function UserPosts() {
  const me = useSelector((state) => state.auth.credentials.user);

  const { data, isLoading } = useGetPostsByUserIdQuery(me.userId);
  const [deletePost] = useDeletePostMutation();
  const [addPost] = useAddPostMutation();
  const [editPost] = useEditPostMutation();

  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPostButton = async () => {
    await addPost({
      title: "My Most Recent Post",
      content: "I don't even know what to say anymore",
      userId: me.userId,
    })
      .then(() => {
        location.reload();
      })
      .catch(() => {
        console.log("error");
      });
  };

  const deletePostButton = async (id) => {
    await deletePost(id)
      .then(() => {
        location.reload();
      })
      .catch(() => {
        console.log("error");
      });
  };

  const editPostForm = () => {
    editPost({
      id: postId,
      title: title,
      content: content,
    });
    location.reload();
  };

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <>
      <form onSubmit={editPostForm}>
        <h4>Edit Post</h4>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content:</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Post ID:</label>
        <input
          type="number"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <button>Update Post</button>
      </form>
      <div>
        <button onClick={addPostButton}>Add Post</button>
      </div>

      <div>
        {data.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h3>{post.content}</h3>
            <p>Post ID: {post.id}</p>
            <button onClick={() => deletePostButton(post.id)}>
              DELETE POST
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPosts;
