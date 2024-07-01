import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScatteredCards from "@/components/ScatteredCards";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>

      <ScatteredCards />
      <div className="w-full">

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 mt-10 mx-auto"
      >
        <Input
          type="url"
          placeholder="Enter your loooong URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4 bg-inherit border-orange-300 text-orange-400 placeholder:text-orange-400"
        />
        <Button type="submit" className="h-full bg-orange-400" variant="destructive">
          Shorten!
        </Button>
      </form>
      </div>
      
    
    
      <h4 className=" mt-20 text-4xl text-white text-center font-extrabold">
        How does the <span className="text-orange-400">Quicktrimly</span> URL
        shortener works?
      </h4>

      <div className="mt-20 flex flex-col md:flex-row justify-between gap-10">
        {/* card 1 */}
        <div className="bg-[#deeff5d2] p-10 rounded-lg md:w-[45%]">
          <h4 className=" text-2xl text-[#475877] text-center font-extrabold">
            How does the <span className="text-[#0a52b1]">Quicktrimly</span> URL
            shortener works?
          </h4>

          <p className="text-[#506285] text-center font-bold mt-5">
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </p>
          <img src="/url.png" alt="" className="h-40 mx-auto" />
        </div>
        {/* card 2 */}
        <div className="bg-[#e6e6fac7] p-10 rounded-lg md:w-[45%]">
          <h4 className=" text-2xl text-[#20203ae3] text-center font-extrabold">
            Do I need an account to use the app?
          </h4>

          <p className="text-[#20203ac0]  text-center font-semibold mt-5 ">
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </p>
          <img src="/signupbg.webp" alt="" className="h-40 mx-auto" />
        </div>
      </div>
      {/* card 3 */}
      <div className="mt-10 bg-orange-300 p-10 rounded-lg flex flex-col md:flex-row w-full">
        <div className="md:w-[60%] ">
          <h4 className=" text-3xl text-orange-100 text-center font-extrabold">
            What analytics are available for my shortened URLs?
          </h4>

          <p className="text-[#5a3d12] font-semibold mt-10">
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </p>
        </div>
        <img src="/statsbg.png" alt="" className="h-40 md:h-60 object-contain" />
      </div>
    </div>
  );
};

export default Landing;
