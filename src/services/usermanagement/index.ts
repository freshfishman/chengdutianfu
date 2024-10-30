import { request } from "@umijs/max";

/**
 * @name 获取用户列表
 */
export async function getUserList(params?: any,params1?:any) {
  const res = await request<{
    data: USERMANAGEMENT.USERMANAGEMENT[]
  }>('/CommonWebApi/GetUserListInfo', {
    method: 'POST',
    data: {
      PageIndex:params.current,
      PageSize:params.pageSize,
      ...params1
    },
  });
  return {
    list:res.data,
    total:res.data.length
  }
}

/**
 * @name 修改用户信息
 */
export async function updateUser(params: USERMANAGEMENT.UPDATEUSERMANAGEMENT) {
  return request('/CommonWebApi/UpdateUserInfo', {
    method: 'POST',
    data: params,
  });
}
