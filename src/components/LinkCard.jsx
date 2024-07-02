/* eslint-disable react/prop-types */
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url = [], fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.target = "_blank";
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-5 border p-4  shadow-md shadow-orange-400 rounded-lg">
      <div className="flex justify-between">
        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
          <span className="text-3xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
        </Link>

        <div className="flex gap-2 text-orange-400 ">
          <Button variant="ghost" onClick={downloadImage}>
            <Download />
          </Button>
          <Button
            variant="ghost"
            onClick={() => fnDelete().then(() => fetchUrls())}
            disable={loadingDelete}
          >
            {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
          </Button>
        </div>
      </div>
      {/* qr */}
      <div
        className="text-center flex flex-col items-center
      gap-3"
      >
        <img
          src={url?.qr}
          className="h-40 object-contain rounded-md shadow-md shadow-orange-400 p-2 self-start mx-auto"
          alt="qr code"
        />
        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>

        <div className="bg-slate-600 px-2  rounded-md flex flex-row items-center justify-between">
          <span className=" text-white font-bold hover:underline cursor-pointer">
            https://localhost/
            {url?.custom_url ? url?.custom_url : url.short_url}
          </span>
          <Button
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://localhost/${url?.short_url}`
              )
            }
          >
            <Copy />
          </Button>
        </div>
        <div className="flex gap-2">
          <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
            <Button className="bg-orange-400 text-white hover:bg-blue-300">Dashbord</Button>
          </Link>
        </div>

        {/* date */}
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default LinkCard;
