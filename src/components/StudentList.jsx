import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';

const StudentList = () => {

    const navigate = useNavigate();
    const [studentData, setStudentData] = useState("");
    const db = getDatabase(app);
    const handleDelete = (key) => {

        const storage = getStorage(app);
        const refImg = storageRef(storage, "images/" + key);
        deleteObject(refImg)
            .then(res => { remove(ref(db, 'student/' + key)); });

    };
    useEffect(() => {
        const forRef = ref(db, 'student');
        onValue(forRef, (snapshot) => {
            const data = snapshot.val();
            setStudentData(data);
        });
        // eslint-disable-next-line
    }, []);
    return (<div>

        {studentData && <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,  1fr)', margin: "30px"
        }}>{Object.entries(studentData).map(([key, value]) => {
            return (
                <div className="card" key={key}>
                    <div className="card__img card_no"><h1>{key}</h1></div>
                    <div className="card__avatar"><img className="card__avatar" src={value.imgURL} alt='' /> </div>
                    <div className="card__title ">{value.name}</div>
                    <div className="card__subtitle">{value.number}</div>
                    <div className="card__wrapper">
                        <button className="card__btn" onClick={() => { navigate('/updateData', { state: [key, value] }); }}>Edit</button>
                        <button className="card__btn card__btn-solid" style={{ marginLeft: "5px" }} onClick={() => handleDelete(key)}>Delete</button>
                    </div>
                </div>
            );
        })}</div>}
    </div>
    );
};

export default StudentList;