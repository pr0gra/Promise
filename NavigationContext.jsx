import React, { useState } from "react";
import { createContext } from "react";
const initial = {
  goalIdState: null,
  setGoalIdState: () => {},
  isShowJoins: false,
  setIsShowJoins: () => {},
};
export const NavigationContext = createContext(initial);
