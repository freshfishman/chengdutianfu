import { PageContainer, ProFormUploadButton, ProTable } from '@ant-design/pro-components';
import { useAntdTable } from 'ahooks'
import { getTalentResumeManagementList } from '@/services/enterpriseInformation';
import React from 'react';
const TalentResumeManagement: React.FC = () => {

  const {tableProps,search} = useAntdTable(
    getTalentResumeManagementList,
    {
      manual: true,
      defaultPageSize:100
    },
  );

  const columns = [
    {
      title:'序号',
      render:(_,record,index)=><div>{index+1}</div>,
      width:80
    },
    {
      title: '姓名',
      dataIndex: 'TP_NAME',
      ellipsis:true
    },
    {
      title: '专业',
      dataIndex: 'TP_SPECIALTY',
      ellipsis:true
    },
    {
      title: '学历',
      dataIndex: 'TP_EDUCATION_BACKGROUND',
      ellipsis:true,
      width:120
    },
    {
      title: '工作年限',
      dataIndex: 'TP_WORKING_YEARS',
      ellipsis:true
    },
    {
      title: '毕业院校',
      dataIndex: 'TP_GRADUATE_INSTITUTIONS',
      ellipsis:true
    },
  ]

  const { submit } = search

  React.useEffect(()=>{
    submit()
  },[])

  return (
    <PageContainer
      extra={[
        <ProFormUploadButton
          key="upload"
          fieldProps={{
            name: 'file',
            action: '/CommonWebApi/DMP/SubmitTalentPoolInformationByExcel',
            headers: {
              Authorization: localStorage.getItem('token') as unknown as string,
            },
            showUploadList:false,
            onChange:({file})=>{
              if(file.response?.success) {
                submit()
              }else{
                message.error(file.response?.msg)
              }
            }
          }}
          title="上传人才简历文件"
          accept='.xlsx'
        />,
      ]}
    >
      <ProTable
        columns={columns}
        {...tableProps}
        options={false}
        search={false}
        pagination={false}
       />
    </PageContainer>
  );
};

export default TalentResumeManagement;
