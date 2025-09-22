export interface Ad {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  imagesIds?: string[];
  cost: number;
}
