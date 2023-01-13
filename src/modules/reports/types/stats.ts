export type WeeklyStatsType = {
  total_distance: string;
  total_price: string;
};

export type DailyStatsType = {
  day: string;
  total_distance: string;
  avg_ride: string;
  avg_price: string;
};

export type MonthlyStatsType = DailyStatsType[];
