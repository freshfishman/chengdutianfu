import {  } from 'react'
import { useModel } from '@umijs/max'
import { Flex } from 'antd'
import { createStyles } from 'antd-style'
import { ContentBoxTitle , ContentBoxContent } from '../ContentBox'

import NationalBg from '@/assets/national.png'
import ProvincialBg from '@/assets/provincial.png'
import MunicipalBg from '@/assets/municipal.png'
import LeadingTalentBg from '@/assets/leading-talents.png'
import SeniorBg from '@/assets/senior.png'
import IntermediateBg from '@/assets/intermediate.png'
import JuniorBg from '@/assets/junior.png'
import OverseaTalentsBg from '@/assets/overseas-talents.png'


const useStyles = createStyles(() => ({
  empoweringHighLevelTalents:{
    height: 'calc(23.17708vw - 2px)',
    paddingInline:'1.97916vw',
    paddingBlock:'1.25vw'
  },
  listItem:{
    position:'relative',
    width:'12.5vw',
    height:'4.27083vw',
  },
  listItemBg:{
    width:'100%',
    height:'100%',
    position:'absolute',
    left:0,
    top:0
  },
  listItemContainer:{
    position:'relative',
    marginInlineStart:'4.84375vw'
  },
  listItemTitle: {
    paddingBlockStart:'0.625vw',
    color:'#fff'
  },
  listItemTitleNumber:{
    fontSize:'1.04167vw',
    marginInlineEnd:'0.26042vw'
  },
  listItemTitleUnit:{
    fontSize:'0.72917vw',
  },
  listItemDesc:{
    fontSize:'0.83333vw',
    color:'#54B1E5'
  }
}))

const EmpoweringHighLevelTalents = () => {

  const { talentInformationData }  = useModel('Dashboard.model')

  const { styles } = useStyles();

  return (
    <div>
      <ContentBoxTitle title='高层次人才赋能' subTitle='EMPOWERING HIGH-LEVEL TALENTS' />
      <ContentBoxContent>
        <Flex className={styles.empoweringHighLevelTalents} justify='space-between'>
          <Flex vertical justify='space-around' >
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={NationalBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{ talentInformationData?.TR_NATIONAL_TALENT || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>国家级人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={MunicipalBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_MUNICIPAL_TALENTS || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>市级人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={SeniorBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_PROFESSIONAL_AND_TECHNICAL_SENIOR_PERSONNEL || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>专业技术高级人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={JuniorBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_PROFESSIONAL_AND_TECHNICAL_JUNIOR_PERSONNEL || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>专业技术初级人才</div>
              </div>
            </Flex>
          </Flex>
          <Flex vertical justify='space-around' >
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={ProvincialBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_PROVINCIAL_TALENTS || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>省级人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={LeadingTalentBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_INDUSTRY_LEADER || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>产业领军人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={IntermediateBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_INTERMEDIATE_PROFESSIONAL_AND_TECHNICAL_PERSONNEL || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>专业技术中级人才</div>
              </div>
            </Flex>
            <Flex className={styles.listItem} >
              <img className={styles.listItemBg} src={OverseaTalentsBg} />
              <div className={styles.listItemContainer}>
                <Flex align='end' className={styles.listItemTitle}>
                  <div className={styles.listItemTitleNumber}>{talentInformationData?.TR_OVERSEAS_HIGH_LEVEL_TALENTS || 0}</div>
                  <div className={styles.listItemTitleUnit}>个</div>
                </Flex>
                <div className={styles.listItemDesc}>海外高层次人才</div>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </ContentBoxContent>
    </div>
  );
}

export default EmpoweringHighLevelTalents;
