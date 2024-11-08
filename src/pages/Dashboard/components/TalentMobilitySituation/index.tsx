import { useModel } from '@umijs/max'
import { FC } from 'react'
import { Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'
import TalentMobilitySituation1 from '@/assets/talent-mobility-situation1.png'
import TalentMobilitySituation2 from '@/assets/talent-mobility-situation2.png'
import TalentMobilitySituation3 from '@/assets/talent-mobility-situation3.png'
import TalentMobilitySituation4 from '@/assets/talent-mobility-situation4.jpg'

const useStyles = createStyles({
  wrapper: {
    height:'calc(13.59375vw - 2px)',
    paddingInlineStart:'8.4375vw',
    paddingInlineEnd:'3.28125vw',
    display:'flex',
    alignItems:'center',
    color:'#fff',
    justifyContent:'space-between',
    background:
        `url(${TalentMobilitySituation2}) no-repeat top 4.1666vw left 5.46875vw / 20.41666vw,
        url(${TalentMobilitySituation1}) no-repeat top 3.28125vw left 1.875vw / 12.5vw,
        url(${TalentMobilitySituation3}) no-repeat top 3.125vw left 10.3125vw / 11.5625vw,
        url(${TalentMobilitySituation4}) no-repeat top 3.59375vw left 22.8125vw / 5.9375vw`,
    fontSize:'1.25vw',
    fontWeight: 400,
  },
  unit :{
    fontSize:'0.9375vw'
  },
  number:{
    fontSize:'1.458333vw',
    color: '#00E0FF',
    background:'linear-gradient(0deg, #7EE3F8 0%, #A5F1FF 49.853515625%, #D9FFFF 100%)',
    backgroundClip:'text',
    textFillColor: 'transparent',
    fontWeight: 400,
  }
})
const TalentMobilitySituation = () => {

  const { styles} = useStyles()

  const { talentInformationData } = useModel('Dashboard.model')

  return <div>
  <ContentBoxTitle title='人才流动情况' subTitle='TALENT MOBILITY SITUATION' />
  <ContentBoxContent>
    <div className={styles.wrapper}>
      <div>
        <div>人才</div>
        <div>流动</div>
      </div>
      <div>
        <span className={styles.number}>{talentInformationData?.TR_QUANTITY_OF_TALENT_INFLOW}</span>
        <span className={styles.unit}>人</span>
      </div>
      <div>{talentInformationData?.TR_TALENT_INFLOW_TIME}</div>
    </div>
  </ContentBoxContent>
</div>
};

export default TalentMobilitySituation
