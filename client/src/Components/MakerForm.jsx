import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const MakerForm = ({ consumerData, jobId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submissionCount, setSubmissionCount] = useState(0);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "https://backend.waelmarketplace.com/api/v1/makers/",
        formData
      );
      console.log("Maker Created", response.data);
      setSubmissionCount(submissionCount + 1);

      // send confirmation emails;
      await axios.post(
        "https://backend.waelmarketplace.com/api/v1/send-email",
        {
          ...formData,
          consumer: consumerData,
        }
      );

      // Update submission count for the job
      await axios.put(
        `https://backend.waelmarketplace.com/api/v1/jobs/${jobId}`,
        {
          submissions: submissionCount + 1,
        }
      );

      setSubmissionCount(submissionCount + 1);
      handleDialogOpen();
    } catch (error) {
      console.error("Error creating maker:", error.response.data);
    }
  };

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  return (
    <section className="flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4"
      >
        {/* Name */}
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          {...register("name", { required: true })}
          error={Boolean(errors.name)}
          helperText={errors.name && "Name is required."}
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          {...register("email", { required: true })}
          error={Boolean(errors.email)}
          helperText={errors.email && "Email is required."}
        />

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          name="phone_number"
          variant="outlined"
          fullWidth
          {...register("phone_number", { required: true })}
          error={Boolean(errors.phone_number)}
          helperText={errors.phone_number && "Phone number is required."}
        />

        {/* Price */}
        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          {...register("price", { required: true })}
          error={Boolean(errors.price)}
          helperText={errors.price && "Price is required."}
        />

        {/* Comments */}
        <TextField
          label="Comments"
          name="comments"
          variant="outlined"
          fullWidth
          minRows="4"
          multiline="true"
          inputProps={{ maxLength: 1000 }}
          {...register("comments", { required: true })}
          error={Boolean(errors.comments)}
          helperText={errors.comments && "Comments are required."}
        />

        {/* Submit */}
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "#8460C2",
            "&:hover": {
              opacity: 0.8,
              bgcolor: "#8460C2",
              transition: "0.3s",
            },
          }}
        >
          Submit quote
        </Button>
      </form>
      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Job Successfully Submitted</DialogTitle>
        <DialogContent>
          Your quote has been submitted successfully.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default MakerForm;
