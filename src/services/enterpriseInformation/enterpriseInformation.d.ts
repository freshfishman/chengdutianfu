declare namespace ENTERPRISEINFORMATION {
  type ENTERPRISEINFORMATIONITEM = {
    [key: string]: string
  }
  type TALENTINFORMATIONSTATEMENT = {
    /**
     * @name 报表刷新时间
     */
    deadline:string,
    /**
     * @name 高素质青年人才数量
     */
    TR_HIGH_QUALITY_YOUNG_TALENTS: number,
    /**
     * @name 产业人才数量
     */
    TR_INDUSTRIAL_TALENTS: number,
    /**
     * @name 国家级院士团队数量
     */
    TR_NATIONAL_ACADEMICIAN_TEAM: number,
    /**
     * @name 诺贝尔人才团队数量
     */
    TR_NOBEL_TALENT_TEAM: number,
    /**
     * @name 海外归国高层次人才团队数量
     */
    TR_OVERSEAS_RETURNED_HIGH_LEVEL_TALENT_TEAM: number,
    /**
     * @name 国家级人才数量
     */
    TR_NATIONAL_TALENT:number,
    /**
     * @name 省级人才数量
     */
    TR_PROVINCIAL_TALENTS:number,
    /**
     * @name 市级人才数量
     */
    TR_MUNICIPAL_TALENTS: number,
    /**
     * @name 产业领军人才数量
     */
    TR_INDUSTRY_LEADER: number,
    /**
     * @name 专业技术高级人才数量
     */
    TR_PROFESSIONAL_AND_TECHNICAL_SENIOR_PERSONNEL: number,
    /**
     * @name 专业技术中级人才数量
     */
    TR_INTERMEDIATE_PROFESSIONAL_AND_TECHNICAL_PERSONNEL: number,
    /**
     * @name 专业技术初级人才数量
     */
    TR_PROFESSIONAL_AND_TECHNICAL_JUNIOR_PERSONNEL: number,
    /**
     * @name 海外高层次人才数量
     */
    TR_OVERSEAS_HIGH_LEVEL_TALENTS: number,
    /**
     * @name 生物城人才增长趋势
     */
    TALENTS_GROWTH_TREND:{
        [key: string]: number
    },
    /**
     * @name 技能人才数量
     */
    TR_SKILLED_TALENTS: number,
    /**
     * @name 青年人才数量
     */
    TR_YOUTH_TALENT: number,
    /**
     * @name 复合型人才数量
     */
    TR_VERSATILE_TALENT: number,
    /**
     * @name 现代生物技术药硕士占比
     */
    TR_MODERN_BIOTECHNOLOGY_MASTER_RATIO: number,
    /**
     * @name 现代生物技术药博士占比
     */
    TR_MODERN_BIOTECHNOLOGY_DOCTORATE_RATIO: number,
    /**
     * @name 化学创新药硕士占比
     */
    TR_CHEMICAL_INNOVATION_MASTER_RATIO: number,
    /**
     * @name 化学创新药硕士占比
     */
    TR_CHEMICAL_INNOVATION_MASTER_RATIO: number,
    /**
     * @name 化学创新药博士占比
     */
    TR_CHEMICAL_INNOVATION_DOCTORATE_RATIO: number,
    /**
     * @name 高性能医疗机械硕士占比
     */
    TR_MEDICAL_MACHINERY_MASTER_RATIO: number,
    /**
     * @name 高性能医疗机械博士占比
     */
    TR_MEDICAL_MACHINERY_DOCTORATE_RATIO: number,
    /**
     * @name 专业外包服务硕士占比
     */
    TR_OUTSOURCING_SERVICE_MASTER_RATIO: number,
    /**
     * @name 专业外包服务博士占比
     */
    TR_OUTSOURCING_SERVICE_DOCTORATE_RATIO: number,
    /**
     * @name 健康服务硕士占比
     */
    TR_HEALTH_SERVICE_MASTER_RATIO: number,
    /**
     * @name 健康服务博士占比
     */
    TR_HEALTH_SERVICE_DOCTORATE_RATIO: number,
    /**
     * @name 产业领军人才ABC
     */
    TR_INDUSTRY_LEADER_ABC: number,
    /**
     * @name 产业领军人才海归人数
     */
    TR_INDUSTRY_LEADER_RETURNEE: number,
    /**
     * @name 高质量人才引进硕博占比
    */
    TR_HIGH_QUALITY_PERSONNEL_DOCTORATE_RATIO: number,
    /**
     * @name 人才流入数量
     */
    TR_QUANTITY_OF_TALENT_INFLOW: number,
    /**
     * @name 人才流入时间
     */
    TR_TALENT_INFLOW_TIME: string,
    /**
     * @name 本年人才需求数量
     */
    TR_THIS_YEAR_TALENT_DEMAND_QUANTITY: number,
    /**
     * @name 本年人才需求时间
     */
    TR_THIS_YEAR_TALENT_DEMAND_TIME:string,
    /**
     * @name 明年人才需求数量
     */
    TR_NEXT_YEAR_TALENT_DEMAND_QUANTITY: number,
    /**
     * @name 明年人才需求时间
     */
    TR_NEXT_YEAR_TALENT_DEMAND_TIME: string,
    /**
     * @name 未来人才需求数量
     */
    TR_FUTURE_TALENT_DEMAND_QUANTITY: number,
    /**
     * @name 未来人才需求时间
     */
    TR_FUTURE_TALENT_DEMAND_TIME: string,
    /**
     * @name 市场营销人才需求占比
     */
    TR_MARKETING_TALENT_DEMAND_PROPORTION: number,
    /**
     * @name 生产技能人才需求占比
     */
    TR_PRODUCTION_SKILLS_TALENT_DEMAND_PROPORTION:number,
    /**
     * @name 专业技术人才需求占比
     */
    TR_PROFESSIONAL_SKILL_TALENT_DEMAND_PROPORTION: number,
    /**
     * @name 其他人才需求占比
     */
    TR_OTHER_TALENT_DEMAND_PROPORTION: number,
    /**
     * @name 学位报表数据
     */
    EB_LIST: {
      /**
       * @name 学位
       */
      Item1: string,
      /**
       * @name 人数
       */
      Item2: number
    }[],
    /**
     * @name 年龄报表数据
     */
    AGE_LIST: {
      /**
       * @name 年龄
       */
      Item1: string,
      /**
       * @name 人数
       */
      Item2: number
    }[],
    /**
     * @name 性别报表数据
     */
    SEX_LIST: {
      /**
       * @name 性别
       */
      Item1: string,
      /**
       * @name 人数
       */
      Item2: number
    }[],
    /**
     * @name 国籍报表数据
     */
    NAT_LIST: {
      /**
       * @name 国籍
       */
      Item1: string,
      /**
       * @name 人数
       */
      Item2: number
    }[],
    /**
     * @name 人才分布报表数据
     */
    TER_LIST: {
      /**
       * @name 国籍
       */
      Item1: string,
      /**
       * @name 人数
       */
      Item2: number
    }[],
  }

  type ENTERPRISEINFORMATIONSTATEMENT = {
    /**
     * @name 已注册企业数量
     */
    EIR_REGISTERED_ENTERPRISE: number,
    /**
     * @name 企业报表数量
     */
    ETYPE_LIST: {
      /**
       * @name 类型
       */
      Item1:string,
      /**
       * @name 数量
       */
      Item2:number
    }[]
  }
}
