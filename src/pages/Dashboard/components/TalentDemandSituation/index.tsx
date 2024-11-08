import {  } from '@umijs/max'
import { FC, useEffect } from 'react'
import { ConfigProvider, Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'
import GatheringOfHighLevelTalentsChartBarBg from '@/assets/box-content-bar-bg.png'
import { useModel } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components'
import {  useRequest } from 'ahooks'
import { getTalentAppealManagementList } from '@/services/enterpriseInformation';
import moment from 'moment'

const useStyles = createStyles({
  wrapper: {
    height:'calc(23.75vw - 2px)',
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
  },
  barContainer:{
    height: 'calc(10.3125vw - 2px)',
    paddingBlockStart:'1.25vw',
    paddingBlockEnd:'0.83333vw',
    borderBottom:'1px solid #1B4E83',
    paddingInline:'0.9375vw'
  },
  barItem: {
    backgroundImage: `url(${GatheringOfHighLevelTalentsChartBarBg})`,
    backgroundSize: '100%',
    backgroundPosition: 'left bottom',
    backgroundRepeat: 'no-repeat',
    width: '9.21875vw',
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
})
const TalentDemandSituation = () => {

  const { styles} = useStyles()

  const {data,run,loading} = useRequest(
    getTalentAppealManagementList,
  );

  const columns = [
    {
      title: '展示问题',
      dataIndex: 'appeal',
      ellipsis:true,
      align:'center'
    },
    {
      title: '诉求类型',
      dataIndex: 'appealType',
      ellipsis:true,
      align:'center'
    },
    {
      title: '联系人',
      dataIndex: 'contacts',
      ellipsis:true,
      align:'center'
    },
    {
      title: '诉求时间',
      dataIndex: 'appealTime',
      ellipsis:true,
      align:'center',
      renderText:(text:string)=>moment(text).format('YYYY-DD-MM')

    },
  ]

  console.log(data)

  useEffect(()=>{
    run()
  },[])

  return <div>
  <ContentBoxTitle title='人才诉求情况' subTitle='TALENT DEMAND SITUATION' />
  <ContentBoxContent>
    <div className={styles.wrapper}>
      <div>
        <Flex justify='space-between' className={styles.barContainer}>
          <Flex className={styles.barItem} vertical justify='space-between' align='center'>
            <Flex align='center'>
              <div className={styles.barNumber}>{data?.NUMBER_OF_PROBLEMS_YESTERDAY || 0}</div>
              <div className={styles.barUnit}>个</div>
            </Flex>
            <div className={styles.labelTitle} style={{paddingBottom:'0.52083vw'}}>昨日提问(条)</div>
          </Flex>
          <Flex className={styles.barItem} vertical justify='space-between' align='center'>
            <Flex align='center'>
              <div className={styles.barNumber}>{data?.NUMBER_OF_ISSUES_RESOLVED || 0}</div>
              <div className={styles.barUnit}>个</div>
            </Flex>
            <div className={styles.labelTitle} style={{paddingBottom:'0.52083vw'}}>已解决提问(条)</div>
          </Flex>
          <Flex className={styles.barItem} vertical justify='space-between' align='center'>
            <Flex align='center'>
              <div className={styles.barNumber}>{data?.PROBLEM_TOTAL || 0}</div>
              <div className={styles.barUnit}>个</div>
            </Flex>
            <div className={styles.labelTitle} style={{paddingBottom:'0.52083vw'}}>历史总提问(条)</div>
          </Flex>
        </Flex>
      </div>
      <div style={{padding:'0.9375vw',}}>
        <ConfigProvider
          theme={{
            components:{
              Table:{
                borderColor:'#1B4E83',
                headerBg:'linear-gradient(0deg, rgba(25, 53, 117, 1), rgba(25, 75, 161, 1))',
                headerColor:'#fff'
              }
            },
            token:{
              colorText:'#fff',
              colorBgContainer:'rgba(32, 59, 125, 0.65)',
              fontSize:''
            }
          }}
        >
          <ProTable
            options={false}
            search={false}
            pagination={false}
            columns={columns}
            bordered
            dataSource={data?.list}
            scroll={{
              y: document.documentElement.clientWidth / 1920 * 175
            }}
            loading={loading}
          />
        </ConfigProvider>

      </div>
    </div>
  </ContentBoxContent>
</div>
};

export default TalentDemandSituation
