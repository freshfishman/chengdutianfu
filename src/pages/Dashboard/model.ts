import { useState } from 'react'
import { useRequest } from '@umijs/max'
import { getEnterpriseInformation,getTalentInformation } from '@/services/enterpriseInformation'

export default function () {

  const [tabIndex,setTabIndex] = useState<number>(0)

  const {data:talentInformationData,run:getTalentInformationData} = useRequest(()=>getTalentInformation({}),{manual:true})

  const {data:enterpriseInformationData, run:getEnterpriseInformationData} = useRequest(()=>getEnterpriseInformation({}),{manual:true})

  return {
    tabIndex,
    setTabIndex,
    talentInformationData,
    enterpriseInformationData,
    getTalentInformationData,
    getEnterpriseInformationData
  }

}
