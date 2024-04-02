import React from 'react';
import { Image } from 'react-native';

const Pet = ({ image }) => {
  return <Image source={image} style={{ width: 200, height: 200 }} />;
};

export default Pet;