import React from "react";

function ScatteredCards() {
  return (
    <div className=" h-[400px] p-20 md:p-10 w-full ">
      <div className="relative w-[60%] md:w-[40%] h-[100%]  bg-orange-500 rounded-xl left-0 right-0 top-10 bottom-0 mx-auto bg-[url('/bg.webp')] bg-contain bg-no-repeat bg-center">
        

      <div className="absolute w-[90%] h-[80%]  bg-orange-400 rounded-xl -left-40 right-0 top-7 bottom-0 mx-auto  -z-10"></div>
      <div className="absolute w-[90%] h-[80%]  bg-orange-300 rounded-xl left-0 -right-40 top-7 bottom-0 mx-auto -z-10 "></div>
      <div className="absolute w-[90%] h-[70%]  bg-orange-300 rounded-xl -left-64 right-0 top-10 bottom-0 mx-auto  -z-30"></div>
      <div className="absolute w-[90%] h-[70%]  bg-orange-400 rounded-xl left-0 -right-64 top-10 bottom-0 mx-auto -z-30 "></div>
      </div>
       </div>
  );
}

export default ScatteredCards;
