import React,{useState, useEffect} from 'react';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, draftToHtml } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


const EditorLasric = ({release}) => {

    const [editorState, setEditorState] = useState( EditorState.createEmpty() );

    const onEditorStateChange = (editorState) => {

        setEditorState( editorState )

    }

    const data = convertToRaw( editorState.getCurrentContent() )
    
    release(data)

    return(
        
        <div className="editorDraft">

            <Editor

                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbar= {

                    { options : [ 'inline', 'list'] }

                }

            />

        </div>
    )

}

export default EditorLasric