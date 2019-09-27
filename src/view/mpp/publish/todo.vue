<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="10" style="width: 200px;text-align: center;">
          <el-input placeholder="输入关键字搜索" v-model="search" clearable></el-input>
        </el-col>
        <el-col :span="13">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="filteredTableData" border style="width: 100%" @cell-click="handleSelect">
        <el-table-column
          property="category_name"
          label="分类名称"
          :sortable="true"
          :sort-method="sortByDate"
        ></el-table-column>
        <el-table-column property="message_title" label="消息标题"></el-table-column>
        <el-table-column property="push_object_type_name" label="推送对象类型"></el-table-column>
        <el-table-column property="user_groups" label="接收人员组"></el-table-column>
        <el-table-column property="approver_group_name" label="审核组名称"></el-table-column>
        <el-table-column property="status_name" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <i class="el-icon-delete-solid"></i>
        </el-table-column>
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
  totalActiveNum: 3,
  totalSignUp: 204,
  auditNum: 15,
  currentPage1: 1,
  activeNum: 0,
  dialogFormVisible: false,
  formLabelWidth: '120px',
  search: '',
  form: [],
  filteredTableData: [
    {
      category_id: '1164100657674756097',
      pid: '0',
      category_name: '系统公告',
      approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
      approver_group_name: '测试',
      icon: '1.png',
      seq: null,
      create_time: '2019-08-21 17:03:19',
      update_time: null,
      receiver_no: null,
      readed: '0',
      unread: '0'
    },
    {
      category_id: '1164101417246433282',
      pid: '0',
      category_name: '校办新闻',
      approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
      approver_group_name: '测试',
      icon: '2.png',
      seq: null,
      create_time: '2019-08-21 17:06:20',
      update_time: null,
      receiver_no: null,
      readed: '0',
      unread: '0'
    },
    {
      category_id: '1164101605058977793',
      pid: '0',
      category_name: '新闻热点',
      approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
      approver_group_name: '测试',
      icon: '3.png',
      seq: null,
      create_time: '2019-08-21 17:07:05',
      update_time: null,
      receiver_no: null,
      readed: '0',
      unread: '0'
    },
    {
      category_id: '1164101679679840258',
      pid: '0',
      category_name: '最新资讯',
      approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
      approver_group_name: '测试',
      icon: '4.png',
      seq: null,
      create_time: '2019-08-21 17:07:23',
      update_time: null,
      receiver_no: null,
      readed: '0',
      unread: '0'
    }
  ]
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
      // postData('/api/mpp/jobmain/todo',queryPage).then(res => {
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
      // this.operateTypeList=[];
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
    // postData('/api/mpp/jobmain/todo',queryPage).then(res => {
    //   this.tableData=res.data.data.records;
    //   this.dataCount=parseInt(res.data.data.total);
    // });
  }
}
</script>

<style>
</style>
