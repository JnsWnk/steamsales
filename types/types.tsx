export type Game = {
  name: string;
  keyprice?: number;
  steampriceog: number;
  steampricedc: number;
  keyseller?: string;
  failed?: boolean;
  lastupdated?: string;
  imglink: string;
  id: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  steamid?: string;
  accessToken: string;
};
