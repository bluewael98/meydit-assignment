import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField } from "@mui/material";

const MakerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/api/v1/makers/",
        data
      );
      console.log("Maker Created", response.data);
    } catch (error) {
      console.error("Error creating maker:", error.response.data);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 gap-4"
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
          {...register("comments", { required: true })}
          error={Boolean(errors.comments)}
          helperText={errors.comments && "Comments are required."}
        />

        {/* Submit */}
        <button type="submit">Submit maker</button>
      </form>
    </section>
  );
};

export default MakerForm;
