import { Chart } from "@antv/g2";

function customChartEvents(chart: Chart): void{
	// 点击开始
	chart.on('pressstart', (ev: any) => {
		const { points } = ev;
	});
	// 点击
	chart.on('press', (ev: any) => {
		const { points } = ev;
	});
	// 点击结束
	chart.on('pressend', (ev: any) => {
		const { points } = ev;
	});
}


export {customChartEvents};