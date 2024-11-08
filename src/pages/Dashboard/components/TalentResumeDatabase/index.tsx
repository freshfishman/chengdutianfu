import {  } from '@umijs/max'
import { useEffect } from 'react'
import { ConfigProvider, Flex } from 'antd'
import { createStyles } from  'antd-style'
import { ContentBoxContent,ContentBoxTitle } from '../ContentBox'
import { useAntdTable } from 'ahooks'
import { getTalentResumeManagementList } from '@/services/enterpriseInformation';
import { ListColumn, ListTable } from '@visactor/react-vtable'
import { ProConfigProvider, ProTable } from '@ant-design/pro-components'

const useStyles = createStyles({
  wrapper: {
    height:'calc(20.729167vw - 2px)',
    fontWeight: 400,
    background:'rgba(32, 59, 125, 0.65)',
    padding:'0.833333vw'
  },
})
const TalentResumeDatabase = () => {

  const {tableProps,search} = useAntdTable(
    getTalentResumeManagementList,
    {
      manual: true,
      defaultPageSize:100
    },
  );

  const { dataSource } = tableProps

  const { styles} = useStyles()

  const columns = [
    {
      title: '姓名',
      dataIndex: 'TP_NAME',
      align:'center',
      width: document.documentElement.clientWidth / 1920 * 90
    },
    {
      title: '专业',
      dataIndex: 'TP_SPECIALTY',
      align:'center',
      width: document.documentElement.clientWidth / 1920 * 90
    },
    {
      title: '学历',
      dataIndex: 'TP_EDUCATION_BACKGROUND',
      align:'center',
      width: document.documentElement.clientWidth / 1920 * 90
    },
    {
      title: '工作年限',
      dataIndex: 'TP_WORKING_YEARS',
      align:'center',
      width: document.documentElement.clientWidth / 1920 * 100
    },
    {
      title: '毕业院校',
      align:'center',
      dataIndex: 'TP_GRADUATE_INSTITUTIONS',
    },
  ]

  const { submit } = search

  useEffect(()=>{
    submit()
  },[])

  return <div>
  <ContentBoxTitle title='紧缺人才简历库' subTitle='TALENT RESUME DATABASE' />
  <ContentBoxContent>
    <div className={styles.wrapper}>
      {/* <ListTable records={dataSource} defaultColWidth={document.documentElement.clientWidth / 1920 * 100} theme={}>
        {
          columns.map(item=>{
            return <ListColumn key={item.field} field={item.field} width='auto' title={item.title} headerStyle={{bgColor:'rgba(25, 53, 117, 0.8)',color:'#fff'}} />
          })
        }
      </ListTable> */}
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
          columns={columns}
          {...tableProps}
          options={false}
          search={false}
          pagination={false}
          bordered
          scroll={{
            y:318
          }}
        />
      </ConfigProvider>

    </div>
  </ContentBoxContent>
</div>
};

export default TalentResumeDatabase
