import { Ad } from './ad';

export interface AdDetail extends Ad {
  user: {
    id: string;
    name: string;
  };
  description: string;
  email: string;
  phone: string;
  created: string;
  category: {
    id: string;
    parentId: string;
    name: string;
  };
}
