import { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import { createStyles } from 'antd-style'
import { ContentBoxTitle, ContentBoxContent } from '../ContentBox'
import { Col, Flex, Row } from 'antd'
import { useModel } from '@umijs/max'
import { getPercent } from '@/utils'


const useStyles = createStyles(() => ({
  barContainer:{
    height: 'calc(21.4062vw - 2px)',
    color:'#fff',
    fontSize:'0.625vw'
  },
  pieContainerItem:{
    height: 'calc(21.4062vw / 2 - 1px)',
  },
  labelItem:{
    marginBlockStart:'0.625vw'
  },
  labelItemTitleNumber:{
    width:'2.5vw',
    textAlign:'right',
    marginInlineEnd:'0.3175vw'
  },
  labelItemTitle:{
    textAlign:'right',
    marginRight:'0.004167vw',
    '& div':{
      marginInlineEnd:'0.46875vw'
    }
  },
  dot1:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #0D5B8D, #2794BC)'
  },
  dot2:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #2B3F82, #5168A6)'
  },
  dot3:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #272833, #87556B, #C88CA2)'
  },
  dot4:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #272833, #386378, #5893AB)'
  },
  dot5:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #121B2F, #9F8F66, #D5C198)'
  },
  dot6:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #AE684E, #D17A58);'
  },
  dot7:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #123E5E, #01A2F5)',
  },
  dot8:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #272833, #60533B, #DDB657)'
  },
  dot9:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #272833, #386378, #5893AB)'
  },
  dot10:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #22508C, #3B72C0)'
  },
  dot11:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #674D5C, #8E7780)'
  },
  dot12:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #1D6774, #5AA7B2)'
  },
  dot13:{
    width:'0.3125vw',
    height:'0.3125vw',
    background:'linear-gradient(0deg, #101934, #7E784F, #CAB986)'
  },
  centerText:{
    position: 'absolute',
    width: '4.21875vw',
    height: '4.21875vw',
    border: '2px dotted rgb(32, 126, 145)',
    transform: 'translateX(-50%)',
    left: '50%',
    borderRadius: '50%',
    lineHeight:'4.21875vw',
    textAlign:'center',
    fontSize:'0.9375vw'
  }
}))

const DegreePieChart = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const { styles } = useStyles()

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

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
    .encode('y', 'Item2')
    .encode('color', 'Item1')
    .style('inset', 1)
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
      range: ['linear-gradient(0deg, #101934, #0D5B8D, #2794BC)', 'linear-gradient(0deg, #101934, #2B3F82, #5168A6)', 'linear-gradient(0deg, #272833, #87556B, #C88CA2)', 'linear-gradient(0deg, #272833, #386378, #5893AB)', 'linear-gradient(0deg, #121B2F, #9F8F66, #D5C198)'],
    })
    .tooltip({
      items: [
        (d) => ({
          name: d.Item1,
          value: d.Item2,
        })
      ],
    });

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.EB_LIST) {
      chart.current.changeData(talentInformationData?.EB_LIST)
    }
  },[talentInformationData])

  return <div className={styles.pieContainerItem}>
    <Row align='stretch' className={styles.pieContainerItem}>
      <Col span={12} style={{display:'flex',alignItems:'center'}}>

        <Flex vertical flex={1}>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.EB_LIST ? getPercent(talentInformationData?.EB_LIST[0].Item2 , talentInformationData?.EB_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>研究生/博士</div>
            </Flex>
            <div className={styles.dot1}></div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.EB_LIST ? getPercent(talentInformationData?.EB_LIST[1].Item2 , talentInformationData?.EB_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>研究生/硕士</div>
            </Flex>
            <div className={styles.dot2}></div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.EB_LIST ? getPercent(talentInformationData?.EB_LIST[2].Item2 , talentInformationData?.EB_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>本科/学士</div>
            </Flex>
            <div className={styles.dot3}></div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.EB_LIST ? getPercent(talentInformationData?.EB_LIST[3].Item2 , talentInformationData?.EB_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>大专及以下</div>
            </Flex>
            <div className={styles.dot4}></div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.EB_LIST ? getPercent(talentInformationData?.EB_LIST[4].Item2 , talentInformationData?.EB_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>其他</div>
            </Flex>
            <div className={styles.dot5}></div>
          </Flex>
        </Flex>
      </Col>
      <Col span={12} style={{display:'flex',alignItems:'center'}} ref={containerRef}>
        <div className={styles.centerText}>学历</div>
      </Col>
    </Row>
  </div>
}

const AgePieChart = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const { styles } = useStyles()

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

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
    ])
    .encode('y', 'Item2')
    .encode('color', 'Item1')
    .style('inset', 1)
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
      range: ['linear-gradient(0deg, #101934, #AE684E, #D17A58)', 'linear-gradient(0deg, #101934, #123E5E, #01A2F5)', 'linear-gradient(0deg, #272833, #60533B, #DDB657)', 'linear-gradient(0deg, #272833, #386378, #5893AB)', '#0CC890'],
    })
    .tooltip({
      items: [
        (d) => ({
          name: d.Item1,
          value: d.Item2,
        })
      ],
    });

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.AGE_LIST) {
      chart.current.changeData(talentInformationData?.AGE_LIST)
    }
  },[talentInformationData])

  return <div className={styles.pieContainerItem}>
    <Row align='stretch' className={styles.pieContainerItem}>
      <Col span={12} style={{display:'flex',alignItems:'center'}} ref={containerRef}>
        <div className={styles.centerText}>年龄</div>
      </Col>
      <Col span={12} style={{display:'flex',alignItems:'center'}}>
      <Flex vertical flex={1}>
          <Flex className={styles.labelItem} align='center' justify='revert'>
            <div className={styles.dot6}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>30岁及以下</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.AGE_LIST ? getPercent(talentInformationData?.AGE_LIST[0].Item2 , talentInformationData?.AGE_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.dot7}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>30-40岁</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.AGE_LIST ? getPercent(talentInformationData?.AGE_LIST[1].Item2 , talentInformationData?.AGE_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.dot8}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>40-50岁</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.AGE_LIST ? getPercent(talentInformationData?.AGE_LIST[2].Item2 , talentInformationData?.AGE_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.dot9}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>51岁及以上</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.AGE_LIST ? getPercent(talentInformationData?.AGE_LIST[3].Item2 , talentInformationData?.AGE_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
        </Flex>
      </Col>
    </Row>
  </div>
}

const GenderPieChart = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const { styles } = useStyles()

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

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
    ])
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
      range: ['linear-gradient(0deg, #101934, #22508C, #3B72C0)', 'linear-gradient(0deg, #101934, #674D5C, #8E7780)', '#168ECE', '#9EB7CD', '#0CC890'],
    })
    .tooltip({
      items: [
        (d) => ({
          name: d.Item1,
          value: d.Item2,
        })
      ],
    });

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.SEX_LIST) {
      chart.current.changeData(talentInformationData?.SEX_LIST)
    }
  },[talentInformationData])

  return <div className={styles.pieContainerItem}>
    <Row align='stretch' className={styles.pieContainerItem}>
      <Col span={12} style={{display:'flex',alignItems:'center'}}>
      <Flex vertical flex={1}>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.SEX_LIST ? getPercent(talentInformationData?.SEX_LIST[0].Item2 , talentInformationData?.SEX_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>男</div>
            </Flex>
            <div className={styles.dot10}></div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.SEX_LIST ? getPercent(talentInformationData?.SEX_LIST[1].Item2 , talentInformationData?.SEX_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>女</div>
            </Flex>
            <div className={styles.dot11}></div>
          </Flex>
        </Flex>
      </Col>
      <Col span={12} style={{display:'flex',alignItems:'center'}} ref={containerRef}>
        <div className={styles.centerText}>性别</div>
      </Col>
    </Row>
  </div>
}

const NationalPieChart = () => {

  const { talentInformationData } = useModel('Dashboard.model')

  const { styles } = useStyles()
  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

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
    ])
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
      range: ['linear-gradient(0deg, #101934, #1D6774, #5AA7B2)', 'linear-gradient(0deg, #101934, #7E784F, #CAB986)', '#168ECE', '#9EB7CD', '#0CC890'],
    })
    .tooltip({
      items: [
        (d) => ({
          name: d.Item1,
          value: d.Item2,
        })
      ],
    });

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.NAT_LIST) {
      chart.current.changeData(talentInformationData?.NAT_LIST)
    }
  },[talentInformationData])

  return <div className={styles.pieContainerItem}>
    <Row align='stretch' className={styles.pieContainerItem}>
      <Col span={12} style={{display:'flex',alignItems:'center'}} ref={containerRef}>
        <div className={styles.centerText}>国籍</div>
      </Col>
      <Col span={12} style={{display:'flex',alignItems:'center'}}>
      <Flex vertical flex={1}>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.dot12}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>外籍</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.NAT_LIST ? getPercent(talentInformationData?.NAT_LIST[1].Item2 , talentInformationData?.NAT_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
          <Flex className={styles.labelItem} align='center'>
            <div className={styles.dot13}></div>
            <Flex className={styles.labelItemTitle} flex={1} justify='flex-end'>
              <div>中国</div>
            </Flex>
            <div className={styles.labelItemTitleNumber}>{talentInformationData?.NAT_LIST ? getPercent(talentInformationData?.NAT_LIST[0].Item2 , talentInformationData?.NAT_LIST.map(item=>item.Item2).reduce((a,b)=>a+b,0)) : 0}</div>
          </Flex>
        </Flex>
      </Col>
    </Row>
  </div>
}


const BioCityTalentAnalysisChart = () => {


  const { styles } = useStyles()

  return <div>
    <ContentBoxTitle title='生物城人才分析' subTitle='BIO-CITY TALENT ANALYSIS' />
    <ContentBoxContent>
      <Row className={styles.barContainer} align='stretch'>
        <Col span={12}>
          <DegreePieChart />
        </Col>
        <Col span={12}>
          <AgePieChart />
        </Col>
        <Col span={12}>
          <GenderPieChart />
        </Col>
        <Col span={12}>
          <NationalPieChart />
        </Col>
      </Row>
    </ContentBoxContent>
  </div>
}


export default BioCityTalentAnalysisChart
