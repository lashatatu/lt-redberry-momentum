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
        return value.length > 0 && (value.length < 2 || value.length > 255);
      },
      rules: [
        { message: "მინიმუმ 2 სიმბოლო" },
        { message: "მაქსიმუმ 255 სიმბოლო" }
      ]
    }
  };

  export const validateRequiredField = (value) => {
    return value ? "" : "აუცილებელი ველი";
  };
