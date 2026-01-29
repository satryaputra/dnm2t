export type Thing = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type CheckIn = {
  thingsId: string;
  date: string;
};