import React from 'react'

const Preapp = ({type, setType, handleQuizSubmit}) => {
  return (
     <div className="applicationQuiz">
        <div className="modal">
            <div className="title">Pre-Application Step</div>
            <div className="formInput">
            <label>Is your application </label>
            <select type="text" value={type} onChange={e=>setType(e.target.value)} placeholder="Enter linkedin url">
                <option value="innovation">Commercial Tech enabled Product/MVP?</option>
                <option value="stem">Learning/Education/Training/Knowledge transfer?</option>
                <option value="research">A Study or Research?</option>
            </select>
            <div className="submitUrl" onClick = { () => handleQuizSubmit() }>Continue</div>
            </div>
        </div>
    </div>
  )
}

export default Preapp