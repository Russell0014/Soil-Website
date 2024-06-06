import React, { useEffect, useState } from "react";

function useForm(
  success: () => void = () => {},
  validate: (
    v: Record<string, string>
    // eslint-disable-next-line no-empty-pattern
  ) => Promise<Record<string, string>> = async ({}) => {
    return {};
  }
) {
  const [values, setValues] = useState<Record<string, string>>({}); // the form field values
  const [errors, setErrors] = useState<Record<string, string>>({}); // the form field errors
  const [isSubmitted, setSumbitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(await validate(values));
    setSumbitted(true);
  };

  // need this as it queues the update if in handleSumbit
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length === 0) success();
  }, [errors]);

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return { values, handleChangeValues, handleSubmit, errors };
}

export default useForm;
