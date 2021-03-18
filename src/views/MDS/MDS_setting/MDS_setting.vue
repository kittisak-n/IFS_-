<template>
  <div class="MDS_setting">
    <a-row :gutter="[8, 8]">
      <a-col :span="12">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-card-meta title="เพิ่มยูนิควัสดุ">
                <a-icon
                  slot="avatar"
                  type="plus"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-input placeholder="หน่วยนับ" v-model="unit" />
            </a-col>
            <a-col :span="4" style="margin: 0.2em 0px;">
              <a-button type="primary" style="width:100%" @click="insertUnit()">
                บันทึก
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-card-meta title="เพิ่มประเภทวัสดุ">
                <a-icon
                  slot="avatar"
                  type="plus"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
            <a-col :span="10" style="margin: 0.2em 0px;">
              <a-input placeholder="รหัสประเภท" v-model="catagory_code" />
            </a-col>
            <a-col :span="10" style="margin: 0.2em 0px;">
              <a-input placeholder="ประเภทวัสดุ" v-model="catagory" />
            </a-col>
            <a-col :span="4" style="margin: 0.2em 0px;">
              <a-button
                type="primary"
                style="width:100%"
                @click="insertCatagory()"
              >
                บันทึก
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      unit: undefined,
      catagory: undefined,
      catagory_code: undefined,
    };
  },

  methods: {
    insertUnit() {
      const self = this;
      if (self.unit) {
        let data = {
          unit_name: self.unit,
        };
        axios
          .post(self.$store.state.url + "/unitRouters/insertUnit", data)
          .then(function(res) {
            console.log(res);
            self.unit = undefined;
            self.$notification["success"]({
              message: "เพิ่มหน่วยเสร็จสิ้น",
              duration: 2,
            });
          });
      } else {
        self.$notification["error"]({
          message: "กรุณากรอกชื่อหน่วย",
          duration: 2,
        });
      }
    },
    insertCatagory() {
      const self = this;
      if (self.catagory && self.catagory_code) {
        let data = {
          type_name: self.catagory,
          type_code: self.catagory_code,
        };
        axios
          .post(self.$store.state.url + "/typeRouters/insertTpye", data)
          .then(function(res) {
            console.log(res);
            self.catagory = undefined;
            self.catagory_code = undefined;
            self.$notification["success"]({
              message: "เพิ่มประเภทเสร็จสิ้นเสร็จสิ้น",
              duration: 2,
            });
          });
      } else {
        self.$notification["error"]({
          message: "กรุณากรอกชื่อรหัสและประเภท",
          duration: 2,
        });
      }
    },
  },
};
</script>
<style lang="scss" scope>
.MDS_import {
  .text-head {
    font-size: 135%;
    font-weight: 600;
  }
  .text-number {
    font-size: 135%;
    font-weight: 600;
  }

  .btn-margi_two {
    .ant-btn {
      margin-right: 1%;
    }
  }
  .ant-table {
    img {
      width: 120px;
      width: 120px;
    }
    th {
      font-size: 16px;
      font-weight: 600;
    }
    td {
    }
  }

  .label {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
