import {  } from 'react'
import {  } from '@umijs/max'
import { } from 'antd'
import { createStyles } from 'antd-style'

import { ContentBoxContent, ContentBoxTitle } from '../ContentBox'

const useStyles = createStyles(() => ({
  enterpriseInfo:{
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '20px',
    height: '100%'
  },
  heatmap:{
    width: '100%',
    height: '21.71875vw'
  }
}))

const HeatMap = () => {

  const { styles } = useStyles()

  return <>
    <div>
      <ContentBoxTitle title='生物城人才热力值' subTitle='TALENT HEAT VALUE IN THE BIOLOGICAL CITY' />
      <ContentBoxContent>
        <div className={styles.heatmap}></div>
      </ContentBoxContent>
    </div>
  </>
}

export default HeatMap
