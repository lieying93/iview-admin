<template>
  <div>
    <el-card>
      <el-form
        ref="publishForm"
        :model="publishForm"
        :rules="rulePublishForm"
        :inline="true"
        label-position="right"
        style="width:800px"
      >
        <el-form-item label="分类名称" prop="category_id">
          <el-select
            style="width:300px"
            v-model="publishForm.category_id"
            :filterable="true"
            :label-in-value="true"
            remote
            :remote-method="getCategoryList"
            @on-change="selectChange($event,'category_id')"
            @on-open-change="getCategoryList"
            :loading="false"
          >
            <el-option
              v-for="item in categoryList"
              :value="item.category_id"
              :key="item.category_id"
              :label="item.category_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题" prop="message_title">
          <el-input
            placeholder="请输入消息标题"
            v-model="publishForm.message_title"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="消息摘要" prop="message_synopsis">
          <el-input
            type="textarea"
            v-model="publishForm.message_synopsis"
            :rows="3"
            placeholder="请输入消息摘要..."
            clearable
            style="width: 710px"
          />
        </el-form-item>
        <el-form-item label="消息内容" prop="message_content">
          <el-input
            type="textarea"
            v-model="publishForm.message_content"
            :rows="3"
            placeholder="请输入消息内容..."
            clearable
            style="width: 710px"
          />
        </el-form-item>
        <el-form-item label="推送对象类型" prop="push_object_type">
          <Select
            style="width:300px"
            @on-change="pushObjectTypeChange($event)"
            v-model="publishForm.push_object_type"
          >
            <Option
              v-for="item in pushObjectTypeList"
              :value="item.value"
              :key="item.label"
              :label="item.label"
            ></Option>
          </Select>
        </el-form-item>
        <el-form-item
          v-if="this.publishForm.push_object_type==='group'"
          label="推送人员组"
          prop="user_groups_list"
        >
          <el-select
            style="width:300px"
            v-model="publishForm.user_groups_list"
            :filterable="false"
            :label-in-value="true"
            remote
            :remote-method="getUserGroupList"
            @on-change="userGroupsChange"
            @on-open-change="getUserGroupList"
            :loading="false"
          >
            <el-option
              v-for="item in userGroupList"
              :value="item.tag_id"
              :key="item.tag_name"
            >{{ item.tag_name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="this.publishForm.push_object_type=='user'"
          label="推送人员"
          prop="user_list"
        >
          <el-select
            style="width:300px"
            v-model="publishForm.user_list"
            :filterable="false"
            :label-in-value="true"
          >
            <el-option
              v-for="item in userGroupList"
              :value="item.tag_id"
              :key="item.tag_id"
            >{{ item.tag_name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送类型" prop="push_type">
          <Select style="width:300px" v-model="publishForm.push_type" :label-in-value="true">
            <Option
              v-for="item in pushTypeList"
              :value="item.value"
              :key="item.value"
              :label="item.label"
            ></Option>
          </Select>
        </el-form-item>
        <el-form-item v-if="showFormItem(publishForm.push_type)" label="预发送时间" prop="pre_push_time">
         <DatePicker type="datetime" placeholder="请选择预发送时间" style="width: 300px"></DatePicker>
          <!-- <el-date-picker  type="datetime" placeholder="请选择预发送时间" style="width: 300px"></el-date-picker> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('publishForm')">提交</el-button>
          <el-button style="margin-left: 8px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'tables_page',
  data () {
    const validateUserGroupsList = (rule, value, callback) => {
      if (this.publishForm.push_object_type === 'group' && !value) {
        callback(new Error('请选择人员组'))
      } else {
        callback()
      }
    }
    return {
      datetime_select: '',
      publishForm: {
        push_type: 'now',
        push_object_type: 'group'
      },
      categoryList: [],
      pushObjectTypeList: [
        {
          value: 'user',
          label: '人员'
        },
        {
          value: 'group',
          label: '人员组'
        }
      ],
      pushTypeList: [
        {
          value: 'now',
          label: '立即发送'
        },
        {
          value: 'delay',
          label: '延迟发送'
        }
      ],
      userGroupList: [],
      rulePublishForm: {
        message_title: [
          { required: true, message: '消息标题不能为空', trigger: 'blur' }
        ],
        user_groups_list: [
          { validator: validateUserGroupsList, trigger: 'change' }
        ]
      }
    }
  },
  mounted: function() {
    this.load_pushObjectTypeList();
  },
  methods: {
    ...mapMutations(['closeTag', 'addTag']),
    showFormItem (type) {
      let list = {
        now: false,
        delay: true
      }
      return list[type]
    },
    getCategoryList (query) {
      // var category_name = { category_name: this.publishForm.category_name }
      // postData('/api/mpp/category/queryByCategoryName',category_name).then(res => {
      //   this.categoryList=res.data.data;
      // })
      this.categoryList = [
        {
          category_id: '1164101605058977793',
          pid: '0',
          category_name: '新闻热点',
          approver_group_id: '39ebd41e5c6740c3a6a8d36726eed0c3',
          approver_group_name: '测试',
          icon: '3.png',
          seq: null,
          create_time: '2019-08-21 17:07:05',
          update_time: null
        }
      ]
    },
    selectChange (e, a) {
      if (e) {
        if (a === 'category_id') {
          this.publishForm.category_name = e.label
        }
      }
    },
    pushObjectTypeChange (e) {
      if (e.value === 'user') {
        this.$refs.publishForm.fields.forEach(e => {
          if (e.prop === 'user_groups_list') {
            e.resetField()
          }
        })
      }
    },
    userGroupsChange (e) {
      var user_groups = { user_groups_id: e.value, user_groups_name: e.label }
      this.publishForm.user_groups = JSON.stringify(user_groups)
    },
    getUserGroupList () {
      // postData('/api/mpp/userSelector/groupList').then(res => {
      //   this.userGroupList=res.data.data;
      // })
      this.userGroupList = []
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.publishForm.producer_appid = '1154689252710260714'
          // postData('/api/mpp/jobmain/add',this.publishForm).then(res => {
          //   if(res.data.code==1){
          //       this.closeTag({
          //         name: this.$route.name
          //       });
          //       this.$router.push({
          //           path: '/mpp/publish/list',
          //       });
          //   }else{
          //     this.$Message.warning(res.data.message)
          //   }
          // });
        }
      })
    },
    load_pushObjectTypeList(){
       this.pushObjectTypeList = pushObjectTypeList
    }
  }
}
</script>

<style>
</style>
