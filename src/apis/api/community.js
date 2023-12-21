import { authInstance } from "../utils/instance";

const POST_API_URI = "/post";
const COMMENT_API_URI = "/comment";

export const callPostListAPI = async () => {
  try {
    const { data } = await authInstance.get(`${POST_API_URI}/list`);
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByCategoryAPI = async (categoryId) => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list/category/${categoryId}`
    );
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${POST_API_URI}/list/member`);
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callCommentedPostListByMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${COMMENT_API_URI}/list/member`);
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByViewAPI = async () => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list/category/view`
    );
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

<<<<<<< Updated upstream
//img, location 추가 해야함
export const addPostAPI = async (post) => {
  try {
=======
export const callPostListByCategoryAPI = async (categoryId) => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list/category/${categoryId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

//img, location 추가 해야함
export const addPostAPI = async (post) => {
  try {
>>>>>>> Stashed changes
    const response = await authInstance.post(`${POST_API_URI}/add`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPostAPI = async (postId) => {
  const { data } = await authInstance.get(`${POST_API_URI}/get/${postId}`);
  return data;
};

export const updatePostAPI = async (postId, updateData) => {
  const { data } = await authInstance.put(
    `${POST_API_URI}/${postId}/update`,
    updateData
  );
  return data;
};

export const deletePostAPI = async (postId, updateData) => {
  const { data } = await authInstance.put(
    `${POST_API_URI}/${postId}/delete`,
    updateData
  );
  return data;
};

export const callCommentListAPI = async (postId) => {
  const { data } = await authInstance.get(`${COMMENT_API_URI}/list/${postId}`);
  return data;
};

export const callReplyListAPI = async (postId) => {
  const { data } = await authInstance.get(
    `${COMMENT_API_URI}/list/reply/${postId}`
  );
  return data;
};

export const addCommentAPI = async (postId, writerId, content) => {
  try {
    const response = await authInstance.post(
      `${COMMENT_API_URI}/add`,
      JSON.stringify({
        memberId: writerId,
        postId: postId,
        content: content,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
