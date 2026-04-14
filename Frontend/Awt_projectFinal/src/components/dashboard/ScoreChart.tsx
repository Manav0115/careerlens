import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

interface Props {
  labels: string[]
  scores: number[]
}

export default function ScoreChart({ labels, scores }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Match score',
        data: scores,
        borderColor: '#7F77DD',
        backgroundColor: 'rgba(127,119,221,0.08)',
        borderWidth: 2,
        pointBackgroundColor: '#7F77DD',
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Industry avg',
        data: labels.map(() => 60),
        borderColor: '#1D9E75',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        tension: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F0F1A',
        borderColor: '#2A2A3C',
        borderWidth: 1,
        titleColor: '#F0EFF8',
        bodyColor: '#8887A0',
        padding: 10,
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => ` ${Math.round(ctx.parsed.y)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#3A3A50', font: { size: 10 } },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#3A3A50',
          font: { size: 10 },
          callback: (v: string | number) => v + '%',
        },
      },
    },
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 155 }}>
      <Line data={data} options={options as Parameters<typeof Line>[0]['options']} />
    </div>
  )
}