import React, {useState, useEffect} from 'react';
import './gallery.scss'
import '../../Admin/styles/cms.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { editAlbumDetails, getCMSCallupData } from '../../api/firebase/admin/cms';
import GalleryItems from './galleyItem';
import SethAnimation from '../../components/lottie/seth-animation';
import youtubePlay from '../../assets/svg/youtubePlay.svg'

const GalleryViews = () => {

    const Params = useParams();
    const Navigate = useNavigate();
    const [data, setData] = useState([])
    const [loadPage, setLoadPage] = useState(true);
    const [title, setTitle] = useState("");

    useEffect(() => {

        async function fetchData() {

          const response = await editAlbumDetails(Params.albumID)
          setTitle(response.company);
          
          const files = []

          response.files.map(dataInk => {

            files.push(dataInk)

          })

          Object.values(response.embedVideos[0]).map(dataInk => {

            files.push(dataInk)

          })

          
          const JAM = files.sort(() => Math.random() - 0.5)
          setData(JAM)

          setLoadPage(false)

        }

        fetchData();

      }, []);

      console.log(data);


    return (


        <div className="galleryPage levi">

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }

            <div className="cms-nav gallery_nav">

                <div className="headerBack" onClick={ () => Navigate("/gallery") } >
                    <i className="fi fi-rr-arrow-small-left"></i>
                </div>

                <div className="cms-title"> Back to albums </div>

            </div>

            <div className="title_album"> {title} </div>

            <div className="views_gallery">

                {
                    data.length ? data.map( (image, index) => {

                        return (

                            image.type === 'image' 
                            ? 
                            <div className="views_holder" style={{ backgroundImage : `url(${image.src})`}}> <img src={image.src} alt="" /> </div> 
                            : 
                            <div className="views_holder nibDesign">
                                <div className="videoPlayIcon">
                                    <img src={youtubePlay} alt="" />
                                </div>


                                <p>Click to view video on youtube</p>

                            </div>
                        
                        )

                    }) : null
                }

            </div>

        </div>
        

    );
}

export default GalleryViews;
