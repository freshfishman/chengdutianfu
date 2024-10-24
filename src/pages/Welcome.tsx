import { PageContainer, ProFormUploadButton, ProTable } from '@ant-design/pro-components';
import { useAntdTable } from 'ahooks'
import { getEnterpriseInformationList } from '@/services/enterpriseInformation';
import React from 'react';
const Welcome: React.FC = () => {

  const {tableProps,search} = useAntdTable(
    getEnterpriseInformationList,
    {
      manual: true,
      defaultPageSize:10
    },
  );

  const columns = [
    {
      title:'序号',
      render:(_,record,index)=><div>{index+1}</div>,
      width:80
    },
    {
      title: '企业名称',
      dataIndex: 'EI_ENTERPRISE_NAME',
      ellipsis:true
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'EI_UNIFY_THE_SOCIAL_CREDIT_CODE',
      ellipsis:true
    },
    {
      title: '法人代表',
      dataIndex: 'EI_LEGAL_PERSON',
      ellipsis:true,
      width:120
    },
    {
      title: '网址',
      dataIndex: 'EI_OFFICIAL_WEBSITE',
      ellipsis:true
    },
    {
      title: '邮箱',
      dataIndex: 'EI_EMAIL',
      ellipsis:true
    },
    {
      title: '地址',
      dataIndex: 'EI_BUSINESS_REGISTERED_ADDRESS',
      ellipsis:true
    }
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
            action: '/CommonWebApi/DMP/SubmitEnterpriseInformationListByExcel',
            headers: {
              Authorization: localStorage.getItem('token') as unknown as string,
            },
            showUploadList:false,
          }}
          title="上传企业文件"
          accept='.xlsx'
        />,
      ]}
    >
      <ProTable
        columns={columns}
        {...tableProps}
        options={false}
        search={false}
       />
    </PageContainer>
  );
};

export default Welcome;
