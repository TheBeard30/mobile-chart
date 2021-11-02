import { Chart, Geometry } from "@antv/g2";
import CoordinateController from "@antv/g2/lib/chart/controller/coordinate";
import { CoordinateOption } from "@antv/g2/lib/interface";

function pointGeometrySetting(chart: Chart,options: Record<string,any>,xField: string, yField: string,colorField: string,shapeType: string): Geometry{
    return chart.point(options).position(`${xField}*${yField}`).color(colorField).shape(shapeType);
}

function lineGeometrySetting(chart: Chart,options: Record<string,any>,xField: string, yField: string,colorField: string,shapeType: string): Geometry{
    return chart.line(options).position(`${xField}*${yField}`).color(colorField).shape(shapeType);
}

function areaGeometrySetting(chart: Chart,options: Record<string,any>,xField: string, yField: string,colorField?: string,shapeType?: string,style?: {[p: string]: any}): Geometry{
    return chart.area(options).position(`${xField}*${yField}`).color(colorField).shape(shapeType).style(style);
}


function coordinate(chart: Chart,option: CoordinateOption): CoordinateController{
    return chart.coordinate(option);
}


export {pointGeometrySetting,lineGeometrySetting,areaGeometrySetting, coordinate};

