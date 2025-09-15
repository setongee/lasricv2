import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = ({navigator}) => {

    const Navigate = useNavigate()

    useEffect(() => {

        Navigate(navigator)
        
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default Redirect;
