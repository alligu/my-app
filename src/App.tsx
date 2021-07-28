import './App.css';
import Card from './Components/Card';
import { AppModel } from './Models/AppModel';


const theAppModel = new AppModel();


function App() {

  return (
    <div className="App">
      <div className="cardContainer">
        {theAppModel.cardsOnTheTable.map((card) => <Card context={card} key={card.key} />)}
      </div>
    </div>
  );
}

export default App;
