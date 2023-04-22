import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={'bars'} color={'white'} height={'10%'} width={'10%'} />
);
 
export default Loading;