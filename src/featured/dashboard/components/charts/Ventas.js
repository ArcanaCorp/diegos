import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

export default function VentasChart({ data }) {

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Detectamos clave automáticamente (hora, dia o mes)
        const key = Object.keys(data[0]).find(k => k !== "total");

        const chartData = {
            labels: data.map(v => v[key]),
            datasets: [
                {
                    label: `Ventas por ${key}`,
                    data: data.map(v => v.total),
                    borderColor: "#4F46E5",
                    backgroundColor: "rgba(99, 102, 241, 0.3)",
                    pointBackgroundColor: "#4338CA",
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    fill: true
                }
            ]
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 900,
                easing: "easeOutQuart"
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: "rgba(0,0,0,0.1)"
                    }
                },
                x: {
                    grid: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: (items) => {
                            return items[0].label;
                        },
                        label: (item) => {
                            return `S/ ${item.parsed.y.toFixed(2)}`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            interaction: {
                mode: "index",
                intersect: false
            },
        };

        chartInstance.current = new Chart(chartRef.current, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };

    }, [data]);

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div style={{ padding: 20 }}>
                No hay datos para mostrar
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '300px', backgroundColor: '#FFFFFF' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}