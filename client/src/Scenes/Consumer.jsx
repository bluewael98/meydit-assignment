import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
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
    } catch (error) {
      console.error("Error creating job:", error.response.data);
    }
  };
  // Clothing Type categories
  const categories = ["Shirt", "Pants", "Dress", "Ethnic Wear", "Skirt"];
  const [clothing_type, setClothingType] = useState(categories[0]);
  const { onChange: onClothingTypeChange } = register("clothing_type", {
    required: true,
  });
  const handleChange = useCallback(
    (e) => {
      onClothingTypeChange(e);
      setClothingType(e.target.value);
    },
    [onClothingTypeChange]
  );

  return (
    <section className="flex flex-col justify-center items-center py-10">
      <form
        onSubmit={handleSubmit((data) => {
          console.log("handleSubmit called");
          onSubmit(data);
        })}
        className="flex flex-col w-2/3 gap-4"
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
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          {...register("image", { required: true })}
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
        <button type="submit">Submit job</button>
      </form>
    </section>
  );
};

export default Consumer;
