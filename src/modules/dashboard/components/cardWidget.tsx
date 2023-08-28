import { FC } from "react";
import { dashboardStatistics } from "../utils/index";

interface Props {}

const StatisticsWidget: FC<Props> = () => {
  return (
    <div
      className="data-statistics"
      id="statistics"
      data-testid="statistics-data"
    >
      {dashboardStatistics?.map((item, index) => {
        return (
          <div key={index} className="statistics-info-detail">
            <img src={item.icon} alt="stat" />
            <p data-testid={`statistics-data-${index}`}>{item.header}</p>
            <p>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsWidget;
