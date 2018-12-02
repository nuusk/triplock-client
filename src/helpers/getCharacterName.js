export default function getCharacterName(playerId) {
  let characterName = 'edgar';
  switch (playerId) {
    case '0':
      characterName = 'edgar';
      break;
    case '1':
      characterName = 'edgar';
      break;
    case '2':
      characterName = 'clemm';
      break;
    case '3':
      characterName = 'clemm';
      break;
    case '4':
      characterName = 'clemm';
      break;
    default:
      characterName = 'clemm';
      break;
  }

  return characterName;
}
