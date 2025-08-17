import { useEffect, useState } from 'react'

const useExcursions = () => {
 const [excursions,setExcursions]=useState([])
 const [loading,setLoading]=useState(false)
 
 useEffect(() => {
    setLoading(true)
      fetch('http://127.0.0.1:5000/api/excursions') // Flask API endpoint
        .then((response) => response.json())
        .then((data) => {setExcursions(data) ;
            setLoading(false)
               })
        .catch((error) => {
          console.error('Error fetching data:', error);
       setLoading(false)
        });
    }, []);
 
    return {excursions,loading}
}

export default useExcursions
