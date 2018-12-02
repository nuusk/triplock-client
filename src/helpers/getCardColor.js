export default function getCardColor(cardName) {
  const key = cardName
    .split(',')
    .pop()
    .trim(' ')
    .split(' ')[0]
    .toLowerCase();

  const cardNameToColor = {
    attack: 'is-error',
    move: 'is-warning',
    heal: 'is-success',
  };

  return cardNameToColor[key];
}
