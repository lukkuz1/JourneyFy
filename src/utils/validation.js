export const validateName = (name) => {
  if (!name) return "Vardas yra privalomas.";
  if (name.length < 2) return "Vardas turi būti sudarytas iš bent 2 simbolių.";
  return "";
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneNumber) return "Būtina nurodyti telefono numerį.";
  if (!phoneRegex.test(phoneNumber))
    return "Telefono numeris turi būti sudarytas iš 10–15 skaitmenų.";
  return "";
};

export const validateDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth) return "Būtina nurodyti gimimo datą.";
  const date = new Date(dateOfBirth);
  if (isNaN(date.getTime())) return "Neteisingas datos formatas.";
  return "";
};
