import React, { useState } from 'react';

const Input = (props) => {
  const [inputType, setInputType] = useState(props.type);
  const [isShowedPassword, setIsShowedPassword] = useState(false);

  const toggleShowPassword = () => {
    if (inputType === 'password') {
      setIsShowedPassword(true);
      setInputType('text');
    } else {
      setIsShowedPassword(false);
      setInputType('password');
    }
  };

  return (
    <>
      <p className="auth-form__input-title">
        {props.inputName}
      </p>
      <input
        {...props}
        type={inputType}
        className="auth-form__textfield"
        id={`${props.id}-input`}
      />
      {props.type === 'password' && (
        <span
          className={`auth-form__password-control
        ${isShowedPassword ? 'active' : ''}`}
          onClick={toggleShowPassword}
        />
      )}
    </>
  );
};

export default Input;
