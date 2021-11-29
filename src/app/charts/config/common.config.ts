import { Axis } from './../constant/constant';
import { Chart, View, Geometry } from '@antv/g2';
import { generateAxisOption, setAxisConfig } from './axis.config';
import { generateLabelOption, setLabelConfig, setLabelConfigByCallback } from './label.config';
import { generateLegendOption, setLegendConfig } from './legend.config';
import { generateScaleOption, setScaleConfig } from './scale.config';
import { generateTooltipOption, setTooltipConfig } from './tooltip.config';

/**
 * 默认x轴的field为x,y轴的field为y1,双Y轴时,右轴的field为y2
 * 构建图表的图形组件
 * @param {Chart}     chart               图表实例对象
 * @param {Geometry}  geometry            几何标记
 * @param {Record}    originStyleOption   原始样式对象
 */
export function generateChartCommonConfig(chart: Chart | View,geometry: Geometry,originStyleOption: Record<string,any>){
  const axisOption = generateAxisOption(originStyleOption,'rect');
  const legendOption = generateLegendOption(originStyleOption);
  const scaleOption = generateScaleOption(originStyleOption);
  const labelOption = generateLabelOption(originStyleOption);
  const toolTipOption = generateTooltipOption(originStyleOption);

  axisOption && axisOption.forEach(v => setAxisConfig(chart,v));
  // setLegendConfig(chart,legendOption);
  // setScaleConfig(chart,scaleOption);
  // setTooltipConfig(chart,toolTipOption);
  if(labelOption){

  }else{
    setLabelConfig(geometry,false);
  }
}
export type LineType = "smooth" | "line";

export function setLineShapeConfig(geometry: Geometry,lineType: LineType = "smooth"){
  geometry.shape(`${Axis.Y1}*${Axis.Y2}`,(y1,y2) => lineType);
}
