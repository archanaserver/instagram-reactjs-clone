import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Post.css';
import firebase from 'firebase';


function Post({ user, postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    //state to track the indivisual comment
    const [comment, setComment] = useState('');

    // adding this to populate the comments
    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);


    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            {/* header => avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="archanaserver"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            
            {/* image */}
            <img
                className="post__image"
                src={imageUrl}
                alt="uploaded_image"
            />

            {/* username + caption */}
            <h4 className="post__text">
                <strong>{username}</strong> {caption} 
            </h4>

            {/*ADDING COMMENTS FUNCTIONLITY */}

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className="post__commentBox">
                    <input 
                        className="post_input"
                        placeholder="Enter a comment"
                        type="text"
                        value={comment}
                        //update state as we type in
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button 
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}

            
        </div>
    )
}

export default Post
