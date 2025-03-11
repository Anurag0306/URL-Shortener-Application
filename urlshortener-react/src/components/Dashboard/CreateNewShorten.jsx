import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${
        import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`
      }`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Create ShortURL Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-6 bg-black/20 backdrop-blur-lg transition-all">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="relative bg-white border border-gray-200 shadow-xl rounded-xl p-8 w-[90%] sm:w-[450px] transition-all"
        style={{
          boxShadow: "0 12px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Close Button */}
        <Tooltip title="Close">
          <button
            disabled={loading}
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 transition-all"
          >
            <RxCross2 className="text-3xl" />
          </button>
        </Tooltip>

        {/* Title (NO BORDER) */}
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Create Short URL
        </h1>

        {/* Input Field (WITH BORDER) */}
        <div className="relative">
          <input
            type="url"
            id="originalUrl"
            placeholder="Enter URL"
            {...register("originalUrl", { required: "URL is required" })}
            className="w-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-400 text-lg border border-gray-300 rounded-lg transition-all"
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.07)",
            }}
          />
          {errors.originalUrl && (
            <p className="text-red-500 text-sm mt-2">{errors.originalUrl.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 rounded-lg text-lg font-medium text-white transition-all"
          type="submit"
          style={{
            background: "linear-gradient(90deg, #FF7600, #FF4DA6, #467BFF)",
            boxShadow: "0 8px 20px rgba(255, 140, 0, 0.2)",
          }}
        >
          {loading ? "Processing..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewShorten;
