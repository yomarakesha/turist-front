import { useEffect, useState } from 'react'

const useContacts = () => {
 const [contacts,setContacts]=useState([])
 const [loading,setLoading]=useState(false)
 
 useEffect(() => {
    setLoading(true)
      fetch('http://127.0.0.1:5000/api/contact') // Flask API endpoint
        .then((response) => response.json())
        .then((data) => {setContacts(data) ;
            setLoading(false)
               })
        .catch((error) => {
          console.error('Error fetching data:', error);
       setLoading(false)
        });
    }, []);
 
    return {contacts,loading}
}

export default useContacts