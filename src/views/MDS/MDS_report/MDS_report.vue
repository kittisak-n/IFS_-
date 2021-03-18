<template>
  <div id="MDS_exchequer">
    <a-row :gutter="[8, 8]">
      <a-col :span="14">
        <a-card>
          <a-row>
            <a-col :span="24">
              <highcharts
                :options="chartOptions"
                ref="lineCharts"
                style="position: relative; height:12.5vw; width:auto"
              ></highcharts>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-row :gutter="[8, 8]">
          <a-col :span="24">
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
                    จำนวนรายการเบิกเข้าวัสดุทั้งหมด
                  </div>
                  <div>
                    <span class="text-number "> {{ totallist }} </span>รายการ
                  </div>
                  <div>
                    จำนวนรายการเบิกวัสดุทั้งหมด ตั้งแต่วันที่
                    {{ genDate(startValue) }} ถึง {{ genDate(endValue) }}
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
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
                  <div class="text-head">รายการเบิกสำเร็จ</div>
                  <div>
                    <span class="text-number "> {{ totalawait }} </span>รายการ
                  </div>
                  <div>รายการที่ทำรายการเบิกเสร็จสิ้น</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
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
                  <div class="text-head">รายการเบิกไม่สำเร็จ</div>
                  <div>
                    <span class="text-number "> {{ totalsucces }} </span>รายการ
                  </div>
                  <div>รายการที่ทำรายการเบิกไม่เสร็จสิ้น</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col></a-row
        >
      </a-col>
    </a-row>
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="12" style="margin: 0.2em 0px;">
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
          </a-row>
          <hr style="width:100%" />
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="end">
                <a-col :span="3" style="text-align:end">
                  <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    :format="moment(startValue).format('LL')"
                    placeholder="วันที่เริ่มต้น"
                    @openChange="handleStartOpenChange"
                  />
                </a-col>
                <a-col :span="3">
                  <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    :format="moment(endValue).format('LL')"
                    placeholder="วันที่สิ้นสุด"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                    @change="changeCondition()"
                  />
                </a-col>
                <a-col :span="5" style="text-align:end">
                  <a-input-search
                    placeholder="ค้นหาตามชื่อผู้ทำรายการเบิกวัสดุ"
                    style="width: 100%"
                    v-model="text_search"
                    v-on:keyup.enter="changeCondition()"
                  />
                </a-col>
              </a-row>
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
                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ตรวจสอบราบการเบิกวัสดุ</span>
                          </template>
                          <a-button
                            type="primary"
                            icon="search"
                            @click="showModal(index)"
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
      width="80%"
    >
      <a-row :gutter="[8, 8]">
        <a-col :span="24">
          รายละเอียดการเบิกวัสดุ
        </a-col>
        <a-col :span="8"
          >ผู้เบิกวัสดุ :
          {{ disbursement_update.disbursement_name }}
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
            <span slot="material_balance" slot-scope="text">
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
        <a-button key="submit" type="primary" :loading="loading">
          ปิด
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import dataModule from "highcharts/modules/data";
import drilldown from "highcharts/modules/drilldown";
import moment from "moment";
import "moment/locale/th";
drilldown(Highcharts);
dataModule(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      moment,
      startValue: new Date("2021-01-01"),
      endValue: new Date(),
      endOpen: false,
      text_search: "",
      start: 1,
      end: 10,
      current: 1,
      pagesize: 10,
      totalPage: 0,
      totallist: 0,
      totalawait: 0,
      totalsucces: 0,
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
          dataIndex: "disbursement_name",
          key: "disbursement_name",
          width: "5%",
          scopedSlots: { customRender: "disbursement_name" },
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
          width: "10%",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      disbursement: [],
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
      disbursement_update: {},
      loading: false,
      visible: false,
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "โดยนับจาก 10 อันดับแรก",
        },
        xAxis: {
          categories: [],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "เปอร์เซ็นของการขอเบิก/เบิกได้",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "ขอเบิก",
            data: [],
          },
          {
            name: "เบิกได้",
            data: [],
          },
        ],
      },
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
      self.getRequisitionOrderAllByDate();
      self.genChart();
      self.getPerpageRequisitionOrder();
    },
    changePageTable(current) {
      console.log(current);
      const self = this;
      self.start = self.pagesize * (current - 1) + 1;
      self.end = self.pagesize * (current - 1) + parseInt(self.pagesize);
      console.log(self.start);
      console.log(self.end);
      self.getRequisitionOrderAllByDate();
    },
    getPerpageRequisitionOrder() {
      const self = this;
      let data = {
        requisition_code: self.text_search,
        dateStart: new Date(self.startValue).toISOString().split("T")[0],
        dateEnd: new Date(self.endValue).toISOString().split("T")[0],
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getPerpageRequisitionOrderByDate",
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
        requisition_status_1: 4,
        requisition_status_2: 2,
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
    showModal(index) {
      console.log(index);
      const self = this;
      self.disbursement_update.disbursement_name =
        self.disbursement[index].disbursement_name;
      self.disbursement_update.disbursement_id =
        self.disbursement[index].requisition_id;
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
        requisition_id: self.disbursement[index].requisition_id,
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
    getRequisitionOrderAllByDate() {
      const self = this;
      let data = {
        requisition_code: self.text_search,
        dateStart: new Date(self.startValue).toISOString().split("T")[0],
        dateEnd: new Date(self.endValue).toISOString().split("T")[0],
        start: self.start,
        end: self.end,
      };
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/getRequisitionOrderAllByDate",
          data
        )
        .then(function(res) {
          console.log(res);
          self.disbursement = [];
          res.data.results.forEach(function(ele, index) {
            self.disbursement.push({
              key: index + 1,
              requisition_id: ele.requisition_id,
              disbursement_code: ele.requisition_code,
              disbursement_name: ele.name,
              disbursement_date: self.genDate(ele.requisition_create_date),
              disbursement_total: ele.requisition_total,
              disbursement_status: ele.requisition_status,
              disbursement_note: ele.requisition_detail,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
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
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    genChart() {
      const self = this;
      let data = {
        dateStart: new Date(self.startValue).toISOString().split("T")[0],
        dateEnd: new Date(self.endValue).toISOString().split("T")[0],
      };

      axios
        .post(
          self.$store.state.url + "/materialRouters/getMaterialgenChart",
          data
        )
        .then(function(res) {
          console.log(res);
          let sum_amount = 0;
          let sum_export_amount = 0;
          self.chartOptions.title.text =
            "วัสดุถูกเบิกจ่ายตั้งแต่วันที่ " +
            self.genDate(self.startValue) +
            " ถึง " +
            self.genDate(self.endValue);
          self.chartOptions.xAxis.categories = [];
          self.chartOptions.series[0].data = [];
          self.chartOptions.series[1].data = [];
          res.data.results.forEach((ele) => {
            self.chartOptions.xAxis.categories.push(ele.material_name);
            sum_amount += ele.amount;
            sum_export_amount += ele.export_amount;
          });
          res.data.results.forEach((ele) => {
            self.chartOptions.xAxis.categories.push(ele.material_name);
            console.log((ele.amount * 100) / sum_amount);
            console.log();
            self.chartOptions.series[0].data.push(
              (ele.amount * 100) / sum_amount
            );
            self.chartOptions.series[1].data.push(
              (ele.export_amount * 100) / sum_export_amount
            );
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  created() {
    this.genChart();
    this.getRequisitionOrderAllByDate();
    this.getTotalRequisitionOrder();
    this.getPerpageRequisitionOrder();
  },
};
</script>
<style lang="scss" scope>
.text-head {
  font-size: 135%;
  font-weight: 600;
}

.text-number {
  font-size: 135%;
  font-weight: 600;
}
</style>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
