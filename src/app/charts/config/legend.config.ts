import { View,Chart } from '@antv/g2';
import { LegendOption } from '@antv/g2/lib/interface';
/**
 * G2图表图例的配置
 */
export type LegendOptionType = {field: string,option: LegendOption};


export function setLegendConfig(chart: Chart | View,legendOption: LegendOption);

export function setLegendConfig(chart: Chart | View,legendOption: LegendOptionType);

export function setLegendConfig(chart: Chart | View,legendOption: boolean | LegendOption | LegendOptionType){
  const propertyNameList = Object.getOwnPropertyNames(legendOption);
  if(propertyNameList.length == 2 && propertyNameList.includes('field') && propertyNameList.includes('option')){
    legendOption = legendOption as LegendOptionType;
    chart.legend(legendOption.field,legendOption.option);
  }else{
    chart.legend(legendOption as LegendOption);
  }
}

export function generateLegendOption(originOption: Record<string,any>): LegendOptionType{
  // TODO 构建图例的配置属性
  return null;
}
