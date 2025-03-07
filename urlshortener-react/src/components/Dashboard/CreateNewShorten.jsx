import React from 'react'

const CreateNewShorten = ({setOpen,refetch}) => {
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
}

        

  return (
    <div className=" flex justify-center items-center bg-white rounded-md">
        <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
                Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        </form>
    </div>
  )}
}

export default CreateNewShorten