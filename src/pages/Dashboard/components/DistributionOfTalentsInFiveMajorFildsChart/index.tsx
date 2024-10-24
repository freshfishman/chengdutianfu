import { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import { createStyles } from 'antd-style'
import { ContentBoxTitle, ContentBoxContent } from '../ContentBox'


const useStyles = createStyles(() => ({
  barContainer:{
    height: 'calc(13.02083vw - 2px)',
  }
}))


const DistributionOfTalentsInFiveMajorFildsChart = () => {

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
    });

    // 准备数据
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(data) // 绑定数据
      .encode('x', 'genre') // 编码 x 通道
      .encode('y', 'sold') // 编码 y 通道
      .encode('key', 'genre') // 指定 key
      .animate('update', { duration: 300 })// 指定更新动画的时间
      .style('fill', 'linear-gradient(0deg, rgba(91, 214, 255, 0.65) 0%,  rgba(49, 116, 255, 0.65) 100%)') //柱状图背景颜色
      .style('width', document.documentElement.clientWidth / 100 * 1.25)
      .axis('y', {
        labelFormatter: '~s',
        grid: true,
      })
      .label({
        text:'sold',
        fontSize:'0.625vw',
        formatter:(text:string)=>`${text}个`,
        position:'top',
        labelStroke:'#fff',
        textAlign:'center',
        textBaseline:'top',
        style: {
          dy: -20, // 指定样式
          fill:'#fff'
        },
      })

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
  },[])

  return <div>
    <ContentBoxTitle title='科技型企业引领' subTitle='LEADING BY TECHNOLOGY-BASED ENTERPRISES' />
    <ContentBoxContent>
      <div ref={containerRef} className={styles.barContainer}></div>
    </ContentBoxContent>
  </div>
}


export default DistributionOfTalentsInFiveMajorFildsChart
