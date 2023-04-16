import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

const Consumer = () => {
  // Form validation & data handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convert the data to FormData
      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:3333/api/v1/jobs/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Job Created", response.data);
      handleDialogOpen();
    } catch (error) {
      console.error("Error creating job:", error.response.data);
    }
  };
  // Clothing Type categories
  const categories = ["Shirt", "Pants", "Dress", "Ethnic Wear", "Skirt"];
  const [clothing_type, setClothingType] = useState("");
  const { onChange: onClothingTypeChange } = register("clothing_type", {
    required: true,
  });
  const handleChange = (event) => {
    const newClothingType = event.target.value;
    setClothingType(newClothingType);
    onClothingTypeChange({
      target: {
        name: "clothing_type",
        value: newClothingType,
      },
    });
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
    <section className="flex flex-col justify-center items-center py-10 px-4 mt-[50px]">
      <div className=" flex justify-center items-center py-10 text-4xl font-Roboto text-primary">
        <h1>CONSUMERS</h1>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          console.log("handleSubmit called");
          onSubmit(data);
        })}
        className="flex flex-col w-full max-w-[600px] gap-4"
      >
        {/* First Name */}
        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          {...register("firstName", { required: true })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName && "First name is required."}
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          {...register("lastName", { required: true })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName && "Last name is required."}
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

        {/* Address */}
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          fullWidth
          {...register("address", { required: true })}
          error={Boolean(errors.address)}
          helperText={errors.address && "Address is required."}
        />

        {/* Post Code */}
        <TextField
          label="Post Code"
          name="postcode"
          variant="outlined"
          fullWidth
          {...register("postcode", { required: true })}
          error={Boolean(errors.postcode)}
          helperText={errors.postcode && "Post code is required."}
        />

        {/* State */}
        <TextField
          label="State"
          name="state"
          variant="outlined"
          fullWidth
          {...register("state", { required: true })}
          error={Boolean(errors.state)}
          helperText={errors.state && "State is required."}
        />

        {/* Clothing Type */}
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel id="clothing-type-label">Clothing Type</InputLabel>
          <Select
            labelId="clothing-type-label"
            id="clothing-type-select"
            value={clothing_type}
            label="Clothing Type"
            onChange={handleChange}
            displayEmpty
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
            {errors.clothing_type && (
              <FormHelperText error>Clothing type is required.</FormHelperText>
            )}
          </Select>
          <input
            type="hidden"
            {...register("clothing_type", { required: true })}
            value={clothing_type}
          />
        </FormControl>

        {/* Image */}
        <label htmlFor="image" className="font-Roboto w-16px text-[#695C64]">
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          {...register("image", { required: true })}
          className=" cursor-pointer font-Roboto w-16px text-[#695C64]"
        />
        {errors.image && <p>Image is required.</p>}

        {/* Description */}
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          {...register("description", { required: true })}
          error={Boolean(errors.description)}
          helperText={errors.description && "Description is required."}
        />

        {/* Budget */}
        <TextField
          label="Budget"
          name="budget"
          variant="outlined"
          fullWidth
          {...register("budget", { required: true })}
          error={Boolean(errors.budget)}
          helperText={errors.budget && "Budget is required."}
        />

        {/* Submit */}
        <div className="flex justify-end">
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
            Submit job
          </Button>
        </div>
      </form>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Job Successfully Submitted</DialogTitle>
        <DialogContent>Your job has been submitted successfully.</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Consumer;
