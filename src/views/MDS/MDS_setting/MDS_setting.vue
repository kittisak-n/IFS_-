<template>
  <div class="MDS_setting">
    <a-row :gutter="[8, 8]">
      <a-col :span="16">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px">
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
            <a-col :span="10" style="margin: 0.2em 0px">
              <a-input placeholder="รหัสประเภท" v-model="catagory_code" />
            </a-col>
            <a-col :span="10" style="margin: 0.2em 0px">
              <a-input placeholder="ประเภทวัสดุ" v-model="catagory" />
            </a-col>
            <a-col :span="4" style="margin: 0.2em 0px">
              <a-button
                type="primary"
                style="width: 100%"
                @click="insertCatagory()"
              >
                บันทึก
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px">
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
            <a-col :span="20" style="margin: 0.2em 0px">
              <a-input placeholder="หน่วยนับ" v-model="unit" />
            </a-col>
            <a-col :span="4" style="margin: 0.2em 0px">
              <a-button
                type="primary"
                style="width: 100%"
                @click="insertUnit()"
              >
                บันทึก
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[8, 8]">
      <a-col :span="16">
        <a-card size="small">
          <a-table
            :columns="columns_type"
            :data-source="mds_type_data"
            :pagination="false"
            bordered
            size="small"
          >

    


                <span slot="key" slot-scope="text">
                  <div style="text-align: center">
                    {{ text == null ? "0" : text }}
                  </div>
                </span>

            <span slot="type_name" slot-scope="text, record, index">
              <div
                :style="{ textAlign: 'center' }"
                v-if="mds_type_data[index].status_edit"
              >
                {{ text }}
              </div>
              <div
                :style="{ textAlign: 'center' }"
                v-if="!mds_type_data[index].status_edit"
              >
                <a-input v-model="mds_type_data[index].type_name" />
              </div>
            </span>
            <span slot="action" slot-scope="text, record, index">
              <div :style="{ textAlign: 'center' }">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>แก้ไขยูนิควัสดุ</span>
                  </template>
                  <a-button
                    v-if="mds_type_data[index].status_edit"
                    type="warning"
                    icon="edit"
                    @click="
                      () =>
                        (mds_type_data[index].status_edit = !mds_type_data[
                          index
                        ].status_edit)
                    "
                  />
                  <a-button
                    v-if="!mds_type_data[index].status_edit"
                    type="success"
                    icon="save"
                    @click="savetype(index)"
                  />
                </a-tooltip>
              </div>
            </span>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card size="small">
          <a-table
            :columns="columns_unit"
            :data-source="mds_unit_data"
            :pagination="false"
            bordered
            size="small"
          >
            <span slot="key" slot-scope="text">
                  <div style="text-align: center">
                    {{ text == null ? "0" : text }}
                  </div>
                </span>

            <span slot="unit_name" slot-scope="text, record, index">
              <div
                :style="{ textAlign: 'left' }"
                v-if="mds_unit_data[index].status_edit"
              >
                {{ text }}
              </div>
              <div
                :style="{ textAlign: 'center' }"
                v-if="!mds_unit_data[index].status_edit"
              >
                <a-input v-model="mds_unit_data[index].unit_name" />
              </div>
            </span>
            <span slot="action" slot-scope="text, record, index">
              <div :style="{ textAlign: 'center' }">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>แก้ไขยูนิควัสดุ</span>
                  </template>
                  <a-button
                    v-if="mds_unit_data[index].status_edit"
                    type="warning"
                    icon="edit"
                    @click="
                      () =>
                        (mds_unit_data[index].status_edit = !mds_unit_data[
                          index
                        ].status_edit)
                    "
                  />
                  <a-button
                    v-if="!mds_unit_data[index].status_edit"
                    type="success"
                    icon="save"
                    @click="saveunit(index)"
                  />
                </a-tooltip>
              </div>
            </span>
          </a-table>
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
      columns_unit: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "10%",
          scopedSlots: { customRender: "key" },
   
        },
        {
          title: "ชื่อยูนิควัสดุ",
          dataIndex: "unit_name",
          key: "unit_name",
          width: "50%",
          scopedSlots: { customRender: "unit_name" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",

          scopedSlots: { customRender: "action" },
        },
      ],

      columns_type: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "1%",
          scopedSlots: { customRender: "key" },
       
        },

        {
          title: "รหัสประเภทวัสดุ",
          dataIndex: "type_code",
          key: "type_code",
          width: "10%",
          scopedSlots: { customRender: "type_code" },
        },
        {
          title: "ชื่อประเภทวัสดุ",
          dataIndex: "type_name",
          key: "type_name",
          width: "5%",
          scopedSlots: { customRender: "type_name" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
      mds_unit_data: [],
      mds_type_data: [],
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
          .then(function (res) {
            console.log(res);
            self.unit = undefined;
            self.$notification["success"]({
              message: "เพิ่มหน่วยเสร็จสิ้น",
              duration: 2,
            });
            self.getAllUnit();
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
          .post(self.$store.state.url + "/typeRouters/insertType", data)
          .then(function (res) {
            console.log(res);
            self.catagory = undefined;
            self.catagory_code = undefined;
            self.$notification["success"]({
              message: "เพิ่มประเภทเสร็จสิ้นเสร็จสิ้น",
              duration: 2,
            });
            self.getAllType();
          });
      } else {
        self.$notification["error"]({
          message: "กรุณากรอกชื่อรหัสและประเภท",
          duration: 2,
        });
      }
    },
    getAllUnit() {
      const self = this;
      axios
        .post(this.$store.state.url + "/unitRouters/getAllUnit")
        .then((res) => {
          self.mds_unit_data = [];
          res.data.results.forEach(function (element, index) {
            self.mds_unit_data.push({
              key: index + 1,
              unit_id: element.unit_id,
              unit_name: element.unit_name,
              status_edit: true,
            });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAllType() {
      const self = this;

      axios
        .post(this.$store.state.url + "/typeRouters/getAllType")
        .then((res) => {
          self.mds_type_data = [];
          res.data.results.forEach(function (element, index) {
            self.mds_type_data.push({
              key: index + 1,
              type_id: element.type_id,
              type_code: element.type_code,
              type_name: element.type_name,
              type_number: element.type_number,
              status_edit: true,
            });
          });
          console.log(self.mds_type_data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    saveunit(index) {
      const self = this;
      axios
        .post(this.$store.state.url + "/unitRouters/updateUnit", {
          unit_name: self.mds_unit_data[index].unit_name,
          unit_id: self.mds_unit_data[index].unit_id,
        })
        .then((res) => {
          console.log(res);
          self.mds_unit_data[index].status_edit = !self.mds_unit_data[index]
            .status_edit;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    savetype(index) {
      const self = this;
      axios
        .post(this.$store.state.url + "/typeRouters/updateType", {
          type_name: self.mds_type_data[index].type_name,
          type_id: self.mds_type_data[index].type_id,
        })
        .then((res) => {
          console.log(res);
          self.mds_type_data[index].status_edit = !self.mds_type_data[index]
            .status_edit;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    // this.get_summary();
    this.getAllUnit();
    this.getAllType();
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
