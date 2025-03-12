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

    // Toggle analytics and fetch data when enabled
    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    };

    // Fetch analytics data for the selected short URL
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
        } catch (error) {
            navigate('/error');
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    // Fetch data when a URL is selected
    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    return (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-lg border border-dotted border-slate-400 px-6 sm:py-3 py-4 rounded-md transition-all duration-100">
            <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">
                {/* URL Information Section */}
                <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
                    <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
                        <Link
                            target="_blank"
                            className="text-[17px] font-montserrat font-[600] text-blue-700 hover:underline"
                            to={import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}
                        >
                            {subDomain + "/s/" + `${shortUrl}`}
                        </Link>
                        <FaExternalLinkAlt className="text-blue-600" />
                    </div>

                    <div className="flex items-center gap-1">
                        <h3 className="text-slate-700 font-[400] text-[17px]">{originalUrl}</h3>
                    </div>

                    {/* Click and Date Section */}
                    <div className="flex items-center gap-8 pt-6">
                        <div className="flex gap-1 items-center font-semibold text-green-800">
                            <MdOutlineAdsClick className="text-[22px] me-1" />
                            <span className="text-[16px]">{clickCount}</span>
                            <span className="text-[15px]">{clickCount === 1 ? 'Click' : 'Clicks'}</span>
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
                            <FaRegCalendarAlt />
                            <span className="text-[17px]">{dayjs(createdDate).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-1 sm:justify-end items-center gap-4">
                    {/* Copy Button */}
                    <CopyToClipboard
                        onCopy={() => setIsCopied(true)}
                        text={`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`}
                    >
                        <div
                            className="flex cursor-pointer gap-1 items-center bg-gradient-to-r from-blue-500 to-blue-400 py-2 px-6 font-semibold shadow-md rounded-md text-white transition-all duration-200 hover:opacity-90"
                            style={{ cursor: 'pointer' }}
                        >
                            <button>{isCopied ? 'Copied' : 'Copy'}</button>
                            {isCopied ? <LiaCheckSolid className="text-md" /> : <IoCopy className="text-md" />}
                        </div>
                    </CopyToClipboard>

                    {/* Analytics Button */}
                    <div
                        onClick={() => analyticsHandler(shortUrl)}
                        className="flex cursor-pointer gap-1 items-center bg-gradient-to-r from-red-500 to-red-400 py-2 px-6 font-semibold shadow-md rounded-md text-white transition-all duration-200 hover:opacity-90"
                        style={{ cursor: 'pointer' }}
                    >
                        <button>Analytics</button>
                        <MdAnalytics className="text-md" />
                    </div>
                </div>
            </div>

            {/* Analytics Graph Section */}
            <div
                className={`${
                    analyticToggle ? 'flex' : 'hidden'
                } w-full mt-5 min-h-[400px] relative border-t-2 overflow-hidden bg-white p-4 shadow-lg rounded-md`}
            >
                {loader ? (
                    <div className="flex justify-center items-center w-full min-h-[350px]">
                        <div className="flex flex-col items-center gap-1">
                            <Hourglass
                                visible={true}
                                height="50"
                                width="50"
                                ariaLabel="hourglass-loading"
                                colors={['#306cce', '#72a1ed']}
                            />
                            <p className="text-slate-700">Please Wait...</p>
                        </div>
                    </div>
                ) : analyticsData.length === 0 ? (
                    <div className="flex flex-col justify-center items-center w-full text-center">
                        <h1 className="text-slate-800 font-serif text-2xl font-bold mb-1">
                            No Data For This Time Period
                        </h1>
                        <h3 className="sm:w-96 w-[90%] text-lg text-slate-600">
                            Share your short link to view where your engagements are coming from
                        </h3>
                    </div>
                ) : (
                    <Graph graphData={analyticsData} />
                )}
            </div>
        </div>
    );
};

export default ShortenItem;
