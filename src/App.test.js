import { render, screen } from '@testing-library/react';
import App from './App';
import { AppModel } from './Models/AppModel';
import { SetCardModel } from './Models/SetCardModel';

test('appModel.isASet2 correctly checks for set', () => {
  const target = new AppModel();

  const card1 = new SetCardModel();
  card1.shape = "circle"
  card1.color = "red"
  card1.number = 2
  card1.pattern = "solid";
  
  const card2 = new SetCardModel();
  card2.shape = "circle"
  card2.color = "red"
  card2.number = 2
  card2.pattern = "solid";
  
  const card3 = new SetCardModel();
  card3.shape = "circle"
  card3.color = "red"
  card3.number = 2
  card3.pattern = "solid";
  
  let result = target.isASet2([card1, card2, card3])
  expect(result).toEqual(true);

  card1.shape = "square"
  result = target.isASet2([card1, card2, card3])
  expect(result).toEqual(false);
});
