import { useModel } from '@umijs/max'
import { createStyles } from 'antd-style'
import { Col, Row } from 'antd'
import {
  TopHeader,
  GatheringOfHighLevelTalentsChart,
  LeadingByTechnologyBasedEnterprises,
  DistributionOfTalentsInFiveMajorFildsChart,
  EnterprisesInfo,
  HeatMap,
  AnnualNumberOfNewPatentAuthorizationsCharts,
  EmpoweringHighLevelTalents,
  BioCityTalentAnalysisChart,
  EducationBackgroundDistribution,
  TalentCultivtionProject
} from './components';

import DashBoardBg from '@/assets/dashboard-bg.png'
import { useEffect,FC } from 'react'

const RegionalIndustryTalentAnalysis:FC = () => {
  return <Row gutter={30}>
  <Col span={8}>
    <div>
      <GatheringOfHighLevelTalentsChart />
    </div>
    <div className='bar-container' style={{marginBlockStart:'1.04167vw'}}>
      <LeadingByTechnologyBasedEnterprises />
    </div>
    <div className='bar-container' style={{marginBlockStart:'1.04167vw'}}>
      <DistributionOfTalentsInFiveMajorFildsChart />
    </div>
  </Col>
  <Col span={8}>
    <div>
      <EnterprisesInfo />
    </div>
    <div style={{marginBlockStart:'1.25vw'}}>
      <HeatMap />
    </div>
    <div style={{marginBlockStart:'1.04167vw'}}>
      <AnnualNumberOfNewPatentAuthorizationsCharts />
    </div>
  </Col>
  <Col span={8}>
    <div>
      <EmpoweringHighLevelTalents />
    </div>
    <div style={{marginBlockStart:'1.04167vw'}}>
      <BioCityTalentAnalysisChart />
    </div>
  </Col>
</Row>
}

const IndustryTalentsAnalysis:FC = () => {
  return <Row gutter={30}>
    <Col span={8}>
      <div>
        <EducationBackgroundDistribution />
      </div>
      <div className='bar-container' style={{marginBlockStart:'1.04167vw'}}>
        <TalentCultivtionProject />
      </div>
      <div className='bar-container' style={{marginBlockStart:'1.04167vw'}}>
      </div>
    </Col>
  </Row>
}


const useStyles = createStyles(() => ({
  dashboard: {
    backgroundImage: `url(${DashBoardBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },
  dashboardContent:{
    height: 'calc(100% - 4.375vw)',
    padding:'0.26042vw 1.5625vw 1.5625vw'
  }
}))
const Dashboard = () => {

  const { getEnterpriseInformationData,getTalentInformationData,tabIndex, } = useModel('Dashboard.model')

  const { styles} = useStyles()

  const getData = async () => {
    await Promise.all([getTalentInformationData(),getEnterpriseInformationData()])
  }

  useEffect(()=>{
    getData()
  },[])

  return <div className={styles.dashboard}>
    {/* 头信息 */}
    <TopHeader />
    {/* 内容 */}
    <div className={styles.dashboardContent}>
      {
        tabIndex === 0
        ?<RegionalIndustryTalentAnalysis />
        :<IndustryTalentsAnalysis />
      }

    </div>
  </div>
}

export default Dashboard
