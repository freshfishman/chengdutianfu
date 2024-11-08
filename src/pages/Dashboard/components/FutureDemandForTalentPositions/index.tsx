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
    height:'calc(13.59375vw - 2px)',
    paddingBlock:'1.5625vw',
    paddingInlineStart:'2.8125vw',
    paddingInlineEnd:'3.59375vw',
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
    background:'linear-gradient(135deg, #3E90FF, #0D489E, #10254D)',
    marginInlineEnd:'0.3125vw',
  },
  lightGreenDot:{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'linear-gradient(180deg, #02F3FF, #0B7D8E, #0F2E45)',
    marginInlineEnd:'0.3125vw',
  },
  lightBlueDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'linear-gradient(0deg, #B3CBDB, #7697AE, #1D2941)',
    marginInlineEnd:'0.3125vw',
  },
  grayDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'linear-gradient(74deg, #0CFEA3, #0A805E, #0B423B)',
    marginInlineEnd:'0.3125vw',
  },
  greenDot :{
    width:'0.46875vw',
    height:'0.46875vw',
    borderRadius:'50%',
    background:'linear-gradient(0deg, #121B2F, #9F8F66, #D5C198)',
    marginInlineEnd:'0.3125vw',
  },
  flex:{
    display:'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  textcenter: {
    position: 'absolute',
    border: '1px dotted #4F668C',
    transform: 'translate(-50%,-50%)',
    left: '50%',
    top:'50%',
    fontSize:'0.78125vw',
    padding:'0.46875vw'
  },
  centerText:{
    position: 'absolute',
    width: '5vw',
    height:'5vw',
    border: '1px dotted #4F668C',
    transform: 'translate(-50%,-50%)',
    left: '50%',
    top:'50%',
    borderRadius: '50%',
    lineHeight:'4.21875vw',
    fontSize:'0.78125vw',
    padding:'0.46875vw'
  },
  chartOuterContainer:{
    height:'10.46875vw',
    width:'10.46875vw',
    borderRadius:'50%',
    background:'rgba(20, 41, 115, 0.3)',
    padding:'0.78125vw',
    display:'flex',
    justifyContent: 'center',
    alignItems:'stretch'
  },
  chartInnerContainer:{
    borderRadius:'50%',
    border:'2px solid rgba(99, 125, 160, 1)',
    width:'100%',
    padding:'0.78125vw'
  },
  bg1:{
    width:'100%',
    height:'100%',
    borderRadius:'50%',
    background:'linear-gradient(0deg, rgba(13, 31, 67, 0.6), rgba(18, 37, 79, 0.6), rgba(21, 51, 126, 0.6))',
    padding:'0.46875vw'
  },
  bg2:{
    width:'100%',
    height:'100%',
    borderRadius:'50%',
    background:'linear-gradient(0deg, rgba(19, 36, 79, 0.6), rgba(29, 51, 99, 0.6), rgba(43, 66, 121, 0.6))',
  }
}))


const FutureDemandForTalentPositions = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
      inset:0,
      margin:0
    });
    chart.coordinate({ type: 'theta', outerRadius: 1 });

    chart
    .interval()
    .transform({ type: 'stackY' })
    .encode('y', 'Item2')
    .encode('color', 'Item1')
    // .style('stroke', 'white')
    .style('inset', 1)
    // .style('radius', 5)
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
      range: [
        'linear-gradient(135deg, #3E90FF, #0D489E, #10254D)',
        'linear-gradient(180deg, #02F3FF, #0B7D8E, #0F2E45)',
        'linear-gradient(0deg, #B3CBDB, #7697AE, #1D2941)',
        'linear-gradient(74deg, #0CFEA3, #0A805E, #0B423B)',
      ],
    })
    .tooltip({
      items: [
        (d) => ({
          name: d.Item1,
          value: d.Item2,
        })
      ],
    });

    chart
    .text()
    .style('text', '需求')
    // Relative position
    .style('x', '50%')
    .style('y', '50%')
    .style('dy', -document.documentElement.clientWidth / 1920 * 18)
    .style('fontSize', document.documentElement.clientWidth / 1920 * 18)
    .style('fill', '#fff')
    .style('textAlign', 'center');

    chart
    .text()
    .style('text', '岗位类型')
    // Relative position
    .style('x', '50%')
    .style('y', '50%')
    .style('dy', document.documentElement.clientWidth / 1920 * 18)
    .style('fontSize', document.documentElement.clientWidth / 1920 * 18)
    .style('fill', '#fff')
    .style('textAlign', 'center');

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.TER_LIST) {
      const data = [
        {
          Item1:'市场营销',
          Item2:talentInformationData?.TR_MARKETING_TALENT_DEMAND_PROPORTION,
        },
        {
          Item1:'生产技能',
          Item2:talentInformationData?.TR_PRODUCTION_SKILLS_TALENT_DEMAND_PROPORTION,
        },
        {
          Item1:'专业技术',
          Item2:talentInformationData?.TR_PROFESSIONAL_SKILL_TALENT_DEMAND_PROPORTION,
        },
        {
          Item1:'其他',
          Item2:talentInformationData?.TR_OTHER_TALENT_DEMAND_PROPORTION,
        },
      ]
      chart.current.changeData(data)
    }
  },[talentInformationData])

  return <div>
    <ContentBoxTitle title='未来需求人才岗位' subTitle='FUTURE DEMAND FOR TALENT POSITIONS' />
    <ContentBoxContent>
      <Flex className={styles.barContainer} align='stretch' justify='space-between'>
        <Flex justify='space-between'>
          <div className={styles.chartOuterContainer}>
              <div className={styles.chartInnerContainer}>
                <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>
              </div>
          </div>
        </Flex>
        <Flex className={styles.labelContainer} vertical>
          <Flex className={styles.labelTitle} align='center' justify='space-between'>
            <img src={IconLeftArrow} className={styles.icon} />
            <div >需求岗位类型</div>
            <img src={IconRightArrow} className={styles.icon} />
          </Flex>
          <Flex vertical justify='space-around' flex={1}>
            <Flex className={styles.labelItem} align='center'>
              <div className={styles.blueDot}></div>
              <Flex flex={1}>市场营销</Flex>
              <div>{talentInformationData?.TR_MARKETING_TALENT_DEMAND_PROPORTION}%</div>
            </Flex>
            <Flex className={styles.labelItem} align='center'>
              <div className={styles.lightGreenDot}></div>
              <Flex flex={1}>生产技能</Flex>
              <div>{talentInformationData?.TR_PRODUCTION_SKILLS_TALENT_DEMAND_PROPORTION}%</div>
            </Flex>
            <Flex className={styles.labelItem} align='center'>
              <div className={styles.lightBlueDot}></div>
              <Flex flex={1}>专业技术</Flex>
              <div>{talentInformationData?.TR_PROFESSIONAL_SKILL_TALENT_DEMAND_PROPORTION}%</div>
            </Flex>
            <Flex className={styles.labelItem} align='center'>
              <div className={styles.grayDot}></div>
              <Flex flex={1}>其他</Flex>
              <div>{talentInformationData?.TR_OTHER_TALENT_DEMAND_PROPORTION}%</div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ContentBoxContent>
  </div>
}


export default FutureDemandForTalentPositions
