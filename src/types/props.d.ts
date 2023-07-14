import type React from 'react';
import { type NavigateFunction, type Location } from 'react-router-dom';

export interface PropsType {
  children?: React.ReactNode;
  navigate?: NavigateFunction;
  location?: Location;
  param?: any;
  usp?: any;
}
