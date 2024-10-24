// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const getEnterpriseInformationList = async (options?: { [key: string]: any },params:any) => {
  const res = await request<{
    data: ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[];
    success: boolean;
    msg:string,
    total:number,
    list: ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[],
  }>('/CommonWebApi/DMP/GetEnterpriseInformationList', {
    method: 'POST',
    data:{
      PageSize:options?.pageSize,
      PageIndex:options?.current,
    },
    skipErrorHandler:true
  });
  return {
    list: res.data,
    success: res.success,
    total: res.total,
  }
}

