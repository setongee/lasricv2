import React, {useState, useEffect} from 'react';
import './gallery.scss'
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import { getCMSCallupData } from '../../api/firebase/admin/cms';
import GalleryItems from './galleyItem';
import SethAnimation from '../../components/lottie/seth-animation';
import EmptyData from '../../assets/svg/empty_data.png'

const Gallery = () => {

    const Navigate = useNavigate()
    const [data, setData] = useState([])
    const [gallery, setGallery] = useState([]);
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {

        async function fetchData() {

          const response = await getCMSCallupData("gallery", "albums")
          setData(response);

          setLoadPage(false)

        }

        fetchData();

      }, []);

      console.log(data);


    return (


        <div className="galleryPage">

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }

        <div className="callupItem landing_apply_page">

            <div className="title_callup_landing"> Gallery </div>

                <div className="result_data">

                    {
                        data.length ? data.map((data, index) => {

                            return <GalleryItems dataPlan = {data} key = {index}  />
                            
                        }) : <div className="no-data-state noDataState_landing">

                        <div className="none_anim">

                            <img src={EmptyData} alt="empty data state" />

                        </div>
        
                    <div className="info_msg">
                        
                            No albums to view currently
                            {<br></br>}
                            {<br></br>}
                        Kindly check back later on as albums will be updated duly

                    
                    </div>

                    </div>
                    }
                    
                </div>

            </div>

        </div>
        

    );
}

export default Gallery;
