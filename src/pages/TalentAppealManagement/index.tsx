import { PageContainer, ProFormUploadButton, ProTable } from '@ant-design/pro-components';
import { useAntdTable } from 'ahooks'
import { getTalentAppealManagementList } from '@/services/enterpriseInformation';
import React from 'react';
const TalentAppealManagement: React.FC = () => {

  const {tableProps,search} = useAntdTable(
    getTalentAppealManagementList,
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
      title: '展示问题',
      dataIndex: 'appeal',
      ellipsis:true
    },
    {
      title: '诉求类型',
      dataIndex: 'appealType',
      ellipsis:true,
      width:'10%'
    },
    {
      title: '联系人',
      dataIndex: 'contacts',
      ellipsis:true,
      width:120
    },
    {
      title: '诉求时间',
      dataIndex: 'appealTime',
      ellipsis:true,
      width:'15%',
      valueType: 'dateTime',
    },
    {
      title: '诉求情况',
      dataIndex: 'isResolved',
      ellipsis:true,
      valueType: 'select',
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
      width:'10%'
    },
  ]

  const { submit } = search

  React.useEffect(()=>{
    submit()
  },[])

  return (
    <PageContainer
      fixedHeader
      extra={[
        <ProFormUploadButton
          key="upload"
          fieldProps={{
            name: 'file',
            action: '/CommonWebApi/DMP/SubmitTalentAppealInformationByExcel',
            headers: {
              Authorization: localStorage.getItem('token') as unknown as string,
            },
            showUploadList:false,
          }}
          title="上传人才诉求文件"
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

export default TalentAppealManagement;
