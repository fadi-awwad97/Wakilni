import React from 'react';
import { RingLoader } from 'react-spinners';


function Loading() {
  return (
    <div style={{display:'flex', flexDirection:'column',alignItems:'center'}} className="loading-container">
      <RingLoader css={`display:flex;margin:0 auto;`} size={80} color={'#123abc'} loading={true} />
      <h2>Loading...</h2>
    </div>
  );
}

export default Loading;