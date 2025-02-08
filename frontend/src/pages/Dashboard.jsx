import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Card from "../components/Card";
import HousingPick from "../components/HousingPick";
import Projects from "../components/Projects";
import Sell from "../components/Sell";
import Login from "./Login";
import { useState } from "react";
import useThreeData from "../hooks/useThreeData";
import useProject from "../hooks/useProject";
import { useRecoilValue } from "recoil";
import { projectsAtom } from "../atom/Atom";

export default function Dashboard() {
  const threeData = useThreeData()
 const projects = useRecoilValue(projectsAtom)
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      {/* <Search/> */}
      <div className="max-w-[1100px] mx-auto my-16 space-y-10">
        <div>
          <div>
            <h1 className="text-xl font-bold md:text-3xl">Housing's top picks</h1>
            <p className="text-gray-600 md:text-lg">Expolre top living options with us</p>
          </div>
        <HousingPick />
        </div>
       
        <div className="flex flex-col items-center gap-2 py-7">
          <h1 className="text-xl font-bold md:text-3xl" >Top highlighted projects</h1>
          <p className="text-lg text-gray-600">Noteworthy projects to watch</p>
        </div>
        <div className="flex flex-col justify-between gap-8 md:flex-row">
        {threeData.map((item)=> (  
          <div className='mx-auto transition-all duration-300 border-2 rounded-xl w-80 hover:shadow-xl hover:cursor-pointer' key={item._id}  >
          <Card image={item.image} id={item._id} title={item.title} location={item.location} city={item.city} sizes={item.sizes} price={item.price} configurations={item.configurations}  />
        </div>
         ))}
         </div>
        
        <div className="flex flex-col gap-2 py-7">
          <h1 className="text-xl font-bold md:text-3xls">High-demand projects to invest now</h1>
          <p className="text-lg text-gray-600">Leading projects in high demand</p>
          <div  className="flex flex-col items-center justify-between lg:flex-row">
            <Projects/>
            <Projects/>
            <Projects/>
          </div>
        </div>
        <h1 className="text-xl font-bold md:text-3xl">Have a property to sell?</h1>
        <Sell/>
      </div>
    </div>
  );
}
