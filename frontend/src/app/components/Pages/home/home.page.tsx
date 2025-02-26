import React from "react";
import { HomeView } from "./home.view";
import { IHomeProps } from "./home.interface";

export const HomePage: React.FC<IHomeProps> = (props: IHomeProps) => {
  return <HomeView {...props}></HomeView>;
};
