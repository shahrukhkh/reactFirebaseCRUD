import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const AddStudent = () => {


    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const navigate = useNavigate();
    const db = getDatabase(app);
    const storage = getStorage(app);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imgRef = storageRef(storage, `images/${rollNo}`);
        await uploadBytes(imgRef, selectedFile);
        const imgURL = await getDownloadURL(imgRef);
        set(ref(db, 'student/' + rollNo), {
            name: name,
            number: number,
            rollNo: rollNo,
            imgURL: imgURL
        })
            .then(res => {
                navigate("/studentList");
            }).catch(err => {
                console.log(err);
            });
    };
    return (

        <div className="login-box">
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input type='number' onChange={(e) => setRollNo(e.target.value)} name required />
                    <label>Enter Your Roll No</label>
                </div>
                <div className="user-box">
                    <input type='text' onChange={(e) => setName(e.target.value)} name required />
                    <label>Enter Your Name</label>
                </div>
                <div className="user-box">
                    <input type='number' onChange={(e) => setNumber(e.target.value)} name required />
                    <label>Enter your number</label>
                </div>
                <div className="user-box">
                    <input type='file' onChange={(e) => { setSelectedFile(e.target.files[0]); }} name="Choose" required />
                    <label></label>
                </div><center>
                    <button>
                        Submit
                        <span ></span>
                    </button>

                </center>
            </form>
        </div>

    );
};

export default AddStudent;