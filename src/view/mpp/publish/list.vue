<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="10" style="width: 200px;text-align: center;">
          <el-input placeholder="输入关键字搜索" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="13">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" @cell-click="handleSelect">
        <el-table-column
          property="category_name"
          label="分类名称"
          :sortable="true"
          :sort-method="sortByDate"
        ></el-table-column>
        <el-table-column property="message_title" label="消息标题"></el-table-column>
        <el-table-column property="push_object_type_name" label="推送对象类型" width:110></el-table-column>
        <el-table-column property="user_groups" label="接收人员组"></el-table-column>
        <el-table-column property="approver_group_name" label="审核组名称"></el-table-column>
        <el-table-column property="status_name" label="状态" width='50px'></el-table-column>
        <el-table-column property="total" label="推送总数" width='85px'></el-table-column>
        <el-table-column property="delivery_success" label="已送达" width='75px'></el-table-column>
        <el-table-column property="delivery_failed" label="未送达" width='75px'></el-table-column>
        <el-table-column property="readed" label="已读" width='50px'></el-table-column>
        <el-table-column property="unread" label="未读" width='50px'></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="4"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
var data = {
  dataCount: 0,
  pageSize: 5,
  current: 1,
  tableData: [
    {
      job_id: '1169159351840059394',
      category_id: '1164100657674756097',
      message_title: '哈哈哈',
      message_synopsis: '嘿嘿嘿',
      message_content: '呵呵呵',
      push_object_type: 'group',
      user_groups: {},
      user_list: null,
      push_type: 'now',
      pre_push_time: null,
      producer_appid: null,
      status: '已完成',
      creater: null,
      creater_no: null,
      create_time: '2019-09-04 16:04:46',
      update_time: '2019-09-04 16:04:58',
      category_name: '系统公告',
      approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
      approver_group_name: '测试',
      push_type_name: '立即发送',
      push_object_type_name: '人员组',
      total: '7',
      delivery_failed: '7',
      delivery_success: '0',
      readed: '0',
      unread: '7'
    }
  ],
  dealModal: false,
  operateTypeList: []
}
export default {
  name: 'tables_page',
  data: function () {
    return data
  },
  methods: {
    changePage (current) {
      var queryPage = {}
      queryPage.size = this.pageSize
      queryPage.current = current
      this.current = current
      // postData('/api/mpp/jobmain/listPage',queryPage).then(res => {
      //   this.tableData=res.data.data.records;
      //   this.dataCount=parseInt(res.data.data.total);
      // })
    },
    getUserGroupList (query) {
      // postData('/api/mpp/userSelector/groupList').then(res => {
      //   this.userGroupList=res.data.data;
      // })
    },
    operateTypeInit (status) {
      this.operateTypeList = []
      switch (status) {
        case 'publish':
          this.operateTypeList = [
            { value: 'passed', key: '审核通过' },
            { value: 'no_passed', key: '审核不通过' }
          ]
          break
        case 'no_passed':
          this.operateTypeList = [
            { value: 'republish', key: '重新发布' },
            { value: 'cancel', key: '作废' }
          ]
          break
        case 'republish':
          this.operateTypeList = [
            { value: 'passed', key: '审核通过' },
            { value: 'no_passed', key: '审核不通过' }
          ]
          break
        default:
          break
      }
    },
    handleSubmit () {
      // getData('/api/mpp/jobmain/deal',this.linkForm).then(res => {
      //   if(res.data.code==1){
      //     this.dealModal=false;
      //     this.changePage(this.current);
      //   }else{
      //     this.$Message.warning(res.data.message)
      //   }
      // })
    }
  },
  mounted () {
    var queryPage = {}
    queryPage.size = this.pageSize
    queryPage.current = 1
    // postData('/api/mpp/jobmain/listPage',queryPage).then(res => {
    //   this.tableData=res.data.data.records;
    //   this.dataCount=parseInt(res.data.data.total);
    // });
  }
}
</script>

<style>
</style>
