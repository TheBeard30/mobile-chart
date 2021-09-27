import { Chart, Geometry } from "@antv/g2";

function pointGeometrySetting(chart: Chart,options: Record<string,any>,xField: string, yField: string,colorField: string,shapeType: string): Geometry{
    return chart.point(options).position(`${xField}*${yField}`).color(colorField).shape(shapeType);
}

function lineGeometrySetting(chart: Chart,options: Record<string,any>,xField: string, yField: string,colorField: string,shapeType: string): Geometry{
    return chart.line(options).position(`${xField}*${yField}`).color(colorField).shape(shapeType);
}


export {pointGeometrySetting,lineGeometrySetting};

