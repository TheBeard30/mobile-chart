import { Axis } from './../constant/constant';
/**
 * G2图表坐标轴的配置
 */
import { Chart, ShapeAttrs, View } from '@antv/g2';
import { AxisCfg, AxisGridCfg, AxisOption } from '@antv/g2/lib/interface';
import { AxisLabelCfg, AxisLineCfg, AxisTickLineCfg } from '@antv/component';

export type AxisOptionType = {field: string,option: AxisOption};

// export function setAxisConfig(chart: Chart | View,axisOption: boolean);

// export function setAxisConfig(chart: Chart | View,axisOption: AxisOptionType);

export function setAxisConfig(chart: Chart | View,axisOption: AxisOptionType | null){
  axisOption && chart.axis(axisOption.field,axisOption.option);
}

/** 坐标系类型 */
type CoordinateType = 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix';

export function generateAxisOption(originOption: Record<string,any>,coordinate: CoordinateType): Array<AxisOptionType> | null{
  // TODO 构建坐标轴的配置属性
  const axisList: Array<AxisOptionType> = [];
  // 处理直角(迪卡尔)坐标系
  if(coordinate == "rect" || coordinate == "cartesian"){
    const xAxisCfg: AxisCfg = {};
    // step 1: 判断X轴的配置
    // XXX check => important 轴标题的显示内容在scale度量控制
    const xAxisDisplay: boolean =  originOption.showShaftLineChecked;
    xAxisCfg.line = xAxisDisplay ? {} as AxisLineCfg : null;                   // 轴线配置
    if(xAxisCfg.line){
      xAxisCfg.line.style = {

      } as ShapeAttrs;
    }
    const xAxisGridDisplay: boolean = originOption.showGridLineChecked;
    xAxisCfg.grid = xAxisGridDisplay ? {} as AxisGridCfg : null;               // 网格线配置
    if(xAxisCfg.grid){
      xAxisCfg.grid.line = {
        type: 'line',
        style: {
          fill: 'black'
        } as ShapeAttrs
      };
    }
    const xAxisTicklineDisplay: boolean = originOption.showScaleChecked;
    xAxisCfg.tickLine = xAxisTicklineDisplay ? {} as AxisTickLineCfg : null;   // 刻度配置
    if(xAxisCfg.tickLine){
      xAxisCfg.tickLine.style = {} as ShapeAttrs;
    }
    const xAxisLabelDisplay = originOption.showShaftValueChecked;
    xAxisCfg.label = xAxisLabelDisplay ? {} as AxisLabelCfg : null;            // 轴值配置
    if(xAxisCfg.label){
      xAxisCfg.label.style = {} as ShapeAttrs;
    }
    axisList.push({field: 'x',option: xAxisCfg});
  }







  return axisList;
}





