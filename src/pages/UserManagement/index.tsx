import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message,Form } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { getUserList,updateUser } from '@/services/usermanagement';
import { useAntdTable } from 'ahooks'
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const [form] = Form.useForm()

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { tableProps,search } = useAntdTable(getUserList,{
    defaultPageSize: 10,
    manual:true
  })

  const { submit,reset } = search

  useEffect(() => {
    submit()
  }, [])

  const columns: ProColumns<USERMANAGEMENT.USERMANAGEMENT>[] = [
    {
      title:'序号',
      dataIndex:'index',
      width:80,
      renderText: (text,record,index) => index+1
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '管理员',
      dataIndex: 'isAdmin',
      render:(text)=><div>{text?'是':'否'}</div>
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            console.log(record)
            handleUpdateModalOpen(true);
            form.setFieldsValue({
              isAdmin:record.isAdmin,
              spuId:record.spuId
            })
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<USERMANAGEMENT.USERMANAGEMENT, API.PageParams>
        actionRef={actionRef}
        rowKey="spuId"
        options={false}
        search={false}

        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        {...tableProps}
      />
      <ModalForm
        title='修改用户'
        layout='horizontal'
        width="600px"
        form={form}
        open={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onFinish={async (value) => {
          const success = await updateUser(value as USERMANAGEMENT.UPDATEUSERMANAGEMENT);
          if (success) {
            handleUpdateModalOpen(false);
            reset()
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: false,
              message: '请输入用户名',
            },
          ]}
          name="newName"
          label="用户名"
          labelCol={{span:4}}
          placeholder="请输入用户名"
        />
        <ProFormText.Password
          rules={[
            {
              required: false,
              message: '请输入密码',
            },
          ]}
          name="newPassword"
          label="密码"
          labelCol={{span:4}}
          placeholder="请输入密码"
        />
        <ProFormRadio.Group
          name="isAdmin"
          label="管理员"
          labelCol={{span:4}}
          options={[
            {
              value: true,
              label: '是',
            },
            {
              value: false,
              label: '否',
            },
          ]}
        />
        <ProFormText name='spuId' hidden />
      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
