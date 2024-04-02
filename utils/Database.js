import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('digitalPet.db');

// Initialize the database table
const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS pet (id INTEGER PRIMARY KEY AUTOINCREMENT, happiness INTEGER)'
    );
  });
};

// Get the current pet state
const getPetState = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pet', [], (_, { rows }) => {
      callback(rows._array[0]);
    });
  });
};

// Update the pet state
const updatePetState = (happiness, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE pet SET happiness = ?', [happiness], (_, result) => {
      callback(result);
    });
  });
};

// Initialize the database table on app start
initializeDatabase();

export { getPetState, updatePetState };