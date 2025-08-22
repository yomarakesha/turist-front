import { useEffect, useState } from 'react'

const useSearch = () => {
 const [search,setSearch]=useState([])
 const [loading,setLoading]=useState(false)
 
 useEffect(() => {
    setLoading(true)
      fetch('http://localhost:5000/api/search?q=${query}') // Flask API endpoint
        .then((response) => response.json())
        .then((data) => {setSearch(data) ;
            setLoading(false)
               })
        .catch((error) => {
          console.error('Error fetching data:', error);
       setLoading(false)
        });
    }, []);
 
    return {search, loading}
}

export default useSearch
