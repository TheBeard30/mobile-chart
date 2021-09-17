import { Chart } from "@antv/g2";

function customChartEvents(chart: Chart): void{
	pressStart(chart);
	press(chart);
	pressEnd(chart);
}


function pressStart(chart: Chart): void{
	// 点击开始
	chart.on('pressstart', (ev: any) => {
		console.log(ev);
		const { points } = ev;

	});
}


function press(chart: Chart): void{
	// 点击
	chart.on('press', (ev: any) => {
		const { points } = ev;
	});
}


function pressEnd(chart: Chart): void{
	// 点击结束
	chart.on('pressend', (ev: any) => {
		const { points } = ev;
	});
}


export {customChartEvents};