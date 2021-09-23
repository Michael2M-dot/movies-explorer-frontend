import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

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

  const isProfilePage = useRouteMatch({ path: '/profile', exact: true });

  const inputStyle = `input ${
    isProfilePage && 'input_page-profile'
  }`;
  const inputTitleStyle = `input__title ${
    isProfilePage && 'input__title_page-profile'
  }`;
  const inputTextfieldStyle = `input__textfield ${
    isProfilePage && 'input__textfield_page-profile'
  }`;

  return (
    <label className={inputStyle}>
      <p className={inputTitleStyle}>
        {props.name}
      </p>
      <input
        {...props}
        type={inputType}
        className={inputTextfieldStyle}
        id={`${props.id}-input`}
        value={props.value}
      />
      {props.type === 'password' && (
        <span
          className={`input__password-control
        ${isShowedPassword ? 'active' : ''}`}
          onClick={toggleShowPassword}
        />
      )}
    </label>
  );
};

export default Input;
