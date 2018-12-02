export default function getNumFrames(animationName) {
  const animationNameToFrameNumber = {
    '/assets/sprites/Blood.png': 7,
    '/assets/sprites/Boom.png': 5,
    '/assets/sprites/Heal.png': 7,
    '/assets/sprites/Ice.png': 5,
    '/assets/sprites/clemm-attack.png': 5,
    '/assets/sprites/clemm-hit.png': 3,
    '/assets/sprites/clemm-idle.png': 3,
    '/assets/sprites/clemm-walk.png': 4,
    '/assets/sprites/edgar-attack.png': 5,
    '/assets/sprites/edgar-hit.png': 3,
    '/assets/sprites/edgar-idle.png': 3,
    '/assets/sprites/edgar-walk.png': 4,
    '/assets/sprites/sara-attack.png': 3,
    '/assets/sprites/sara-hit.png': 3,
    '/assets/sprites/sara-idle.png': 6,
    '/assets/sprites/sara-walk.png': 5,
  };

  return animationNameToFrameNumber[animationName];
}
