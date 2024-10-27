import { useEffect, useRef } from 'react'
import {  } from '@umijs/max'
import { } from 'antd'
import { Chart } from '@antv/g2'
import { createStyles } from 'antd-style'

import { ContentBoxContent, ContentBoxTitle } from '../ContentBox'

import { generateHeatmapData } from '@/utils'

// import HeatMapImage from '@/assets'

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

  const containerRef = useRef<HTMLDivElement>(null)

  const chart = useRef<any>(null)

  const { styles } = useStyles()

  const renderBarChart = (container:HTMLDivElement) => {
    const chart = new Chart({
      container,
      width:container?.clientWidth,
      height: container?.clientHeight,
      autoFit:true,
    });

    // 准备数据
    chart.axis(false);

    const data = [
      {
        "g": 541,
        "937": 85,
        "tmp": 858
      },
      {
        "g": 566,
        "l": 131,
        "tmp": 326
      },
      {
        "g": 738,
        "l": 130,
        "tmp": 262
      },
      {
        "g": 85,
        "l": 207,
        "tmp": 184
      },
      {
        "g": 707,
        "l": 55,
        "tmp": 651
      },
      {
        "g": 238,
        "l": 31,
        "tmp": 231
      },
      {
        "g": 819,
        "l": 461,
        "tmp": 669
      },
      {
        "g": 84,
        "l": 22,
        "tmp": 796
      },
      {
        "g": 605,
        "l": 284,
        "tmp": 296
      },
      {
        "g": 431,
        "l": 86,
        "tmp": 21
      },
      {
        "g": 195,
        "l": 468,
        "tmp": 526
      },
      {
        "g": 807,
        "l": 188,
        "tmp": 764
      },
      {
        "g": 816,
        "l": 326,
        "tmp": 696
      },
      {
        "g": 314,
        "l": 125,
        "tmp": 648
      },
      {
        "g": 952,
        "l": 50,
        "tmp": 999
      },
      {
        "g": 894,
        "l": 112,
        "tmp": 454
      },
      {
        "g": 670,
        "l": 437,
        "tmp": 440
      },
      {
        "g": 878,
        "l": 494,
        "tmp": 637
      },
      {
        "g": 259,
        "l": 278,
        "tmp": 871
      },
      {
        "g": 461,
        "l": 449,
        "tmp": 264
      },
      {
        "g": 15,
        "l": 50,
        "tmp": 17
      },
      {
        "g": 770,
        "l": 151,
        "tmp": 622
      },
      {
        "g": 167,
        "l": 59,
        "tmp": 387
      },
      {
        "g": 315,
        "l": 412,
        "tmp": 907
      },
      {
        "g": 393,
        "l": 110,
        "tmp": 162
      },
      {
        "g": 197,
        "l": 71,
        "tmp": 394
      },
      {
        "g": 306,
        "l": 354,
        "tmp": 183
      },
      {
        "g": 593,
        "l": 113,
        "tmp": 736
      },
      {
        "g": 214,
        "l": 249,
        "tmp": 611
      },
      {
        "g": 214,
        "l": 78,
        "tmp": 589
      },
      {
        "g": 521,
        "l": 218,
        "tmp": 571
      },
      {
        "g": 149,
        "l": 299,
        "tmp": 939
      },
      {
        "g": 841,
        "l": 379,
        "tmp": 510
      },
      {
        "g": 197,
        "l": 127,
        "tmp": 355
      },
      {
        "g": 187,
        "l": 340,
        "tmp": 356
      },
      {
        "g": 793,
        "l": 171,
        "tmp": 138
      },
      {
        "g": 340,
        "l": 184,
        "tmp": 597
      },
      {
        "g": 702,
        "l": 317,
        "tmp": 313
      },
      {
        "g": 439,
        "l": 383,
        "tmp": 217
      },
      {
        "g": 790,
        "l": 97,
        "tmp": 553
      },
      {
        "g": 551,
        "l": 73,
        "tmp": 74
      },
      {
        "g": 258,
        "l": 296,
        "tmp": 766
      },
      {
        "g": 278,
        "l": 219,
        "tmp": 387
      },
      {
        "g": 540,
        "l": 309,
        "tmp": 422
      },
      {
        "g": 686,
        "l": 418,
        "tmp": 577
      },
      {
        "g": 192,
        "l": 184,
        "tmp": 625
      },
      {
        "g": 921,
        "l": 317,
        "tmp": 593
      },
      {
        "g": 501,
        "l": 402,
        "tmp": 277
      },
      {
        "g": 246,
        "l": 270,
        "tmp": 467
      },
      {
        "g": 433,
        "l": 118,
        "tmp": 427
      },
      {
        "g": 788,
        "l": 499,
        "tmp": 214
      },
      {
        "g": 706,
        "l": 332,
        "tmp": 164
      },
      {
        "g": 366,
        "l": 315,
        "tmp": 909
      },
      {
        "g": 392,
        "l": 272,
        "tmp": 755
      },
      {
        "g": 817,
        "l": 393,
        "tmp": 512
      },
      {
        "g": 192,
        "l": 189,
        "tmp": 237
      },
      {
        "g": 761,
        "l": 50,
        "tmp": 361
      },
      {
        "g": 600,
        "l": 267,
        "tmp": 783
      },
      {
        "g": 911,
        "l": 369,
        "tmp": 579
      },
      {
        "g": 55,
        "l": 206,
        "tmp": 299
      },
      {
        "g": 646,
        "l": 92,
        "tmp": 5
      },
      {
        "g": 587,
        "l": 311,
        "tmp": 213
      }
    ]

    chart
      .image()
      .style(
        'src',
        'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
      )
      .style('x', '50%')
      .style('y', '50%')
      .style('width', '100%')
      .style('height', '100%')
      .tooltip(true);

    chart
      .heatmap()
      .data(data)
      .encode('x', 'g')
      .encode('y', 'l')
      .encode('color', 'tmp')
      .style('opacity', 0)
      .tooltip(true);

    // 渲染可视化
    chart.render();

    return chart;
  }

  useEffect(()=>{
    if (!chart.current) {
      chart.current = renderBarChart(containerRef.current as unknown as HTMLDivElement);
    }
  },[])

  return <>
    <div>
      <ContentBoxTitle title='生物城人才热力值' subTitle='TALENT HEAT VALUE IN THE BIOLOGICAL CITY' />
      <ContentBoxContent>
        <div className={styles.heatmap} ref={containerRef}></div>
      </ContentBoxContent>
    </div>
  </>
}

export default HeatMap
