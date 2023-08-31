import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
function Spinner({path='login'}) {
 
    const [count ,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
    const interval = setInterval(()=>{
        setCount((prevValue)=> --prevValue);
    },1000)
    count === 0 && navigate(`/${path}`,{
        state:location.pathname,
        
    })
    return ()=>clearInterval(interval)
    },[count,navigate,location,path]);
  return (
    <div>
      <div className="d-flex flex-colomn justify-content-center align-items-center" 
      style={{height:"100vh"}}>
        <h1 className="text-center">redirecting to you in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
