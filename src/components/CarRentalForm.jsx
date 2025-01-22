"use client";
import {
  bagsFit,
  carBrand,
  carCities,
  carColors,
  carFeatures,
  carModels,
  carTypes,
  carYears,
  doors,
  fuelTypes,
  seatingCapacities,
  specs,
  transmissions,
} from "@/utils/data";
import Image from "next/image";
import React, { useState } from "react";
import CommonSelect from "./CommonSelect";
import { validateCarData } from "@/utils/helper";

const CarRentalForm = () => {
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    category: "",
    city: "",
    year: "",
    carImages: [], // For storing all uploaded images
    thumbnail: null, // For storing the thumbnail image
    mulkiyaImages: {
      front: null,
      back: null,
    }, // For storing mulkiya images
    selectedFeatures: [], // For storing selected car features
    color: null,
    bagsFit: null,
    transmission: null,
    doors: null,
    seatingCapacity: null,
    spec: null,
    fuelType: null,
    pricing: {
      perDay: { price1: "", price2: "" },
      perWeek: { price1: "", price2: "" },
      perMonth: { price1: "", price2: "" },
    },
    isAvailableForDaily: false,
    rentalTerms: {
      securityDeposit: "",
      deliveryPickUpCharges: "",
      specialNote: "",
      expiryDate: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (field, value) => {
    const updatedValue =
      field === "isAvailableForDaily" ? value.target.checked : value;

    setCarData((prev) => {
      const updatedCarData = { ...prev, [field]: updatedValue };

      const validationErrors = validateCarData(updatedCarData);

      setErrors(validationErrors);

      return updatedCarData;
    });
  };

  const toggleFeature = (feature) => {
    setCarData((prev) => {
      const isSelected = prev.selectedFeatures.includes(feature);
      const updatedCarData = {
        ...prev,
        selectedFeatures: isSelected
          ? prev.selectedFeatures.filter((item) => item !== feature) // Remove if already selected
          : [...prev.selectedFeatures, feature], // Add if not selected
      };

      const validationErrors = validateCarData(updatedCarData);
      setErrors(validationErrors); // Update errors? instantly when field changes

      return updatedCarData;
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setCarData((prev) => {
      if (files.length + prev.carImages.length > 20) {
        alert("You can upload a maximum of 20 images.");
        return prev; // No update if limit exceeded
      }

      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file), // Create a temporary URL for preview
        name: file.name,
      }));

      const updatedCarData = {
        ...prev,
        carImages: [...prev.carImages, ...newImages],
      };

      const validationErrors = validateCarData(updatedCarData);
      setErrors(validationErrors); // Update errors? instantly

      return updatedCarData;
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the image
      setCarData((prev) => {
        const updatedCarData = {
          ...prev,
          thumbnail: imageUrl, // Update the thumbnail in state
        };

        const validationErrors = validateCarData(updatedCarData);
        setErrors(validationErrors); // Update errors? instantly

        return updatedCarData;
      });
    }
  };

  const handleMulkiyaUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCarData((prev) => {
        const updatedCarData = {
          ...prev,
          mulkiyaImages: {
            ...prev.mulkiyaImages,
            [side]: imageUrl, // Update the specific side (front or back)
          },
        };

        const validationErrors = validateCarData(updatedCarData);
        setErrors(validationErrors); // Update errors? instantly

        return updatedCarData;
      });
    }
  };

  const handleSelection = (category, value) => {
    setCarData((prev) => {
      const updatedCarData = {
        ...prev,
        [category]: prev[category] === value ? null : value, // Toggle selection or deselect if already selected
      };

      const validationErrors = validateCarData(updatedCarData);
      setErrors(validationErrors);

      return updatedCarData;
    });
  };

  const handlePriceChange = (e, priceType, priceIndex) => {
    const { value } = e.target;
    setCarData((prevData) => {
      const updatedCarData = {
        ...prevData,
        pricing: {
          ...prevData.pricing,
          [priceType]: {
            ...prevData.pricing[priceType],
            [`price${priceIndex}`]: value,
          },
        },
      };

      const validationErrors = validateCarData(updatedCarData);
      setErrors(validationErrors);

      return updatedCarData;
    });
  };

  const handleNestedChange = (section, field, value) => {
    setCarData((prev) => {
      const updatedCarData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };

      const validationErrors = validateCarData(updatedCarData);
      setErrors(validationErrors); // Update errors? instantly

      return updatedCarData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validateCarData(carData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Form submitted successfully!", carData);
    setCarData({
      brand: "",
      model: "",
      category: "",
      city: "",
      year: "",
      carImages: [],
      thumbnail: "",
      mulkiyaImages: { front: "", back: "" },
      selectedFeatures: [],
      color: "",
      bagsFit: "",
      transmission: "",
      doors: "",
      seatingCapacity: "",
      spec: "",
      fuelType: "",
      rentalTerms: {
        securityDeposit: "",
        deliveryPickUpCharges: "",
        specialNote: "",
        expiryDate: "",
      },
    });
    setFormSubmitted(false);
  };

  const removeImage = (index) => {
    setCarData((prev) => ({
      ...prev,
      carImages: prev.carImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      className="container mx-auto flex flex-col gap-6 p-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-4">Car Rental Form</h1>

      <div className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">Select Car</h2>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">
              Car Brand / Model
            </label>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full ">
              <CommonSelect
                name="brand"
                label="Brand"
                data={carBrand}
                errors={formSubmitted && errors}
                handleChange={handleChange}
              />

              <CommonSelect
                name="model"
                label="Model"
                data={carModels}
                errors={formSubmitted && errors}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">Category</label>

            <CommonSelect
              name="category"
              label="Category"
              data={carTypes}
              errors={formSubmitted && errors}
              handleChange={handleChange}
            />
          </div>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">City</label>

            <CommonSelect
              name="city"
              label="City"
              data={carCities}
              errors={formSubmitted && errors}
              handleChange={handleChange}
            />
          </div>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">Make (Year)</label>

            <CommonSelect
              name="year"
              label="Year"
              data={carYears}
              errors={formSubmitted && errors}
              handleChange={handleChange}
            />
          </div>
        </div>

        {/*Pricing */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">
              Price Per Day
              <br className="md:block hidden" />
              <span className="font-medium">(optional)</span>
            </label>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-2/3">
              <input
                type="number"
                value={carData?.pricing?.perDay?.price1 || ""}
                onChange={(e) => handlePriceChange(e, "perDay", 1)}
                className="border border-gray-300 rounded w-full p-2"
              />
              <input
                type="number"
                value={carData?.pricing?.perDay?.price2 || ""}
                onChange={(e) => handlePriceChange(e, "perDay", 2)}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
          </div>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className=" font-semibold w-full md:w-1/3">
              Price Per Week
              <br className="md:block hidden" />
              <span className="font-medium">(optional)</span>
            </label>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-2/3">
              <input
                type="number"
                value={carData?.pricing?.perWeek?.price1 || ""}
                onChange={(e) => handlePriceChange(e, "perWeek", 1)}
                className="border border-gray-300 rounded w-full p-2"
              />
              <input
                type="number"
                value={carData?.pricing?.perWeek?.price2 || ""}
                onChange={(e) => handlePriceChange(e, "perWeek", 2)}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={carData?.isAvailableForDaily || false}
                onChange={(e) => handleChange("isAvailableForDaily", e)}
              />
              <span>Available for daily</span>
            </div>
          </div>

          <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
            <label className="font-semibold w-full md:w-1/3">
              Price Per Month
              <br className="md:block hidden" />
              <span className="font-medium">(optional)</span>
            </label>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-2/3">
              <input
                type="number"
                value={carData?.pricing?.perMonth?.price1 || ""}
                onChange={(e) => handlePriceChange(e, "perMonth", 1)}
                className="border border-gray-300 rounded w-full p-2"
              />
              <input
                type="number"
                value={carData?.pricing?.perMonth?.price2 || ""}
                onChange={(e) => handlePriceChange(e, "perMonth", 2)}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/*Car Specs */}
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl mb-4">Car specs</h2>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Car Colors:</h3>
          <div className="flex flex-wrap gap-3">
            {carColors.map((color, index) => (
              <div
                key={index}
                onClick={() => handleSelection("color", color)}
                className={`py-2 px-4 border rounded cursor-pointer ${
                  carData.color === color ? "bg-black text-white" : ""
                }`}
              >
                {color}
              </div>
            ))}
          </div>
          {formSubmitted && errors?.color && (
            <p className="text-md text-red-500">{errors?.color}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Car Features:</h3>
          <div className="flex flex-wrap gap-3">
            {carFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => toggleFeature(feature)}
                className="p-1"
              >
                <span
                  className={`py-2 px-4 border rounded cursor-pointer ${
                    carData?.selectedFeatures.includes(feature)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
          {formSubmitted && errors?.selectedFeatures && (
            <p className="text-md text-red-500">{errors?.selectedFeatures}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-1 flex-col gap-3">
            {/* Doors */}

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold ">Doors:</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {doors.map((door, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelection("doors", door)}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                      carData.doors === door ? "bg-black text-white" : ""
                    }`}
                  >
                    {door}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.doors && (
                <p className="text-md text-red-500">{errors?.doors}</p>
              )}
            </div>

            {/* Bagsfit */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold ">Bags fit:</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {bagsFit.map((bag, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelection("bagsFit", bag)}
                    className={`px-4 py-2 border rounded-md cursor-pointer ${
                      carData.bagsFit === bag ? "bg-black text-white" : ""
                    }`}
                  >
                    {bag}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.bagsFit && (
                <p className="text-md text-red-500">{errors?.bagsFit}</p>
              )}
            </div>

            {/* Transmission */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Transmission:</h3>
              <div className="flex items-center gap-2 flex-wrap ">
                {transmissions.map((transmission, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      handleSelection("transmission", transmission)
                    }
                    className={`px-4 py-2 border rounded-md cursor-pointer ${
                      carData.transmission === transmission
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {transmission}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.transmission && (
                <p className="text-md text-red-500">{errors?.transmission}</p>
              )}
            </div>

            {/* Thumbnail Image */}
            <div>
              <h3 className="text-lg font-semibold">Thumbnail image:</h3>
              <input
                type="file"
                accept="image/*" // Allow only images
                onChange={handleThumbnailUpload}
                className="border border-gray-300 rounded w-full p-2 mb-4"
              />
              {formSubmitted && errors?.thumbnail && (
                <p className="text-md text-red-500">{errors?.thumbnail}</p>
              )}
              {/* Display the uploaded thumbnail */}
              {carData?.thumbnail && (
                <div className="mt-4  ">
                  <Image
                    src={carData?.thumbnail}
                    alt="Thumbnail"
                    width={150}
                    height={150}
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {/* Seating Capacties */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold ">Seating Capacity:</h3>
              <div className="flex items-center gap-2 flex-wrap ">
                {seatingCapacities.map((capacity, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelection("seatingCapacity", capacity)}
                    className={`px-4 py-2 border rounded-md cursor-pointer ${
                      carData.seatingCapacity === capacity
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {capacity}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.seatingCapacity && (
                <p className="text-md text-red-500">
                  {errors?.seatingCapacity}
                </p>
              )}
            </div>
            {/* Specs*/}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Specs:</h3>
              <div className="flex items-center gap-2 flex-wrap ">
                {specs.map((spec, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelection("spec", spec)}
                    className={`px-4 py-2 border rounded-md cursor-pointer ${
                      carData.spec === spec ? "bg-black text-white" : ""
                    }`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.spec && (
                <p className="text-md text-red-500">{errors?.spec}</p>
              )}
            </div>
            {/* Fuel Type*/}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Fuel Type:</h3>
              <div className="flex items-center gap-2 flex-wrap ">
                {fuelTypes.map((fuel, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelection("fuelType", fuel)}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                      carData.fuelType === fuel ? "bg-black text-white" : ""
                    }`}
                  >
                    {fuel}
                  </span>
                ))}
              </div>
              {formSubmitted && errors?.fuelType && (
                <p className="text-md text-red-500">{errors?.fuelType}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Rental Terms:</h3>

              {/* Security Deposit */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between ">
                <label className="font-medium w-full md:w-1/3">
                  Security Deposit:
                </label>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="number"
                    value={carData.rentalTerms.securityDeposit || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "rentalTerms",
                        "securityDeposit",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded w-full md:w-2/3 p-2"
                  />
                  {formSubmitted && errors?.securityDeposit && (
                    <p className="text-md text-red-500">
                      {errors?.securityDeposit}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery & Pick up charges */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between ">
                <label className="font-medium w-full md:w-1/3">
                  Delivery & Pick up charges:
                </label>
                <div className="flex flex-col gap-1 w-full">
                  <select
                    value={carData.rentalTerms.deliveryPickUpCharges || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "rentalTerms",
                        "deliveryPickUpCharges",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded w-full md:w-2/3 p-2"
                  >
                    <option value="">Select</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  {formSubmitted && errors?.deliveryPickUpCharges && (
                    <p className="text-md text-red-500">
                      {errors?.deliveryPickUpCharges}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Note for customers */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between ">
                <label className="font-medium w-full md:w-1/3 ">
                  Special Note for customers:
                </label>
                <div className="flex flex-col gap-1 w-full">
                  <textarea
                    value={carData.rentalTerms.specialNote || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "rentalTerms",
                        "specialNote",
                        e.target.value
                      )
                    }
                    rows={5}
                    className="border rounded w-full md:w-2/3 p-3"
                  ></textarea>

                  {formSubmitted && errors?.specialNote && (
                    <p className="text-md text-red-500">
                      {errors?.specialNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Upload Car Images */}
        <div
          className="mx-auto w-[90%] rounded-lg border-dashed border-2 border-black"
          onClick={() => document.getElementById("imageUploadInput").click()}
        >
          <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 p-4">
            <h3 className="font-semibold text-sm sm:text-md md:text-lg text-center">
              Click to upload car images
            </h3>
            <span className="text-gray-400 text-xs sm:text-sm md:text-md text-center">
              Upload up to 20 files
            </span>
            <span className="text-gray-400 text-xs sm:text-sm md:text-md text-center">
              Only images are allowed to upload
            </span>
          </div>
        </div>

        {formSubmitted && errors?.carImages && (
          <p className="text-md text-red-500">{errors?.carImages}</p>
        )}

        {/* Hidden file input */}
        <input
          id="imageUploadInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Display uploaded images */}
        {carData?.carImages?.length > 0 && (
          <div className="border-2 border-black rounded-lg p-3 grid grid-cols-4 gap-4 mt-4">
            {carData?.carImages?.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.url}
                  alt={image.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-32 rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 z-50 bg-black text-white text-xs px-2 py-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col md:flex-row flex-wrap gap-3">
          {/* Front Side Upload */}
          <div className="flex-1">
            <label className="text-sm">
              Upload Registration file (mulkiya){" "}
              <span className="font-semibold">Front Side</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded w-full p-2"
              onChange={(event) => handleMulkiyaUpload(event, "front")}
            />

            {formSubmitted && errors?.mulkiyaFront && (
              <p className="text-md text-red-500">{errors?.mulkiyaFront}</p>
            )}
            {/* Display Front Side Image */}
            {carData?.mulkiyaImages?.front && (
              <div className="mt-2">
                <Image
                  src={carData?.mulkiyaImages?.front}
                  alt="mulkiya front side"
                  width={50}
                  height={50}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Back Side Upload */}
          <div className="flex-1">
            <label className="text-sm">
              Upload Registration file (mulkiya){" "}
              <span className="font-semibold">Back Side</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded w-full p-2"
              onChange={(event) => handleMulkiyaUpload(event, "back")}
            />

            {formSubmitted && errors?.mulkiyaBack && (
              <p className="text-md text-red-500">{errors?.mulkiyaBack}</p>
            )}
            {/* Display Back Side Image */}
            {carData?.mulkiyaImages?.back && (
              <div className="mt-2">
                <Image
                  src={carData?.mulkiyaImages?.back}
                  alt="mulkiya back side"
                  width={50}
                  height={50}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Expiry Date */}
          <div className="flex-1">
            <label htmlFor="expiryDate" className="text-sm">
              Expiry date (mulkiya)
            </label>
            <input
              type="date"
              id="expiryDate"
              value={carData.rentalTerms.expiryDate || ""}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />

            {formSubmitted && errors?.expiryDate && (
              <p className="text-md text-red-500">{errors?.expiryDate}</p>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-black rounded text-white px-4 py-2 mx-auto"
      >
        Submit{" "}
      </button>
    </form>
  );
};

export default CarRentalForm;
