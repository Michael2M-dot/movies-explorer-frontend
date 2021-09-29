// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState } from 'react';

// хук для сбора информации с полей ввода с последующей валидацией
function useFormInputsValidate() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    const { name } = input;
    const { value } = input;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, errors, isValid, handleChange, resetForm,
  };
}

export default useFormInputsValidate;
