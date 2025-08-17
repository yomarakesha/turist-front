import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/Home";
import "./App.css"
import Hotels from "./component/Hotels";
import Excursion from "./component/Excursion";
import Contact from "./component/Contact";
import "./component/NavBar"
import Attraction from "./component/Attraction";
// import SearchBar from "./component/SearchBar";
import HotelInfo from "./component/HotelInfo";



function App() {

  return (
     <BrowserRouter>

      {/* <NavBar element={<NavBar />} language={language} changeLanguage={changeLanguage}  /> */}
       <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/hotels" element={<Hotels />}  />
         <Route path="/excursion" element={<Excursion />}/>
         <Route path="/hotels/:id" element={<HotelInfo />} />
         <Route path="/attraction" element={<Attraction />}/>
         <Route path="/contact" element={<Contact />}/>
       </Routes>
     </BrowserRouter>
  );
}

export default App
