import {  } from 'react'
import {  } from '@umijs/max'
import { Flex } from 'antd'
import { createStyles } from 'antd-style'

import RegisteredEnterprise from '@/assets/registered-enterprise.png'
import IndustryProfessionals from '@/assets/industry-professionals.png'
import HighQualityTalents from '@/assets/high-quality-talents.png'
import Separate from '@/assets/separate.png'

const useStyles = createStyles(() => ({
  enterprisesInfo: {
    paddingBlockStart:'1.71875vw',
    paddingInline:'1.40625vw',
  },
  registeredEnterpriseInfo:{
    backgroundImage: `url(${RegisteredEnterprise})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    height: '7.29167vw',
    width: '6.145833vw',
    flexShrink:0,
    paddingBlockStart:'5.20833vw',
    boxSizing:'border-box',
  },
  IndustryProfessionalsInfo:{
    backgroundImage: `url(${IndustryProfessionals})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    height: '7.29167vw',
    width: '6.145833vw',
    flexShrink:0,
    paddingBlockStart:'5.20833vw',
    boxSizing:'border-box',
  },
  highQualityTalentsInfo:{
    backgroundImage: `url(${HighQualityTalents})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    height: '7.29167vw',
    width: '6.145833vw',
    flexShrink:0,
    paddingBlockStart:'5.20833vw',
    boxSizing:'border-box',
  },
  statics:{
    textAlign:'center',
    color:'#fff',
    fontSize:'0.9375vw',
    paddingBlockEnd:'0.625vw',
    lineHeight:1
  },
  staticsNumber:{
    fontWeight:600,
    fontStyle:'italic',
    letterSpacing:'0.083333vw',
  },
  unit:{
    fontSize:'0.83333vw'
  },
  contentBoxHeaderTitle:{
    fontSize:'0.72917vw',
    background: 'linear-gradient(0deg, #569DE1 0%, #82B4DE 49.853515625%, #F6FFFF 100%)',
    backgroundClip: 'text',
    fontStyle:'italic',
    color:'#F4FBFE',
    WebkitTextFillColor:'transparent',
    fontWeight:600,
    width:'100%',
    textAlign:'center'
  },
  separate: {
    height: '3.125vw',
    width: '0.10417vw',
    backgroundImage: `url(${Separate})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    marginBlockStart:'0.88542vw'
  }
}))

const RegisteredEnterpriseInfo = () => {
  const { styles } = useStyles()
  return (<>
    <div className={styles.registeredEnterpriseInfo}>
      <div className={styles.statics}>
        <span className={styles.staticsNumber}>538</span>
        <span className={styles.unit}> 家</span>
      </div>
      <div className={styles.contentBoxHeaderTitle}>注册企业</div>
    </div>
  </>)
}

const IndustryProfessionalsInfo = () => {
  const { styles } = useStyles()
  return (<>
    <div className={styles.IndustryProfessionalsInfo}>
      <div className={styles.statics}>
        <span className={styles.staticsNumber}>15160</span>
        <span className={styles.unit}> 个</span>
      </div>
      <div className={styles.contentBoxHeaderTitle}>产业人才</div>
    </div>
  </>)
}

const HighQualityTalentsInfo = () => {
  const { styles } = useStyles()
  return (<>
    <div className={styles.highQualityTalentsInfo}>
      <div className={styles.statics}>
        <span className={styles.staticsNumber}>10616</span>
        <span className={styles.unit}> 人</span>
      </div>
      <div className={styles.contentBoxHeaderTitle}>高素质青年人才</div>
    </div>
  </>)
}

const SeparateDivider = () => {
  const { styles } = useStyles()
  return <>
  <div className={styles.separate}></div>
  </>
}

const EnterprisesInfo = () => {

  const { styles } = useStyles()

  return (<>
    <div className={styles.enterprisesInfo}>
      <Flex justify='space-between'>
        <RegisteredEnterpriseInfo />
        <SeparateDivider />
        <IndustryProfessionalsInfo />
        <SeparateDivider />
        <HighQualityTalentsInfo />
      </Flex>
    </div>
  </>)
}

export default EnterprisesInfo
