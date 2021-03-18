<template>
  <div class="MDS_export">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-row :gutter="[8, 8]">
          <a-col :span="12">
            <a-card>
              <a-row :gutter="[8, 8]">
                <a-col :span="4">
                  <a-icon
                    type="file-sync"
                    :style="{
                      fontSize: '550%',
                      color: '#1890ff',
                    }"
                  />
                </a-col>
                <a-col :span="20" style="text-align:end">
                  <div class="text-head">
                    จำนวนรายการเบิกเข้าวัสดุทั้งหมด : ปี
                    {{ new Date().getFullYear() + 543 }}
                  </div>
                  <div>
                    <span class="text-number ">{{ totallist }} </span>รายการ
                  </div>
                  <div>
                    จำนวนรายการเบิกวัสดุทั้งหมด ตั้งแต่วันที่ 1 ม.ค.
                    {{ new Date().getFullYear() + 543 }} ถึง
                    {{ genDate(new Date()) }}
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card>
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="file-done"
                    :style="{
                      fontSize: '580%',
                      color: '#28a745',
                    }"
                  />
                </a-col>
                <a-col :span="20" style="text-align:end">
                  <div class="text-head">รายการรออนุมัติ</div>
                  <div>
                    <span class="text-number ">{{ totalawait }} </span>รายการ
                  </div>
                  <div>รายการรออนุมัติการเบิกจ่ายวัสดุ</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card>
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="exception"
                    :style="{
                      fontSize: '580%',
                      color: '#ff4d4f',
                    }"
                  />
                </a-col>
                <a-col :span="20" style="text-align:end">
                  <div class="text-head">รายการรอจ่าย</div>
                  <div>
                    <span class="text-number ">{{ totalsucces }} </span>รายการ
                  </div>
                  <div>รายการรอการจ่ายวัสดุ</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-card-meta title="รายการเบิกจ่ายวัสดุ">
                <a-icon
                  slot="avatar"
                  type="folder-open"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
            <a-col :span="4" :style="{ textAlign: 'right' }">
              <router-link
                :to="{ path: '/MDS_disbursement/MDS_disbursement_form' }"
              >
                <a-button
                  type="primary"
                  icon="plus"
                  @click="insertAndupdatematerial()"
                >
                  ทำรายการเบิกจ่ายวัสดุ
                </a-button>
              </router-link>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <a-row :gutter="[8, 8]" type="flex" justify="end">
            <a-col :span="3" style="text-align:end">
              <a-select
                style="width: 100%"
                v-model="status_search"
                @change="changeCondition()"
              >
                <a-select-option :value="1">
                  รออนุมัติ
                </a-select-option>
                <a-select-option :value="3">
                  รอเบิกจ่ายวัสดุ
                </a-select-option>
                <a-select-option :value="2">
                  เบิกจ่ายไม่สำเร็จ
                </a-select-option>
                <a-select-option :value="4">
                  เบิกจ่ายสำเร็จ
                </a-select-option>
                <a-select-option :value="0">
                  ยกเลิกรายการเบิกจ่าย
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5" style="text-align:end">
              <a-input-search
                placeholder="ค้นหาตามรหัสใบรายการเบิก"
                style="width: 100%"
                v-model="text_search"
                v-on:keyup.enter="changeCondition()"
              />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-row :gutter="[8, 8]">
                <a-col :span="24">
                  <a-table
                    :columns="disbursement_order"
                    :data-source="disbursement"
                    :pagination="false"
                    bordered
                    size="small"
                  >
                    <span slot="key" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="disbursement_code" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="disbursement_date" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="disbursement_total" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="disbursement_status" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ยกเลิกรายการเบิกวัสดุ</span>
                          </template>
                          <a-button
                            type="danger"
                            icon="delete"
                            @click="confirmDelete(index)"
                            v-if="status_search == 1"
                          >
                          </a-button>
                        </a-tooltip>
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ตรวจสอบราบการเบิกวัสดุ</span>
                          </template>
                          <a-button
                            type="primary"
                            icon="search"
                            @click="getDisbursementMaterial(index)"
                          >
                          </a-button>
                        </a-tooltip>
                      </div>
                    </span>
                  </a-table>
                </a-col>
              </a-row>
              <br />
              <a-row>
                <a-col :span="15">
                  <a-col :span="15">
                    <p
                      :style="{ margin: '0.3em 0.5%' }"
                      v-if="this.totalPage != 0"
                    >
                      {{ this.start }} -
                      {{
                        this.end > this.totalPage ? this.totalPage : this.end
                      }}
                      จาก {{ this.totalPage }} รายการ
                    </p>
                    <p
                      :style="{ margin: '0.3em 0.5%' }"
                      v-if="this.totalPage == 0"
                    >
                      ไม่พบรายการที่ค้นหา
                    </p>
                  </a-col>
                </a-col>
                <a-col :span="9" :style="{ textAlign: 'Right' }">
                  แสดงทีละ
                  <a-select
                    v-model="pagesize"
                    :style="{ width: '60px', marginRight: '1%' }"
                  >
                    <a-select-option value="10">
                      10
                    </a-select-option>
                    <a-select-option value="25">
                      25
                    </a-select-option>
                    <a-select-option value="50">
                      50
                    </a-select-option>
                    <a-select-option value="100">
                      100
                    </a-select-option>
                  </a-select>

                  <a-pagination
                    :style="{ display: 'inline' }"
                    v-model="current"
                    :total="totalPage"
                    :page-size="pagesize"
                    @change="changePageTable(current)"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      v-model="visible"
      :title="
        'รายละเอียดใบเบิกวัสดุหมายเลข : ' +
          disbursement_update.disbursement_code
      "
      on-ok="handleOk"
      width="900px"
    >
      <a-row :gutter="[8, 8]">
        <a-col :span="24">
          รายละเอียดการเบิกวัสดุ
        </a-col>
        <a-col :span="8"
          >ผู้เบิกวัสดุ : {{ this.$store.state.user.user_name }}
        </a-col>
        <a-col :span="8"
          >วันที่ทำการเบิก :
          {{ disbursement_update.disbursement_date }}
        </a-col>
        <a-col :span="2" style="text-align:end">สถานะ :</a-col>
        <a-col :span="6">
          {{
            disbursement_update.disbursement_status == 1
              ? "รอการอนุมัติ"
              : disbursement_update.disbursement_status == 2
              ? "เบิกจ่ายไม่สำเร็จ"
              : disbursement_update.disbursement_status == 3
              ? "รอการเบิกจ่าย"
              : disbursement_update.disbursement_status == 4
              ? "เบิกจ่ายเสร็จสิ้น"
              : "ยกเลิกรายการเบิกจ่าย"
          }}
        </a-col>
        <a-col :span="24">
          หมายเหตุ : {{ disbursement_update.disbursement_note }}
        </a-col>
        <a-col :span="24">
          ตารางแสดงรายการเบิกวัสดุ
        </a-col>
        <a-col :span="24">
          <a-table
            :columns="disbursement_material_order"
            :data-source="disbursement_material"
            :pagination="false"
            bordered
            size="small"
            :scroll="{ y: '500px' }"
          >
            <span slot="key" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="material_code" slot-scope="text">
              <div>
                {{ text }}
              </div>
            </span>
            <span slot="material_name" slot-scope="text">
              <div>
                {{ text }}
              </div>
            </span>
            <span slot="material_unit" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="disbursement_amount" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="disbursement_export" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="disbursement_note" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
          </a-table>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-row :gutter="[8, 8]">
          <a-col :span="24" style="text-align:start">
            <a-button key="back" @click="handleCancel">ปิด </a-button>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      status_search: 1,
      text_search: "",
      start: 1,
      end: 10,
      current: 1,
      pagesize: 10,
      totalPage: 0,
      totallist: 0,
      totalawait: 0,
      totalsucces: 0,
      disbursement_order: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "หมายเลขรายการ",
          dataIndex: "disbursement_code",
          key: "disbursement_code",
          width: "5%",
          scopedSlots: {
            customRender: "disbursement_code",
          },
        },
        {
          title: "วันที่ทำการเบิกวัสดุ",
          dataIndex: "disbursement_date",
          key: "disbursement_date",
          width: "5%",
          scopedSlots: { customRender: "disbursement_date" },
        },

        {
          title: "จำนวนรายการเบิก",
          dataIndex: "disbursement_total",
          key: "disbursement_total",
          width: "5%",
          scopedSlots: {
            customRender: "disbursement_total",
          },
        },
        {
          title: "หมายเหตุ",
          dataIndex: "disbursement_note",
          key: "disbursement_note",
          width: "10%",
          scopedSlots: {
            customRender: "disbursement_note",
          },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
      disbursement: [],
      disbursement_update: {
        disbursement_id: undefined,
        disbursement_code: undefined,
        disbursement_note: undefined,
        disbursement_total: undefined,
        disbursement_status: undefined,
        disbursement_date: undefined,
      },
      disbursement_material_order: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "รหัสวัสดุ",
          dataIndex: "material_code",
          key: "material_code",
          width: "10%",
          scopedSlots: {
            customRender: "material_code",
          },
        },
        {
          title: "ชื่อวัสดุ",
          dataIndex: "material_name",
          key: "material_name",
          width: "10%",
          scopedSlots: {
            customRender: "material_name",
          },
        },
        {
          title: "หน่วย",
          dataIndex: "material_unit",
          key: "material_unit",
          width: "5%",
          scopedSlots: {
            customRender: "material_unit",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "ขอเบิก",
              dataIndex: "disbursement_amount",
              key: "disbursement_amount",
              width: "5%",
              scopedSlots: {
                customRender: "disbursement_amount",
              },
            },
            {
              title: "เบิกได้",
              dataIndex: "disbursement_export",
              key: "disbursement_export",
              width: "5%",
              scopedSlots: {
                customRender: "disbursement_export",
              },
            },
          ],
        },
        {
          title: "หมายเหตุ",
          dataIndex: "disbursement_note",
          key: "disbursement_note",
          width: "10%",
          scopedSlots: {
            customRender: "disbursement_note",
          },
        },
      ],
      disbursement_material: [],
      selectKey: 0,
      loading: false,
      visible: false,
    };
  },
  methods: {
    genDate(date) {
      const month = [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ];
      let dateThai = new Date(date).toISOString().split("T")[0];
      dateThai = `${dateThai.split("-")[2]} ${
        month[parseInt(dateThai.split("-")[1]) - 1]
      } ${parseInt(dateThai.split("-")[0]) + 543}`;
      return dateThai;
    },
    changeCondition() {
      const self = this;
      self.start = 1;
      self.end = self.pagesize;
      self.current = 1;
      self.getDisbursement();
      self.getPerpageRequisitionOrder();
    },
    changePageTable(current) {
      console.log(current);
      const self = this;
      self.start = self.pagesize * (current - 1) + 1;
      self.end = self.pagesize * (current - 1) + parseInt(self.pagesize);
      console.log(self.start);
      console.log(self.end);
      self.getDisbursement();
    },
    getPerpageRequisitionOrder() {
      const self = this;
      let data = {
        requisition_create_by: self.$store.state.user.user_id,
        requisition_status: self.status_search,
        requisition_code: self.text_search,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getPerpageRequisitionOrder",
          data
        )
        .then(function(res) {
          console.log(res);
          self.totalPage = res.data.results[0].total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTotalRequisitionOrder() {
      const self = this;
      let data = {
        requisition_create_by: self.$store.state.user.user_id,
        requisition_status_1: 1,
        requisition_status_2: 3,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getTotalRequisitionOrder",
          data
        )
        .then(function(res) {
          console.log(res);
          self.totallist = res.data.results[0].total;
          self.totalawait = res.data.results[0].await;
          self.totalsucces = res.data.results[0].success;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDisbursement() {
      const self = this;
      let data = {
        requisition_create_by: self.$store.state.user.user_id,
        requisition_status: self.status_search,
        requisition_code: self.text_search,
        start: self.start,
        end: self.end,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getRequisitionOrderByPersonId",
          data
        )
        .then(function(res) {
          console.log(res);
          self.disbursement = [];
          res.data.results.forEach(function(ele) {
            self.disbursement.push({
              key: ele.num,
              disbursement_id: ele.requisition_id,
              disbursement_code: ele.requisition_code,
              disbursement_note: ele.requisition_detail,
              disbursement_total: ele.requisition_total,
              disbursement_status: ele.requisition_status,
              disbursement_date: self.genDate(ele.requisition_create_date),
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    confirmDelete(index) {
      const self = this;
      console.log(index);
      self.$confirm({
        title: "ยกเลิกรายการเบิกวัสดุ",
        content: "ยืนยันยกเลิกรายการเบิกวัสดุ ",
        onOk() {
          console.log(index);
          self.deleteDisbursement(index);
        },
        onCancel() {
          console.log("Cancel");
        },
        okText: "ยืนยัน",
        cancelText: "ยกเลิก",
      });
    },
    deleteDisbursement(index) {
      const self = this;
      let data = {
        requisition_update_by: self.$store.state.user.user_id,
        requisition_id: self.disbursement[index].disbursement_id,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/deleteRequisitionOrder",
          data
        )
        .then(function(res) {
          if (res.data.status) {
            self.$notification["success"]({
              message: "การแจ้งเตือน",
              description: res.data.massage,
              duration: 2,
            });
            self.getDisbursement();
            self.getTotalRequisitionOrder();
            console.log(res.data.massage);
          } else {
            console.log(res.data.massage);
            self.$notification["error"]({
              message: "การแจ้งเตือน",
              description: res.data.massage,
              duration: 2,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDisbursementMaterial(index) {
      const self = this;
      self.disbursement_update.disbursement_id =
        self.disbursement[index].disbursement_id;
      self.disbursement_update.disbursement_code =
        self.disbursement[index].disbursement_code;
      self.disbursement_update.disbursement_note =
        self.disbursement[index].disbursement_note;
      self.disbursement_update.disbursement_total =
        self.disbursement[index].disbursement_total;
      self.disbursement_update.disbursement_status =
        self.disbursement[index].disbursement_status;
      self.disbursement_update.disbursement_date =
        self.disbursement[index].disbursement_date;
      let data = {
        requisition_id: self.disbursement[index].disbursement_id,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getrequisitionOrderMeterial",
          data
        )
        .then(function(res) {
          console.log(res);
          self.disbursement_material = [];
          res.data.results.forEach(function(ele, index) {
            self.disbursement_material.push({
              key: index + 1,
              material_code: ele.material_code,
              material_name: ele.material_name,
              material_unit: ele.unit_name,
              material_balance: ele.material_balance,
              disbursement_amount: ele.requisition_material_amount,
              disbursement_export: ele.requisition_material_export_amount,
              disbursement_note: ele.requisition_material_note,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self.selectKey = index;
      self.visible = true;
    },
    handleOk() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel() {
      this.visible = false;
    },
  },
  created() {
    this.getDisbursement();
    this.getTotalRequisitionOrder();
    this.getPerpageRequisitionOrder();
  },
};
</script>
<style lang="scss" scope>
.MDS_export {
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
