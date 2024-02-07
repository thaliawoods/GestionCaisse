// importer React
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ksrrjzicnzctxxrgtyua.supabase.co'
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
import supabaseKey from '../supabasekey.js'
const supabase = createClient(supabaseUrl, supabaseKey)


// check si la clé marche
// console.log(supabaseKey)


// check si la base de données est bien connectée
async function getTest() {
  const { data } = await supabase.from("selectedItems").select();
  console.log(data)
}
getTest()


const addCoffee = async () => {
  try {
    const { error } = await supabase
    .from('selectedItems')
    .insert({ product_id: 9, product_name: 'Caf', product_price: '1' })
  if (error) {
    throw error;
  }
  console.log('Added');
  } catch (error) {
    console.log('Error')
  }
}


const handleCoffeeButtonClick = async () => {
  await addCoffee();
}


// barre de nav
const SideBar = () => {
  const handleSidebarClick = (section) => {
    console.log(`Section clicked: ${section}`);
  };


  return (
    <div className="sidebar">
      <button onClick={() => handleSidebarClick("Caisse")}>Caisse</button>
      <button onClick={() => handleSidebarClick("Stocks")}>Stocks</button>
      <button onClick={() => handleSidebarClick("Commandes")}>Commandes</button>
      <button onClick={() => handleSidebarClick("Admin")}>Admin</button>
    </div>
  );
};


// bouttons avec les différents choix
const ButtonRectangle = ({ onButtonClick }) => {
  const buttons = [
    { name: "Café", price: 1 },
    { name: "Jus", price: 1 },
    { name: "Soda", price: 1 },
    { name: "Choco", price: 1 },
    { name: "Bonbons", price: 1 },
    { name: "Biscuits", price: 1 }
  ];

  const renderButtons = () => {
    return buttons.map((button, index) => (
      <button key={index} onClick={() => onButtonClick(button)}>{button.name} - {button.price}€</button>
    ));
  };

  return (
    <div className="outer-rectangle">
      <div className="inner-rectangle">
        {renderButtons()}
      </div>
    </div>
  );
};


// ticket - liste - total - payer
const TicketRectangle = ({ selectedItems, onPayButtonClick }) => {
  const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="ticket-outer-rectangle">
      <div className="ticket-inner-rectangle">
        <h2>Ticket</h2>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}€
            </li>
          ))}
          <li>Total: {totalPrice}€</li>
        </ul>
        <button onClick={onPayButtonClick}>Payer</button>
      </div>
    </div>
  );
};


const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [payClicked, setPayClicked] = useState(false);

  const handleButtonClick = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handlePayButtonClick = () => {
    setSelectedItems([]);
    setPayClicked(true);
  };


// retourne app
  return (
    <div className="app-container">
       <button onClick={handleCoffeeButtonClick}>Caf</button>
      <SideBar />
      <div className="main-content">
        <h1>Caisse</h1>
        <ButtonRectangle onButtonClick={handleButtonClick} />
        {payClicked ? (
          <p>Paiement effectué !</p>
        ) : (
          <TicketRectangle selectedItems={selectedItems} onPayButtonClick={handlePayButtonClick} />
        )}
      </div>
    </div>
  );
};

export default App;