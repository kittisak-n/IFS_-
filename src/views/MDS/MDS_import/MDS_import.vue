<template>
  <div class="MDS_import">
    <a-row :gutter="[8, 8]">
      <a-col :span="14">
        <a-card>
          <a-row>
            <a-col :span="24">
              <highcharts
                :options="chartOptions"
                ref="lineCharts"
                style="position: relative; height:12.7vw; width:auto"
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
                    จำนวนรายการนำเข้าวัสดุทั้งหมด
                  </div>
                  <div>
                    <span class="text-number "> {{ totallist }} </span>รายการ
                  </div>
                  <div>
                    จำนวนรายการนำเข้าวัสดุทั้งหมด ตั้งแต่วันที่
                    {{ genDate(start_date_search) }} ถึง
                    {{ genDate(end_date_search) }}
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
                  <div class="text-head">รายการนำเข้าคงเหลือ</div>
                  <div>
                    <span class="text-number "> {{ totalawait }} </span>รายการ
                  </div>
                  <div>จำนวนรายการนำเข้าสินค้าคงเหลือ</div>
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
                  <div class="text-head">รายการนำเข้าหมด</div>
                  <div>
                    <span class="text-number "> {{ totalsucces }} </span>รายการ
                  </div>
                  <div>จำนวนรายการนำเข้าสินค้าหมด</div>
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
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-card-meta title="รายการนำเข้าวัสดุ">
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
              <router-link :to="{ path: '/MDS_import/MDS_import_form' }">
                <a-button type="primary" icon="plus">
                  เพิ่มรายการนำเข้าวัสดุ
                </a-button>
              </router-link>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <a-row :gutter="[8, 8]" type="flex" justify="end">
            <a-col :span="3" style="text-align:end">
              <a-date-picker
                v-model="start_date_search"
                :disabled-date="disabledStartDate"
                :format="moment(start_date_search).format('LL')"
                placeholder="วันที่เริ่มต้น"
                @openChange="handleStartOpenChange"
              />
            </a-col>
            <a-col :span="3">
              <a-date-picker
                v-model="end_date_search"
                :disabled-date="disabledEndDate"
                :format="moment(end_date_search).format('LL')"
                placeholder="วันที่สิ้นสุด"
                :open="endOpen"
                @openChange="handleEndOpenChange"
              />
            </a-col>
            <a-col :span="5" style="text-align:end">
              <a-input-search
                placeholder="ค้นหาตามรหัส หรือ ชื่อวัสดุ"
                style="width: 100%"
                v-model="text_search"
                v-on:keyup.enter="changeCondition()"
              />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns_purchase_order"
                :data-source="purchase_order"
                :pagination="false"
                size="small"
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span slot="purchase_order_code" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_company" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_date" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_total" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_paymant" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_vat" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_paymant_total" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="purchase_order_creator" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="action" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ตรวจสอบรายการ</span>
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
              <p
                :style="{ margin: '0.3em 0.5%' }"
                v-if="this.total_search != 0"
              >
                {{ this.start_search }} -
                {{
                  this.end_search > this.total_search
                    ? this.total_search
                    : this.end_search
                }}
                จาก {{ this.total_search }} รายการ
              </p>
              <p
                :style="{ margin: '0.3em 0.5%' }"
                v-if="this.total_search == 0"
              >
                ไม่พบรายการที่ค้นหา
              </p>
            </a-col>
            <a-col :span="9" :style="{ textAlign: 'Right' }">
              แสดงทีละ
              <a-select
                default-value="10"
                v-model="PageSize"
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
                :total="total_search"
                :page-size="PageSize"
                @change="changePageTable(current)"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      width="1200px"
      :dialog-style="{ top: '5%' }"
      v-model="visible"
      :title="
        'รายละเอียดใบรายการนำเข้าวัสดุหมายเลข : ' + purchase.purchase_order_code
      "
    >
      <a-row :gutter="[8, 0]">
        <a-col :span="24">
          <p><b>หมายเลขใบรายการ</b> : {{ purchase.purchase_order_code }}</p>
        </a-col>
        <a-col :span="8">
          <p><b>วันที่นำเข้าวัสดุ</b> : {{ purchase.purchase_order_date }}</p>
        </a-col>
        <a-col :span="8">
          <p><b>ผู้ตรวจรับ</b> : {{ purchase.purchase_order_creator }}</p>
        </a-col>
        <a-col :span="8">
          <p><b>จำนวน</b> : {{ purchase.purchase_order_total }} รายการ</p>
        </a-col>
        <a-col :span="8">
          <p><b>ยอดชำระ</b> : {{ purchase.purchase_order_paymant }} บาท</p>
        </a-col>
        <a-col :span="8">
          <p><b>ภาษี (7%)</b> : {{ purchase.purchase_order_vat }} บาท</p>
        </a-col>
        <a-col :span="8">
          <p>
            <b>ยอดชำระสุทธิ</b> :{{ purchase.purchase_order_paymant_total }} บาท
          </p>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 0]">
        <a-col :span="24">
          <p><b>ผู้จัดจำหน่าย</b> :{{ purchase.purchase_order_company }}</p>
        </a-col>
      </a-row>

      <a-row :gutter="[8, 8]">
        <a-col :span="24" style="margin: 0.3em 0px;font-size: 100%;"
          ><b>รายการวัสดุนำเข้า</b>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 8]">
        <a-col :span="24" style="text-align:center">
          <a-table
            :columns="columns_order_meterail"
            :data-source="order_meterail"
            :pagination="false"
            size="small"
            bordered
          >
            <span slot="key" slot-scope="text, record, index">
              <div :style="{ textAlign: 'center' }">
                {{ index + 1 }}
              </div>
            </span>
            <span slot="order_meterail_code" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="order_meterail_name" slot-scope="text">
              <div :style="{ textAlign: 'left' }">
                {{ text }}
              </div>
            </span>
            <span slot="order_meterail_amount" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="order_meterail_unit" slot-scope="text">
              <div :style="{ textAlign: 'center' }">
                {{ text }}
              </div>
            </span>
            <span slot="order_meterail_price" slot-scope="text">
              <div :style="{ textAlign: 'center' }">{{ text }}.00</div>
            </span>
          </a-table>
        </a-col>
      </a-row>

      <template slot="footer">
        <a-button @click="visible = !visible">
          ปิด
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import dataModule from "highcharts/modules/data";
import drilldown from "highcharts/modules/drilldown";
import loadExporting from "highcharts/modules/exporting";
import axios from "axios";
drilldown(Highcharts);
dataModule(Highcharts);
loadExporting(Highcharts);

import moment from "moment";
import "moment/locale/th";
export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      start_search: 1,
      end_search: 10,
      PageSize: 10,
      total_search: 0,
      current: 1,
      text_search: "",
      condition: "",
      status_search: 0,
      start_date_search: new Date("2021-01-01"),
      end_date_search: new Date(),
      totallist: 0,
      totalawait: 0,
      totalsucces: 0,
      moment,
      endOpen: false,
      month: [
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
      ],
      purchase: {},
      chartOptions: {
        chart: {
          type: "line",
        },
        title: {
          text: "จำนวนรายการนำเข้าวัสดุ",
        },
        subtitle: {
          text: "ย้อนหลัง 12 เดือนนับจากวันที่ดูข้อมูล",
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: "จำนวนรายการนำเข้าวัสดุ",
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: true,
          },
        },
        series: [
          {
            name: "รายการนำเข้า",
            data: [],
          },
        ],
      },
      columns_purchase_order: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "3%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "หมายเลขใบรายการ",
          dataIndex: "purchase_order_code",
          key: "purchase_order_code",
          width: "5%",
          scopedSlots: {
            customRender: "purchase_order_code",
          },
        },
        {
          title: "ผู้จัดจำหน่าย",
          dataIndex: "purchase_order_company",
          key: "purchase_order_company",
          width: "10%",
          scopedSlots: {
            customRender: "purchase_order_company",
          },
        },
        {
          title: "วันที่นำเข้าวัสดุ",
          dataIndex: "purchase_order_date",
          key: "purchase_order_date",
          width: "5%",
          scopedSlots: {
            customRender: "purchase_order_date",
          },
        },
        {
          title: "จำนวนรายการ",
          dataIndex: "purchase_order_total",
          key: "purchase_order_total",
          width: "5%",
          scopedSlots: { customRender: "purchase_order_total" },
        },
        {
          title: "ราคา",
          children: [
            {
              title: "ยอดชำระ",
              dataIndex: "purchase_order_paymant",
              key: "purchase_order_paymant",
              width: "5%",
              scopedSlots: { customRender: "purchase_order_paymant" },
            },
            {
              title: "ภาษี (7%)",
              dataIndex: "purchase_order_vat",
              key: "purchase_order_vat",
              width: "5%",
              scopedSlots: { customRender: "purchase_order_vat" },
            },
            {
              title: "ยอดชำระสุทธิ",
              dataIndex: "purchase_order_paymant_total",
              key: "purchase_order_paymant_total",
              width: "5%",
              scopedSlots: { customRender: "purchase_order_paymant_total" },
            },
          ],
        },
        {
          title: "ผู้ทำรายการ",
          dataIndex: "purchase_order_creator",
          key: "purchase_order_creator",
          width: "5%",
          scopedSlots: { customRender: "purchase_order_creator" },
        },
        {
          title: "ตรวจสอบ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      purchase_order: [],
      columns_order_meterail: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "3%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "รหัสวัสดุ",
          dataIndex: "order_meterail_code",
          key: "order_meterail_code",
          width: "10%",
          scopedSlots: {
            customRender: "order_meterail_code",
          },
        },
        {
          title: "รายการวัสดุ",
          dataIndex: "order_meterail_name",
          key: "order_meterail_name",
          width: "15%",
          scopedSlots: {
            customRender: "order_meterail_name",
          },
        },
        {
          title: "จำนวน",
          dataIndex: "order_meterail_amount",
          key: "order_meterail_amount",
          width: "7%",
          scopedSlots: {
            customRender: "order_meterail_amount",
          },
        },
        {
          title: "หน่วยนับ",
          dataIndex: "order_meterail_unit",
          key: "order_meterail_unit",
          width: "5%",
          scopedSlots: {
            customRender: "order_meterail_unit",
          },
        },

        {
          title: "ราคารวม (บาท)",
          dataIndex: "order_meterail_price",
          key: "order_meterail_price",
          width: "10%",
          scopedSlots: {
            customRender: "order_meterail_price",
          },
        },
      ],
      order_meterail: [
        {
          key: 1,
          order_meterail_code: "MDS5010770",
          order_meterail_name: "กระดาษถ่ายเอกสาร A4 Double A",
          order_meterail_amount: 50,
          order_meterail_unit: "ริม",
          order_meterail_price: "6500",
        },
      ],
      visible: false,
    };
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  methods: {
    genDate(date) {
      const self = this;
      let dateThai = new Date(date).toISOString().split("T")[0];
      dateThai = `${dateThai.split("-")[2]} ${
        self.month[parseInt(dateThai.split("-")[1]) - 1]
      } ${parseInt(dateThai.split("-")[0]) + 543}`;
      return dateThai;
    },
    changeCondition() {
      const self = this;
      self.start_search = 1;
      self.end_search = self.PageSize;
      self.getPurchaseOrderRecord();
    },
    showModal(index) {
      console.log(index);
      const self = this;
      self.purchase.purchase_order_code =
        self.purchase_order[index].purchase_order_code;
      self.purchase.purchase_order_company =
        self.purchase_order[index].purchase_order_company;
      self.purchase.purchase_order_total =
        self.purchase_order[index].purchase_order_total;
      self.purchase.purchase_order_date =
        self.purchase_order[index].purchase_order_date;
      self.purchase.purchase_order_paymant =
        self.purchase_order[index].purchase_order_paymant;
      self.purchase.purchase_order_vat =
        self.purchase_order[index].purchase_order_vat;
      self.purchase.purchase_order_paymant_total =
        self.purchase_order[index].purchase_order_paymant_total;
      self.purchase.purchase_order_creator =
        self.purchase_order[index].purchase_order_creator;

      let data = {
        purchase_order_id: self.purchase_order[index].purchase_order_id,
      };
      axios
        .post(self.$store.state.url + "/purchaseOrderRouters/getByID", data)
        .then(function(res) {
          console.log(res);
          self.order_meterail = [];
          res.data.results.forEach(function(ele, index) {
            self.order_meterail.push({
              key: index + 1,
              order_meterail_code: ele.material_code,
              order_meterail_name: ele.material_name,
              order_meterail_amount: ele.purchase_order_material_import_amount,
              order_meterail_unit: ele.unit_name,
              order_meterail_price: ele.purchase_order_material_price_total,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      self.visible = true;
    },
    getCondition() {
      const self = this;
      self.condition = ``;
      self.condition += `where (pco.purchase_order_code LIKE "%${self.text_search}%" or pco.purchase_order_company LIKE "%${self.text_search}%") \n`;
      if (self.start_date_search && self.end_date_search) {
        self.condition += `and pco.purchase_order_create_date between CAST('${
          new Date(self.start_date_search).toISOString().split("T")[0]
        }' as DATE) and CAST('${
          new Date(self.end_date_search).toISOString().split("T")[0]
        }' AS DATE) \n`;
      }
    },
    changePageTable(current) {
      console.log(current);
      const self = this;
      self.start_search = self.PageSize * (current - 1) + 1;
      self.end_search = self.PageSize * (current - 1) + parseInt(self.PageSize);

      self.getPurchaseOrder();
      self.getTotalRequisitionOrder();
    },
    getPurchaseOrderRecord() {
      const self = this;
      self.getCondition();
      axios
        .post(
          self.$store.state.url +
            "/purchaseOrderRouters/getRecordPurchaseOrder",
          {
            condition: self.condition,
          }
        )
        .then(function(response) {
          console.log(response);
          self.total_search = response.data.results[0].total_Row;
          self.getPurchaseOrder();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPurchaseOrder() {
      const self = this;
      self.getCondition();
      axios
        .post(self.$store.state.url + "/purchaseOrderRouters/getByCondition", {
          condition: self.condition,
          start: self.start_search,
          end: self.end_search,
        })
        .then(function(res) {
          console.log(res);
          const data = res.data.results;
          self.purchase_order = [];
          data.forEach(function(ele) {
            self.purchase_order.push({
              key: ele.num,
              purchase_order_id: ele.purchase_order_id,
              purchase_order_code: ele.purchase_order_code,
              purchase_order_company: ele.purchase_order_company,
              purchase_order_date: self.genDate(ele.date),
              purchase_order_total: ele.purchase_order_amount,
              purchase_order_paymant: ele.purchase_order_payment_amount,
              purchase_order_vat: ele.purchase_order_vat_amount,
              purchase_order_paymant_total:
                ele.purchase_order_net_payment_amount,
              purchase_order_creator: ele.purchase_order_creator,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTotalRequisitionOrder() {
      const self = this;
      let data = {
        date_Start: new Date(self.start_date_search)
          .toISOString()
          .split("T")[0],
        date_End: new Date(self.end_date_search).toISOString().split("T")[0],
      };
      axios
        .post(
          self.$store.state.url + "/purchaseOrderRouters/getPurchaseOrderTotal",
          data
        )
        .then(function(res) {
          console.log(res);
          self.totallist = res.data.results[0].total;
          self.totalawait = res.data.results[0].depleted;
          self.totalsucces = res.data.results[0].undepleted;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getChart() {
      const self = this;
      self.getCondition();
      axios
        .post(self.$store.state.url + "/purchaseOrderRouters/genChartByMonth")
        .then(function(res) {
          console.log(res);
          let data = res.data.results[0];
          self.chartOptions.xAxis.categories = [
            self.month[parseInt(data.month_12) - 1],
            self.month[parseInt(data.month_11) - 1],
            self.month[parseInt(data.month_10) - 1],
            self.month[parseInt(data.month_9) - 1],
            self.month[parseInt(data.month_8) - 1],
            self.month[parseInt(data.month_7) - 1],
            self.month[parseInt(data.month_6) - 1],
            self.month[parseInt(data.month_5) - 1],
            self.month[parseInt(data.month_4) - 1],
            self.month[parseInt(data.month_3) - 1],
            self.month[parseInt(data.month_2) - 1],
            self.month[parseInt(data.month_1) - 1],
          ];

          self.chartOptions.series[0].data = [
            data.m12,
            data.m11,
            data.m10,
            data.m9,
            data.m8,
            data.m7,
            data.m6,
            data.m5,
            data.m4,
            data.m3,
            data.m2,
            data.m1,
          ];
        })
        .catch(function(error) {
          console.log(error);
        });
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
      this.changeCondition();
    },
  },
  created() {
    this.getPurchaseOrderRecord();
    this.getTotalRequisitionOrder();
    this.getChart();
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
