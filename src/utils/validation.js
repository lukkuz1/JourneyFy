export const validateName = (name) => {
    if (!name) return "Name is required.";
    if (name.length < 2) return "Name must be at least 2 characters.";
    return "";
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneNumber) return "Phone number is required.";
    if (!phoneRegex.test(phoneNumber))
      return "Phone number must be 10-15 digits.";
    return "";
  };
  
  export const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return "Date of birth is required.";
    const date = new Date(dateOfBirth);
    if (isNaN(date.getTime())) return "Invalid date format.";
    return "";
  };
  