import { useModel } from '@umijs/max'
import { FC } from 'react'
import { Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'

import ABC from '@/assets/abc.png'
import MasterDocter from '@/assets/master-docter.png'
import LeadOversea from '@/assets/lead-oversea.png'

const useStyles = createStyles({
  wrapper: {
    height:'calc(14.0625vw - 2px)',
    paddingInline:'0.46875vw',
    paddingBlock:'1.25vw',
    display:'flex',
    alignItems:'stretch',
    color:'#fff'
  },
  listItem: {
    textAlign:'center',
  },
  listItemContent:{
    minHeight:'2.8125vw',
    fontSize:'0.9375vw',
    maxWidth:'5.625vw',
    marginBlockStart:'0.78125vw',
  },
  valueColer:{
    color:'#00E0FF'
  },
  relative:{
    position:'relative',
  },
  listItemValue:{
    position:'absolute',
    top:'1.25vw',
    left:'50%',
    margin:'auto',
    transform:'translate(-50%, -50%)',
    fontSize:'1.25vw'
  }
})

/**
 * @name 列表项
 * @param title 标题
 * @param value 内容
 * @returns
 *
 */
const ListItem:FC<{
  title:string,
  img:string,
  value?:number,
  unit?:React.ReactNode
}> = ({
  title,
  img,
  value,
  unit
}) => {

  const { styles } = useStyles()

  return <div className={styles.relative}>
    <Flex className={styles.listItem} vertical align='center' justify='space-around'>
      <div>
        <img src={img} />
      </div>
      <Flex className={styles.listItemContent} align='center'>
        <div>{title}</div>
      </Flex>
    </Flex>
    <div className={styles.listItemValue}>
      <span className={styles.valueColer}>{value}</span>
      <span>{unit}</span>
    </div>
  </div>
}

/**
 * @name 高质量人才引领
 * @returns
 */
const TalentCultivtionProject:FC = () => {

  const { styles } = useStyles()

  const { talentInformationData } = useModel('Dashboard.model')

  return <div>
    <ContentBoxTitle title='高质量人才引领' subTitle='TALENT CULTIVTION PROJECT' />
    <ContentBoxContent>
      <div className={styles.wrapper}>
        <ListItem
          title='产业领军人才（A+B+C）'
          img={ABC}
          value={talentInformationData?.TR_INDUSTRY_LEADER_ABC}
          unit={<span>个</span>}
        />
        <ListItem
          title='产业领军人才中的海归人数'
          img={LeadOversea}
          value={ talentInformationData?.TR_INDUSTRY_LEADER_RETURNEE }
          unit={<span>个</span>}
        />
        <ListItem
          title='硕博人才占比'
          img={MasterDocter}
          value={ talentInformationData?.TR_HIGH_QUALITY_PERSONNEL_DOCTORATE_RATIO }
          unit={<span className={styles.valueColer}>%</span>}
        />
      </div>
    </ContentBoxContent>
  </div>
}
export default TalentCultivtionProject
