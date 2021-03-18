<template>
  <div id="right">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card>
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <b> ระบบคำนวณภาระงาน</b>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>
          <br />
          <hr style="width:100%" />
          <br />

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <b> ระบบเบิกจ่ายวัสดุ</b>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-checkbox @change="onChange">
                ระบบ
              </a-checkbox>
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="text-align:center">
              <a-col :span="12" style="text-align:right">
                <router-link :to="{ path: '/permission_manage/adduser' }">
                  <a-button><a-icon type="arrow-left" />ย้อนกลับ </a-button>
                </router-link>
              </a-col>
              <a-col :span="12" style="text-align:left">
                <router-link :to="{ path: '/permission_manage' }">
                  <a-button type="primary" v-on:click="add_success">
                    บันทึก
                  </a-button>
                </router-link>
              </a-col>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    add_success: function() {
      <a-alert message="Success Tips" type="success" show-icon />;
      console.log("test")
    },
  },
};
</script>

<style></style>
