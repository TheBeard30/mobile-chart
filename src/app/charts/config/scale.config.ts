/**
 * G2图表度量的配置
 * 坐标轴的内容是由 scale 度量控制的，所以 scale 度量的名字控制着坐标轴的标题内容。 chart.axis()  只用于控制坐标轴的外观配置
 */
import { Chart, View } from "@antv/g2";
import { ScaleOption } from "@antv/g2/lib/interface";

export type ScaleOptionType = {field: string,option: ScaleOption};

export function setScaleConfig<T extends View>(chart: T,scaleOption: Record<string,ScaleOption>);

export function setScaleConfig<T extends View>(chart: T,scaleOption: ScaleOptionType);

/**
 * 图表设置度量选项
 * @param {T}      chart            图表或者视图实例对象
 * @param {Array}  scaleOptionList  度量的配置属性数组
 */
export function setScaleConfig<T extends View>(chart: T, scaleOption: ScaleOptionType | Record<string,ScaleOption>): void{
  const propertyNameList = Object.getOwnPropertyNames(scaleOption);
  if(propertyNameList.length == 2 && propertyNameList.includes('field') && propertyNameList.includes('option')){
    scaleOption =  scaleOption as ScaleOptionType;
    chart.scale(scaleOption.field,scaleOption.option);
  }else{
    chart.scale(scaleOption as Record<string,ScaleOption>);
  }
}

/**
 * 构建度量的配置对象
 * @param {Record}  option  原始的度量配置对象
 * @returns
 */
 export function generateScaleOption(option: {[p: string]: any}): ScaleOptionType{
  // TODO 构建度量的配置属性
  return null;
}


