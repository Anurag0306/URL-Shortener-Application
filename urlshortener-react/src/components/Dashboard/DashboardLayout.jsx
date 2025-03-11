import React,{useState} from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchTotalClicks } from "../../hooks/useQuery";
import Loader from "../Loader";
import ShortenPopUp from "./ShortenPopUp";

const DashboardLayout = () => {
  const refetch = false;
  const { token } = useStoreContext();
  const[shortenPopUp,setShortenPopUp] =useState(false);


  // Handle errors
  const onError = () => {
    console.error("Error fetching total clicks");
  };

  // Fetch analytics data

  // const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)
  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError);

  return (
    <div className="lg:px-16 sm:px-10 px-6 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      {loader ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="lg:w-[80%] w-full mx-auto py-12">
          {/* Analytics Graph Card */}
          <div className="relative bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200/40 rounded-2xl p-6">
            <h2 className="text-lg sm:text-2xl text-center text-gray-700 font-semibold mb-6">
              Engagement Overview
            </h2>

            <div className="h-96 relative">
              {/* No Data Message */}
              {(!totalClicks || totalClicks.length === 0) && (
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                  <h1 className="text-gray-800 font-serif text-2xl font-bold mb-2">
                    No Data For This Time Period
                  </h1>
                  <h3 className="sm:w-96 w-[90%] text-gray-600 text-lg leading-relaxed">
                    Share your short link to track your audience engagement.
                  </h3>
                </div>
              )}

              {/* Graph Component */}
              <Graph graphData={totalClicks} />
            </div>
          </div>

          {/* Call to Action */}
          <div className="py-6 flex justify-center">
            <button className="px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
             onClick={()=>setShortenPopUp(true)}
            >
            + Create New Short URL
            </button>
          </div>
        </div>
      )}
        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
    </div>
  );
};

export default DashboardLayout;
