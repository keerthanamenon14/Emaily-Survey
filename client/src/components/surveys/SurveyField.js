//survey field contains logic to render a single label & text input
import React from 'react';

export default ({input, label, meta:{error, touched}}) => {
    console.log(error, touched)
    return(
        <div>
           <label> {label} </label>
           <input {...input} style={{marginBottom: '5px'}}/>
           <div className='red-text'>
                {touched && error}
           </div>
        </div>
    )
}