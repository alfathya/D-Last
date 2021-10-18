import React, { useEffect, useState } from "react";
import NavBar from "../nav/nav";
import { useDispatch, useSelector } from "react-redux";
import getApi from "../../redux/action";
import HospitalImage from "../images/hospital.jpg";
import not_found from "../images/not_found.png"
import {ImSearch} from "react-icons"

function Hospital() {
  const [input, setInput] = useState("");
  const hospitals = useSelector((state) => state.hospital);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApi("hospital"));
  }, []);

  const filter = () => {
    return hospitals.filter((el) => {
      if (input === "") {
        // const dataDef = hospitals.slice(0,5)
        
        return el
      } else if (el.province.toLowerCase().includes(input.toLowerCase())) {
        return el;
      }
    });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      <NavBar />
      <div className="w-full h-full flex items-center flex-col">
        <div className="mt-10 bg-white border-2 border-gray-200 items-center justify-between w-2/3  flex rounded-full shadow-lg p-2 mb-5 sticky">
            <input 
            onChange={(e) => setInput(e.target.value)}
            className="font-bold rounded-full w-full py-4 pl-4 text-green-800 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari Berdasarkan Provisi Ya!"/>
        </div>


        <div className="w-5/6 h-4/6 flex flex-wrap mx-auto justify-center items-center gap-2">
          {filter().length ? (
            filter().map((el, key) => {
              return (
                  <div className="bg-white p-4 h-96 shadow-md border border-gray-200 rounded-lg max-w-xs m-5 flex flex-col items-center ">
                      <div className="w-full h-36 mb-5">
                        <img src={HospitalImage} alt="" className="object-center w-full h-fullrounded-xl " />
                      </div>
                      <div className="p-4 flex items-center flex-col">
                          <h5 className="text-gray-900 font-bold text-center text-md tracking-tight mb-2">{el.name}</h5>
                          <p className="font-normal text-sm text-gray-700 mb-3 text-center">{el.address}</p>
                          <p className="font-normal text-green-700 font-bold mb-3 p-2 text-center">  {el.phone}</p>
                      </div>
                  </div>
                  );
              })) : (
              <img className="mb-10 w-2/3 rounded-xl" src={not_found} alt="" />
          )}
        </div>
      </div>
    </>
    
  );
}
export default Hospital;
