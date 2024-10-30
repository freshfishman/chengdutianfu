import { useEffect, useState, useRef } from 'react'
import { useModel } from '@umijs/max'
import {  } from 'antd'
import { createStyles } from 'antd-style'
import { Chart } from '@antv/g2'
import { ContentBoxTitle , ContentBoxContent } from '../ContentBox'

import moment from 'moment'

const useStyles = createStyles(() => ({
  annualNumberOfNewPatentAuthorizationsCharts:{
    height: 'calc(12.29167vw - 2px)'
  }
}))

const AnnualNumberOfNewPatentAuthorizationsCharts = () => {


  const { talentInformationData, } = useModel('Dashboard.model')

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
    });

    chart
      .area()
      .encode('x', (d) => d.year)
      .encode('y', 'value')
      .encode('shape', 'area') // 'area', 'smooth', 'hvh', 'vh', 'hv'
      .style('fill', 'linear-gradient(180deg, rgba(36, 122, 255, 0.2), rgba(12, 94, 209, 0.2), rgba(13, 30, 68, 0.2))')
      // .axis('y', { labelFormatter: '~s', title: false });
        .axis({
        y:{
          line:true,
          lineStroke:'#244D6E',
          tickStroke:'#244D6E',
          labelStroke:'#A3B2CD',
          labelFill:'#A3B2CD',
          grid:true,
          gridStroke:'#fff',
          gridLineWidth:2,
          gridLineDash:[0,0],
          title:''
        },
        x:{
          line:true,
          lineStroke:'#244D6E',
          tickStroke:'#244D6E',
          labelStroke:'#A3B2CD',
          labelFill:'#A3B2CD',
          grid:false,
          gridStroke:'#fff',
          gridLineWidth:2,
          gridLineDash:[0,0],
          title:''
        }
      })
      .tooltip(false)


    // chart
    //   .area()
    //   .encode('x', (d) => new Date(d.date))
    //   .encode('y', 'price')
    //   .style('fill', 'linear-gradient(180deg, rgba(36, 122, 255, 0.2), rgba(12, 94, 209, 0.2), rgba(13, 30, 68, 0.2))');

    chart
      .line()
      .encode('x', (d) => d.year)
      .encode('y', 'value')
      .style('stroke', '#264399')
      .style('lineWidth', 2)
      .tooltip(false)
      // .axis({
      //   y:{
      //     line:true,
      //     lineStroke:'#244D6E',
      //     tickStroke:'#244D6E',
      //     labelStroke:'#A3B2CD',
      //     labelFill:'#A3B2CD',
      //     grid:true,
      //     gridStroke:'#fff',
      //     gridLineWidth:2,
      //     gridLineDash:[0,0],
      //     title:''
      //   },
      //   x:{
      //     line:true,
      //     lineStroke:'#244D6E',
      //     tickStroke:'#244D6E',
      //     labelStroke:'#A3B2CD',
      //     labelFill:'#A3B2CD',
      //     grid:false,
      //     gridStroke:'#fff',
      //     gridLineWidth:2,
      //     gridLineDash:[0,0],
      //     title:''
      //   }
      // })
    // 渲染可视化

    chart.point().encode('x', (d) => d.year).encode('y', 'value').tooltip({
      items: [
        (d) => ({
          name: d.year,
          value: d.value,
        })
      ],
    });

    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
    if(talentInformationData?.TALENTS_GROWTH_TREND) {
      const data : {
        year:string,
        value:number
      }[] = []
      const keys = Object.keys(talentInformationData?.TALENTS_GROWTH_TREND).sort()
      // chart.current.changeData(talentInformationData?.)
      keys.forEach(item=>{
        data.push({
          year:moment(item).format('YYYY'),
          value:talentInformationData?.TALENTS_GROWTH_TREND[item]
        })
      })
      chart.current.changeData(data)
    }
  },[talentInformationData])

  return (
    <div>
      <ContentBoxTitle title='生物城人才增长趋势' subTitle='ANNUAL NUMBER OF NEW PATENT AUTHORIZATIONS' />
      <ContentBoxContent>
        <div ref={containerRef} className={styles.annualNumberOfNewPatentAuthorizationsCharts}></div>
      </ContentBoxContent>
    </div>
  );
}

export default AnnualNumberOfNewPatentAuthorizationsCharts;
