import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormInputsValidate from '../../hooks/useForm';
import CurrentUserContext from '../../context/CurrentUserContext';

const Profile = ({
  onUpdateUser,
  onSignOut,
  isSubmitted = true,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  const [isEditProfile, setIsEditProfile] = useState(false);

  const footerLinkProfilePage = `${isEditProfile ? '' : 'Выйти из аккаунта'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
    setIsEditProfile(false);
  };

  const buttonClickHandler = () => {
    if (!isEditProfile) {
      setIsEditProfile(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
    }
  },[resetForm, currentUser]);

  return (
     <>
       <Header>
         <Navigation />
       </Header>
       <Form
         name='user-sign-in'
         formTitle={`Привет, ${currentUser.name}!`}
         buttonText={!isSubmitted ? 'Сохранить' : 'Идет сохранение'}
         onSubmit={handleSubmit}
         onSignOut={onSignOut}
         footerText=''
         footerLink={footerLinkProfilePage}
         endPoint="/signin"
         onButtonClick={buttonClickHandler}
         isEditProfile={isEditProfile}
         isFormValid={isValid}
         isSubmitted={isSubmitted}
         errors={errors.name || errors.email}
       >
         <Input
           type='text'
           id='name'
           name='name'
           input='Имя'
           title="Введите новое имя пользователя"
           maxLength="40"
           minLength="2"
           required
           onChange={handleChange}
           value={values.name || ''}
           errors={errors.name}
         />
         <div className='profile__line' />
         <Input
           type='email'
           id='email'
           name='email'
           input='E-mail'
           title="Введите адрес электронной почты"
           minLength="2"
           required
           onChange={handleChange}
           value={values.email || ''}
           errors={errors.email}
         />
       </Form>
     </>
  );
};

export default Profile;
