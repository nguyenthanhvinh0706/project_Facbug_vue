import { COLLECTION, db, serverTimestamp } from "../firebase";

const addComment = async (payload = { msg: "", postId: "", userId: "" }) => {
  return await db
    .collection(COLLECTION.POST)
    .doc(payload.postId)
    .set(
      {
        latestComment: {
          ...payload,
          timestamp: new Date()
        }
      },
      { merge: true }
    );
};
export const PostService = {
  addComment
};
