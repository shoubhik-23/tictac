import { useState } from "react";
import { PlayerConst } from "../enums/constants";

export const useGame = () => {
  const [scoreboard, setScoreboard] = useState({ X: 0, O: 0 });
  const setScoreHandle = (player) => {
    setScoreboard((prev) => ({
      ...prev,
      X: player == PlayerConst.X ? prev.X + 1 : prev.X,
      O: player === PlayerConst.O ? prev.O + 1 : prev.O,
    }));
  };

  return { scoreboard, setScoreHandle };
};
