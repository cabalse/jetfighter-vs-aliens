const CONSTANTS = {
  SCREEN_WIDTH: 730,
  SCREEN_HEIGHT: 456,
  ANIMATION_SPEED: {
    BURNER: 0.1,
    LIGHTNING: 0.05,
  },
  MOVEMENT: {
    PLAYER: {
      SPEED: 500,
      TURN: 4,
    },
    ENEMIES: {
      SPEED: 1,
      TURN: 1,
    },
  },
  Z_POSITION: {
    PLAYER: 0.5,
    ENEMIES: 0.4,
    WEAPONS: 0.3,
    CLOUDS: 0.1,
    BACKGROUND: 0,
  },
  PLAYER: {
    MAX_ENERGY: 100,
    ENERGY_PER_SHOT: 5,
  },
};

export default CONSTANTS;
