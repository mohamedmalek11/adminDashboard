
export type BranchType = {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  location: {
    x: string;
    y: string;
  };
  city: string;
  deletedAt: string;
  country: string;
  street: string;
  zipCode: string;
  district: string;
  additionalNumber: string;
  buildingNumber: string;
  commercialNumber: string;
  startTime1: string;
  endTime1: string;
  startTime2: string;
  endTime2: string;
  workingDays: object;
  branchImageUrl: string;
  isDefault: string;
};
