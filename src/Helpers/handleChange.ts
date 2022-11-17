export const handleInputChange = (value: any, setValue: any, e: any) => {
  setValue({
    ...value,
    [e.target.name]: e.target.value,
  });
};
