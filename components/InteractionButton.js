import React from 'react';
import { Pressable, Text } from 'react-native';

const InteractionButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={{ padding: 10, backgroundColor: 'blue', margin: 10 }}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </Pressable>
  );
};

export default InteractionButton;
