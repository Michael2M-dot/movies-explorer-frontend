import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormInputsValidate from '../../hooks/useForm';
import CurrentUserContext from '../../context/CurrentUserContext';

const Profile = ({
  onSignOut,
  userName = 'Michael',
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  const [isEditProfile, setIsEditProfile] = useState(false);

  const buttonTextProfilePage = `${!isEditProfile ? 'Редактировать' : 'Сохранить'}`;
  const footerLinkProfilePage = `${isEditProfile ? '' : 'Выйти из аккаунта'}`;
  const buttonTypePageProfile = `${!isEditProfile ? 'button' : 'submit'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const buttonClickHandler = () => {
    if (!isEditProfile) {
      setIsEditProfile(!isEditProfile);
    }
  };

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
  },[resetForm, history]);

  console.log(currentUser);
  return (
     <>
       <Header>
         <Navigation />
       </Header>
       <Form
         name='user-sign-in'
         formTitle={`Привет, ${values.name}!`}
         buttonType={buttonTypePageProfile}
         buttonText={buttonTextProfilePage}
         onSubmit={handleSubmit}
         onSignOut={onSignOut}
         footerText=''
         footerLink={footerLinkProfilePage}
         endPoint="/signin"
         onButtonClick={buttonClickHandler}
         isEditProfile={isEditProfile}
         isDisabled={isEditProfile ? !isValid : isValid}
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
           value={values.name || ''}
           required
           onChange={handleChange}
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
           value={values.email || ''}
           required
           onChange={handleChange}
           errors={errors.email}
         />
       </Form>
     </>
  );
};

export default Profile;
