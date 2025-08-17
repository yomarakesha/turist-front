import { useEffect, useState } from 'react'

const useAttraction = () => {
 const [attraction,setAttraction]=useState([])
 const [loading,setLoading]=useState(false)
 
 useEffect(() => {
    setLoading(true)
      fetch('http://127.0.0.1:5000/api/attractions') // Flask API endpoint
        .then((response) => response.json())
        .then((data) => {setAttraction(data) ;
            setLoading(false)
               })
        .catch((error) => {
          console.error('Error fetching data:', error);
       setLoading(false)
        });
    }, []);
 
    return {attraction ,loading}
}

export default useAttraction
