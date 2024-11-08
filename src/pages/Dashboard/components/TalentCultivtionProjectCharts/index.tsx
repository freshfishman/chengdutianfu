import { useModel } from '@umijs/max'
import { FC } from 'react'
import { Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'
import TalentBg from '@/assets/talent-bg.png'
import TalentDaborder from '@/assets/talent-daborder.png'

const useStyles = createStyles({
  wrapper: {
    height:'calc(13.59375vw - 2px)',
    paddingInline:'1.09375vw',
    paddingBlock:'0.625vw',
    display:'flex',
    alignItems:'stretch',
    color:'#fff',
    justifyContent:'space-between'
  },
  listItem: {
    textAlign:'center',
    width:'8.90625vw',
    background:'rgba(20, 41, 115, 0.3)',
    border:'1px solid rgba(92, 187, 255, 0.3)',
    paddingBlockStart:'0.625vw',
    height:'100%'
  },
  listItemContent:{
    minHeight:'2.8125vw',
    fontSize:'0.729166vw',
    marginBlockStart:'0.78125vw',
    width:'100%',
    paddingBlock:'0.625vw',
    background:'linear-gradient(90deg, rgba(18, 31, 100, 0.6), rgba(28, 81, 172, 0.6), rgba(14, 24, 78, 0.6))',
    position:'relative',
  },
  talentDaborder:{
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    top:'-0.20833vw',
    height:'0.20833vw'
  },
  valueColer:{
    color:'#00E0FF',
    fontSize:'0.9375vw'
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
  },
  desc:{
    background:`url(${TalentBg})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    width:'6.25vw',
    height:'6.25vw',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    fontSize:'0.83333vw',
    whiteSpace:'pre'
  },
  unit:{
    fontSize:'0.9375vw'
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
  subTitle:string,
  desc: string
}> = ({
  title,
  value,
  subTitle,
  desc
}) => {

  const { styles } = useStyles()

  return <div className={styles.relative}>
    <Flex className={styles.listItem} vertical align='center' justify='space-around'>
      <div className={styles.desc}>
        <div dangerouslySetInnerHTML={{__html: desc}}></div>
      </div>
      <span ><span className={styles.valueColer}>{value}</span><span className={styles.unit}>人</span></span>
      <Flex className={styles.listItemContent} vertical align='center'>
        <div>{title}</div>
        <div>{subTitle}</div>
        <img className={styles.talentDaborder} src={TalentDaborder} />
      </Flex>
    </Flex>
  </div>
}

/**
 * @name 人才培育工程
 * @returns
 */
const TalentCultivtionProjectCharts:FC = () => {

  const { styles } = useStyles()

  const { talentInformationData } = useModel('Dashboard.model')

  return <div>
    <ContentBoxTitle title='人才培育工程' subTitle='TALENT CULTIVTION PROJECT' />
    <ContentBoxContent>
      <div className={styles.wrapper}>
        <ListItem
          title='技能人才专业能力'
          subTitle="培养工程"
          desc="技能<br/>人才"
          value={talentInformationData?.TR_SKILLED_TALENTS}
          unit={<span>个</span>}
        />
        <ListItem
          title='青年人才职业素质'
          subTitle="提升工程"
          desc="青年<br/>人才"
          value={talentInformationData?.TR_YOUTH_TALENT}
          unit={<span>个</span>}
        />
        <ListItem
          title='青年人才主题化'
          subTitle="赋能工程"
          desc="复合<br/>型人才"
          value={talentInformationData?.TR_VERSATILE_TALENT}
          unit={<span className={styles.valueColer}>%</span>}
        />
      </div>
    </ContentBoxContent>
  </div>
}
export default TalentCultivtionProjectCharts
