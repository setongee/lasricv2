import React from 'react';
import SethAnimation from '../components/lottie/seth-animation';
import './styles/cms.scss'
import { useNavigate } from 'react-router-dom';

const Cms = () => {

    const Navigate = useNavigate()

    return (

        <div className="body-content-area">

            
            <div className="tag-area">

                <h1>Content Management</h1>
                <p>This is the area that allows you manage the web content of the LASRIC platform to fit your desired needs</p>

            </div>

            <div className="content-points">

                <div className="content-area" onClick={()=> Navigate('/admin/content/landing')}>
                    <div className="icon-content"><i className="fi fi-rr-browser"></i></div>
                    <div className="area-title">Landing Page</div>

                    <div className="icon-arrow-in">
                    <i className="fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>

                <div className="content-area" onClick={()=> Navigate('/admin/content/callups')} >
                    <div className="icon-content"><i className="fi fi-rr-document"></i></div>
                    <div className="area-title">Callups</div>
                    <div className="icon-arrow-in">
                    <i className="fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>

                <div className="content-area" onClick={()=> Navigate('/admin/content/beneficiaries')} >
                    <div className="icon-content"><i className="fi fi-rr-gift"></i></div>
                    <div className="area-title">Beneficiaries</div>
                    <div className="icon-arrow-in">
                    <i className="fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>

                <div className="content-area" onClick={()=> Navigate('/admin/content/gallery')}>
                    <div className="icon-content"><i className="fi fi-rr-picture"></i></div>
                    <div className="area-title">Gallery</div>
                    <div className="icon-arrow-in">
                    <i className="fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>

            </div>

        </div>
        
    );
}

export default Cms;
