import { Point, TooltipOption } from "@antv/g2/lib/interface";

/**
 * 配置显示X轴的辅助线文本
 */
const showXTooltipCrosshairsTextConfig: TooltipOption = {
    showCrosshairs: true,
    shared: true,
    showContent: false,   //移动端关闭tooltip内容框
    crosshairs: {
        type: 'x',
        line: {
        style: {
            lineDash: [3,3]
        }
        },
        text: (type: string,defaultContent: any,items: any[],currentPoint: Point ) => {
            let content = '';
            items.forEach((v,i) => {
                content += `${v.name}: ${v.value} °C${i == items.length - 1?'':','}`
            })
            return {content: content, offset: -5};
        }
    }
      
};

export {showXTooltipCrosshairsTextConfig};