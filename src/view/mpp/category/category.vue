<template>
  <div >
    <el-card class="box-card">
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="10" style="width: 200px;text-align: center;">
          <el-input placeholder="输入关键字搜索"   v-model="search" clearable></el-input>
        </el-col>
        <el-col :span="13">
          <!--<el-button :plain="true" type="info">设置活动分类</el-button>-->
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true">新增</el-button>
          <!-- 弹框 -->
          <el-dialog title="新增消息分类" :visible.sync="dialogFormVisible" >
            <el-form :model="form">
              <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.category_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="审核组名称" :label-width="formLabelWidth">
                <el-select v-model="form.approver_group_name" placeholder="请选择">
                  <el-option label="测试一" value="test1"></el-option>
                  <el-option label="测试二" value="test2"></el-option>
                  <el-option label="测试三" value="test3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图标" :label-width="formLabelWidth">
                 <el-input v-model="form.icon" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                 <el-input v-model="form.seq" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-table :data="filteredTableData" border style="width: 100%" @cell-click="handleSelect">
        <el-table-column
          property="category_name"
          label="分类名称"
          :sortable="true"
          :sort-method="sortByDate"
        ></el-table-column>
        <el-table-column property="approver_group_name" label="审核组名称"></el-table-column>
        <el-table-column property="seq" label="排序"></el-table-column>
        <el-table-column property="create_time" label="创建时间"></el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
          </el-popover>
          <i class="el-icon-delete-solid" v-on="handleRemove()"></i>
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
  visible: false,
  form: [],
  tableData: [
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
  name: 'allActive',
  data: function () {
    return data
  },

  computed: {
    filteredTableData: function () {
      var type = this.currentType
      return this.tableData.filter(function (data) {
        if (type == '全部' || type == '') {
          return true
        } else {
          return data.type == type
        }
      })
    }
  },
  methods: {
    handleSelect: function (row, column, cell, event) {
      if (column.label == '操作') {
        this.$router.push('/activeManage/detail/page1')
      } else if (column.type == 'selection') {
        row.$info = !row.$selected
      } else {
        row.$selected = !row.$selected
        row.$info = row.$selected
      }
    },
    selectionchange: function (val) {
      var arr = []
      val.forEach(function (item) {
        arr.push(item.id)
      })
      this.selectItems = arr
      this.activeNum = this.selectItems.length
    },
    handleRemove: function () {
      this.visible = true
      // var tableData = this.tableData
      // this.selectItems.forEach(function (sourcekey) {
      //   tableData.forEach(function (data) {
      //     if (id == data.id) {
      //       tableData.splice(tableData.indexOf(data), 1)
      //     }
      //   })
      // })
      // this.selectItems = []
    },
    handleQuery: function () {
      var tableData = this.tableData

      this.selectItems.forEach(function (id) {
        tableData.forEach(function (data) {
          if (id == data.id) {
            tableData.splice(tableData.indexOf(data), 1)
          }
        })
      })
      this.selectItems = []
    }
  },
  sortByDate (obj1, obj2) {
    let val1 = obj1.deadline
    let val2 = obj2.deadline
    return val1 - val2
  }
}
</script>
<style>

</style>
