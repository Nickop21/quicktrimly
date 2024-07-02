import DeviceStats from "@/components/DeviceStats";
import Location from "@/components/LocationStats";
import TimmingStats from "@/components/TimmingStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDeleteClick = () => {
    fnDelete().then(() => {
      setIsDialogOpen(false); // Close the dialog
      navigate("/dashboard"); // Navigate to the dashboard
    });
  };
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-4 sm:flex-row justify-between p-2">
        <div className="flex flex-col  gap-4 rounded-lg sm:w-1/2">
          <div className="flex justify-between">
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
              <span className="text-3xl font-extrabold hover:underline cursor-pointer bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                {url?.title}
              </span>
            </Link>

            <div className="flex gap-1 text-orange-300 ">
              <Button
                variant="ghost"
                onClick={() =>
                  navigator.clipboard.writeText(`https://localhost/${link}`)
                }
              >
                <Copy />
              </Button>
              <Button variant="ghost" onClick={downloadImage}>
                <Download />
              </Button>

              <Dialog className="bg-black" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" disable={loadingDelete}>
                {loadingDelete ? (
                  <BeatLoader size={5} color="white" />
                ) : (
                  <Trash />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-black shadow-sm shadow-white">
              <DialogHeader>
                <DialogTitle className="font-bold text-2xl">Delete</DialogTitle>
              </DialogHeader>
              <p>Are you sure?</p>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


              {/* <Button
                variant="ghost"
                onClick={() =>
                  fnDelete().then(() => {
                    navigate("/dashboard");
                  })
                }
                disable={loadingDelete}
              >
                {loadingDelete ? (
                  <BeatLoader size={5} color="white" />
                ) : (
                  <Trash />
                )}
              </Button> */}
            </div>
          </div>

          <div className="flex flex-col items-center  md:items-start  gap-6 ">
            <a
              href={`/${link}`}
              target="_blank"
              className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer"
            >
              https://localhost/{link}
            </a>
            <div className="flex gap-6 flex-col sm:flex-row items-center">
              <img
                src={url?.qr}
                className="h-60 p-5  shadow-md shadow-orange-300 object-contain mx-auto md:mx-0"
                alt="qr code"
              />
              <Card className="text-center h-28  shadow-md shadow-orange-300">
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>
            </div>

            <a
              href={url?.original_url}
              target="_blank"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <LinkIcon className="p-1" />
              {url?.original_url}
            </a>
            <span className="flex items-end font-extralight text-sm">
              {new Date(url?.created_at).toLocaleString()}
            </span>
            {stats && stats.length ? (
            <div className="shadow-md shadow-white p-2 rounded-lg w-full">
              <CardTitle className="ml-5 mb-3 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Time Info</CardTitle>
              <TimmingStats stats={stats} />
            </div>
              ):(<></>)}
          </div>
        </div>

        <Card className="sm:w-1/2 bg-transparent border-none">
          <h1 className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pl-5 mb-5">
            Stats
          </h1>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-12 ">
              <div className="shadow-md shadow-white p-2 rounded-lg">
                <CardTitle className="mb-5 text ml-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Location Data</CardTitle>
                <Location stats={stats} />
              </div>
              <div className="shadow-md shadow-white p-2 rounded-lg">
                <CardTitle className="ml-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Devices Data </CardTitle>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
