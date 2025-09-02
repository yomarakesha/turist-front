import { useEffect, useState } from 'react'

const useBanner = () => {
 const [banner,setBanner]=useState([])
 const [loading,setLoading]=useState(false)
 
 useEffect(() => {
    setLoading(true)
      fetch('https://turist.onrender.com/api/banners') // Flask API endpoint
        .then((response) => response.json())
        .then((data) => {setBanner(data) ;
            setLoading(false)
               })
        .catch((error) => {
          console.error('Error fetching data:', error);
       setLoading(false)
        });
    }, []);
 
    return {banner ,loading}
}

export default useBanner
