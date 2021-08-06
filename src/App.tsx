import { Observer } from 'mobx-react';
import './App.css';
import Card from './Components/Card';
import { AppModel } from './Models/AppModel';


const theAppModel = new AppModel();

 function App() {
  return (
    <Observer>
      {() => (
        <div className="App">
          <div className="cardContainer">
            {theAppModel.cardsOnTheTable.map((card) => <Card context={card} appModel = {theAppModel} key={card.key} />)} 
          </div>
        </div>
      )}
    </Observer>
  );
}

export default App;
