/**
 * G2图表数据标签的配置
 */

import { Chart, Geometry, View } from "@antv/g2";
import { GeometryLabelCfg, LabelOption } from "@antv/g2/lib/interface";

/**
 * geometry.label() 是将数据值映射到图形的文本上的方法，共有六种传入方法
 * 第一种 传入 false，不展示 label
 * 第二种 传入字段名，在每个图形上显示对应的字段对应的数值。
 * 第三种 传入字段名和配置项，配置显示细节
 * 第四种 通过回调函数返回值做配置
 * 第五种 传入回调函数配置和配置项。 即调用方法三，和调用方法四的结合。
 * 第六种 通过 LabelOption 配置
 */
export function setLabelConfig(geometry: Geometry,labelOption: false | string | LabelOption): Geometry{
  return geometry.label(labelOption);
}


export function setLabelConfigByField(geometry: Geometry,field: string,labelConfig: GeometryLabelCfg){
  return geometry.label(field,labelConfig);
}

type LabelCallback = (...args: any[]) => GeometryLabelCfg | null | undefined;

export function setLabelConfigByCallback(geometry: Geometry,field: string,callback: LabelCallback): Geometry{
  return geometry.label(field,callback);
}

export function setLabelConfigByOptionAndCallback(geometry: Geometry,field: string,callback: LabelCallback,labelConfig: GeometryLabelCfg): Geometry{
  return geometry.label(field,callback,labelConfig);
}



export function generateLabelOption(originOption: Record<string,any>){
  const isShowLabel: boolean = originOption.isShowLabel;
  // TODO 构建标签的配置属性
  if(isShowLabel){
    return null;
  }else{
    return false;
  }


}






