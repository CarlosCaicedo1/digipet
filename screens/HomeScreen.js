// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Pet from '../components/pet';
import InteractionButton from '../components/InteractionButton';
import { getPetState, updatePetState } from '../utils/Database';

const HomeScreen = () => {
  const petImage = require('../assets/pet.png');
  const [happiness, setHappiness] = useState(50); // Default happiness level
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  useEffect(() => {
    // Retrieve pet state from the database on component mount
    getPetState(pet => {
      if (pet) {
        setHappiness(pet.happiness);
      }
    });

    // Decrease pet's happiness every 10 seconds if not fed or played with
    const decreaseHappinessInterval = setInterval(() => {
      checkLastInteractionTime();
    }, 10000); // 10 seconds

    return () => {
      clearInterval(decreaseHappinessInterval);
    };
  }, []);

  const checkLastInteractionTime = () => {
    const currentTime = Date.now();
    const timeDifference = (currentTime - lastInteractionTime) / 1000; // Difference in seconds
  
    if (timeDifference >= 10) { // If more than 10 seconds have passed since last interaction
        getPetState(pet => {
            if (pet) {
              setHappiness(pet.happiness);
            }
          });
      const newHappiness = happiness - 5 * Math.floor(timeDifference / 10); // Decrease happiness level by 5 every 10 seconds
      if (newHappiness >= 0) {
        setHappiness(newHappiness);
        setLastInteractionTime(currentTime); // Update last interaction time
      }
    }
  };
  

  const handleFeed = () => {
    const newHappiness = happiness + 10; // Increase happiness level by 10
    setHappiness(newHappiness);
    setLastInteractionTime(Date.now()); // Reset last interaction time
    updatePetState(newHappiness, () => {
      console.log('Pet happiness updated');
    });
  };
  
  const handlePlay = () => {
    const newHappiness = happiness + 20; // Increase happiness level by 20
    setHappiness(newHappiness);
    setLastInteractionTime(Date.now()); // Reset last interaction time
    updatePetState(newHappiness, () => {
      console.log('Pet happiness updated');
    });
  };
  
  useEffect(() => {
    // Update the database with the new happiness value whenever it changes
    updatePetState(happiness, () => {
      console.log('Pet happiness updated');
    });
  }, [happiness]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pet image={petImage} />
      <Text>Happiness: {happiness}</Text>
      <InteractionButton onPress={handleFeed} title="Feed" />
      <InteractionButton onPress={handlePlay} title="Play" />
    </View>
  );
};

export default HomeScreen;
