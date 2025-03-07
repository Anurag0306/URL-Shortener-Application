import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <div className=" flex justify-center items-center h-full w-full">
            <CreateNewShorten setOpen={setOpen} refetch={refetch} />

        </div>
      {/* <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" className="font-bold text-gray-800">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-gray-600">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box> */}
    </Modal>
  );
};

export default ShortenPopUp;
