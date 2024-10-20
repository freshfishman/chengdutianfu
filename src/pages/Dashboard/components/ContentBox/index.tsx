import { Flex } from 'antd'
import { createStyles } from "antd-style";

import ContentBoxHeaderBg from '@/assets/box-header-top-bg.png'
import ContentBoxContentRightTop from '@/assets/box-content-top-right.png'
import ContentBoxContentRightBottom from '@/assets/box-content-bottom-right.png'
import ContentBoxContentCenterBottom from '@/assets/box-content-bottom-center.png'

const useStyles = createStyles(() => ({
  contentBoxHeader: {
    backgroundImage: `url(${ContentBoxHeaderBg})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '1.875vw',
    width: '100%',
  },
  contentBoxHeaderTitle:{
    marginLeft: '1.7708vw',
    marginInlineEnd:'1.3vw',
    fontSize:'1.09375vw',
    background: 'linear-gradient(0deg, #569DE1 0%, #82B4DE 49.853515625%, #F6FFFF 100%)',
    backgroundClip: 'text',
    fontStyle:'italic',
    color:'#F4FBFE',
    WebkitTextFillColor:'transparent',
    fontWeight:600,
    // width:'7.8125vw'
  },
  contentBoxHeaderSubTitle:{
    fontSize:'0.72917vw',
    color:'#A3B2CD',
  },
  contentBoxContent:{
    position: 'relative',
    border:'1px solid #3C558C',
    marginBlockStart:'0.41667vw',
    minHeight:'10vw'
  },
  contentBoxContentRightTop:{
    backgroundImage: `url(${ContentBoxContentRightTop})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '0.52083vw',
    width: '0.41667vw',
    position: 'absolute',
    top: '0',
    right: '0',
  },
  contentBoxContentRightBottom:{
    backgroundImage: `url(${ContentBoxContentRightBottom})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '0.52083vw',
    width: '0.41667vw',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
  contentBoxContentCenterBottom:{
    backgroundImage: `url(${ContentBoxContentCenterBottom})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '0.10417vw',
    width: '4.01042vw',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  contentBoxContentLeftBottom:{
    width:'0.15625vw',
    height:'0.10417vw',
    position:'absolute',
    bottom:'0',
    left:'0',
    background:'#54B1E5'
  },
  contentBoxContentLeftTop:{
    height:'0.15625vw',
    width:'0.10417vw',
    position:'absolute',
    top:'0',
    left:'0',
    background:'#54B1E5'
  },
  contentBoxContentLeftCenter:{
    width:'0.10417vw',
    height:'2.60417vw',
    position:'absolute',
    top:'2.39583vw',
    left:'-1px',
    background:'#54B1E5'
  },
  contentBoxContentRightCenter:{
    width:'0.10417vw',
    height:'2.60417vw',
    position:'absolute',
    top:'2.39583vw',
    right:'-1px',
    background:'#54B1E5'
  },
  children:{
    position:'relative',
    zIndex:5
  }
}))

export const ContentBoxTitle: React.FC<{
  title: string;
  subTitle?: string;
}> = ({
  title,
  subTitle
}) => {

  const { styles }  =  useStyles()

  return <Flex className={styles.contentBoxHeader} align='center'>
    <div className={styles.contentBoxHeaderTitle}>{`${title} `}</div>
    <div className={styles.contentBoxHeaderSubTitle}>{subTitle}</div>
  </Flex>
}

export const ContentBoxContent: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const { styles } = useStyles()
  return <div className={styles.contentBoxContent}>
    <div className={styles.children}>
    {children}
    </div>
    <div className={styles.contentBoxContentLeftBottom}></div>
    <div className={styles.contentBoxContentLeftTop}></div>
    <div className={styles.contentBoxContentRightTop}></div>
    <div className={styles.contentBoxContentRightBottom}></div>
    <div className={styles.contentBoxContentCenterBottom}></div>
    <div className={styles.contentBoxContentLeftCenter}></div>
    <div className={styles.contentBoxContentRightCenter}></div>
    </div>
}
