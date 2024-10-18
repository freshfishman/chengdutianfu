import { Flex } from 'antd'
import { createStyles } from 'antd-style'
import { ContentBoxTitle, ContentBoxContent } from '../ContentBox'
import GatheringOfHighLevelTalentsChartBarBg from '@/assets/box-content-bar-bg.png'

const useStyles = createStyles(() => ({
  barContainer:{
    height: 'calc(13.541667vw - 2px)',
    paddingBlockStart:'3.125vw',
    paddingBlockEnd:'1.875vw'
  },
  barItem: {
    backgroundImage: `url(${GatheringOfHighLevelTalentsChartBarBg})`,
    backgroundSize: '100%',
    backgroundPosition: 'left bottom',
    backgroundRepeat: 'no-repeat',
    width: '9.16666vw',
    paddingBlockEnd:'3.59375vw'
  },
  barNumber:{
    fontSize:'1.875vw',
    color:'#fff'
  },
  barUnit:{
    fontSize:'0.625vw',
    color:'#fff',
    marginInlineStart:'0.41667vw'
  },
  labelTitle:{
    textAlign:'center',
    color:'#fff',
    fontSize:'0.9375vw'
  }
}))


const GatheringOfHighLevelTalentsChart = () => {

  const { styles } = useStyles()

  return <div>
    <ContentBoxTitle title='高能级人才集聚' subTitle='GATHERING OF HIGH-LEVEL TALENTS' />
    <ContentBoxContent>
      <Flex justify='space-around' className={styles.barContainer}>
        <Flex className={styles.barItem} vertical justify='space-between' align='center'>
          <Flex align='center'>
            <div className={styles.barNumber}>4</div>
            <div className={styles.barUnit}>个</div>
          </Flex>
          <div className={styles.labelTitle} style={{paddingBottom:'0.52083vw'}}>国家级院士团队</div>
        </Flex>
        <Flex className={styles.barItem} vertical justify='space-between' align='center'>
          <Flex align='center'>
            <div className={styles.barNumber}>5</div>
            <div className={styles.barUnit}>个</div>
          </Flex>
          <div className={styles.labelTitle} style={{paddingBottom:'0.52083vw'}}>诺贝尔奖人才团队</div>
        </Flex>
        <Flex className={styles.barItem} vertical justify='space-between' align='center'>
          <Flex align='center'>
            <div className={styles.barNumber}>51</div>
            <div className={styles.barUnit}>个</div>
          </Flex>
          <div className={styles.labelTitle}>海外归国高层次人才团队</div>
        </Flex>
      </Flex>
    </ContentBoxContent>
  </div>
}


export default GatheringOfHighLevelTalentsChart
