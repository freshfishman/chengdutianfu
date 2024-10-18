/// Add author: wangp, Date: 2022/09/03, Description:
/// 插件对于标准字段的统一算法和功能支持

// 1.计算公式算法统一
// 2.精度处理（按照选项设置进行截取）
// 3.适配批量设置功能（右键统置功能）
// 4.税额、价税合计、金额支持调差
// 5.辅助计量功能（辅助数量、辅助单价）
// 6.支持引用和导入的方法调用批量计算
// 7.支持变更单相关字段的统一处理（原始值、变更值、变更后值）
// 8.其他特殊处理（固定单价、总价、农产品等）

Ext.define('Ext.Gc.EditGridPlugin', {
  alias: 'plugin.gcEditGrid',
  extend: Ext.ng.grid.plugin.CellEditing,
  //lc:{},//联动赋值字段linkColumn,格式{amtVatFc:new Array("","")},amtVat:new Array("","")}
  screg: {},//标准计量字段standardColumn,格式{qty:"",prc: "Prc",prcFc: "PrcFc",prcVat: "PrcVat",prcVatFc: "PrcVatFc",amt: "",amtFc: "",amtVat: "",amtVatFc: "",taxRate: "",taxAmt: "",exchRate:""}
  //scv:{},//
  ifc: "",//农产品字段IsFarmColumn
  ischg: false,//是否变更单
  multiScReg: {},//多套配置
  currSuit: null,// 当前配置
  fieldMap: null,//属性对应配置id映射
  iscalamt: true,//是否反算不含税金额（导入或imp带入数据特殊情况下不反算）
  //qtyCanEdit:true,//是否需要计算数量(类似合同固定单价合同不允许修改数量、类似合同总价合同不允许修改数量) 说明:配置不允许计算会同步控制不让修改  (通过调用业务点重写方法处理)
  //prcCanEdit:true,//是否需要计算单价(类似合同总价合同不允许修改单价)  说明:配置不允许计算会同步控制不让修改 (通过调用业务点重写方法处理)
  //amtCanEdit:true,//是否需要计算金额(类似合同固定单价合同不允许修改金额)  说明:配置不允许计算会同步控制不让修改 (通过调用业务点重写方法处理)
  //calQty:true, //todo 优先计算数量还是单价  (通过调用业务点重写方法处理)
  constructor: function (config) {
      var me = this;

      // Object.defineProperty(me,"grid",{
      //     get:function(){
      //         return me._grid;
      //     },
      //     set: function (grid) {
      //         me._grid = grid;
      //     }
      // })

      me.callParent(arguments);

      me.unStandNumColFormat = {};

      /******/////////待注释
      //合同结算单测试数据
      // me.screg={qty: "RepQty",
      //     prc: "Prc",prcFc: "PrcFc",prcVat: "PrcVat",prcVatFc: "PrcVatFc",
      //     amt: "Amt",amtFc: "AmtFc",amtVat: "AmtVat",amtVatFc: "AmtVatFc",
      //     taxRate: "TaxRate",taxAmt: "Taxamt",
      //     exchRate:"ExchRate",
      //     //currType:"CurrType",
      //     umConv:"Area",umConvm:"UmConvAm",fzQty:"FzQty",fzPrc: "",
      // };
      // //合同变更单测试数据
      // me.screg = {
      //     qty: "QtyNew",
      //     prc: "PrcNew", prcFc: "PrcNewFc", prcVat: "PrcNewVat", prcVatFc: "PrcNewVatFc",
      //     amt: "AmtNew", amtFc: "AmtNewFc", amtVat: "AmtNewVat", amtVatFc: "AmtNewVatFc",
      //     taxRate: "Taxrate", taxAmt: "Taxamt",
      //     exchRate: "ExchRate",
      //     //currType:"CurrType",
      //     umConv: "Area", umConvm: "UmConvAm", fzQty: "FzQty", fzPrc: "",
      //     qtyOri: "QtyOld", qtyChg: "QtyChg",
      //     prcOri: "PrcOld", prcChg: "PrcChg", prcVatOri: "PrcOldVat", prcVatChg: "PrcChgVat",
      //     prcFcOri: "PrcOldFc", prcFcChg: "PrcChgFc", prcVatFcOri: "PrcOldVatFc", prcVatFcChg: "PrcChgVatFc",
      //     amtOri: "AmtOld", amtChg: "AmtChg", amtVatOri: "AmtOldVat", amtVatChg: "AmtChgVat",
      //     amtFcOri: "AmtOldFc", amtFcChg: "AmtChgFc", amtVatFcOri: "AmtOldVatFc", amtVatFcChg: "AmtChgVatFc",
      //     taxRateOri: "TaxrateOri", taxRateChg: "TaxrateChg",//税率直接在变更单行上进行调整?有待讨论
      //     taxAmtOri: "TaxamtOri", taxAmtChg: "TaxamtChg"//调整税额变更税率?先不支持

      //     // PrcOld,PrcChg,PrcOldVat,PrcChgVat
      //     // PrcChgFc-,PrcChgVatFc-
      //     // AmtChg-,AmtChgVat-,AmtChgFc-,AmtChgVatFc-
      //     // PrcNew,PrcNewVat
      //     // TaxrateChg-,TaxamtChg-
      // };

      // me.ischg = true;
      // me.ifc = "IsFarmProduce";
      /******//////////待注释

      Ext.apply(me, {
          screg: {},
          ifc: "",
          ischg: false,
          multiScReg: {},
          currSuit: null,
          fieldMap: null,
      });
      Ext.apply(me, config);

      //将默认配置置入std
      if (me.multiScReg && !me.multiScReg.hasOwnProperty('std')) {
          me.multiScReg['std'] = me.screg;
      }

      if (me.multiScReg.hasOwnProperty('std')) {
          me.screg = me.multiScReg['std'];
      }

      //切换至默认配置
      me.switchConfig('std');
      me.initFieldMap();

      //me.mixins.observable.constructor.call(me);
  },
  /**
   * 初始化属性应对配置id,优化性能
   */
  initFieldMap: function () {
      var me = this;
      me.fieldMap = {};
      Ext.Array.forEach(Object.keys(me.multiScReg), function (key) {
          if (key == 'std')
              return;
          Ext.Array.forEach(Object.keys(me.multiScReg[key]), function (subKey) {
              if (!me.fieldMap.hasOwnProperty(me.multiScReg[key][subKey])) {
                  me.fieldMap[me.multiScReg[key][subKey]] = key;
              }
          });
      });

      Ext.Array.forEach(Object.keys(me.multiScReg['std']), function (stdkey) {
          me.fieldMap[me.multiScReg['std'][stdkey]] = 'std';
      });
  },
  /**
   * 新增配置
   *
   * @param {object} screg
   */
  addScReg: function (screg) {
      var me = this;
      Ext.apply(me.multiScReg, screg);

      me.initFieldMap();
  },
  /**
   * 删除配置
   *
   * @param {string} id
   */
  removeScReg: function (id) {
      var me = this;
      delete me.multiScReg[id];
      me.initFieldMap();
  },
  startEdit: function (record, columnHeader, context) {//重写这个方法解决如果拥有编辑属性的单元格被设置为了只读，失去焦点，无法继续使用按键的bug
      var me = this,
          ed;
      if (Ext.typeOf(record) == "number") {
          record = me.grid.getStore().getAt(record);
      }
      if (Ext.typeOf(columnHeader) == "number") {
          columnHeader = me.view.getHeaderAtIndex(columnHeader);
      }
      if (record == undefined || record.length <= 0) {
          Ext.MessageBox.alert('提示', StringFormat("程序员错误或者二开脚本错误[{0}]传递记录有误!", record));
          return;
      }
      me.switchConfigByField(columnHeader.dataIndex);
      me.beforeCal(me, {
          record: record
      });

      context = context || me.getContext(record, columnHeader);

      me.completeEdit();

      var lockable = me.grid.lockable;//grid带锁定列
      if (me.grid.ownerCt) {
          lockable = me.grid.ownerCt.lockable;
      }

      if (context && me.grid.view.isVisible(true)) {
          me.context = context;

          record = context.record;
          columnHeader = context.column;

          //me.grid.view.cancelFocus();
          //me.view.focusCell({
          //    row: context.rowIdx,
          //    column: context.colIdx
          //});

          if (columnHeader && !columnHeader.getEditor(record)) {
              return false;
          }

          //对象存储数值类型字段的ngformat
          if (Object.keys(me.unStandNumColFormat).length == 0) {
              //考虑grid锁定列的情况
              var columns = "";
              if (me.grid.ownerCt.columns)
                  columns = me.grid.ownerCt.columns;
              else
                  columns = me.grid.columns;

              Ext.Array.forEach(columns, function (col) {
                  if (col.xtype == 'numbercolumn' && col.ngFormat) {
                      me.unStandNumColFormat[col.dataIndex] = col.ngFormat;
                      if(me.lockingPartner){
                          me.lockingPartner.unStandNumColFormat[col.dataIndex] = col.ngFormat;
                      }
                  }else if((!col.dataIndex)&& col.xtype!='rownumberer'){
                      if(col.items&&col.items.items){
                          Ext.Array.forEach(col.items.items, function (coll) {
                              if (coll.xtype == 'numbercolumn' && coll.ngFormat) {
                                  me.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                                  if (me.lockingPartner) {
                                      me.lockingPartner.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                                  }
                              }
                          })
                      }
                      if(col.columns){
                          Ext.Array.forEach(col.columns, function (coll) {
                              if (coll.xtype == 'numbercolumn' && coll.ngFormat) {
                                  me.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                                  if (me.lockingPartner) {
                                      me.lockingPartner.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                                  }
                              }
                          })
                      }
                  }
              })
          }

          context.originalValue = context.value = record.get(columnHeader.dataIndex);
          if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', me, context) === false || context.cancel) {
              return false;
          }

          if (me.isStandardColumn(context.field)) {
              if (me.beforeeditStandar(me, context) === false || context.cancel) {
                  return false;
              }
          }

          if (me.grid.selModel.$className === 'Ext.ng.selection.CheckboxModel') {
              if (lockable) {
                  me.changeBgColor(me.cmp.selModel.views[0], context);
                  me.changeBgColor(me.cmp.selModel.views[1], context);
              } else {
                  me.changeBgColor(me.view, context);
              }
          }

          ed = me.getEditor(record, columnHeader);

          me.grid.view.cancelFocus();//focusCell放在getEditor方法之后，否则第一次需要滚动定位的时候会出现定位不准的情况
          me.view.focusCell({
              row: context.rowIdx,
              column: context.colIdx
          });

          if (ed) {
              var delayTime = 15;//源码默认是15
              if (me.direction === 'up' || me.direction === 'down') {
                  if (me.grid.view.bufferedRenderer) {
                      if (lockable) {
                          delayTime = 60;//锁定延迟太长（到100以上），上下走方向，走到bufferrender的边界时，会从锁定区域跳到非锁定区
                      } else {
                          if (ed.field.xtype === 'ngText' || ed.field.xtype === 'textfield') {//文本控件容易失去焦点，延迟设置长一点
                              delayTime = 150;//具有非锁定列的，上下走方向容易失去焦点，延迟加大
                          }
                      }

                      if (!Ext.isChrome) {//IE垂直滚动条的处理
                          if (context.rowIdx > (me.view.bufferedRenderer.getLastVisibleRowIndex() - 1)) {//向下
                              me.view.el.dom.scrollTop = me.view.el.dom.scrollTop + 56;
                          }
                          if (context.rowIdx < me.view.bufferedRenderer.getFirstVisibleRowIndex() + 1) {//向上
                              me.view.el.dom.scrollTop = me.view.el.dom.scrollTop - 56;
                          }
                      }
                  } else {
                      if (ed.field.xtype === 'ngText' || ed.field.xtype === 'textfield') {//文本控件容易失去焦点，延迟设置长一点
                          delayTime = 50;
                      }
                  }
              }
              me.editTask.delay(delayTime, me.showEditor, me, [ed, context, context.value]);
              me.direction = null;
              return true;
          }
          return false;
      }
  },
  onEditComplete: function (ed, value, startValue) {
      var me = this,
          grid = me.grid,
          activeColumn = me.getActiveColumn(),
          sm = grid.getSelectionModel(),
          context = me.context,
          record;

      if (activeColumn) {
          record = context.record;

          me.setActiveEditor(null);
          me.setActiveColumn(null);
          me.setActiveRecord(null);

          context.value = value;

          if (!me.validateEdit()) {
              return;
          }

          if (me.isStandardColumn(context.field)) {
              if (!me.validateeditStandar(me, context)) {
                  return;
              }
          }

          if (!record.isEqual(value, startValue)) {
              record.set(activeColumn.dataIndex, value);
          }


          if (sm.setCurrentPosition) {
              sm.setCurrentPosition(sm.getCurrentPosition());
          } else {
              grid.getView().focus();
          }

          //标准量价金额阻止edit事件的触发，统一处理
          //todo 标准字段不触发edit事件，可能对二开脚本产生影响
          if (me.isStandardColumn(context.field)){
              Ext.suspendLayouts();
              me.editStandar(me, context);
              Ext.resumeLayouts(true);
          }
          me.fireEvent('edit', me, context);//放开控制，支持二开逻辑
          me.editing = false;
      }
  },
  completeEdit: function () {
      var activeEd = this.getActiveEditor();
      if (activeEd) {
          activeEd.completeEdit();
          this.editing = false;
      }
  },
  /**
   * 是否标准字段
   * @param {} field 字段
   * @returns
   */
  isStandardColumn: function (field) {
      var me = this;
      var isstd = Ext.Array.findBy(Object.keys(me.sc), function (key) {
          return field == me.sc[key];
      });

      return !Ext.isEmpty(isstd);
  },
  /**
   * 获取字段类型 单价、金额、数量(标准字段)
   * @param {} field
   */
  getStandarNumColFormat: function (field) {
      var me = this;

      //标准字段不读取unStandNumColFormat,个别字段没有设置显示(ngformat没配)
      // var stdkey = Ext.Array.findBy(Object.keys(me.sc), function (key) {
      //     return field == me.sc[key];
      // });

      switch (field) {
          case me.sc.qty:
          case me.sc.fzQty:
          case me.sc.qtyOri:
          case me.sc.qtyChg:
              return "fQty"
          case me.sc.prc:
          case me.sc.prcFc:
          case me.sc.prcVat:
          case me.sc.prcVatFc:
          case me.sc.prcOri:
          case me.sc.prcChg:
          case me.sc.prcVatOri:
          case me.sc.prcVatChg:
          case me.sc.prcFcOri:
          case me.sc.prcFcChg:
          case me.sc.prcVatFcOri:
          case me.sc.prcVatFcChg:
              return "fPrc"
          case me.sc.amt:
          case me.sc.amtFc:
          case me.sc.amtVat:
          case me.sc.amtVatFc:
          case me.sc.amtOri:
          case me.sc.amtChg:
          case me.sc.amtVatOri:
          case me.sc.amtVatChg:
          case me.sc.amtFcOri:
          case me.sc.amtFcChg:
          case me.sc.amtVatFcOri:
          case me.sc.amtVatFcChg:
          case me.sc.taxAmt:
          case me.sc.taxAmtOri:
          case me.sc.taxAmtChg:
              return "fAmt"
          case me.sc.taxRate:
          case me.sc.taxRateOri:
          case me.sc.taxRateChg:
              return 5;//默认按万三处理
          case me.sc.exchRate:
              return 4;//基础货币1,默认按4位小数汇率
          default:
              return ""
      }
  },
  /**
   * 获取字段类型 单价、金额、数量(非标字段)
   * @param {*} field
   * @returns
   */
  getUnStandarNumColFormat: function (field) {
      var me = this;

      var hasField = true;
      if(me.lockingPartner){
          if(me.lockingPartner.unStandNumColFormat[field] == undefined){
              hasField = false;
          }
      }else if (me.unStandNumColFormat[field] == undefined) {
          hasField = false;
      }

      if (!hasField) {
          Ext.MessageBox.alert('提示', StringFormat("程序员错误[{0}]Grid数值控件列存在配置问题!,请联系技术人员处理,否则数据将发生错误!", field))
          console.log(StringFormat("程序员错误[{0}]Grid数值控件列存在配置问题!,请联系技术人员处理,否则数据将发生错误!", field))
      }

      if (Object.keys(me.unStandNumColFormat).length > 0)
          return me.unStandNumColFormat[field]
      return "";
  },
  /**
   * 手动触发标准字段的计算
   * 1.业务点调用（触发回调userAfterCal）
   * 2.使用注意（userAfterCal需要注意死循环，需要能判断出fireStandFun的是否要调用才能使用）
   * @param {*} field 字段属性名
   * @param {*} val 修改值
   * @param {*} row 支持业务点调用传入,如未传递,则取当前grid选中行第一行
   * @returns
   */
  fireStandFun: function (field, val, row, skipSwitch) {
      var me = this;

      if (skipSwitch !== true) {
          me.switchConfigByField(field);
      }

      if (row == undefined) {
          var record = me.grid.getSelectionModel().getSelection();
          if (record.length > 0) {
              row = me.grid.getStore().indexOf(record[0]);
          }
      }

      //对象存储数值类型字段的ngformat
      if (Object.keys(me.unStandNumColFormat).length == 0) {
          //考虑grid锁定列的情况
          var columns = "";
          if (me.grid.ownerCt.columns)
              columns = me.grid.ownerCt.columns;
          else
              columns = me.grid.columns;

          Ext.Array.forEach(columns, function (col) {
              if (col.xtype == 'numbercolumn' && col.ngFormat) {
                  me.unStandNumColFormat[col.dataIndex] = col.ngFormat;
                  if(me.lockingPartner){
                      me.lockingPartner.unStandNumColFormat[col.dataIndex] = col.ngFormat;
                  }
              }else if((!col.dataIndex) && col.xtype!='rownumberer'){
                  if(col.items&&col.items.items){
                      Ext.Array.forEach(col.items.items, function (coll) {
                          if (coll.xtype == 'numbercolumn' && coll.ngFormat) {
                              me.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                              if (me.lockingPartner) {
                                  me.lockingPartner.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                              }
                          }
                      })
                  }
                  if(col.columns){
                      Ext.Array.forEach(col.columns, function (coll) {
                          if (coll.xtype == 'numbercolumn' && coll.ngFormat) {
                              me.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                              if (me.lockingPartner) {
                                  me.lockingPartner.unStandNumColFormat[coll.dataIndex] = coll.ngFormat;
                              }
                          }
                      })
                  }
              }

          })
      }


      if (!me.isStandardColumn(field)) {
          Ext.MessageBox.alert('提示', StringFormat("程序员错误或者二开脚本错误[{0}]非标准列不能调用该方法!", field));
          return;
      }

      var record = row;
      if (Ext.typeOf(row) == "number") {
          record = me.grid.getStore().getAt(row);
      }
      if (record == undefined || record.length <= 0) {
          Ext.MessageBox.alert('提示', StringFormat("程序员错误或者二开脚本错误[{0}]传递行号有误!", row));
          return;
      }

      var e = new Object();
      e.grid = me.grid;
      e.record = record;
      e.field = field;
      e.value = val;
      //e.column = field;
      //e.row = 1;

      if (me.beforeeditStandar(this, e) == false)
          return;
      if (!me.validateeditStandar(this, e))
          return;

      e.originalValue = e.record.get(e.field)

      e.record.set(e.field, GcNumRound(e.value, me.getStandarNumColFormat(e.field)));

      if (me.editStandar(this, e) == -1) {
          //重置
          e.record.set(e.field, GcNumRound(e.originalValue, me.getStandarNumColFormat(e.field)));
      }
  },
  /**
   * 手动触发标准字段的计算
   * 1.业务点调用（不触发回调userAfterCal）
   * 2.用插件算法计算同一行多套标准字段，需要业务点调用赋值e的属性（原始值、字段属性、字段值）
   * @param {*} editor
   * @param {*} e
   * @returns
   */
  standarCal: function (editor, e) {
      console.log(StringFormat("当前字段名editStandar-(e.field):{0}", e.field));
      console.log(StringFormat("当前字段值editStandar-(e.value):{0}", e.value));

      var me = this;
      if (e.originalValue) {
          //值未发生变化、不执行计算
          if (GcNumRound(e.originalValue, me.getStandarNumColFormat(e.field)) == GcNumRound(e.value, me.getStandarNumColFormat(e.field)))
              return -1;
      }

      if (!me.beforeCal(editor, e))
          return -1;

      if (!me.userBeforeCal(editor, e))
          return -1;

      var record = e.record;
      var field = e.field;

      try {
          switch (field) {
              case me.sc.qty:
                  // 修改数量
                  me.chgOtherByQty(record);
                  break;
              case me.sc.fzQty:
                  // 修改辅助数量（辅助数量更新不处理单价为0的情况,只按换算因子更新数量、金额等信息）

                  // 0、数量=辅助数量*(分子/分母)[计算得到的数量字段精度截断后直接用于金额等的计算]
                  // 1、价税合计=数量*含税单价
                  // 2、金额 =数量*单价
                  // 3、税额 =价税合计-金额
                  // 4、本币价税合计 =数量*本币含税单价
                  // 5、本币金额 =数量*本币单价
                  // 6、辅助单价 = 金额/辅助数量
                  me.setRD(record, me.sc.qty, me.chgqtyFun(field));
                  //me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(field));
                  //me.setRD(record, me.sc.amtFc, me.chgamtFcFun(field));
                  me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.prcVatFc));
                  me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.prcVatFc));
                  me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(field));
                  //me.setRD(record, me.sc.amtVat, me.chgamtVatFun(field));
                  //me.setRD(record, me.sc.amt, me.chgamtFun(field));
                  me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.prcVatFc));
                  me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.prcVatFc));
                  me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(field));
                  me.setChgQtyCol(record);
                  me.setChgAmtCol(record);
                  me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(field));

                  break;
              case me.sc.prcFc:
                  // 修改不含税单
                  me.chgOtherByPrcFc(record);
                  break;
              case me.sc.prcVatFc:
                  // 修改含税单价
                  me.chgOtherByPrcFcVat(record);
                  break;
              case me.sc.amtFc:
                  // 修改金额
                  var diff = Math.abs(GcSub(e.value, e.originalValue));
                  if (diff <= 0.06)
                      me.chgOtherByAmtFc(record, GcSub(e.value, e.originalValue));
                  else
                      me.chgOtherByAmtFc(record);
                  break;
              case me.sc.amtVatFc:
                  // 修改价税合计
                  var diff = Math.abs(GcSub(e.value, e.originalValue));
                  if (diff <= 0.06)
                      me.chgOtherByAmtFcVat(record, GcSub(e.value, e.originalValue));
                  else
                      me.chgOtherByAmtFcVat(record);
                  break;
              case me.sc.taxRate:
                  me.chgOtherByTaxRate(record);
                  break;
              case me.sc.exchRate:
                  // 修改汇率
                  // 1、本币含税单价 = 含税单价*直接汇率
                  // 2、本币不含税单价 = 不含税单价*直接汇率
                  // 3、本币价税合计 = 价税合计*直接汇率
                  // 4、本币金额 = 金额*直接汇率
                  me.setRD(record, me.sc.prcVat, me.chgprcVatFun(field));
                  me.setRD(record, me.sc.prc, me.chgprcFun(field));
                  //me.setRD(record, me.sc.amtVat, me.chgamtVatFun(field));
                  //me.setRD(record, me.sc.amt, me.chgamtFun(field));
                  me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.exchRate));
                  me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.exchRate));
                  if (!Ext.isEmpty(me.sc.taxbbAmt)) {
                      me.setRD(record, me.sc.taxbbAmt, me.scv.amtVatValue - me.scv.amtValue);  //cccc
                  }
                  me.setChgAmtCol(record);
                  me.setChgPrcCol(record);
                  break;
              case me.sc.taxAmt:
                  // 修改税额（不反算其他信息,只更新不含税金额信息）
                  // 1、不含税外币金额 = 含税外币金额 - 税额
                  // 2、不含税本币金额 = (含税外币金额 - 税额) * 直接汇率
                  me.setRD(record, me.sc.amtFc, me.chgamtFcFun(field));
                  me.setRD(record, me.sc.amt, me.chgamtFun(field));
                  me.setChgAmtCol(record);
                  break;
              ///以下处理变更值修改触发的标准字段更新
              case me.sc.qtyChg:
                  me.fireStandFun(me.sc.qty, GcAdd(me.scv.qtyOriValue, me.scv.qtyChgValue),e.grid.getStore().$className==="Ext.ng.TreeStore"?record: e.rowIdx, true)
                  break;
              case me.sc.prcFcChg:
                  me.fireStandFun(me.sc.prcFc, GcAdd(me.scv.prcFcOriValue, me.scv.prcFcChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              case me.sc.prcVatFcChg:
                  me.fireStandFun(me.sc.prcVatFc, GcAdd(me.scv.prcVatFcOriValue, me.scv.prcVatFcChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              case me.sc.amtFcChg:
                  me.fireStandFun(me.sc.amtFc, GcAdd(me.scv.amtFcOriValue, me.scv.amtFcChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              case me.sc.amtVatFcChg:
                  me.fireStandFun(me.sc.amtVatFc, GcAdd(me.scv.amtVatFcOriValue, me.scv.amtVatFcChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              case me.sc.taxAmtChg:
                  me.fireStandFun(me.sc.taxAmt, GcAdd(me.scv.taxAmtOriValue, me.scv.taxAmtChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              case me.sc.taxRateChg:
                  me.fireStandFun(me.sc.taxRate, GcAdd(me.scv.taxRateOriValue, me.scv.taxRateChgValue), e.grid.getStore().$className==="Ext.ng.TreeStore"?record:e.rowIdx, true)
                  break;
              default:
                  break;
          }
          /// Modify author: zjq, Date: 2023/05/06, Description: 金额和辅助数量的变化需要重新计算辅助单价，将其作为最终计算逻辑
          me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.fzQty));
      } catch (e) {
          Ext.MessageBox.alert("提示", "字段更新错误[" + field + "]" + e);
          console.log("字段更新错误[" + field + "]" + e)
      }
      me.afterCal(editor, e);
  },
  beforeeditStandar: function (editor, e) {
      e.originalValue = e.value;
      e.originalData = Ext.clone(e.record.data);
      console.log(StringFormat("当前字段名beforeeditStandar-(e.field):{0}", e.field));
      console.log(StringFormat("当前字段值beforeeditStandar-(e.value):{0}", e.value));
  },
  /**
   *
   * @param {*} editor
   * @param {*} e
   */
  editStandar: function (editor, e) {
      var me = this;
      me.iscalamt = true;
      if(me.standarCal(editor, e)==-1)
          return;
      me.userAfterCal(editor, e);
  },
  validateeditStandar: function (editor, e) {
      console.log(StringFormat("validateeditStandar:{0}", e.field));
      var me = this;
      var record = e.record;
      var field = e.field;
      switch (field) {
          case me.sc.fzQty:
              if (me.scv.umConvValue == 0 && me.scv.umConvmValue == 0) {
                  Ext.MessageBox.alert("提示", "未配置辅助单位相关信息,不允许调整辅助数量!");
                  return false;
              }
              break;
          case me.sc.taxAmtChg:
              Ext.MessageBox.alert("提示", "不支持调整变更税额,请直接修改变更后税额!");
              return false;
          case me.sc.taxAmt: //税额相关判断
              if (me.scv.taxRateValue == undefined || me.scv.taxRateValue <= 0) {
                  Ext.MessageBox.alert("提示", "税率为0,不能调整税额!");
                  return false;
              }

              if (e.value < 0) {
                  Ext.MessageBox.alert("提示", "税额不允许为负!");
                  return false;
              }
              if (Math.abs(GcSub(e.value, e.originalValue)) > 0.06) {
                  Ext.MessageBox.alert("提示", "税额调差范围([0.00~0.06分])!");
                  return false;
              }
              break;
          case me.sc.prcFc:
          case me.sc.prcVatFc:
          case me.sc.prc:
          case me.sc.prcFc:
          case me.sc.prcFcChg:
          case me.sc.prcVatFcChg:
          case me.sc.prcChg:
          case me.sc.prcFcChg:
              if (field == me.sc.prcFc || field == me.sc.prcFcChg) {
                  if (!Ext.isEmpty(me.ifc) && record.get(me.ifc) == "1") {
                      Ext.MessageBox.alert("提示", "农产品不允许修改不含税单价!");
                      return false;
                  }
              }
              if (!me.PrcCanEdit())
                  return false;
              if (me.GddjCtrInput() == 2) {
                  Ext.MessageBox.alert("提示", "业务控制不允许修改单价信息!-固定单价合同");
                  return false
              }
              if (me.ZjCtrInput() == 1) {
                  Ext.MessageBox.alert("提示", "业务控制不允许修改单价信息!-总价合同");
                  return false;
              }
              break;
          case me.sc.qty:
          case me.sc.fzQty:
          case me.sc.qtyChg:
              if (!me.QtyCanEdit())
                  return false;

              if (me.GddjCtrInput() == 1) {
                  Ext.MessageBox.alert("提示", "业务控制不允许修改数量信息!-固定单价合同");
                  return false;
              }
              if (me.ZjCtrInput() == 1) {
                  Ext.MessageBox.alert("提示", "业务控制不允许修改数量信息!-总价合同");
                  return false;
              }
              break;
          case me.amt:
          case me.amtVat:
          case me.amtFc:
          case me.amtVatFc:
          case me.taxAmt:
          case me.amtChg:
          case me.amtVatChg:
          case me.amtFcChg:
          case me.amtVatFcChg:
          case me.taxAmtChg:
              if (field == me.sc.amtFc || field == me.sc.amtFcChg) {
                  if (!Ext.isEmpty(me.ifc) && record.get(me.ifc) == "1") {
                      Ext.MessageBox.alert("提示", "农产品不允许修改不含税金额!");
                      return false;
                  }
              }
              if (!me.AmtCanEdit())
                  return false;

              if (me.GddjCtrInput() == 1) {
                  Ext.MessageBox.alert("提示", "业务控制不允许修改金额信息!-固定单价合同");
                  return false;
              }
              break;
          default:
          //多次调差动作未处理todo
      }
      return true;
  },
  /**
   * 计算前数据赋值和检测字段
   * @param {*} editor
   * @param {*} e
   * @returns
   */
  beforeCal: function (editor, e) {
      var me = this;
      var record = e.record;
      try {
          //数据赋值
          me.scv.qtyValue = GcRound(me.getRD(record, me.sc.qty), 'fQty');
          me.scv.prcFcValue = GcRound(me.getRD(record, me.sc.prcFc), 'fPrc');
          me.scv.prcVatFcValue = GcRound(me.getRD(record, me.sc.prcVatFc), 'fPrc');
          me.scv.amtFcValue = GcRound(me.getRD(record, me.sc.amtFc), 'fAmt');
          me.scv.amtVatFcValue = GcRound(me.getRD(record, me.sc.amtVatFc), 'fAmt');
          me.scv.taxRateValue = me.getRD(record, me.sc.taxRate);
          me.scv.taxAmtValue = GcRound(me.getRD(record, me.sc.taxAmt), 'fAmt');
          me.scv.taxbbAmtValue = GcRound(me.getRD(record, me.sc.taxbbAmt), 'fAmt');
          me.scv.prcValue = GcRound(me.getRD(record, me.sc.prc), 'fPrc');
          me.scv.prcVatValue = GcRound(me.getRD(record, me.sc.prcVat), 'fPrc');
          me.scv.amtValue = GcRound(me.getRD(record, me.sc.amt), 'fAmt');
          me.scv.amtVatValue = GcRound(me.getRD(record, me.sc.amtVat), 'fAmt');
          me.scv.exchRateValue = me.getRD(record, me.sc.exchRate);
          me.scv.umConvValue = me.getRD(record, me.sc.umConv);
          me.scv.umConvmValue = me.getRD(record, me.sc.umConvm);
          me.scv.fzQtyValue = GcRound(me.getRD(record, me.sc.fzQty), "fQty");
          me.scv.fzPrcValue = GcRound(me.getRD(record, me.sc.fzPrc), "fPrc");
          me.scv.isfarmValue = me.getRD(record, me.ifc);

          //变更单相关
          if (me.ischg) {
              me.scv.qtyOriValue = GcRound(me.getRD(record, me.sc.qtyOri), "fQty");
              me.scv.qtyChgValue = GcRound(me.getRD(record, me.sc.qtyChg), "fQty");

              me.scv.prcOriValue = GcRound(me.getRD(record, me.sc.prcOri), "fPrc");
              me.scv.prcChgValue = GcRound(me.getRD(record, me.sc.prcChg), "fPrc");
              me.scv.prcVatOriValue = GcRound(me.getRD(record, me.sc.prcVatOri), "fPrc");
              me.scv.prcVatChgValue = GcRound(me.getRD(record, me.sc.prcVatChg), "fPrc");

              me.scv.prcFcOriValue = GcRound(me.getRD(record, me.sc.prcFcOri), "fPrc");
              me.scv.prcFcChgValue = GcRound(me.getRD(record, me.sc.prcFcChg), "fPrc");
              me.scv.prcVatFcOriValue = GcRound(me.getRD(record, me.sc.prcVatFcOri), "fPrc");
              me.scv.prcVatFcChgValue = GcRound(me.getRD(record, me.sc.prcVatFcChg), "fPrc");
              me.scv.amtFcOriValue = GcRound(me.getRD(record, me.sc.amtFcOri), "fAmt");
              me.scv.amtFcChgValue = GcRound(me.getRD(record, me.sc.amtFcChg), "fAmt");
              me.scv.amtVatFcOriValue = GcRound(me.getRD(record, me.sc.amtVatFcOri), "fAmt");
              me.scv.amtVatFcChgValue = GcRound(me.getRD(record, me.sc.amtVatFcChg), "fAmt");

              me.scv.amtOriValue = GcRound(me.getRD(record, me.sc.amtOri), "fAmt");
              me.scv.amtChgValue = GcRound(me.getRD(record, me.sc.amtChg), "fAmt");
              me.scv.amtVatOriValue = GcRound(me.getRD(record, me.sc.amtVatOri), "fAmt");
              me.scv.amtVatChgValue = GcRound(me.getRD(record, me.sc.amtVatChg), "fAmt");

              me.scv.taxRateOriValue = me.getRD(record, me.sc.taxRateOri);
              me.scv.taxRateChgValue = me.getRD(record, me.sc.taxRateChg);
              me.scv.taxAmtOriValue = GcRound(me.getRD(record, me.sc.taxAmtOri), "fAmt");
              me.scv.taxAmtChgValue = GcRound(me.getRD(record, me.sc.taxAmtChg), "fAmt");
              me.scv.taxbbAmtOriValue = GcRound(me.getRD(record, me.sc.taxbbAmtOri), "fAmt");
              me.scv.taxbbAmtChgValue = GcRound(me.getRD(record, me.sc.taxbbAmtChg), "fAmt");
          }
      }
      catch (e) {
          Ext.MessageBox.alert("提示", "初始数据更新错误[beforeCal]-" + e);
          console.log("初始数据更新错误[beforeCal]-" + e);
          return false;
      }

      //汇率特殊处理下
      if (me.scv.exchRateValue <= 0)
          me.scv.exchRateValue = 1;

      return true;
  },
  /**
   * 业务点重写场景判断
   * @param {} editor
   * @param {*} e
   * @returns
   */
  userBeforeCal: function (editor, e) {
      return true;
  },
  afterCal: function (editor, e) {
      var me = this;

      var info = "数量" + me.scv.qtyValue.toString() + ";" +
          "辅助数量" + me.scv.fzQtyValue.toString() + ";" +
          "辅助单价" + me.scv.fzPrcValue.toString() + ";\n" +
          "换算分子" + me.scv.umConvValue.toString() + ";" +
          "换算分母" + me.scv.umConvmValue.toString() + ";\n" +
          "不含税价" + me.scv.prcFcValue.toString() + ";" +
          "含税价" + me.scv.prcVatFcValue.toString() + ";\n" +
          "金额" + me.scv.amtFcValue.toString() + ";" +
          "价税合计" + me.scv.amtVatFcValue.toString() + ";\n" +
          "本币不含税价" + me.scv.prcValue.toString() + ";" +
          "本币含税价" + me.scv.prcVatValue.toString() + ";\n" +
          "本币金额" + me.scv.amtValue.toString() + ";" +
          "本币价税合计" + me.scv.amtVatValue.toString() + ";\n" +
          "税率" + me.scv.taxRateValue.toString() + ";\n" +
          "税额" + me.scv.taxAmtValue.toString() + ";" +
          "本币税额" + me.scv.taxbbAmtValue.toString() + ";\n" +
          "汇率" + me.scv.exchRateValue.toString() + ";\n" +
          "是否农产品" + me.scv.isfarmValue.toString() + ";\n"

      if (me.ischg) {
          info += "原始数量" + me.scv.qtyOriValue.toString() + ";" +
              "变更数量" + me.scv.qtyChgValue.toString() + ";\n" +

              "原始本币不含税单价" + me.scv.prcOriValue.toString() + ";" +
              "变更本币不含税单价" + me.scv.prcChgValue.toString() + ";" +
              "原始本币含税单价" + me.scv.prcVatOriValue.toString() + ";" +
              "变更本币含税单价" + me.scv.prcVatChgValue.toString() + ";\n" +

              "原始不含税单价" + me.scv.prcFcOriValue.toString() + ";" +
              "变更不含税单价" + me.scv.prcFcChgValue.toString() + ";" +
              "原始含税单价" + me.scv.prcVatFcOriValue.toString() + ";" +
              "变更含税单价" + me.scv.prcVatFcChgValue.toString() + ";\n" +

              "原始本币金额" + me.scv.amtOriValue.toString() + ";" +
              "变更本币金额" + me.scv.amtChgValue.toString() + ";" +
              "原始本币价税合计" + me.scv.amtVatOriValue.toString() + ";" +
              "变更本币价税合计" + me.scv.amtVatChgValue.toString() + ";\n" +

              "原始金额" + me.scv.amtFcOriValue.toString() + ";" +
              "变更金额" + me.scv.amtFcChgValue.toString() + ";" +
              "原始价税合计" + me.scv.amtVatFcOriValue.toString() + ";" +
              "变更价税合计" + me.scv.amtVatFcChgValue.toString() + ";\n" +

              "原始税额" + me.scv.taxAmtOriValue.toString() + ";" +
              "变更税额" + me.scv.taxAmtChgValue.toString() + ";" +
              "原始本币税额" + me.scv.taxbbAmtOriValue.toString() + ";" +
              "变更本币税额" + me.scv.taxbbAmtChgValue.toString() + ";\n" +
              "原始税率" + me.scv.taxRateOriValue.toString() + ";" +
              "变更税率" + me.scv.taxRateChgValue.toString() + ";"
      }
      //todo
      //是否要重新对record赋值?(处理掉老数据的精度)

      //开发过程看列信息，后续要去掉
      console.log(info);

      //处理其他量价信息
      //执行业务回调方法
  },
  /**
   * 业务点重写场景处理
   * @param {*} editor
   * @param {*} e
   */
  userAfterCal: function (editor, e) {

  },
  /**
   * 0:不是固定单价 1:固定单价，只能修改单价 2:固定单价，不能修改单价
   * 业务点重写
   */
  GddjCtrInput: function () {
      return 0;
  },
  /**
   * 0:不是总价 1:总价，只能修改金额
   * 业务点重写
   */
  ZjCtrInput: function () {
      return 0;
  },
  /**
   * 是否可编辑数量信息
   * 业务点重写
   * @returns
   */
  QtyCanEdit: function () {
      return true;
  },
  /**
   * 是否可编辑单价信息
   * 业务点重写
   * @returns
   */
  PrcCanEdit: function () {
      return true;
  },
  /**
   * 是否可编辑金额信息
   * 业务点重写
   * @returns
   */
  AmtCanEdit: function () {
      return true;
  },
  /**
   * 增加取记录方法判断（getRecordData）
   * 注意：该方法仅提供给标准字段取数调用
   * @param {*} r
   * @param {*} col
   */
  getRD: function (r, col) {
      //col为空则认为业务点不需要绑定该列,返回0
      if (Ext.isEmpty(col))
          return 0;

      var me = this;
      var fields = me.getGrid().getStore().model.getFields();

      var isExist = false;
      Ext.Array.forEach(fields, function (field) {
          if (col == field.name)
              isExist = true;
      });


      if (!isExist)
          throw (StringFormat("程序员错误[{0}]不是Grid控件列!,请联系技术人员处理,否则数据将发生错误!", col));

      if (r.constructor.name == "Object")
          var v = r[col];
      else
          var v = r.get(col);
      if (isNaN(v))
          throw (StringFormat("程序员错误[{0}]列数据错误(isNaN)!请联系技术人员处理,否则数据将发生错误!", col)
          )

      return v;
  },
  /**
   * 增加设置记录方法判断（setRecordData）
   * 注意：该方法仅提供给标准字段赋值调用
   * @param {*} r
   * @param {*} col
   * @param {*} val
   */
  setRD: function (r, col, val) {
      //col为空则认为业务点不需要绑定该列,返回
      if (Ext.isEmpty(col))
          return;

      var me = this;
      var fields = me.getGrid().getStore().model.getFields();

      var isExist = false;
      Ext.Array.forEach(fields, function (field) {
          if (col == field.name)
              isExist = true;
      });

      if (!isExist)
          throw (StringFormat("程序员错误[{0}]不是Grid控件列!,请联系技术人员处理,否则数据将发生错误!", col));

      if (isNaN(val))
          throw (StringFormat("程序员错误[{0}]列数据错误(isNaN)!请联系技术人员处理,否则数据将发生错误!", col));

      if (r.constructor.name == "Object")
          r[col] = val;
      else
          r.set(col, val);
  },
  /**
   * 增加取记录方法判断（getNumberRecordData）
   * 注意：该方法仅提供给业务点调用(1.只针对量价字段 2.取值精度处理)
   * @param {*} r
   * @param {*} col
   */
  getNumRD: function (r, col) {
      var me = this;
      var v = r.get(col);
      //后续增加字段是否存在,类型是否正确的判断,减少数据的错误发生
      v = GcRound(v, me.getUnStandarNumColFormat(col))
      return v;
  },
  /**
   * 增加设置记录方法判断（setNumberRecordData）
   * 注意：该方法仅提供给业务点调用(1.只针对量价字段 2.赋值精度处理)
   * @param {*} r
   * @param {*} col
   * @param {*} val
   */
  setNumRD: function (r, col, val) {
      var me = this;
      //后续增加字段是否存在,类型是否正确的判断,减少数据的错误发生
      r.set(col, GcRound(val, me.getUnStandarNumColFormat(col)));
  },
  /**
   * 更新金额税额变更列值（只针对变更单）
   * @param {*} record 记录
   */
  setChgAmtCol: function (record) {
      var me = this;
      if (me.ischg) {
          var amtVatFcChgTemp = GcSub(me.scv.amtVatFcValue, me.scv.amtVatFcOriValue);//更新变更价税合计
          var amtFcChgTemp = GcSub(me.scv.amtFcValue, me.scv.amtFcOriValue);//更新变更不含税金额
          var taxAmtChgTemp = GcSub(me.scv.taxAmtValue, me.scv.taxAmtOriValue);//更新变更税额
          var amtVatChgTemp = GcSub(me.scv.amtVatValue, me.scv.amtVatOriValue);//更新变更本币价税合计
          var amtChgTemp = GcSub(me.scv.amtValue, me.scv.amtOriValue);//更新变更本币金额

          me.scv.amtVatFcChgValue = GcRound(amtVatFcChgTemp, "fAmt");
          me.scv.amtFcChgValue = GcRound(amtFcChgTemp, "fAmt");
          me.scv.taxAmtChgValue = GcRound(taxAmtChgTemp, "fAmt");
          me.scv.amtVatChgValue = GcRound(amtVatChgTemp, "fAmt");
          me.scv.amtChgValue = GcRound(amtChgTemp, "fAmt");

          me.setRD(record, me.sc.amtVatFcChg, me.scv.amtVatFcChgValue);//更新变更价税合计
          me.setRD(record, me.sc.amtFcChg, me.scv.amtFcChgValue);//更新变更不含税金额
          me.setRD(record, me.sc.taxAmtChg, me.scv.taxAmtChgValue);//更新变更税额
          me.setRD(record, me.sc.amtVatChg, me.scv.amtVatChgValue);//更新变更本币价税合计
          me.setRD(record, me.sc.amtChg, me.scv.amtChgValue);//更新变更本币金额
      }
  },
  /**
   * 更新单价变更列值（只针对变更单）
   * @param {*} record 记录
   */
  setChgPrcCol: function (record) {
      var me = this;
      if (me.ischg) {
          var prcVatFcChgTemp = GcSub(me.scv.prcVatFcValue, me.scv.prcVatFcOriValue);//更新变更含税单价
          var prcVatChgTemp = GcSub(me.scv.prcVatValue, me.scv.prcVatOriValue);//更新变更本币含税单价
          var prcFcChgTemp = GcSub(me.scv.prcFcValue, me.scv.prcFcOriValue);//更新变更不含税单价
          var prcChgTemp = GcSub(me.scv.prcValue, me.scv.prcOriValue);//更新变更本币不含税单价

          me.scv.prcVatFcChgValue = GcRound(prcVatFcChgTemp, "fPrc");
          me.scv.prcVatChgValue = GcRound(prcVatChgTemp, "fPrc");
          me.scv.prcFcChgValue = GcRound(prcFcChgTemp, "fPrc");
          me.scv.prcChgValue = GcRound(prcChgTemp, "fPrc");

          me.setRD(record, me.sc.prcVatFcChg, me.scv.prcVatFcChgValue);//更新变更含税单价
          me.setRD(record, me.sc.prcVatChg, me.scv.prcVatChgValue);//更新变更本币含税单价
          me.setRD(record, me.sc.prcFcChg, me.scv.prcFcChgValue);//更新变更不含税单价
          me.setRD(record, me.sc.prcChg, me.scv.prcChgValue);//更新变更本币不含税单价
      }
  },
  /**
   * 更新数量变更列值（只针对变更单）
   * @param {*} record 记录
   */
  setChgQtyCol: function (record) {
      var me = this;
      if (me.ischg) {
          var qtyChgTemp = GcSub(me.scv.qtyValue, me.scv.qtyOriValue);//更新变更数量
          me.scv.qtyChgValue = GcRound(qtyChgTemp, "fQty");
          me.setRD(record, me.sc.qtyChg, me.scv.qtyChgValue);//更新变更数量
      }
  },
  /**
   * 更新税率变更列值（只针对变更单）
   * @param {*} record 记录
   */
  setChgTaxrateCol: function (record) {
      var me = this;
      if (me.ischg) {
          var taxRateChgTemp = GcSub(me.scv.taxRateValue, me.scv.taxRateOriValue);//更新变更税率
          me.scv.taxRateChgValue = GcNumRound(taxRateChgTemp, me.getStandarNumColFormat(me.sc.taxRateChg));
          me.setRD(record, me.sc.taxRateChg, me.scv.taxRateChgValue);//更新变更税率
      }
  },
  /**
   * 数量变化-更新其他字段信息
   * @param {*} record
   */
  chgOtherByQty: function (record) {
      var me = this;

      if (!me.scv.prcVatFcValue == 0)//默认认为含税外币单价有值的时候，其他单价字段也有值
      {
          // 1、价税合计=数量*含税单价
          // 2、金额 =数量*单价
          // 3、税额 =价税合计-金额
          // 4、本币价税合计 =数量*本币含税单价
          // 5、本币金额 =数量*本币单价
          me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.qty));
          //me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.qty));
          me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.qty));
          //me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.qty));
          //me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.qty));
          me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.qty));
          me.setChgAmtCol(record);

      } else //单价为0的时候反算单价
      {
          me.setRD(record, me.sc.prcVatFc, me.chgprcVatFcFun(me.sc.qty));
          me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.qty));
          me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.qty));
          me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.qty));
          me.setChgPrcCol(record);

      }

      me.setRD(record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));//更新辅助数量
      me.setChgQtyCol(record);

  },
  /**
   * 不含税单价变化-更新其他字段信息
   * @param {*} record
   */
  chgOtherByPrcFc: function (record) {
      var me = this;
      if (!me.scv.qtyValue == 0) {
          // 1、金额 =数量*不含税单价
          // 2、含税单价 = 不含税单价*（1+税率）
          // 3、价税合计=不含税单价*数量*（1+税率）
          // 4、税额 = 价税合计-金额
          // 5、本币含税单价 =不含税单价*（1+税率）*直接汇率
          // 6、本币不含税单价 =不含税单价*直接汇率
          // 7、本币价税合计 =数量*不含税单价*（1+税率）*直接汇率
          // 8、本币金额 = 数量*不含税单价*直接汇率
          me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.prcFc));
          me.setRD(record, me.sc.prcVatFc, me.chgprcVatFcFun(me.sc.prcFc));
          me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.prcFc));
          me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.prcFc));
          me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.prcFc));
          me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.prcFc));
          me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.prcFc));
          me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.prcFc));
          me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.prcFc));
          me.setChgAmtCol(record);
      } else//数量为0的时候反算数量和其他单价字段
      {
          me.setRD(record, me.sc.prcVatFc, me.chgprcVatFcFun(me.sc.prcFc));
          me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.prcFc));
          me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.prcFc));
          me.setRD(record, me.sc.qty, me.chgqtyFun(me.sc.prcFc));
          me.setRD(record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));//更新辅助数量
          me.setChgQtyCol(record);
      }

      me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.prcFc));//更新辅助单价
      me.setChgPrcCol(record);
  },
  /**
   * 含税单价变化-更新其他字段信息
   * @param {*} record
   */
  chgOtherByPrcFcVat: function (record) {
      var me = this;
      if (!me.scv.qtyValue == 0) {
          // 1、价税合计 =数量*含税单价
          // 2、不含税单价 =含税单价 /（1+税率）
          // 3、金额 =（数量*含税单价）/（1+税率）
          // 4、税额 =价税合计-金额
          // 5、本币含税单价 =含税单价*直接汇率
          // 6、本币不含税单价 =（含税单价*直接汇率 ）/（1+税率）
          // 7、本币价税合计 =数量*含税单价*直接汇率
          // 8、本币金额 =（数量*含税单价*直接汇率）/（1+税率）
          me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.prcVatFc));
          me.setChgAmtCol(record);
      } else//数量为0的时候反算数量和其他单价字段
      {
          me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.qty, me.chgqtyFun(me.sc.prcVatFc));
          me.setRD(record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));//更新辅助数量
          me.setChgQtyCol(record);
      }
      me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.prcFc));//更新辅助单价
      me.setChgPrcCol(record);
  },
  /**
   * 不含税金额变化-更新其他字段信息
   * @param {*} record 记录
   * @param {*} diff 调差额
   */
  chgOtherByAmtFc: function (record, diff) {
      var me = this;

      if (diff != undefined) {
          // 1、税额= 税额-差额
          // 1、本币金额 = 金额*直接汇率
          if(me.scv.taxRateValue == 0)
          {
              me.setRD(record, me.sc.amtVatFc, me.scv.amtFcValue);
          }else{
              me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.amtFc, diff));
          }
          me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtFc));
          me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.amtFc));
      }
      else {
          if (me.scv.qtyValue != 0 && me.GddjCtrInput() != 2) {
              // 1、不含税单价=金额/数量
              // 2、价税合计 = 金额*（1+税率）
              // 3、含税单价 = 金额/数量*（1+税率）
              // 4、税额 = 价税合计-金额
              // 5、本币含税单价 = 金额*（1+税率）*直接汇率/数量
              // 6、本币不含税单价 = 金额*直接汇率/数量
              // 7、本币价税合计 = 金额*（1+税率）*直接汇率
              // 8、本币金额 = 金额*直接汇率
              me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.amtFc));
              me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.amtFc));
              me.setRD(record, me.sc.prcVatFc, me.chgprcVatFcFun(me.sc.amtFc));
              me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.amtFc));
              me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.amtFc));
              me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.amtFc));
              me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.amtFc));
              me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtFc));
              me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.amtFc));
              me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.prcFc));//更新辅助单价
              me.setChgPrcCol(record);
          } else {
              //数量为0的时候反算数量
              me.setRD(record, me.sc.amtVatFc, me.chgamtVatFcFun(me.sc.amtFc));
              me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.amtFc));
              me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.amtFc));
              me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtFc));
              me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.amtFc));
              me.setRD(record, me.sc.qty, me.chgqtyFun(me.sc.amtFc));
              me.setRD(record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));//更新辅助数量
              me.setChgQtyCol(record);
          }
      }

      me.setChgAmtCol(record);
  },
  /**
   * 含税金额变化-更新其他字段信息
   * @param {*} record 记录
   * @param {*} diff 调差额
   */
  chgOtherByAmtFcVat: function (record, diff) {
      var me = this;

      if (diff != undefined) {
          // 1、不含税金额  = 不含税金额+差额
          // 2、本币价税合计 = 价税合计*直接汇率
          // 3、本币金额 = 不含税金额*直接汇率
          me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.amtVatFc, diff));
          me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.amtVatFc));
          me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtVatFc, diff));
      }
      else {
          if (me.scv.qtyValue != 0 && me.GddjCtrInput() != 2) {
              // 1、含税单价  = 价税合计/数量
              // 2、金额  = 价税合计/（1+税率）
              // 3、不含税单价  = 价税合计/数量/（1+税率）
              // 4、税额 = 价税合计-金额
              // 5、本币含税单价 = 价税合计*直接汇率/数量
              // 6、本币不含税单价 = 价税合计*直接汇率/（1+税率）/数量
              // 7、本币价税合计 = 价税合计*直接汇率
              // 8、本币金额 = 价税合计*直接汇率/（1+税率）
              me.setRD(record, me.sc.prcVatFc, me.chgprcVatFcFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.prcVat, me.chgprcVatFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.prcFc));//更新辅助单价
              me.setChgPrcCol(record);
          } else {
              //数量为0的时候反算数量
              me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.amtVat, me.chgamtVatFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.qty, me.chgqtyFun(me.sc.amtVatFc));
              me.setRD(record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));//更新辅助数量
              me.setChgQtyCol(record);
          }
      }

      me.setChgAmtCol(record);
  },
  /**
   * 税率变化-更新其他字段信息
   * @param {*} record 记录
   */
  chgOtherByTaxRate: function (record) {
      var me = this;
      // 修改税率
      // 1、不含税单价 = 含税单价/(1+税率）
      // 2、金额 = 价税合计/（1+税率）
      // 3、税额 = 价税合计-金额
      // 4、本币不含税金额 =本币金额/（1+税率）=（外币金额*直接汇率）/（1+税率）=（数量*外币单价*直接汇率）/（1+税率）
      // 5、本币不含税单价 =本币单价/（1+税率）
      // 6、本币不含税单价 = 含税单价/(1+税率）*直接汇率
      // 7、本币金额 = 价税合计/(1+税率）*直接汇率）
      me.setRD(record, me.sc.prcFc, me.chgprcFcFun(me.sc.taxRate));
      me.setRD(record, me.sc.amtFc, me.chgamtFcFun(me.sc.taxRate));
      me.setRD(record, me.sc.taxAmt, me.chgtaxAmtFun(me.sc.taxRate));
      me.setRD(record, me.sc.prc, me.chgprcFun(me.sc.taxRate));
      me.setRD(record, me.sc.amt, me.chgamtFun(me.sc.taxRate));
      me.setRD(record, me.sc.taxbbAmt, me.chgtaxbbAmtFun(me.sc.taxRate));

      me.setRD(record, me.sc.fzPrc, me.chgfzPrcFun(me.sc.prcFc));//更新辅助单价
      me.setChgAmtCol(record);
      me.setChgPrcCol(record);
      me.setChgTaxrateCol(record);
  },
  /**
   * 数量更新
   * @param {*} chgedColumn 更新列
   * @returns
   */
  chgqtyFun: function (chgedColumn) {
      var me = this;
      if (Ext.isEmpty(me.sc.qty) || me.GddjCtrInput() == 1 || me.ZjCtrInput() == 1) {
          me.scv.qtyValue = 0.00;
          return me.scv.qtyValue;
      }

      switch (chgedColumn) {
          case me.sc.fzQty:
              //产品经理要求只有数量为0时进行反算
              if(me.scv.qtyValue ==0)
                  me.scv.qtyValue = GcMul(me.scv.fzQtyValue, GcDiv(me.scv.umConvmValue, me.scv.umConvValue));
              break;
          case me.sc.prcFc:
          case me.sc.amtFc:
              me.scv.qtyValue = GcDiv(me.scv.amtFcValue, me.scv.prcFcValue);
              break;
          case me.sc.prcVatFc:
          case me.sc.amtVatFc:
              me.scv.qtyValue = GcDiv(me.scv.amtVatFcValue, me.scv.prcVatFcValue);
              break;
          default:
      }
      me.scv.qtyValue = GcRound(me.scv.qtyValue, "fQty");
      return me.scv.qtyValue;
  },
  /**
   * 辅助数量更新
   * @param {*} chgedColumn 更新列
   * @returns
   */
  chgfzQtyFun: function (chgedColumn) {
      var me = this;
      if (Ext.isEmpty(me.sc.fzQty) || me.GddjCtrInput() == 1 || me.ZjCtrInput() == 1) {
          me.scv.fzQtyValue = 0.00;
          return me.scv.fzQtyValue;
      }
      //辅助数量更新统一计算公式
      me.scv.fzQtyValue = GcMul(me.scv.qtyValue, GcDiv(me.scv.umConvValue, me.scv.umConvmValue));
      me.scv.fzQtyValue = GcRound(me.scv.fzQtyValue, "fQty");
      return me.scv.fzQtyValue;
  },
  /**
   * 辅助数量单价(不含税单价)
   * @param {*} chgedColumn 更新列
   * @returns
   */
  chgfzPrcFun: function (chgedColumn) {
      var me = this;
      if (Ext.isEmpty(me.sc.fzPrc) || me.ZjCtrInput() == 1) {
          me.scv.fzPrcValue = 0.00;
          return me.scv.fzPrcValue;
      }
      if (chgedColumn == me.sc.fzQty && me.sc.fzQtyValue != 0) {
          me.scv.fzPrcValue = GcDiv(me.scv.amtFcValue, me.scv.fzQtyValue);
      } else {
          //辅助单价更新统一计算公式
          me.scv.fzPrcValue = GcDiv(me.scv.prcFcValue, GcDiv(me.scv.umConvValue, me.scv.umConvmValue));
      }

      me.scv.fzPrcValue = GcRound(me.scv.fzPrcValue, "fPrc");
      return me.scv.fzPrcValue;
  },
  /**
   * 本地不含税单价更新
   * @param {} chgedColumn 变更列
   */
  chgprcFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.prc) || me.ZjCtrInput() == 1) {
          me.scv.prcValue = 0.00;
          return me.scv.prcValue;
      }

      switch (chgedColumn) {
          case me.sc.prcFc:
          case me.sc.exchRate:
              me.scv.prcValue = GcMul(me.scv.prcFcValue, me.scv.exchRateValue);
              break;
          case me.sc.prcVatFc:
          case me.sc.taxRate:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcValue = GcMul(GcMul(me.scv.prcVatFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              } else {
                  me.scv.prcValue = GcMul(GcDiv(me.scv.prcVatFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              }

              break;
          case me.sc.amtFc:
              me.scv.prcValue = GcMul(GcDiv(me.scv.amtFcValue, me.scv.qtyValue), me.scv.exchRateValue);
              break;
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.prcValue = GcDiv(me.scv.amtValue, me.scv.qtyValue);
              break;
          case me.sc.amtVatFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcValue = GcMul(GcDiv(GcMul(me.scv.amtVatFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.qtyValue), me.scv.exchRateValue);
              } else {
                  var prcvalue = GcMul(GcDiv(GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.qtyValue), me.scv.exchRateValue);
                  if(me.iscalamt || Math.abs(GcSub(me.scv.prcValue, prcvalue)) >0.01)
                      me.scv.prcValue = prcvalue;
              }

              break;
          default:
      }
      me.scv.prcValue = GcRound(me.scv.prcValue, "fPrc");
      return me.scv.prcValue;
  },
  /**
   * 外币不含税单价更新
   * @param {*} chgedColumn 变更列
   * @returns
   */
  chgprcFcFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.prcFc) || me.ZjCtrInput() == 1) {
          me.scv.prcFcValue = 0.00;
          return me.scv.prcFcValue;
      }

      switch (chgedColumn) {
          case me.sc.prcVatFc:
          case me.sc.taxRate:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcFcValue = GcMul(me.scv.prcVatFcValue, GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.prcFcValue = GcDiv(me.scv.prcVatFcValue, GcAdd(1, me.scv.taxRateValue));
              }

              break;
          case me.sc.amtFc:
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.prcFcValue = GcDiv(me.scv.amtFcValue, me.scv.qtyValue);
              break;
          case me.sc.amtVatFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcFcValue = GcMul(GcDiv(me.scv.amtVatFcValue, me.scv.qtyValue), GcSub(1, me.scv.taxRateValue));
              } else {
                  var prcfcvalue = GcDiv(GcDiv(me.scv.amtVatFcValue, me.scv.qtyValue), GcAdd(1, me.scv.taxRateValue));
                  if(me.iscalamt ||Math.abs(GcSub(me.scv.prcFcValue, prcfcvalue)) >0.01)
                      me.scv.prcFcValue = prcfcvalue;
              }

              break;
          default:
      }

      me.scv.prcFcValue = GcRound(me.scv.prcFcValue, "fPrc");
      return me.scv.prcFcValue;
  },
  /**
   * 本币含税单价更新
   * @param {} chgedColumn 变更列
   */
  chgprcVatFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.prcVat) || me.ZjCtrInput() == 1) {
          me.scv.prcVatValue = 0.00;
          return me.scv.prcVatValue;
      }

      switch (chgedColumn) {
          case me.sc.prcFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcVatValue = GcMul(GcDiv(me.scv.prcFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              } else {
                  me.scv.prcVatValue = GcMul(GcMul(me.scv.prcFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              }

              break;
          case me.sc.prcVatFc:
          case me.sc.exchRate:
              me.scv.prcVatValue = GcMul(me.scv.prcVatFcValue, me.scv.exchRateValue);
              break;
          case me.sc.amtFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcVatValue = GcMul(GcDiv(GcDiv(me.scv.amtFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.qtyValue), me.scv.exchRateValue);
              } else {
                  var prcvatvalue = GcMul(GcDiv(GcMul(me.scv.amtFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.qtyValue), me.scv.exchRateValue);
                  if(me.iscalamt || Math.abs(GcSub(me.scv.prcVatValue, prcvatvalue)) >0.01)
                      me.scv.prcVatValue = prcvatvalue;
              }

              break;
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.prcVatValue = GcDiv(me.scv.amtVatValue, me.scv.qtyValue);
              break;
          case me.sc.amtVatFc:
              me.scv.prcVatValue = GcMul(GcDiv(me.scv.amtVatFcValue, me.scv.qtyValue), me.scv.exchRateValue);
              break;
          default:
      }
      me.scv.prcVatValue = GcRound(me.scv.prcVatValue, "fPrc");
      return me.scv.prcVatValue;
  },
  /**
   * 外币含税单价更新
   * @param {*} chgedColumn 变更列
   * @returns
   */
  chgprcVatFcFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.prcVatFc) || me.ZjCtrInput() == 1) {
          me.scv.prcVatFcValue = 0.00;
          return me.scv.prcVatFcValue;
      }

      switch (chgedColumn) {
          case me.sc.taxRate:
          case me.sc.prcFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcVatFcValue = GcDiv(me.scv.prcFcValue, GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.prcVatFcValue = GcMul(me.scv.prcFcValue, GcAdd(1, me.scv.taxRateValue));
              }

              break;
          case me.sc.amtFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.prcVatFcValue = GcMul(GcMul(me.scv.amtFcValue, me.scv.qtyValue), GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.prcVatFcValue = GcMul(GcDiv(me.scv.amtFcValue, me.scv.qtyValue), GcAdd(1, me.scv.taxRateValue));
              }
              break;
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.prcVatFcValue = GcDiv(me.scv.amtVatFcValue, me.scv.qtyValue);
              break;
          case me.sc.amtVatFc:
              var prcvatfcvalue = GcDiv(me.scv.amtVatFcValue, me.scv.qtyValue);
              if(me.iscalamt || Math.abs(GcSub(me.scv.prcVatFcValue, prcvatfcvalue)) >0.01)
                  me.scv.prcVatFcValue = prcvatfcvalue;
              break;

          default:
      }
      me.scv.prcVatFcValue = GcRound(me.scv.prcVatFcValue, "fPrc");
      return me.scv.prcVatFcValue;
  },
  /**
   * 本币金额更新
   * @param {} chgedColumn 变更列
   * @param {} diff 调差额
   * @returns
   */
  chgamtFun: function (chgedColumn, diff) {
      var me = this;

      if (Ext.isEmpty(me.sc.amt) || me.GddjCtrInput() == 1) {
          me.scv.amtValue = 0.00;
          return me.scv.amtValue;
      }

      switch (chgedColumn) {
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.amtValue = GcMul(me.scv.qtyValue, me.scv.prcValue);
              break;
          case me.sc.prcFc:
              me.scv.amtValue = GcMul(GcMul(me.scv.qtyValue, me.scv.prcFcValue), me.scv.exchRateValue);
              break;
          case me.sc.prcVatFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtValue = GcMul(GcDiv(GcDiv(me.scv.qtyValue, me.scv.prcVatFcValue), GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              } else {
                  me.scv.amtValue = GcMul(GcDiv(GcMul(me.scv.qtyValue, me.scv.prcVatFcValue), GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              }

              break;
          case me.sc.amtFc:
          case me.sc.exchRate:
              me.scv.amtValue = GcMul(me.scv.amtFcValue, me.scv.exchRateValue);
              break;
          case me.sc.amtVatFc:
              if (diff != undefined)
                  me.scv.amtValue = GcMul(me.scv.amtFcValue, me.scv.exchRateValue)
              else
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtValue = GcMul(GcMul(me.scv.amtVatFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue)
              } else {
                  if(me.iscalamt || Math.abs(GcSub(me.scv.amtValue, GcMul(GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue)))>0.06)
                      me.scv.amtValue = GcMul(GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue)
              }

              break;
          case me.sc.taxRate:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtValue = GcMul(GcMul(me.scv.amtVatFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue)
              } else {
                  me.scv.amtValue = GcMul(GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue)
              }
              break;
          case me.sc.taxAmt:
              me.scv.amtValue = GcMul(GcSub(me.scv.amtVatFcValue, me.scv.taxAmtValue), me.scv.exchRateValue);
              break;
          default:
      }

      me.scv.amtValue = GcRound(me.scv.amtValue, "fAmt");
      return me.scv.amtValue;
  },
  /**
   * 外币金额更新
   * @param {*} chgedColumn 变更列
   * @param {*} diff 调差额
   * @returns
   */
  chgamtFcFun: function (chgedColumn, diff) {
      var me = this;

      if (Ext.isEmpty(me.sc.amtFc) || me.GddjCtrInput() == 1) {
          me.scv.amtFcValue = 0.00;
          return me.scv.amtFcValue;
      }

      switch (chgedColumn) {
          case me.sc.qty:
          case me.sc.fzQty:
          case me.sc.prcFc:
              me.scv.amtFcValue = GcMul(me.scv.qtyValue, me.scv.prcFcValue);
              break;
          case me.sc.prcVatFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtFcValue = GcMul(GcMul(me.scv.qtyValue, me.scv.prcVatFcValue), GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.amtFcValue = GcDiv(GcMul(me.scv.qtyValue, me.scv.prcVatFcValue), GcAdd(1, me.scv.taxRateValue));
              }

              break;
          case me.sc.amtVatFc:
              if (diff != undefined)
                  me.scv.amtFcValue = GcAdd(me.scv.amtFcValue, diff);//调差
              else {
                  if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                      me.scv.amtFcValue = GcMul(me.scv.amtVatFcValue, GcSub(1, me.scv.taxRateValue));
                  } else {
                      if(me.iscalamt || Math.abs(GcSub(me.scv.amtFcValue, GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue))))>0.06)
                          me.scv.amtFcValue = GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue));
                  }
              }
              break;
          case me.sc.taxRate:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtFcValue = GcMul(me.scv.amtVatFcValue, GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.amtFcValue = GcDiv(me.scv.amtVatFcValue, GcAdd(1, me.scv.taxRateValue));
              }
              break;
          case me.sc.taxAmt:
              me.scv.amtFcValue = GcSub(me.scv.amtVatFcValue, me.scv.taxAmtValue);
              break;
          default:
      }
      me.scv.amtFcValue = GcRound(me.scv.amtFcValue, "fAmt");
      return me.scv.amtFcValue;
  },
  /**
   * 本币价税合计更新
   * @param {*} chgedColumn 变更列
   * @returns
   */
  chgamtVatFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.amtVat) || me.GddjCtrInput() == 1) {
          me.scv.amtVatValue = 0.00;
          return me.scv.amtVatValue;
      }

      switch (chgedColumn) {
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.amtVatValue = GcMul(me.scv.qtyValue, me.scv.prcVatValue);
              break;
          case me.sc.prcFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtVatValue = GcMul(me.scv.qtyValue, GcMul(GcDiv(me.scv.prcFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue));
              } else {
                  me.scv.amtVatValue = GcMul(me.scv.qtyValue, GcMul(GcMul(me.scv.prcFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue));
              }

              break;
          case me.sc.prcVatFc:
              me.scv.amtVatValue = GcMul(GcMul(me.scv.qtyValue, me.scv.prcVatFcValue), me.scv.exchRateValue);
              break;
          case me.sc.amtFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtVatValue = GcMul(GcDiv(me.scv.amtFcValue, GcSub(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              } else {
                  me.scv.amtVatValue = GcMul(GcMul(me.scv.amtFcValue, GcAdd(1, me.scv.taxRateValue)), me.scv.exchRateValue);
              }

              break;
          case me.sc.amtVatFc:
          case me.sc.exchRate:
              me.scv.amtVatValue = GcMul(me.scv.amtVatFcValue, me.scv.exchRateValue);
              break;
          default:
      }

      me.scv.amtVatValue = GcRound(me.scv.amtVatValue, "fAmt");
      return me.scv.amtVatValue;
  },
  /**
   * 外币价税合计更新
   * @param {*} chgedColumn 变更列
   */
  chgamtVatFcFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.amtVatFc) || me.GddjCtrInput() == 1) {
          me.scv.amtVatFcValue = 0.00;
          return me.scv.amtVatFcValue;
      }

      switch (chgedColumn) {
          case me.sc.qty:
          case me.sc.fzQty:
              me.scv.amtVatFcValue = GcMul(me.scv.qtyValue, me.scv.prcVatFcValue);
              break;
          case me.sc.prcFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtVatFcValue = GcMul(GcDiv(me.scv.prcFcValue, me.scv.qtyValue), GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.amtVatFcValue = GcMul(GcMul(me.scv.prcFcValue, me.scv.qtyValue), GcAdd(1, me.scv.taxRateValue));
              }

              break;
          case me.sc.prcVatFc:
              me.scv.amtVatFcValue = GcMul(me.scv.qtyValue, me.scv.prcVatFcValue);
              break;
          case me.sc.taxRate:
          case me.sc.amtFc:
              if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1") {
                  me.scv.amtVatFcValue = GcDiv(me.scv.amtFcValue, GcSub(1, me.scv.taxRateValue));
              } else {
                  me.scv.amtVatFcValue = GcMul(me.scv.amtFcValue, GcAdd(1, me.scv.taxRateValue));
              }

              break;
          default:
      }
      me.scv.amtVatFcValue = GcRound(me.scv.amtVatFcValue, "fAmt");
      return me.scv.amtVatFcValue;
  },
  /**
   * 税额更新
   * @param {*} chgedColumn 变更列
   * @param {*} diff 调差额
   */
  chgtaxAmtFun: function (chgedColumn, diff) {
      var me = this;

      if (Ext.isEmpty(me.sc.taxAmt) || me.GddjCtrInput() == 1) {
          me.scv.taxAmtValue = 0.00;
          return me.scv.taxAmtValue;
      }

      if (diff != undefined)
          me.scv.taxAmtValue = GcSub(me.scv.taxAmtValue, diff);
      else {
          if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1")
              me.scv.taxAmtValue = GcMul(me.scv.amtVatFcValue, me.scv.taxRateValue); //农产品税额=含税金额*税率 直接乘法处理,可能会有精度问题(客户调差解决)
          else
              me.scv.taxAmtValue = GcSub(me.scv.amtVatFcValue, me.scv.amtFcValue); //非农产品税额=含税-不含税
      }

      me.scv.taxAmtValue = GcRound(me.scv.taxAmtValue, "fAmt");
      return me.scv.taxAmtValue;
  },
  /**
   * 本币税额更新
   * @param {*} chgedColumn 变更列
   */
  chgtaxbbAmtFun: function (chgedColumn) {
      var me = this;

      if (Ext.isEmpty(me.sc.taxbbAmt) || me.GddjCtrInput() == 1) {
          me.scv.taxbbAmtValue = 0.00;
          return me.scv.taxbbAmtValue;
      }

      if (!Ext.isEmpty(me.ifc) && me.scv.isfarmValue == "1")
          me.scv.taxbbAmtValue = GcMul(me.scv.amtVatValue, me.scv.taxRateValue); //农产品税额=金额*税率 直接乘法处理,可能会有精度问题(客户调差解决)
      else
          me.scv.taxbbAmtValue = GcSub(me.scv.amtVatValue, me.scv.amtValue); //非农产品税额=含税-不含税

      me.scv.taxbbAmtValue = GcRound(me.scv.taxbbAmtValue, "fAmt");
      return me.scv.taxbbAmtValue;
  },
  /**
   * 初始化model(批量引用或者导入数据用)
   */
  initBatchCalModel:function()
  {
      var me = this;

      var GcPlugingStdFields = [];

      Ext.Array.forEach(Object.keys(me.sc), function (key) {
          if (!Ext.isEmpty(me.sc[key])) {
              var fieldTemp = [{
                  name: me.sc[key],
                  type: 'float',
                  mapping: me.sc[key]
              }
              ]
              GcPlugingStdFields = GcPlugingStdFields.concat(fieldTemp);
          }
      })

      if (!Ext.isEmpty(me.ifc)) {
          GcPlugingStdFields = GcPlugingStdFields.concat([{
              name: me.ifc,
              type: 'int',
              mapping: me.ifc
          }
          ])
      }

      //定义标准字段std的model
      Ext.define(me.currSuit+"GcPlugingStdModel", {
          extend: "Ext.data.Model",
          fields: GcPlugingStdFields
      });
  },
  /**
   * 计算records参数的标准字段值，应用场景（excel导入明细数据;或者imp引用其他明细数据）
   * 注意：当前切换在哪套标准字段则计算哪套,根据me.currSuit判断
   * 注意：业务点切换标准字段后进行调用
   * @param {*} records
   * @param {*} callback 回调方法
   */
  batchCalculationData: function (records,callback) {
      var me = this;
      var preValue, afterValue;

      if(me.currSuit==undefined||Ext.isEmpty(me.currSuit) )
          me.currSuit='std'

      me.initBatchCalModel();
      Ext.suspendLayouts();//停止刷UI
      for (i = 0; i < records.length; i++) {
          preValue = me.beforeBatchCal(records[i]);
          if (preValue == -1)
              return null;
          afterValue = me.dealBatchCal(preValue, records[i]);
      }
      Ext.resumeLayouts(true);
      if (callback)
          callback(records)
  },
  /**
   * 批量处理数据前
   * @param {*} record 记录
   * @returns
   */
  beforeBatchCal: function (record) {
      var me = this;

      var preValueObj = {
          qtyValue: 0.00,
          prcValue: 0.00, prcFcValue: 0.00, prcVatValue: 0.00, prcVatFcValue: 0.00,
          amtValue: 0.00, amtFcValue: 0.00, amtVatValue: 0.00, amtVatFcValue: 0.00,
          taxRateValue: 0.00, taxAmtValue: 0.00,
          exchRateValue: 0.00,
          umConvValue: 0.00, umConvmValue: 0.00, fzQtyValue: 0.00,
          isfarmValue: 0,
          qtyOriValue: 0.00, qtyChgValue: 0.00,
          prcOriValue: 0.00, prcChgValue: 0.00, prcVatOriValue: 0.00, prcVatChgValue: 0.00,
          prcFcOriValue: 0.00, prcFcChgValue: 0.00, prcVatFcOriValue: 0.00, prcVatFcChgValue: 0.00,
          amtOriValue: 0.00, amtChgValue: 0.00, amtVatOriValue: 0.00, amtVatChgValue: 0.00,
          amtFcOriValue: 0.00, amtFcChgValue: 0.00, amtVatFcOriValue: 0.00, amtVatFcChgValue: 0.00,
          taxRateOriValue: 0.00, taxRateChgValue: 0.00,
          taxAmtOriValue: 0.00, taxAmtChgValue: 0.00
      };

      try {
          record = Ext.ModelManager.create(record, me.currSuit+'GcPlugingStdModel');

          //如果是系统内部引用,则默认认为都是截断后的数据(精度是一致的) todo(后续可增加对精度的判断)
          preValueObj.qtyValue = me.getRD(record, me.sc.qty);
          preValueObj.prcFcValue = me.getRD(record, me.sc.prcFc);
          preValueObj.prcVatFcValue = me.getRD(record, me.sc.prcVatFc);
          preValueObj.amtFcValue = me.getRD(record, me.sc.amtFc);
          preValueObj.amtVatFcValue = me.getRD(record, me.sc.amtVatFc);
          preValueObj.taxRateValue = me.getRD(record, me.sc.taxRate);
          preValueObj.taxAmtValue = me.getRD(record, me.sc.taxAmt);
          preValueObj.taxbbAmtValue = me.getRD(record, me.sc.taxbbAmt);
          preValueObj.prcValue = me.getRD(record, me.sc.prc);
          preValueObj.prcVatValue = me.getRD(record, me.sc.prcVat);
          preValueObj.amtValue = me.getRD(record, me.sc.amt);
          preValueObj.amtVatValue = me.getRD(record, me.sc.amtVat);
          preValueObj.exchRateValue = me.getRD(record, me.sc.exchRate);
          preValueObj.umConvValue = me.getRD(record, me.sc.umConv);
          preValueObj.umConvmValue = me.getRD(record, me.sc.umConvm);
          preValueObj.fzQtyValue = me.getRD(record, me.sc.fzQty);
          preValueObj.fzPrcValue = me.getRD(record, me.sc.fzPrc);

          if (me.ischg) {
              preValueObj.qtyOriValue = me.getRD(record, me.sc.qtyOri);
              preValueObj.qtyChgValue = me.getRD(record, me.sc.qtyChg);
              preValueObj.prcOriValue = me.getRD(record, me.sc.prcOri);
              preValueObj.prcChgValue = me.getRD(record, me.sc.prcChg);
              preValueObj.prcVatOriValue = me.getRD(record, me.sc.prcVatOri);
              preValueObj.prcVatChgValue = me.getRD(record, me.sc.prcVatChg);
              preValueObj.prcFcOriValue = me.getRD(record, me.sc.prcFcOri);
              preValueObj.prcFcChgValue = me.getRD(record, me.sc.prcFcChg);
              preValueObj.prcVatFcOriValue = me.getRD(record, me.sc.prcVatFcOri);
              preValueObj.prcVatFcChgValue = me.getRD(record, me.sc.prcVatFcChg);
              preValueObj.amtOriValue = me.getRD(record, me.sc.amtOri);
              preValueObj.amtChgValue = me.getRD(record, me.sc.amtChg);
              preValueObj.amtVatOriValue = me.getRD(record, me.sc.amtVatOri);
              preValueObj.amtVatChgValue = me.getRD(record, me.sc.amtVatChg);
              preValueObj.amtFcOriValue = me.getRD(record, me.sc.amtFcOri);
              preValueObj.amtFcChgValue = me.getRD(record, me.sc.amtFcChg);
              preValueObj.amtVatFcOriValue = me.getRD(record, me.sc.amtVatFcOri);
              preValueObj.amtVatFcChgValue = me.getRD(record, me.sc.amtVatFcChg);
              preValueObj.taxAmtOriValue = me.getRD(record, me.sc.taxAmtOri);
              preValueObj.taxAmtChgValue = me.getRD(record, me.sc.taxAmtChg);
              preValueObj.taxbbAmtOriValue = me.getRD(record, me.sc.taxbbAmtOri);
              preValueObj.taxbbAmtChgValue = me.getRD(record, me.sc.taxbbAmtChg);
              preValueObj.taxRateOriValue = me.getRD(record, me.sc.taxRateOri);
              preValueObj.taxRateChgValue = me.getRD(record, me.sc.taxRateChg);
          }
          //preValueObj.isfarmValue=me.getRD(record,me.ifc);
      }
      catch (e) {
          Ext.MessageBox.alert("提示", "批量处理数据前错误[beforeBatchCal]-" + e);
          console.log("批量处理数据前错误[beforeBatchCal]-" + e);
          return -1;
      }

      //汇率、税率处理
      if (preValueObj.exchRateValue <= 0)
          preValueObj.exchRateValue = 1;
      if (preValueObj.taxRateValue <= 0)
          preValueObj.taxRateValue = 0;

      return preValueObj;
  },
  /**
   * 处理数据
   * @param {*} preValue 计算前数据
   * @param {*} record record记录
   * @returns record 计算后数据
   */
  dealBatchCal: function (preValue, record) {
      var me = this;

      //赋值
      //todo 外部或者引用数据截断后计算还是计算后截断?
      me.scv = preValue;

      Object.keys(me.scv).forEach(function (key) {
          if (me.scv[key] == null || me.scv[key] == "" || me.scv[key] == undefined)
              me.scv[key] = 0;
      });

      var GcPlugingStdData = Ext.ModelManager.create(record, me.currSuit+'GcPlugingStdModel');
      var e = new Object();
      e.grid = me.grid;
      e.record = GcPlugingStdData;

      /**数量,含税单价,价税合计,单价,金额都为0
       * 调用两次standcal清空其他字段
       */
      if (me.scv.qtyValue == 0 && me.scv.prcVatFcValue == 0 && me.scv.prcFcValue == 0 && me.scv.amtVatFcValue == 0 && me.scv.amtFcValue == 0) {
          e.field = me.sc.qty;
          e.value = me.scv.qtyValue;
          //清零1
          me.standarCal(me, e);
          e.field = me.sc.prcVatFc;
          e.value = me.scv.prcFcValue;
          //清零2
          me.standarCal(me, e);

          //赋值计算后的数据到record,返回
          Object.keys(me.sc).forEach(function (colkey) {
              var col=me.sc[colkey];
              if (!Ext.isEmpty(col))
                  record[col] = GcPlugingStdData.data[col];
          });

          //清零后直接返回
          return;
      }

      /**含税金额或者含税单价不为空
       * 1.含税金额为0，按含税单价计算
       * 2.含税金额不为0，按含税金额计算（数量为0，则先计算出数量）
       */
      if (!(me.scv.prcVatFcValue == 0 && me.scv.amtVatFcValue == 0)) {
          if (me.scv.amtVatFcValue == 0) {
              e.field = me.sc.prcVatFc;
              e.value = me.scv.prcVatFcValue;
          }
          else {
              if(me.scv.qtyValue==0){
                  me.setRD(e.record, me.sc.qty, me.chgqtyFun(me.sc.amtVatFc));
                  me.setRD(e.record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));
              }
              e.field = me.sc.amtVatFc;
              e.value = me.scv.amtVatFcValue;
          }
      }
      else {
          /**不含税金额或者不含税单价不为空
           * 1.不含税金额为0，按不含税单价计算
           * 2.不含税金额不为0，按不含税金额计算（数量为0，则先计算出数量）
           */
          if (!(me.scv.prcFcValue == 0 && me.scv.amtFcValue == 0)) {
              if (me.scv.amtFcValue == 0) {
                  e.field = me.sc.prcFc;
                  e.value = me.scv.prcFcValue;
              }
              else {
                  if(me.scv.qtyValue==0){
                      me.setRD(e.record, me.sc.qty, me.chgqtyFun(me.sc.amtFc));
                      me.setRD(e.record, me.sc.fzQty, me.chgfzQtyFun(me.sc.qty));
                  }
                  e.field = me.sc.amtFc;
                  e.value = me.scv.amtFcValue;
              }
          }
      }

      me.iscalamt = false;
      //开始单行计算
      me.standarCal(me, e);

      //赋值计算后的数据到record,返回
      Object.keys(me.sc).forEach(function (colkey) {
          var col=me.sc[colkey];
          if (!Ext.isEmpty(col))
              record[col] = GcPlugingStdData.data[col];
      });


      // var info ="数量"+me.scv.qtyValue.toString()+";"+
      // "辅助数量"+me.scv.fzQtyValue.toString()+";\n"+
      // "换算分子"+me.scv.umConvValue.toString()+";"+
      // "换算分母"+me.scv.umConvmValue.toString()+";\n"+
      // "不含税价"+me.scv.prcFcValue.toString()+";"+
      // "含税价"+me.scv.prcVatFcValue.toString()+";\n"+
      // "金额"+me.scv.amtFcValue.toString()+";"+
      // "价税合计"+me.scv.amtVatFcValue.toString()+";\n"+
      // "本币不含税价"+me.scv.prcValue.toString()+";"+
      // "本币含税价"+me.scv.prcVatValue.toString()+";\n"+
      // "本币金额"+me.scv.amtValue.toString()+";"+
      // "本币价税合计"+me.scv.amtVatValue.toString()+";\n"+
      // "税率"+me.scv.taxRateValue.toString()+";\n"+
      // "税额"+me.scv.taxAmtValue.toString()+";\n"+
      // "汇率"+me.scv.exchRateValue.toString()+";\n"+
      // "是否农产品"+me.scv.isfarmValue.toString()+";"
  },
  /**
   * 切换配置
   * @param {string} id 配置id
   */
  switchConfig: function (id) {
      var me = this;
      if (!id)
          id = 'std';

      if (me.currSuit == id)
          return;

      var isExist = true;
      if (!me.multiScReg.hasOwnProperty(id)) {
          if (me.lockingPartner && !me.lockingPartner.multiScReg.hasOwnProperty(id)) {
              isExist = false;
          }
          if(!isExist){
              console.log('配置id:' + id + '不存在, 切换配置失败!');
              return;
          }
      }

      var screg = me.multiScReg[id] || me.lockingPartner.multiScReg[id];

      me.sc = {
          qty: "",
          prc: "", prcFc: "", prcVat: "", prcVatFc: "",
          amt: "", amtFc: "", amtVat: "", amtVatFc: "",
          taxRate: "", taxAmt: "",taxbbAmt: "",
          exchRate: "",
          //currType:"CurrType",
          umConv: "", umConvm: "", fzQty: "", fzPrc: "",
          qtyOri: "", qtyChg: "",
          prcOri: "", prcChg: "", prcVatOri: "", prcVatChg: "",
          prcFcOri: "", prcFcChg: "", prcVatFcOri: "", prcVatFcChg: "",
          amtFcOri: "", amtFcChg: "", amtVatFcOri: "", amtVatFcChg: "",
          amtOri: "", amtChg: "", amtVatOri: "", amtVatChg: "",
          taxRateOri: "", taxRateChg: "",
          taxAmtOri: "", taxAmtChg: "",taxbbAmtOri: "", taxbbAmtChg: ""
      };

      Ext.Array.forEach(Object.keys(me.sc), function (key) {
          if (!Ext.isEmpty(screg[key])) {
              me.sc[key] = screg[key]
          }
      });

      //标准计量字段值standardColumnValue
      me.scv = {
          qtyValue: 0.00,
          prcValue: 0.00, prcFcValue: 0.00, prcVatValue: 0.00, prcVatFcValue: 0.00,
          amtValue: 0.00, amtFcValue: 0.00, amtVatValue: 0.00, amtVatFcValue: 0.00,
          taxRateValue: 0.00, taxAmtValue: 0.00,taxbbAmtValue: 0.00,
          exchRateValue: 0.00,
          //currTypeValue:0,
          umConvValue: 0.00, umConvmValue: 0.00, fzQtyValue: 0.00, fzPrcValue: 0.00,
          isfarmValue: 0,
          qtyOriValue: 0.00, qtyChgValue: 0.00,
          prcOriValue: 0.00, prcChgValue: 0.00, prcVatOriValue: 0.00, prcVatChgValue: 0.00,
          prcFcOriValue: 0.00, prcFcChgValue: 0.00, prcVatFcOriValue: 0.00, prcVatFcChgValue: 0.00,
          amtOriValue: 0.00, amtChgValue: 0.00, amtVatOriValue: 0.00, amtVatChgValue: 0.00,
          amtFcOriValue: 0.00, amtFcChgValue: 0.00, amtVatFcOriValue: 0.00, amtVatFcChgValue: 0.00,
          taxRateOriValue: 0.00, taxRateChgValue: 0.00,
          taxAmtOriValue: 0.00, taxAmtChgValue: 0.00,taxbbAmtOriValue: 0.00, taxbbAmtChgValue: 0.00
      };

      me.currSuit = id;

      var info = "";
      Ext.Array.forEach(Object.keys(me.sc), function (key) {
          if (Ext.isEmpty(me.sc[key])) {
              if (key.indexOf("Ori") >= 0 || key.indexOf("Chg") >= 0) {
                  if (me.ischg)
                      info += (key + "\n");
              }
              else
                  info += (key + "\n");
          }
      })
      if (Ext.isEmpty(me.ifc))
          info += ("农产品属性字段未配置" + "\n");

      //提示未注册的标准列(暂先全部检测进行提示)
      if (Object.keys(me.sc).length > 0 && !Ext.isEmpty(info)) {
          console.log("程序员错误:未注册以下标准列\n" + info)
          //Ext.MessageBox.alert("提示", "程序员错误:未注册以下标准列<br>" + info + "<br>(找对应开发负责人确认,生产环境会去掉提示)")
      }
  },
  /**
   * 还原配置
   */
  restoreConfig: function () {
      this.switchConfig('std');
  },
  /**
   * 按照修改属性切换对应的配置
   * @param {string} field
   * @returns
   */
  switchConfigByField: function (field) {
      me = this;
      if(me.lockingPartner && me.lockingPartner.fieldMap.hasOwnProperty(field)){
          me.switchConfig(me.lockingPartner.fieldMap[field]);
      }else if (me.fieldMap.hasOwnProperty(field)) {
          me.switchConfig(me.fieldMap[field]);
      }else {
          me.switchConfig('std');
      }
  },
  /**
   * 判断属性是否被修改
   *
   * @param {object} e 编辑信息
   * @param {string} field 属性
   */
  isFieldChanged: function (e, field) {
      if (e.originalData && e.record) {
          return e.originalData[field] != e.record.get(field);
      }
      return false;
  },
  /**
   * 金额变化是否反算单价，默认true
   *
   * @param {object} record
   */
  isCalcPrcByAmtChg: function (plugin, record) {
      return true;
  },
  /**
   * 有锁定列时取得正确的grid
   */
  getGrid:function(){
      return this.grid.ownerLockable?this.grid.ownerLockable:this.grid;
  }
});
