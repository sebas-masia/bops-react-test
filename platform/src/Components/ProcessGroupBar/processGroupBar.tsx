import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { baseTheme } from '@Themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ProcessGroup {
  processGroup: string;
  value: number;
}

const processGroupBar = ({ processGroups }: { processGroups: ProcessGroup[] }) => {
  const options = {
    plugins: {
      title: { display: true, text: 'Process Groups', color: baseTheme.colors.fontGrey, textAlign: 'left' as const },
      legend: {
        position: 'left' as const,
        labels: {
          color: baseTheme.colors.fontGrey,
          boxWidth: 20,
          textAlign: 'left' as const,
          padding: 5,
        },
      },
      dataLabels: { display: false },
    },
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true, display: false },
    },
    barThickness: 60,
  };

  const prettifyText = (text: string) =>
    text
      .split('-')
      .map((t) => t.charAt(0).toLocaleUpperCase() + t.slice(1))
      .join(' ');

  const data = {
    labels: [''],
    datasets: processGroups.map((p, index) => ({
      label: prettifyText(p.processGroup),
      data: [p.value],
      backgroundColor: baseTheme.colors.stackBarColors[index],
    })),
  };

  return <Bar options={options} data={data} />;
};

export default processGroupBar;
