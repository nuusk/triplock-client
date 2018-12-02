export default function getCardColor(cardName) {
  console.log(cardName);
  const key = cardName
    .split(',')
    .pop()
    .trim(' ')
    .split(' ')[0]
    .toLowerCase();

  console.log(key);
  const cardNameToColor = {
    attack: 'is-error',
    move: 'is-warning',
    heal: 'is-success',
  };

  return cardNameToColor[key];
}
