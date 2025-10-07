import { Ad } from './ad';

export interface User {
  id: string;
  name: string;
  role: string;
  login: string;
  adverts: Ad[];
  registeredTime: string;
}
