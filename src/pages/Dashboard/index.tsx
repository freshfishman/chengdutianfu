import { } from '@umijs/max'
import { createStyles } from 'antd-style'
import { Col, Row } from 'antd'
import { TopHeader,GatheringOfHighLevelTalentsChart,LeadingByTechnologyBasedEnterprises } from './components'

import DashBoardBg from '@/assets/dashboard-bg.png'


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
    padding:'0px 1.5625vw 1.5625vw'
  }
}))
const Dashboard = () => {

  const { styles} = useStyles()

  return <div className={styles.dashboard}>
    {/* 头信息 */}
    <TopHeader />
    {/* 内容 */}
    <div className={styles.dashboardContent}>
      <Row gutter={30}>
        <Col span={8}>
          <div>
            <GatheringOfHighLevelTalentsChart />
          </div>
          <div className='bar-container' style={{marginBlockStart:'1.04167vw'}}>
            <LeadingByTechnologyBasedEnterprises />
          </div>
        </Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
    </div>
  </div>
}

export default Dashboard
