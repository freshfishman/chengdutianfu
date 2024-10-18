import { } from '@umijs/max'
import { createStyles } from 'antd-style'
import { Col, Flex, Row } from 'antd'
import moment from 'moment';


import DashBoardBg from '@/assets/top-header-bg.png'
import Logo from '@/assets/logo.png';
import LocationPng from '@/assets/location.png'
import TitleBg from '@/assets/top-header-title-bg.png'


const useStyles = createStyles(() => ({
  dashboard: {
    backgroundImage: `url(${DashBoardBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '4.375vw',
    width: '100vw',
  },
  tabItem: {
    width: '7.8125vw',
    textAlign: 'center',
    color: '#fff',
    fontSize: '0.83333vw',
    height: '2.6042vw',
    lineHeight: '2.6042vw',
    background: 'rgba(22, 45, 101, 0.4)',
    border: '1px solid #729EFF',
    borderRadius: '0.3125vw',
    cursor: 'pointer',
    '&:hover': {
      background: 'linear-gradient(0deg, #1C4396, #142450);',
      border: '1px solid #3C558C'
    }
  },
  tabItemActive: {
    background: 'linear-gradient(0deg, #1C4396, #142450);',
    border: '1px solid #3C558C'
  },
  tabItemMargin: {
    marginInlineStart: '0.2vw',
    marginInlineEnd: '0.2vw',
  },
  noBorder:{
    border:'none',
    background:'transparent',
  },
  titleHeight: {
    height: '4.375vw',
  },
  logo: {
    height: '2.708vw'
  },
  titleBg:{
    backgroundImage: `url(${TitleBg})`,
    width:'33.333vw',
    height: '4.375vw',
    marginBlockStart:'0.83333vw'
  },
  location: {
    height: '2.6042vw',
  },
  datetime: {
    textAlign: 'center',
    color: '#C5D1E6',
    flex: 1,
    fontSize: '0.7292vw',
    height: 'calc(4.375vw - 2.6042vw)',
    lineHeight: 'calc(4.375vw - 2.6042vw)',
  },
  datatimeBox: {
    width: '9.0625vw'
  }
}))
const TopHeader = () => {

  const { styles } = useStyles()

  return <div className={styles.dashboard}>
    <Row>
      <Col span={6}>
        <Flex vertical className={styles.titleHeight}>
          <Flex>
            <div className={styles.tabItem}>
              <span>区域产业人才分析</span>
            </div>
            <div className={[styles.tabItem, styles.tabItemMargin].join(' ')}>
              <span>产业人才全景分析</span>
            </div>
            <div className={styles.tabItem}>
              <span>区域产业链分析</span>
            </div>
          </Flex>
          <Flex className={styles.datetime} justify='center'>
            <Flex className={styles.datatimeBox} justify='space-between'>
              <div>{moment().format('YYYY年MM月DD日')}</div>
              <div>{'星期四'}</div>
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <Flex className={styles.titleHeight} align='center' justify='space-between' >
          <img className={styles.logo} src={Logo} alt="logo" />
          <div className={styles.titleBg}></div>
          <img className={styles.location} src={LocationPng} alt="location" />
        </Flex>
      </Col>
      <Col span={6}>
        <Flex vertical className={styles.titleHeight}>
          <Flex justify='flex-end'>
            <div className={styles.tabItem}>
              <span>产业链强链补链</span>
            </div>
            <div className={[styles.tabItem, styles.tabItemMargin].join(' ')}>
              <span>产业协同地图</span>
            </div>
            <div className={[styles.tabItem, styles.noBorder].join(' ')}></div>
          </Flex>
          <Flex className={styles.datetime} justify='center'>
            <Flex className={styles.datatimeBox} justify='space-between'>
              数据截止时间：2024年10月
            </Flex>
          </Flex>
        </Flex>
      </Col>
    </Row>
  </div>
}

export default TopHeader
