// src/utilities/validations.js
  export const fieldValidations = {
    name: {
      validate: (value) => {
        return value.length < 2 || value.length > 255;
      },
      rules: [
        { message: "მინიმუმ 2 სიმბოლო" },
        { message: "მაქსიმუმ 255 სიმბოლო" }
      ]
    },
    surname: {
      validate: (value) => {
        return value.length < 2 || value.length > 255;
      },
      rules: [
        { message: "მინიმუმ 2 სიმბოლო" },
        { message: "მაქსიმუმ 255 სიმბოლო" }
      ]
    },
    title: {
      validate: (value) => {
        return !value || value.length < 2 || value.length > 255;
      },
      rules: [
        { message: "მინიმუმ 2 სიმბოლო" },
        { message: "მაქსიმუმ 255 სიმბოლო" }
      ]
    },
    description: {
      validate: (value) => {
        // Description is optional, only validate if there's a value
        return value.length > 0 && (value.length < 2 || value.length > 255);
      },
      rules: [
        { message: "მინიმუმ 2 სიმბოლო" },
        { message: "მაქსიმუმ 255 სიმბოლო" }
      ]
    }
  };

  // For required select fields and date fields
  export const validateRequiredField = (value) => {
    return value ? "" : "აუცილებელი ველი";
  };
