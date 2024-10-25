import { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import { createStyles } from 'antd-style'
import { Col,Row } from 'antd'
import { ContentBoxTitle, ContentBoxContent } from '../ContentBox'


const useStyles = createStyles(() => ({
  barContainer:{
    height: 'calc(14.58333vw - 2px)',
  }
}))


const DistributionOfTalentsInFiveMajorFildsChart = () => {

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    console.log(container,container.clientHeight,container.clientWidth,'=================>')
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
    });
    chart.coordinate({ type: 'theta', innerRadius: 0.8 });

    chart
    .interval()
    .transform({ type: 'stackY' })
    .data([
      {
        "name": "<5",
        "value": 19912018
      },
      {
        "name": "5-9",
        "value": 20501982
      },
      {
        "name": "10-14",
        "value": 20679786
      },
      {
        "name": "15-19",
        "value": 21354481
      },
      {
        "name": "20-24",
        "value": 22604232
      },
    ])
    .encode('y', 'value')
    .encode('color', 'name')
    .style('stroke', 'white')
    .style('inset', 1)
    // .style('radius', 10)
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    .label({ text: 'name', fontSize: 10, fontWeight: 'bold' })
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      fontSize: 9,
      dy: 12,
    })
    .animate('enter', { type: 'waveIn' })
    .legend(false)
    .scale('color', {
      type: 'ordinal',
      range: ['#0078FA', '#00E0D8', '#168ECE', '#9EB7CD', '#0CC890'],
    });

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
    <ContentBoxTitle title='五大领域人才分布' subTitle='DISTRIBUTION OF TALENTS IN FIVE MAJOR FILDS' />
    <ContentBoxContent>
      <Row className={styles.barContainer} align='stretch'>
        <Col span={12}>
        qqq
        </Col>
        <Col span={12} ref={containerRef}></Col>
      </Row>
    </ContentBoxContent>
  </div>
}


export default DistributionOfTalentsInFiveMajorFildsChart
