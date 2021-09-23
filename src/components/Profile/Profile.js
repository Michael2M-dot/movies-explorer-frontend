import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Form from '../Form/Form';
import Input from '../Input/Input';

const Profile = () => {
  return (
    <div className='page_profile-page'>
      <Header>
        <Navigation />
      </Header>
      <Form>
        <Input/>
        <Input/>
      </Form>
    </div>
  );
};

export default Profile;
