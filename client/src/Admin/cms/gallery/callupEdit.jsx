import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate, useParams } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { addAlbum, editAlbumDetails, updateAlbumDetails } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditAlbum = () => {

    const Navigate = useNavigate();
    const Params = useParams();

    const [data, setData] = useState({

        foundersImg : "",
        company : "",
        description : "",
        files : [],
        embedVideos : [],
        heyMan : []

    })

    const [openPreviewModal, setPreviewModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [content, setContent] = useState([]);
    const [contentStat, setContentStat] = useState(false);
    const [initialLength, setInitialLength] = useState(0);
    const [videoEmbedCHK, setVideoEmbedCHK] = useState([]);
    const [videoEmbed, setVideoEmbed] = useState({});

    useEffect(() => {

        async function fetchData() {

          const response = await editAlbumDetails(Params.id);

          setData(response);
          setVideoEmbed(response.embedVideos[0]);
          setInitialLength(response.files.length);
          setVideoEmbedCHK(response.heyMan)
        }
        
        fetchData();

      }, []);


    
    const handleChange = e => {

        const check = e.target.value;

        if ( e.target.name === "date" ) {

           const newDate = new Date(e.target.value).toDateString();
           data.formattedDate = newDate;
            
        } 
        
        setData( (data) => {
    
            return {
                ...data,
                [e.target.name] : e.target.value
            }

        } )

    }


    const handleNewVideoChange = e => {

        setVideoEmbed( (videos) => {
    
            return {
                ...videos,
                [e.target.name] : {
                    type : "video",
                    src :  e.target.value
                }
            }

        } )

       
    }


    
    const handleFileUpload = () => {

        const fileInput = document.getElementById("contentImage")
        fileInput.click();

    }

    const handleFileChange = e => {

        setContent( [ ...content, { fileRaw : e.target.files[0], src : URL.createObjectURL(e.target.files[0]) } ] )

    }


    const updateToDB = () => {

        //the cms details is updated here
        updateAlbumDetails(Params.id, data).then( () => {
        
            //alert the action has been saved
            setLoading(false)

            setTimeout(() => {

                setAlert(true)
                
                setTimeout(() => {

                    const alert = document.querySelector('.alertSuccess');
                    alert.style.right = '0px'
                    
                }, 100);
                
            }, 100);

            setTimeout(() => {

                const alert = document.querySelector('.alertSuccess');
                alert.style.right = '-400px'
                
                setTimeout(() => {

                    setAlert(false)
                    
                }, 1000);

                Navigate('/admin/content/gallery')
                
            }, 2000);

        } )

    }


    if ( data.files.length === (initialLength + content.length) && contentStat === true ){
        
        updateToDB();
        setContent([]);
        setContentStat(false)

    }
      

    const submitForm = () => {

        setContentStat(true)
        
        window.scrollTo(0, 0);
        setLoading(true);
        handleUploadToDB();

    }


    const handleUploadToDB = async () => {

        const storage = getStorage();
        
        content.map( async (data_content, index) =>  {
            
            const storageRef = ref(storage, `gallery / ${data.company} / gallery_${data.company}_${index}` );
    
            //uploading to firebase begins
            await uploadBytes(storageRef, data_content.fileRaw)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {
                    
                    setData( (snap) => {
                        return {
                            ...snap,
                            files : [...snap.files, {type : "image", src : url} ]
                        }
                    } )
                    
                })


                
            });

        })



    }

    return (

        <div className='cms-joint'>

            {
                loading ? <div className="loaderScreen">
                <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
               </div> : null
            }

            {
                alert ? 
                
                <div className="alertSuccess">

                    <div className="sethAnim">
                        <SethAnimation jsonSrc={"https://assets7.lottiefiles.com/packages/lf20_afs4kbqm.json"} lottieStyle = {{width: '50px', height: '50px'}} speed={"1"} />
                    </div>

                    Your inforrmation has been updated and saved successfully!

                </div> : null
            }


            <div className="cms-nav">

                <div className="headerBack" onClick={ () => Navigate(-1) } >
                    <i className="fi fi-rr-arrow-small-left"></i>
                </div>

                <div className="cms-title">Content Management {">"} Gallery {">"} Edit</div>

            </div>

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

                            <p><a href = {data.website} target = '_blank' > View Album <i className="fi fi-rr-arrow-small-right"></i> </a></p>

                        </div>

                    </div>

                </div>


                <div className="writeup_cms_form">

                    <div className="contentPlaceholder overload_xl">
                
                        <form className="cms-fill">

                            <h1>Edit this album</h1>

                            <div className="cms-input-holder">

                                <input type="text" className="cms-input" name = 'foundersImg' id='foundersImg' placeholder='Enter Company Founders Image' onChange={ handleChange } value = {data.foundersImg} />

                                <input type="text" className="cms-input" name = 'company' id='company' placeholder='Enter Company Name' onChange={ handleChange } value = {data.company} />

                                <input type="text" className="cms-input" name = 'description' id='description' placeholder='Enter Short Description' onChange={ handleChange } value = {data.description} />


                            </div>

                            <div className="add_content">
                                <div className="contentTag">Add Pictures and Videos</div>

                                <div className="contentItems">

                                    {
                                        content.length ? content.reverse().map( (image, index) => {

                                            return (

                                                <div className="imagePrev" key = {index} style={{ backgroundImage : `url(${image.src})`}} > <div className="deleteIcon"> <i className="fi fi-rr-minus"></i> </div> </div>
    
                                            )

                                        } ) : null

                                        

                                    }

                                    {
                                        data.files.length ? data.files.map( (image, index) => {

                                            return (

                                                <div className="imagePrev" key = {index} style={{ backgroundImage : `url(${image.src})`}} > 

                                                    <div className="deleteIcon"> 
                                                        <i className="fi fi-rr-minus"></i>
                                                    </div> 

                                                    <img src={image.src} alt="images from gallery" />
                                                    
                                                </div>
    
                                            )

                                        } ) : null

                                    } 


                                    <div className="content-addition" onClick={handleFileUpload}>

                                        <i className="fi fi-rr-plus"></i>
                                        <input type="file" accept="image/png, image/jpeg" id = "contentImage" hidden onChange={handleFileChange} />

                                    </div>


                                </div>

                                {
                                    videoEmbedCHK.length ? videoEmbedCHK.map( (video, index) => {

                                        return <div className='embedLink' key = {`video${index}`} >

                                            <input type="text" className="cms-input-videos" name = {`video${index+1}`} id={`video${index}`} placeholder='Enter Video Embed Link' onChange={ handleNewVideoChange } value = { videoEmbed[`video${index+1}`] === undefined ? "" : videoEmbed[`video${index+1}`].src } />

                                            <div className="deleteEmbedLink">-</div>
                                            
                                        </div>

                                    } ) : null
                                }

                                <div className="buttonAddVideo" onClick={() => setVideoEmbedCHK([...videoEmbedCHK, "new video"])}> <i className="fi fi-rr-plus"></i> Add Video </div>


                            </div>
                            
                            <div className="submitButtonCMS" onClick={ () => submitForm() }> Update Album </div>


                        </form>

                    </div>

                </div>

                

            </div>

        </div>

    );
}

export default EditAlbum;
