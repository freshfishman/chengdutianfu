import {  } from 'react'
import {  } from '@umijs/max'
import {  } from 'antd'
import { createStyles } from 'antd-style'
import { ContentBoxTitle , ContentBoxContent } from '../ContentBox'

const useStyles = createStyles(() => ({
  annualNumberOfNewPatentAuthorizationsCharts:{
    height: 'calc(12.29167vw - 2px)'
  }
}))

const AnnualNumberOfNewPatentAuthorizationsCharts = () => {

  const { styles } = useStyles();

  return (
    <div>
      <ContentBoxTitle title='生物城人才增长趋势' subTitle='ANNUAL NUMBER OF NEW PATENT AUTHORIZATIONS' />
      <ContentBoxContent>
        <div className={styles.annualNumberOfNewPatentAuthorizationsCharts}>111</div>
      </ContentBoxContent>
    </div>
  );
}

export default AnnualNumberOfNewPatentAuthorizationsCharts;
