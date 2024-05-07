import { getDatabase, ref, update } from 'firebase/database';
import React, { useState } from 'react';
import { app } from '../Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref as imgRef, uploadBytes } from 'firebase/storage';

const UpdateData = () => {

    const locator = useLocation();
    const [name, setName] = useState(locator.state[1].name);
    const [number, setNumber] = useState(locator.state[1].number);
    const [rollNo, setRollNo] = useState(locator.state[0]);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const db = getDatabase(app);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const storage = getStorage(app);
            const refImg = imgRef(storage, `images/${rollNo}`);
            await uploadBytes(refImg, selectedFile);
            const imgURL = await getDownloadURL(refImg);
            update(ref(db, 'student/' + rollNo), {
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
        }
        else {



            update(ref(db, 'student/' + rollNo), {
                name: name,
                number: number,
                rollNo: rollNo,

            })
                .then(res => {
                    navigate("/studentList");
                }).catch(err => {
                    console.log(err);
                });
        }
    };
    return (
        <div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type='number' disabled value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
                        <label>Enter Your Roll No</label>
                    </div>
                    <div className="user-box">
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Enter Your Name</label>
                    </div>
                    <div className="user-box">
                        <input type='number' value={number} onChange={(e) => setNumber(e.target.value)} />
                        <label>Enter your number</label>
                    </div>
                    <div className="user-box">
                        <input type='file' onChange={(e) => { setSelectedFile(e.target.files[0]); }} name="Choose" />
                        <label></label>
                    </div><center>
                        <button>
                            Update
                            <span ></span>
                        </button>

                    </center>
                </form>
            </div>
        </div>

    );
};

export default UpdateData;