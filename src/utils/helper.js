export const validateCarData = (data) => {
  const errors = {};
  if (!data.brand.trim()) errors.brand = "Brand is required.";
  if (!data.model.trim()) errors.model = "Model is required.";
  if (!data.category.trim()) errors.category = "Category is required.";
  if (!data.city.trim()) errors.city = "City is required.";
  if (!data.year.trim()) errors.year = "Year is required.";
  if (data.carImages.length === 0)
    errors.carImages = "At least one image is required.";
  if (!data.thumbnail) errors.thumbnail = "Thumbnail is required.";
  if (!data.mulkiyaImages.front)
    errors.mulkiyaFront = "Front Mulkiya image is required.";
  if (!data.mulkiyaImages.back)
    errors.mulkiyaBack = "Back Mulkiya image is required.";
  if (data.selectedFeatures.length === 0)
    errors.selectedFeatures = "At least one feature is required.";
  if (!data.color) errors.color = "Color is required.";
  if (!data.bagsFit) errors.bagsFit = "Bags fit is required.";
  if (!data.transmission) errors.transmission = "Transmission is required.";
  if (!data.doors) errors.doors = "Number of doors is required.";
  if (!data.seatingCapacity)
    errors.seatingCapacity = "Seating capacity is required.";
  if (!data.spec) errors.spec = "Spec is required.";
  if (!data.fuelType) errors.fuelType = "Fuel type is required.";
  if (!data.rentalTerms.securityDeposit.trim())
    errors.securityDeposit = "Security deposit is required.";
  if (!data.rentalTerms.deliveryPickUpCharges.trim())
    errors.deliveryPickUpCharges = "Delivery and pick-up charges are required.";
  if (!data.rentalTerms.specialNote.trim())
    errors.specialNote = "Special note is required.";
  if (!data.expiryDate) errors.expiryDate = "Expiry date is required.";

  return errors;
};
