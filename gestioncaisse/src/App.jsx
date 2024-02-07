// importer React
import React, { useState } from 'react';


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