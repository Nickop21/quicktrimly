import React, { useEffect, useState } from "react";
import { BarLoader, HashLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/context/context";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  // urls fetching for particular user
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);


  // clicks fetching for particular users urls
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,urls?.map((url) => url.id)
  );
 

  useEffect(() => {
    fnUrls();
  }, []);
  
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);


  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex flex-col gap-8 px-2">
      {(loading || loadingClicks) && (
        <div className="absolute flex items-center justify-center w-full h-full">

          <HashLoader width={"100%"} color="#36d7b7"/>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 ">
        <Card className="bg-[#00000000] text-center shadow-sm shadow-white  " >
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length ? urls.length : 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#00000000] text-center shadow-sm shadow-white border-none">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length ? clicks.length : 0}</p>
          </CardContent>
        </Card>
      </div>


     <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
        className=" bg-[#00000000] placeholder:text-orange-400"
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      <div className="flex flex-col md:flex-row gap-4">

      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
      </div>
    </div>
  );
};

export default Dashboard;
