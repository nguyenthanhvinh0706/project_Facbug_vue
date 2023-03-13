import { COLLECTION, db} from "../firebase";
import firebase from "firebase/app"

const getPost = async postId => {
  return await db
    .collection(COLLECTION.POST)
    .doc(postId)
    .get();
};

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

const likePost = async (payload = { postId: "", userId: "" }) => {
  return await db
    .collection(COLLECTION.POST)
    .doc(payload.postId)
    .set(
      {
        likes: firebase.firestore.FieldValue.arrayUnion(payload.userId)
      },
      { merge: true }
    );
};
const unlikePost = async (payload = { postId: "", userId: "" }) => {
  return await db
    .collection(COLLECTION.POST)
    .doc(payload.postId)
    .set(
      {
        likes: firebase.firestore.FieldValue.arrayRemove(payload.userId)
      },
      { merge: true }
    );
};

export const PostService = {
  addComment,
  likePost,
  unlikePost,
  getPost
};
