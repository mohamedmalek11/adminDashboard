// ** Types
import { ThemeColor } from "src/@core/layouts/types";

export type UsersType = {
  id: number;
  role: string;
  email: string;
  status: string;
  avatar: string;
  billing: string;
  company: string;
  country: string;
  contact: string;
  fullName: string;
  username: string;
  currentPlan: string;
  avatarColor?: ThemeColor;
};
export type TenantType = {
  id: string;
  additionalNumber: string;
  buildingNumber: string;
  city: string;
  commercialNumber: string;
  createdAt: string;
  district: string;
  imagePath: string;
  isTaxable: boolean;
  location: object;
  logoPath: string;
  name: { ar: string; en: string };
  phone: string;
  street: string;
  taxNumber: string;
  zipCode: string;
};

export type ProjectListDataType = {
  id: number;
  img: string;
  hours: string;
  totalTask: string;
  projectType: string;
  projectTitle: string;
  progressValue: number;
  progressColor: ThemeColor;
};
