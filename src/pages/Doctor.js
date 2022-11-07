import {AdminDB} from "../DAL/AdminDB";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DoctorDB} from "../DAL/DoctorDB";
import {PatientDB} from "../DAL/PatientDB";
import MyPage from "./MyPage";
import "../css/Doctor.css";

import {RoleContext, AvailableRoles} from "../Context/UserRoles";

export default function DoctorPage({currentUser, setBackgroundImage}) {
    const navigate = useNavigate();
    let doctor = null;
    let [patients, setPatients] = useState([]);
    let [idSelectedPatient, setIdSelectedPatient] = useState(null);
    const userRoleContext = useContext(RoleContext);

    useEffect(() => {
        setBackgroundImage(null);
        //prohibit the access to non-doctor users
        if (userRoleContext.role !== AvailableRoles.DOCTOR)
            navigate("/");
        loadDoctor();

    }, []);

    async function loadDoctor() {
        //search for a doctor the db
        //if found, set the doctor variable
        doctor = await DoctorDB.prototype.getDoctorById(currentUser.uid);
        if (typeof doctor === "undefined") {
            navigate("/");
        }
        console.log("doctor is:")
        console.log(doctor);

        await loadPatients();
    }

    async function loadPatients() {
        console.log("Loading patients")
        for (let i = 0; i < doctor.patients.length; i++) {
            let p = await PatientDB.prototype.getPatientById(doctor.patients[i]);
            p.id = doctor.patients[i];
            setPatients((patients) => [...patients, p]);
        }
        setIdSelectedPatient(doctor.patients[0]);
    }

    const patientButtonPress = (e) => {
        setIdSelectedPatient(e.target.value);
    }

    return (
        <div className={"DocDiv"}>
            <h2>Welcome back, Doctor</h2>
            <h3 className={"PatientListTitle"}>Your patients:</h3>
            <select className={"PatientList"} onChange={patientButtonPress}>
                {patients.map((p) => (
                    <option  value={p.id} key={p} className={"patientButtonBody"}>
                        {p.firstName} {p.lastName}
                    </option>
                    ))}
            </select>
            <MyPage patientId={idSelectedPatient} setBackgroundImage={setBackgroundImage}/>
        </div>
    );
}