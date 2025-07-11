import { lazy, Suspense } from "react";
import "./ChartConfig";

const Doughnut = lazy(() => import("react-chartjs-2").then(module => ({ default: module.Doughnut })));

interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      [key: string]: any;
    }>;
  };
  options: Record<string, any>;
}

const ChartLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function DoughnutChart({ data, options }: DoughnutChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <Doughnut data={data} options={options} />
    </Suspense>
  );
}