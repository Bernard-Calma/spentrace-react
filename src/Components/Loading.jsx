import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = () => (
    <ReactLoading 
        className='loading'
        type={'bars'} 
        color={'white'} 
        height={'10%'} 
        width={'10%'} 
    />
);
 
export default Loading;