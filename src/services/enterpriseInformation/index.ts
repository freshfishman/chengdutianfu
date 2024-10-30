// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const getEnterpriseInformationList = async (options?: { [key: string]: any },params?:any) => {
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

/**
 * @name 获取人才简历列表
*/
export const getTalentResumeManagementList = async (options?: { [key: string]: any },params?:any) => {
  const res = await request<{
    data: ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[];
    success: boolean;
    msg:string,
    total:number,
    list: ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[],
  }>('/CommonWebApi/DMP/GetTalentPoolInformation', {
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
    total: res.data.length,
  }
}

/**
 * @name 获取人才诉求列表
*/
export const getTalentAppealManagementList = async (options?: { [key: string]: any },params?:any) => {
  const res = await request<{
    data: {
      TalentAppealList:ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[],
      NUMBER_OF_PROBLEMS_YESTERDAY:number,
      NUMBER_OF_ISSUES_RESOLVED:number,
      PROBLEM_TOTAL:number
    };
    success: boolean;
    msg:string,
    total:number,
    list: ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONITEM[],
  }>('/CommonWebApi/DMP/GetTalentAppealInformation', {
    method: 'POST',
    data:{
      PageSize:options?.pageSize,
      PageIndex:options?.current,
    },
    skipErrorHandler:true
  });
  return {
    list: res.data.TalentAppealList,
    success: res.success,
    total: res.data.TalentAppealList.length,
    NUMBER_OF_PROBLEMS_YESTERDAY:res.data.NUMBER_OF_PROBLEMS_YESTERDAY,
    NUMBER_OF_ISSUES_RESOLVED:res.data.NUMBER_OF_ISSUES_RESOLVED,
    PROBLEM_TOTAL:res.data.PROBLEM_TOTAL
  }
}


//获取图表人才信息部分数据
export async function getTalentInformation(params?: any) {
  return request<{
    data:ENTERPRISEINFORMATION.TALENTINFORMATIONSTATEMENT
  }>('/CommonWebApi/DMP/GetTalentInformationStatement', {
    method: 'POST',
    data: params,
  });
}

//获取图表企业部分数据
export async function getEnterpriseInformation(params?: any) {
  return request<{
    data:ENTERPRISEINFORMATION.ENTERPRISEINFORMATIONSTATEMENT
  }>('/CommonWebApi/DMP/GetEnterpriseInformationStatement', {
    method: 'POST',
    data: params,
  });
}

