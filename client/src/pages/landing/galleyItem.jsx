import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';


const GalleryItems = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        
        setData(dataPlan.data);

    }, []);
    
    return (


        <div className='cms-joint gallery_point'>

            <div className="callups_section">

                <div className="preview_cms_card gallery">

                    <div className="callup_img" style={{ backgroundImage : `url(${data.foundersImg})`}} >
                    </div>

                    <div className="details_pin">

                        <div className="callup_title">{data.company}</div>

                        <div className="callup_details">
                            {data.description}
                        </div>

                        <div className="callup_footer">

                            <p><a onClick={() => Navigate(`/gallery/${dataPlan.uid}`)}> View Album <i className="fi fi-rr-arrow-small-right"></i> </a></p>

                        </div>

                    </div>

                </div>                

            </div>

        </div>

    );
}

export default GalleryItems;
