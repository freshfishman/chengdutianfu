import { useEffect, useState, useRef } from 'react'
import {  } from '@umijs/max'
import {  } from 'antd'
import { createStyles } from 'antd-style'
import { Chart } from '@antv/g2'
import { ContentBoxTitle , ContentBoxContent } from '../ContentBox'

const useStyles = createStyles(() => ({
  annualNumberOfNewPatentAuthorizationsCharts:{
    height: 'calc(12.29167vw - 2px)'
  }
}))

const AnnualNumberOfNewPatentAuthorizationsCharts = () => {

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
      insetTop:40
    });

    chart.data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.symbol === 'GOOG',
        },
      ],
    });

    chart
      .area()
      .encode('x', (d) => new Date(d.date))
      .encode('y', 'price')
      .style('fill', 'linear-gradient(180deg, rgba(36, 122, 255, 0.2), rgba(12, 94, 209, 0.2), rgba(13, 30, 68, 0.2))');

    chart
      .line()
      .encode('x', (d) => new Date(d.date))
      .encode('y', 'price')
      .style('stroke', '#264399')
      .style('lineWidth', 2);
    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
  },[])

  return (
    <div>
      <ContentBoxTitle title='生物城人才增长趋势' subTitle='ANNUAL NUMBER OF NEW PATENT AUTHORIZATIONS' />
      <ContentBoxContent>
        <div ref={containerRef} className={styles.annualNumberOfNewPatentAuthorizationsCharts}>111</div>
      </ContentBoxContent>
    </div>
  );
}

export default AnnualNumberOfNewPatentAuthorizationsCharts;
