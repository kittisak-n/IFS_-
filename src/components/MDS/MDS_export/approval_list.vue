<template>
  <div class="approval_list">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-table
              :columns="columns"
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
              <span slot="action" slot-scope="">
                <div :style="{ textAlign: 'center' }">
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>ตรวจสอบราบการเบิกวัสดุ</span>
                    </template>
                    <a-button type="primary" icon="search" @click="showModal">
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
            <p :style="{ marginTop: '0.3em' }">1-10 จาก 10 รายการ</p>
          </a-col>
          <a-col :span="9" :style="{ textAlign: 'Right' }">
            แสดงทีละ
            <a-select
              default-value="10"
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
              :total="total"
              :page-size="10"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      v-model="visible"
      title="รายละเอียดใบเบิกวัสดุหมายเลข"
      on-ok="handleOk"
      width="900px"
    >
      <a-row :gutter="[8, 8]">
        <a-col :span="24">
          รายละเอียดการเบิกวัสดุ
        </a-col>
        <a-col :span="8">ผู้เบิกวัสดุ : นายกิตติศักดิ์ น้อยดอนไพร </a-col>
        <a-col :span="8">วันที่ทำการเบิก : 22/05/2020 </a-col>
        <a-col :span="2" style="text-align:end">สถานะ :</a-col>
        <a-col :span="6">
          <a-select :default-value="null" size="small" style="width: 100%">
            <a-select-option :value="null">
              อนุมัติ
            </a-select-option>
            <a-select-option value="disabled">
              ไม่อนุมัติ
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="24">
          หมายเหตุ :
        </a-col>
        <a-col :span="24">
          ตารางแสดงรายการเบิกวัสดุ
        </a-col>
        <a-col :span="24">
          <a-table
            :columns="columns_order"
            :data-source="disbursement"
            :pagination="false"
            bordered
            size="small"
            :scroll="{ y: '450px' }"
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
                    <span>ตรวจสอบราบการเบิกวัสดุ</span>
                  </template>
                  <a-button type="primary" icon="search" @click="showModal">
                  </a-button>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>ยกเลิกรายการเบิกวัสดุ</span>
                  </template>
                  <a-button
                    type="danger"
                    icon="close"
                    @click="deleteMeterailReccord(index)"
                  >
                  </a-button>
                </a-tooltip>
              </div>
            </span>
          </a-table>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-row :gutter="[8, 8]">
          <a-col :span="12" style="text-align:start">
            <a-button key="back" @click="handleCancel">ยกเลิก </a-button>
          </a-col>
          <a-col :span="12">
            <a-button
              key="submit"
              type="primary"
              :loading="loading"
              @click="handleOk"
            >
              ยืนยัน
            </a-button>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
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
          title: "ชื่อผู้เบิกวัสดุ",
          dataIndex: "disbursement_date",
          key: "disbursement_date",
          width: "5%",
          scopedSlots: { customRender: "disbursement_date" },
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
          dataIndex: "disbursement_total",
          key: "disbursement_total",
          width: "10%",
          scopedSlots: {
            customRender: "disbursement_total",
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
      disbursement: [
        {
          key: 1,
          meterail_name: null,
          meterail_type: null,
          meterail_import_unit: null,
          meterail_export_unit: null,
          meterail_alert_amount: null,
        },
      ],
      columns_order: [
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
          dataIndex: "meterail_code",
          key: "meterail_code",
          width: "10%",
          scopedSlots: {
            customRender: "meterail_code",
          },
        },
        {
          title: "ชื่อวัสดุ",
          dataIndex: "meterail_name",
          key: "meterail_name",
          width: "10%",
          scopedSlots: {
            customRender: "meterail_name",
          },
        },
        {
          title: "หน่วย",
          dataIndex: "meterail_unit",
          key: "meterail_unit",
          width: "5%",
          scopedSlots: {
            customRender: "meterail_unit",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "คงเหลือ",
              dataIndex: "meterail_balance",
              key: "disbursement_code",
              width: "5%",
              scopedSlots: {
                customRender: "disbursement_code",
              },
            },
            {
              title: "ขอเบิก",
              dataIndex: "meterail_balance",
              key: "meterail_balance",
              width: "5%",
              scopedSlots: {
                customRender: "meterail_balance",
              },
            },
            {
              title: "เบิกได้",
              dataIndex: "disbursement_code",
              key: "disbursement_code",
              width: "5%",
              scopedSlots: {
                customRender: "disbursement_code",
              },
            },
          ],
        },
        {
          title: "หมายเหตุ",
          dataIndex: "disbursement_code",
          key: "disbursement_code",
          width: "10%",
          scopedSlots: {
            customRender: "disbursement_code",
          },
        },
      ],
      loading: false,
      visible: false,
    };
  },
  methods: {
    deleteMeterailReccord(index) {
      // const seft = this;
      console.log(index);
      this.$confirm({
        title: "ยกเลิกรายการเบิกวัสดุ",
        content: "ยืนยันยกเลิกรายการเบิกวัสดุ ",
        onOk() {
          console.log(index);
        },
        onCancel() {
          console.log("Cancel");
        },
        okText: "ยืนยัน",
        cancelText: "ยกเลิก",
      });
    },
    showModal() {
      this.visible = true;
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
};
</script>
<style lang="scss" scope>
.approval_list {
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
