<template>

    <Card>
        <div style="margin-bottom:10px;">
            <Select v-model="appid" placeholder="请选择" :filterable=false
                @on-change="appidChange" :label-in-value=true style="width:200px">
                <Option v-for="item in appList"  :value="item.app_id" :key="item.app_name">{{ item.app_name }}</Option>
            </Select>
            <Button type="primary" style="margin-left:5px;" @click="tagsEdit">编辑条件</Button>
            <!-- <Button type="primary" style="margin-left:5px;">开始权限设定</Button> -->
            <Button type="primary" style="margin-left:5px;" @click="tagsIframeBtnClick">标签维护</Button>
        </div>
        <Table size="small" height=380 border :columns="columns" :data="policyTableData" :loading="policyTableLoading">
            <!-- <template slot-scope="{ row }" slot="network_office_leader">
                <Icon v-if="row.policy.network_office_leader==1" type="md-checkmark-circle" size="24" style="color:green;"/>
                <Icon v-else-if="row.network_office_leader==2" type="ios-close-circle" size="24" style="color:red;"/>
                <Icon v-else type="ios-close-circle-outline" size="24" style="color:#DDD;"/>
            </template> -->
        </Table>
        <Modal  v-model="tagsEditModal" title="应用标签设定" width=650 :styles="{top: '20px'}" @on-ok="tagsModalOK">
            <Table :loading="tagsTableLoading" border ref="tags" :columns="tagsColums"
                :data="tagsData" @on-selection-change="tagsTableSelection" height=400></Table>
        </Modal>
        <Modal  v-model="tagsIframeModal" :scrollable=true width=1100 :footer-hide=true :styles="{top: '20px'}">
            <iframe frameborder=0 scrolling=yes width="1060px" height="400px" :src="tagsIframeModalSrc"></iframe>
        </Modal>

    </Card>

</template>
<script>
import Tables from '_c/tables'
import { getTableData, postData, getData } from '@/api/data'
export default {
  data () {
    return {
      appid: '',
      appList: '',
      tagsIframeModal: false,
      tagsIframeModalSrc: '',
      columns: [],
      policyTableLoading: false,
      tagsTableLoading: true,
      tagsColums: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          key: 'tag_id'
        },
        {
          title: '标签名称',
          key: 'tag_name'
        },
        {
          title: '公共',
          key: 'is_public',
          width: 65
        },
        {
          title: '更新时间',
          key: 'update_time'
        }
      ],
      tagsEditModal: false,
      tagsData: [],
      tagsTableSelectionData: [],
      policyTableData: [
      ]
    }
  },
  methods: {
    initAppList () {
      getData('/api/apps/manage/appinfo/dict').then(res => {
        if (res.data.code == 1) {
          this.appList = res.data.data
        } else {
          this.$Message.warning(res.data.message)
        }
      })
    },
    setColumns () {
      getData('/api/auth/apptag/getAuthTags', { 'appid': this.appid }).then(res => {
        if (res.data.code == 1) {
          this.columns = [{
            title: '资源',
            key: 'menu_name',
            width: 200,
            fixed: 'left',
            className: 'policy-cell'
          }]
          res.data.data.map(tag => {
            this.columns.push({ 'title': tag.tag_name,
              'key': tag.tag_id,
              width: 80,
              render: (h, params) => {
                let effect = params.row['' + params.column.key]
                let iconType = ''
                let iconColor = ''
                if (effect == 1) {
                  iconType = 'md-checkmark-circle'
                  iconColor = 'green'
                } else if (effect == 0) {
                  iconType = 'ios-close-circle'
                  iconColor = 'red'
                } else {
                  iconType = 'ios-close-circle-outline'
                  iconColor = '#DDD'
                }
                let f = h('Icon', {
                  props: {
                    size: 24,
                    type: iconType,
                    color: iconColor
                  },
                  nativeOn: {
                    click: () => {
                      let sel = params.row['' + params.column.key]
                      if (sel == 1) {
                        sel = 0
                      } else if (sel == 0) {
                        sel = -1
                      } else if (sel == null) {
                        sel = 1
                      } else {
                        this.$Message.warning('权限状态错误')
                        return
                      }
                      var batchAdd = {
                        effect: sel,
                        app_id: this.appid,
                        menu_id: params.row.menu_id,
                        tag_id: tag.tag_id
                      }
                      postData('/api/auth/resuorce/menu/policy/batchAdd', batchAdd).then(res => {
                        if (res.data.code == 1) {
                          this.setPolicyTableData()
                        } else {
                          this.$Message.warning(res.data.message)
                        }
                      })
                      // console.log(this.appid+":"+params.row.menu_id+":"+tag.tag_id)
                    }
                    // mouseover:() => {

                    // }
                  }
                })
                return f
              }
            })
          })
        } else {
          this.$Message.warning(res.data.message)
        }
      })
    },
    setPolicyTableData () {
      getData('/api/auth/resuorce/menu/menuPolicy', { 'appid': this.appid }).then(res => {
        if (res.data.code == 1) {
          this.policyTableData = []
          let i = 0
          res.data.data.map(policy => {
            let row = new Object()
            for (let prop in policy) {
              if (i == 0) {
                row.menu_name = policy.policy.menu_name
                row.menu_id = policy.policy.menu_id
                row.global_order = policy.policy.global_order
                row.cellClassName = {
                  menu_name: 'policy-cell'
                }
              } else {
                // row[prop]=policy[prop];
                row[prop] = policy[prop]
              }
              i++
            }
            this.policyTableData.push(row)
            i = 0
          })
          // console.log(this.policyTableData)
        } else {
          this.$Message.warning(res.data.message)
        }
        this.policyTableLoading = false
      })
    },
    createRootMenu (e) {
      getData('/api/auth/resuorce/menu/createRoot', { 'appid': e.value, 'menu_name': e.label }).then(res => {
        if (res.data.code == 1) {
          this.setPolicyTableData()
        } else {
          this.$Message.warning(res.data.message)
        }
      })
    },
    appidChange (e) {
      this.policyTableLoading = true
      this.createRootMenu(e)
      this.setColumns()
    },
    tagsEdit () {
      if (this.appid) {
        this.tagsEditModal = true
        getData('/api/auth/apptag/getTagsByApp', { 'appid': this.appid }).then(res => {
          if (res.data.code == 1) {
            this.tagsData = res.data.data
            this.tagsTableLoading = false
          } else {
            this.$Message.warning(res.data.message)
          }
        })
      } else {
        this.$Message.warning('请选择应用')
      }
    },
    tagsModalOK () {
      postData('/api/auth/apptag/updateBatch', this.tagsTableSelectionData).then(res => {
        if (res.data.code == 1) {
          this.tagsEditModal = false
          this.setColumns()
        } else {
          this.$Message.warning(res.data.message)
        }
      })
    },
    tagsTableSelection (selection) {
      this.tagsTableSelectionData = selection
    },
    tagsIframeBtnClick () {
      this.tagsIframeModal = true
      this.tagsIframeModalSrc = 'http://202.201.13.68:8080/querydesigner/tag/list?appid=' + this.appid
    }
  },
  mounted () { // 页面初始化方法
    this.initAppList()
    //   this.$nextTick(function () {
    //     setTimeout(()=>{
    //       var _this = this
    //       var selectWrap = document.querySelector(".ivu-table-overflowY")
    //       selectWrap.addEventListener('scroll', function(){
    //         console.log(this.scrollTop)
    //         if (this.scrollHeight == this.scrollTop + this.clientHeight) {//判断滚动条是否滚动到底部

    //         }

    //       })
    //     },20)
    //   });
  }
}
</script>
<style>
.policy-cell span{
    white-space: pre-wrap;
}
</style>
