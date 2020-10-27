import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from "./firebase";
import firebase from "firebase";
import './ImageUpload.css';



function ImageUpload({username}) {
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if(e.target.files[0]) {
            //* always pick the first file => it basically upload the file
            setImage(e.target.files[0]);  
        }
    };

    const handleUpload = () => {
        // * for my future reference :p
        // access storage in firebase
        // get refrence to this folder
        // we are creating folder `./image`
        // and storing everything inside it
        //then putting the image we grabbed into that point

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //that progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                //final part => complete function => this actually download that file and get that URL for some further posting reference posting
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //posting the image inside the database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div className="imageupload">
            {/* Here I'm going to add functionlity for . .  */}
            {/* Caption input */}
            {/* File Picker */}
            {/* Post Button */}
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
