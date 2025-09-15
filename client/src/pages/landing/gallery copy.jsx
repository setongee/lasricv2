import React, {useState, useEffect} from 'react';
import './gallery.scss'

const gallery_data = {

    opening_ceremony : {

        title : 'Lasric Benefits to the Awardees',
        description : 'This is an album that showcases the launching ceremony of the LASRIC initiative in Lagos State on 3rd November 2020.',
        uid : '485-2494835739-5385',

        content : [
            'http', 'http://', 'http://', 'http://', 'http://', 'http'
        ]

    },

    awardee_hangout : {

        title : 'Lasric Benefits to the Awardees',
        description : 'This is an album that showcases the launching ceremony of the LASRIC initiative in Lagos State on 3rd November 2020.',
        uid : '485-2494835739-7839',

        content : [
            'http', 'http://', 'http://', 'http://', 'http://', 'http'
        ]

    }
}

const Gallery = () => {


    const [gallery, setGallery] = useState([]);

    useEffect(() => {

       setGallery(gallery_data);
       console.log(gallery);

    }, [gallery]);


    return (

        <div className="gallery-body">

            <div className="galleryTitle"> <h1>Gallery.</h1> </div>

            <div className="gallery_area">

                <div className="gallery_album">

                    <div className="album_art">
                        <img src="https://h2g6j3q2.rocketcdn.me/wp-content/uploads/2020/08/LASRIC-Photo-1.jpg" alt="" />
                    </div>

                    <div className="album_description">

                        <div className="album_name">LASRIC Awardee Stories</div>

                        <div className="album_shorts">
                            The shared thoughts of some of the past ccohort awardees
                        </div>

                        <div className="album_link">
                            View Album <i className="fi fi-rr-angle-circle-right"></i>
                        </div>

                    </div>

                </div>

                <div className="gallery_album">

                    <div className="album_art">
                        <img src="https://images.pexels.com/photos/11262141/pexels-photo-11262141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </div>

                    <div className="album_description">

                        <div className="album_name">LASRIC Awards Night '22</div>

                        <div className="album_shorts">
                            This is a day where all the interview awardees come for photo ops.
                        </div>

                        <div className="album_link">
                            View Album <i className="fi fi-rr-angle-circle-right"></i>
                        </div>

                    </div>

                </div>

                <div className="gallery_album">

                    

                    <div className="album_description">

                        <div className="album_name">LASRIC Awards Night '22</div>

                        <div className="album_shorts">
                            This is a day where all the interview awardees come for photo ops.
                        </div>

                        <div className="album_link">
                            View Album <i className="fi fi-rr-angle-circle-right"></i>
                        </div>

                    </div>

                    <div className="album_art">
                        <img src="https://images.pexels.com/photos/11262141/pexels-photo-11262141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </div>

                </div>

                <div className="gallery_album">

                    

                    <div className="album_description">

                        <div className="album_name">LASRIC Awards Night '22</div>

                        <div className="album_shorts">
                            This is a day where all the interview awardees come for photo ops.
                        </div>

                        <div className="album_link">
                            View Album <i className="fi fi-rr-angle-circle-right"></i>
                        </div>

                    </div>

                    <div className="album_art">
                        <img src="https://images.pexels.com/photos/11262141/pexels-photo-11262141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </div>

                </div>

            </div>

            

        </div>

    );
}

export default Gallery;
