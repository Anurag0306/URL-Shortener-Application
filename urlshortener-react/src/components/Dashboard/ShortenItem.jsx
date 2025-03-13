import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(/^https?:\/\//, '');

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl('');
      console.log(data);
    } catch (error) {
      navigate('/error');
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg border border-gray-200 px-6 py-5 rounded-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* URL and Click Details */}
        <div className="flex-1 space-y-3">
          {/* Shortened URL */}
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              className="text-lg font-semibold text-blue-700 hover:text-blue-500 transition-all"
              to={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
            >
              {subDomain + '/' + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-blue-700 text-sm" />
          </div>

          {/* Original URL */}
          <p className="text-gray-600 text-sm truncate">{originalUrl}</p>

          {/* Clicks and Date */}
          <div className="flex items-center gap-6 pt-3">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <MdOutlineAdsClick className="text-xl" />
              <span className="text-lg">{clickCount}</span>
              <span className="text-sm">{clickCount === 1 ? 'Click' : 'Clicks'}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-800 font-medium">
              <FaRegCalendarAlt />
              <span className="text-lg">{dayjs(createdDate).format('MMM DD, YYYY')}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Copy Button */}
          <CopyToClipboard onCopy={() => setIsCopied(true)} text={`${import.meta.env.VITE_REACT_SUBDOMAIN}${shortUrl}`}>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              {isCopied ? 'Copied' : 'Copy'}
              {isCopied ? <LiaCheckSolid className="text-md" /> : <IoCopy className="text-md" />}
            </button>
          </CopyToClipboard>

          {/* Analytics Button */}
          <button
            onClick={() => analyticsHandler(shortUrl)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Analytics
            <MdAnalytics className="text-md" />
          </button>
        </div>
      </div>

      {/* Analytics Graph */}
      {analyticToggle && (
        <div className="border-t mt-6 pt-4">
          {loader ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Hourglass visible={true} height="50" width="50" ariaLabel="hourglass-loading" colors={['#306cce', '#72a1ed']} />
              <p className="text-gray-700 mt-2">Fetching data...</p>
            </div>
          ) : analyticsData.length === 0 ? (
            <div className="flex flex-col items-center py-6">
              <h1 className="text-xl font-bold text-gray-800">No Data Available</h1>
              <p className="text-gray-600 text-sm text-center max-w-sm">
                Share your short link to track engagement.
              </p>
            </div>
          ) : (
            <Graph graphData={analyticsData} />
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenItem;
