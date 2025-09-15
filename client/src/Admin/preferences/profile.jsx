import React, {useState, useEffect} from 'react';
import { CSVLink } from "react-csv";
import { getAdminUserDetails } from '../../api/firebase/admin/preferences';
import './preferences.scss'

const Profile = ({adminUser}) => {

    const [data, setData] = useState({

        firstname : "",
        lastname : "",
        email : "",
        password : "password"

    })

    const dataO = [
        { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ];

    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" }
      ];

    const handleChange = (e) => {

        setData( domData => {

            return {

                ...domData,
                [e.target.name] : e.target.value

            }
        })

    }

    useEffect(() => {

        async function fetchData() {

            const response = await getAdminUserDetails(adminUser.uid);
            setData(response);

        }

        fetchData();

    }, []);


    return (

        <div className="profile_page">

            {/* <CSVLink data={dataO} headers={headers} filename={"LASRIC_Download_FIle.csv"} > Download me </CSVLink>; */}

            <form className="form-profile">

                <div className="each_input">
                    <label> Firstname </label>
                    <input type="text" name = "firstname" placeholder='Enter your first name' value={data.firstname} onChange={handleChange}/>
                </div>

                <div className="each_input">
                    <label> Lastname </label>
                    <input type="text" name = "lastname" placeholder='Enter your last name' value={data.lastname} onChange={handleChange}/>
                </div>

                <div className="each_input">
                    <label> Email </label>
                    <input type="email" name = "email" placeholder='Enter your email address' value={data.email} onChange={handleChange} disabled />
                </div>

                <div className="each_input">
                    <label> Password </label>
                    <input type="password" name = "password" placeholder='Enter your password' value={data.password} onChange={handleChange}/>
                </div>

            </form>

        </div>

    );
}

export default Profile;
