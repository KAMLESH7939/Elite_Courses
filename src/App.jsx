import "./App.css";
import {apiUrl} from "./data";
import Navbar from "./Components/Navbar";
import Spinner from "./Components/Spinner";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import { toast } from "react-toastify";
import { useEffect,useState } from "react";
import  React  from "react";
import filterData from './data'

function App() {

  const [courses , setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

    async function fetchData(){
          setLoading(true); 
          try{
             let response = await fetch(apiUrl);
             let output = await response.json();

             setCourses(output.data);
          }
          catch(error){
            toast.error("network me koi dikkat hai ");
          }
          setLoading(false);
       }   

   useEffect( () => {
    fetchData();
   },[])



  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
       <Navbar />
         
       <Filter 
       filterData={filterData} 
       category={category} 
       setCategory={setCategory}
       />
         
         <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            loading ? (<Spinner />) : ( <Cards courses={courses} category={category}  /> )
          }
         </div>

    </div>
  );
}

export default App;
