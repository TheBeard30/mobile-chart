import { IShape } from '@antv/g-base';
import { IGroup, registerShape } from '@antv/g2';
import { RegisterShape, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '@antv/g2/lib/interface';

/**
 * 添加转化率的自定义shape
 */
registerShape('interval','conversion',{
  // getPoints: (pointInfo: ShapePoint) => {
  //   console.log("pointInfo>>>",pointInfo);
  // },
  // getMarker: (markerCfg: ShapeMarkerCfg) => {
  //   console.log("markerCfg>>>",markerCfg);
  // },
  draw(cfg: ShapeInfo,container: IGroup){

    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const group = container.addGroup();
    const _shape = group.addShape({
      type: "path",
      attrs: {
        path: [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          ['L', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
        ],
        ...cfg.defaultStyle,
        fill: cfg.color
      },
    });

    drawConversionRate.call(this,cfg,group);
    return group;
  }
} as RegisterShape);

let previousNode = null;

/**
 * 绘制转化率
 * @param {ShapeInfo}  cfg         图形信息
 * @param {IGroup}     group       容器
 */
function drawConversionRate(cfg: ShapeInfo,group: IGroup): void{
  //@ts-ignore
  if(previousNode){

    const currentPoints = this.parsePoints(cfg.points);
    const previousPoints = this.parsePoints(previousNode.points);
    // 绘制转化率
    const path = [
      ['M', previousPoints[2].x, previousPoints[2].y],
      ['L', currentPoints[1].x, currentPoints[1].y],
      ['L', currentPoints[0].x, currentPoints[0].y],
      ['L', previousPoints[3].x,previousPoints[3].y],
      ['Z'],
    ];

    group.addShape({
      type: 'path',
      attrs: {
        opacity: 0.3,
        fill: cfg.color,
        path: path,
      },
    });

    // @ts-ignore
    const rate = ((cfg.data.value/previousNode.data.value) * 100).toFixed(2) + '%';
    const textShape = group.addShape({
      type: 'text',
      attrs: {
        text: rate,
        x: previousPoints[3].x,
        y: previousPoints[3].y - 10,
        fill: 'black'
      }
    });
    const textBox = textShape.getCanvasBBox();
    const arrowPath = [
      ['M', textBox.minX,textBox.minY - 5],
      ['L', textBox.minX,textBox.maxY + 5],
      ['L', textBox.maxX,textBox.maxY + 5],
      ['L', textBox.maxX + 10, textBox.minY + ((textBox.height)/2)],
      ['L', textBox.maxX,textBox.minY - 5],
      ['L', textBox.minX,textBox.minY - 5],
      ['Z']
    ];
    group.addShape({
      type: 'path',
      attrs: {
        opacity: 0.3,
        fill: 'black',
        path: arrowPath,
      }
    });
  }
  previousNode = cfg;
}

