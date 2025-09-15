import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { useUser } from "../../stores/user.store";
import { addLinkedinProfile, editUser, getLinkdinProfile, getLinkdinProfileId, isValidLinkedInProfile, updateProfileLinkedin } from "../../api/firebase/editUser";
import { Xmark } from "iconoir-react";
import { getAUser } from "../../api/firebase/auth";
import { baseUrl } from "../../api/environment";

export default function Verify() {

  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  let navigate = useNavigate()
  const currentUser = useUser(state => state.currentUser);
  const setCurrentUser = useUser(state => state.setCurrentUser);

  useEffect(() => {
    
    if(!code) return;
    
    const profileUrl = axios.get(`http://localhost:4580/api/v2/auth/linkedin/${code}`)
    profileUrl
    .then(e => {
      
      setProfile({verified : true, photo : e.data.picture, linkedinId : e.data.sub});
      
      getLinkdinProfileId(e.data.sub).then(doc=>{

        if(doc?.length){

          alert("Sorry this linkedin has been verified for another account!");
          navigate('/dashboard');

        }
        else{

          editUser({verified : true, photo : e.data.picture, linkedinId : e.data.sub}, currentUser.uid).then(()=>{

            updateProfileLinkedin(currentUser.linkedinProfile, e.data.sub)
            .then( () =>{
              
              getAUser(currentUser.uid).then(userdetails => setCurrentUser(userdetails));
              setTimeout(() => {

                navigate('/dashboard');
                
              }, 1000);
            }).catch(err=>console.log(err))

          })

          .catch(()=>{
            alert("something went wrong, is ti here try again!");
            navigate('/dashboard')
          })

        }
      })
    })
    .catch(err => console.log(err))
    
  }, [code]);

  useEffect(() => {

    if(currentUser.verified){
      navigate('/dashboard')
    }

    if(currentUser.linkedinProfile){
      setUrl(currentUser.linkedinProfile)
    }
    
  }, []);

  const verifyLinkedin = () => {

      if(url === "") {
        alert("Kindly fill your linkedin profile to continue");
        return;
      }

      if(!isValidLinkedInProfile(url)){
        alert("This is an invalid linkedin profile url");
        return;
      }

    getLinkdinProfile(url)
    .then(e=>{

      if(e.length) {

        if(e[0]?.verified){
          alert("Profile has been verified before!");
          return;
        }else{

          editUser({linkedinProfile : url}, currentUser.uid)
          .then(() => {
            getAUser(currentUser.uid).then(userdetails => setCurrentUser(userdetails));
            
            const params = new URLSearchParams({
                response_type : "code",
                client_id : "777264zlwdjs3f",
                redirect_uri : `${baseUrl}/dashboard/verify`,
                state : currentUser.uid,
                scope : 'openid email profile'
            })
    
            const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
            window.location.href = linkedInAuthUrl;
    
          })
          .catch((err) => {
            console.log(err);
            // alert("something went wrong") 
            return;
          })

          return;
          
        }

      }else{
        addLinkedinProfile(url).then(e => {

          editUser({linkedinProfile : url}, currentUser.uid)
          .then(() => {
            getAUser(currentUser.uid).then(userdetails => setCurrentUser(userdetails));
            
            const params = new URLSearchParams({
                response_type : "code",
                client_id : "777264zlwdjs3f",
                redirect_uri : `${baseUrl}/dashboard/verify`,
                state : currentUser.uid,
                scope : 'openid email profile'
            })
    
            const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
            window.location.href = linkedInAuthUrl;
    
          })
          .catch((err) => {
            console.log(err);
            // alert("something went wrong") 
            return;
          })

        })
      }

    })

  }

  return (
    <div className="verifyAccount">
      {
        code ?
        <Loader/>
        :
        (<div className="modal">
          <div className="closeBtn" onClick={()=>navigate('/dashboard')}><Xmark/></div>
          <div className="title">Linkedin Profile URL</div>
          <div className="formInput">
            <label>Profile Url</label>
            <input type="text" value={url} onChange={e=>setUrl(e.target.value)} placeholder="Enter linkedin url" />
            <div className="submitUrl" onClick={verifyLinkedin}>Continue</div>
          </div>
        </div>)
      }
    </div>
  );
}