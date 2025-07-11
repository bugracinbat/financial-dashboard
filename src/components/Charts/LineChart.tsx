import { lazy, Suspense } from "react";
import "./ChartConfig";

const Line = lazy(() => import("react-chartjs-2").then(module => ({ default: module.Line })));

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
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

export default function LineChart({ data, options }: LineChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <Line data={data} options={options} />
    </Suspense>
  );
}