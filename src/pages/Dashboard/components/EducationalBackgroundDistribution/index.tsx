import {  } from '@umijs/max'
import { FC } from 'react'
import { Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'
import DashBoard from '@/assets/dashboard.png'
import WaiBao from '@/assets/waibao.png'
import Health from '@/assets/health.png'
import Medicine from '@/assets/medicine.png'

const useStyles = createStyles({
  wrapper: {
    height:'calc(13.59375vw - 2px)',
    paddingInline:'2.5vw 1.71875vw',
    paddingBlock:'1.09375vw',
    display:'flex',
    alignItems:'stretch',
    color:'#fff'
  },
  chartContainer:{
    width:'7.5vw',
    height:'7.5vw',
    borderRadius:'50%',
    background:'rgba(23, 50, 93, 0.6)',
    padding:'0.46875vw',
    marginBlockEnd:'0.78125vw'
  },
  chartContainerTitle:{
    fontSize:'0.9375vw',
    textAlign:'center',
    width:'7.5vw',
    paddingInline:'1.40625vw',
    lineHeight:1.5
  },
  rightContent:{
    marginInlineStart:'2.03125vw',
    flex:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  listItem: {
    height:'3.59375vw',
    position:'relative',
    zIndex:9
  },
  listItemContent:{
    height:'3.59375vw',
    fontSize:'0.9375vw',
    paddingInlineStart:'0.9375vw'
  },
  valueColer:{
    color:'#00E0FF'
  },
  relative:{
    position:'relative',
  },
  listItemBg:{
    position:'absolute',
    right:0,
    bottom:0,
    height:'2.5vw',
    width:'14.84375vw',
    background:'linear-gradient(90deg, rgba(23, 61, 126, 0.6), rgba(18, 44, 83, 0.6), rgba(19, 33, 54, 0.6), rgba(12, 23, 43, 0.6));',
    zIndex:0
  },
  listItemDashBoard:{
    position:'absolute',
    left:'5.46875vw',
    top:'2.96875vw'
  }
})

/**
 * @name 列表项
 * @param title 标题
 * @param value 内容
 * @param masterNumber 硕士数量
 * @param docterNumber 博士数量
 * @returns
 *
 */
const ListItem:FC<{
  title:string,
  masterNumber?:number,
  docterNumber?:number,
  img:string
}> = ({
  title,
  img,
  masterNumber,
  docterNumber
}) => {

  const { styles } = useStyles()

  return <div className={styles.relative}>
    <Flex className={styles.listItem} align='end'>
      <div>
        <img src={img} />
      </div>
      <div className={styles.listItemContent}>
        <div>{title}</div>
        <div style={{marginBlockStart:'0.46875vw'}}>
          硕士<span className={styles.valueColer}>{masterNumber}%</span>
          博士<span className={styles.valueColer}>{docterNumber}%</span>
        </div>
      </div>
    </Flex>
    <img src={DashBoard} className={styles.listItemDashBoard} />
    <div className={styles.listItemBg}></div>
  </div>
}

/**
 * @name 五大领域人才学历分布
 * @returns
 */
const EducationBackgroundDistribution:FC = () => {

  const { styles } = useStyles()

  return <div>
    <ContentBoxTitle title='五大领域人才学历分布' subTitle='EDUCATIONAL BACKGROUND DISTRIBUTION OF TALENTS IN THE FIVE MAJOR FIELDS' />
    <ContentBoxContent>
      <div className={styles.wrapper}>
        <Flex vertical justify='space-around'>
          <div className={styles.chartContainer}>1</div>
          <div className={styles.chartContainerTitle}>化学创新药硕博占比</div>
        </Flex>
        <div className={styles.rightContent}>
            <ListItem
              title='专业业务外包'
              img={WaiBao}
              masterNumber={22}
              docterNumber={4}
            />
            <ListItem
              title='现代生物技术药'
              img={Medicine}
              masterNumber={22}
              docterNumber={4}
            />
            <ListItem
              title='健康服务'
              img={Health}
              masterNumber={22}
              docterNumber={4}
            />
        </div>
      </div>
    </ContentBoxContent>
  </div>
}
export default EducationBackgroundDistribution
