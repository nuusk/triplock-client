export default function getCharacterName(playerId) {
  let characterName = 'clemm';
  switch (playerId % 3) {
    case 0:
      characterName = 'clemm';
      break;
    case 1:
      characterName = 'edgar';
      break;
    case 2:
      characterName = 'sara';
      break;
    default:
      characterName = 'clemm';
      break;
  }

  return characterName;
}
