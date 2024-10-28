import { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import { createStyles } from 'antd-style'
import { Col,Flex,Row } from 'antd'
import { ContentBoxTitle, ContentBoxContent } from '../ContentBox'
import TitleBg from '@/assets/talents-title-bg.png'
import IconLeftArrow from '@/assets/arrow-down-left.png'
import IconRightArrow from '@/assets/arrow-down-right.png'
import { useModel } from '@umijs/max'
import { getPercent } from '@/utils'


const useStyles = createStyles(() => ({
  barContainer:{
    height: 'calc(14.58333vw - 2px)',
    padding:'1.09375vw 2.65625vw',
    color:'#fff',
    fontSize:'0.729167vw'
  },
  pieChartMarginContainer:{
    height:'11.25vw',
    width:'11.25vw',
    borderRadius:'50%',
    background:'rgba(20, 41, 115, 0.3)',
    padding:'0.83333vw'
  },
  pieChartContainer:{
    borderRadius:'50%',
    border:'1px solid  #637DA0',
    padding:'0.83333vw',
    height:'100%'
  },
  labelContainer:{
    width:'11.5625vw',
    height: '100%',
    background:'rgba(20, 41, 115, 0.25)',
    borderRadius:'0.208333vw',
    padding:'0.625vw 0.46875vw',

  },
  labelTitle:{
    textAlign:'center',
    height:'2.1875vw',
    lineHeight:'2.1875vw',
    backgroundImage: `url(${TitleBg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100%',
    backgroundPosition:'center center',
    paddingInline:'1.71875vw'
  },
  icon:{
    width:'0.625vw',
    height: 'fit-content',
  },
  labelItem:{
    paddingInline:'1vw'
  },
  blueDot:{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'rgba(0, 120, 250, 1)',
    marginInlineEnd:'0.3125vw',
  },
  lightGreenDot:{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'rgba(0, 224, 216, 1)',
    marginInlineEnd:'0.3125vw',
  },
  lightBlueDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'#168ECE',
    marginInlineEnd:'0.3125vw',
  },
  grayDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'#9EB7CD',
    marginInlineEnd:'0.3125vw',
  },
  greenDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'#0CC890',
    marginInlineEnd:'0.3125vw',
  },
}))


const DistributionOfTalentsInFiveMajorFildsChart = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
    });
    chart.coordinate({ type: 'theta', innerRadius: 0.8,outerRadius: 1.0 });

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
    .encode('y', 'Item2')
    .encode('color', 'Item1')
    .style('stroke', 'white')
    .style('inset', 1)
    .style('radius', 5)
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    // .label({ text: 'name', fontSize: 10, fontWeight: 'bold' })
    // .label({
    //   text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
    //   fontSize: 9,
    //   dy: 12,
    // })
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
    } else {
      if(talentInformationData?.TER_LIST) {
        chart.current.changeData(talentInformationData?.TER_LIST)
      }
    }
  },[talentInformationData])

  return <div>
    <ContentBoxTitle title='五大领域人才分布' subTitle='DISTRIBUTION OF TALENTS IN FIVE MAJOR FILDS' />
    <ContentBoxContent>
      <Row className={styles.barContainer} align='stretch'>
        <Col span={12}>
          <Flex className={styles.labelContainer} vertical>
            <Flex className={styles.labelTitle} align='center' justify='space-between'>
              <img src={IconLeftArrow} className={styles.icon} />
              <div >人才分布</div>
              <img src={IconRightArrow} className={styles.icon} />
            </Flex>
            <Flex vertical justify='space-around' flex={1}>
              <Flex className={styles.labelItem} align='center'>
                <div className={styles.blueDot}></div>
                <Flex flex={1}>现代生物技术药</Flex>
                <div>{talentInformationData?.TER_LIST ? getPercent(talentInformationData?.TER_LIST[0].Item2 , talentInformationData?.TER_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
              </Flex>
              <Flex className={styles.labelItem}>
                <div className={styles.lightGreenDot}></div>
                <Flex flex={1}>化学创新药</Flex>
                <div>{talentInformationData?.TER_LIST ? getPercent(talentInformationData?.TER_LIST[1].Item2 , talentInformationData?.TER_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
              </Flex>
              <Flex className={styles.labelItem}>
                <div className={styles.lightBlueDot}></div>
                <Flex flex={1}>高性能医疗器械</Flex>
                <div>{talentInformationData?.TER_LIST ? getPercent(talentInformationData?.TER_LIST[2].Item2 , talentInformationData?.TER_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
              </Flex>
              <Flex className={styles.labelItem}>
                <div className={styles.grayDot}></div>
                <Flex flex={1}>专业外包服务</Flex>
                <div>{talentInformationData?.TER_LIST ? getPercent(talentInformationData?.TER_LIST[3].Item2 , talentInformationData?.TER_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
              </Flex>
              <Flex className={styles.labelItem}>
                <div className={styles.greenDot}></div>
                <Flex flex={1}>健康服务</Flex>
                <div>{talentInformationData?.TER_LIST ? getPercent(talentInformationData?.TER_LIST[4].Item2 , talentInformationData?.TER_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
              </Flex>
            </Flex>
          </Flex>
        </Col>
        <Col span={12} ref={containerRef}>
        </Col>
      </Row>
    </ContentBoxContent>
  </div>
}


export default DistributionOfTalentsInFiveMajorFildsChart
