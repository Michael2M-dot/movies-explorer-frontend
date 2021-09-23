import React, { useState } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Form from '../Form/Form';
import Input from '../Input/Input';

const Profile = ({
  userName = 'Michael',
}) => {
  const [isEditProfile, setIsEditProfile] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditProfile(!isEditProfile);
  };

  // временные значения для проверки верстки
  const name = 'Michael';
  const email = 'mmm@mmm.ru';

  return (
     <>
       <Header>
         <Navigation />
       </Header>
       <Form
         name='user-sign-in'
         formTitle={`Привет, ${userName && 'Michael'}!`}
         buttonText={!isEditProfile ? 'Редактировать' : 'Сохранить'}
         onSubmit={handleSubmit}
         footerText=''
         footerLink={isEditProfile ? '' : 'Выйти из аккаунта'}
         endPoint="/main"
       >
         <Input
           type='text'
           name='Имя'
           value={name}
         />
         <div className='profile__line' />
         <Input
           type='url'
           name='E-mail'
           value={email}
         />
       </Form>
     </>
  );
};

export default Profile;
