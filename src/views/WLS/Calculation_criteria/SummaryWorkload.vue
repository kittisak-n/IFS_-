<template>
  <div class="SummaryWorkload" id="SummaryWorkload">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card
          size="small"
          title="ตารางแสดงรายละเอียดการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ"
        >
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24" style="text-align: center">
              <h1>
                สรุปภาระงานเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ
              </h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="8" style="text-align: end">
              <span style="font-size: 18px">ปีการศึกษา </span>
              <a-select
                @change="get_summary_by_year()"
                v-model="year"
                style="width: 18%; font-size: 15px"
              >
              
                <a-select-option :value="new Date().getFullYear() + 543" selected> 
                  {{ new Date().getFullYear() + 543 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 542">
                  {{ new Date().getFullYear() + 542 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 541">
                  {{ new Date().getFullYear() + 541 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 540">
                  {{ new Date().getFullYear() + 540 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 539">
                  {{ new Date().getFullYear() + 539 }}
                </a-select-option>
              </a-select>
            </a-col>

            <a-col :span="8" style="text-align: start">
              <span style="font-size: 18px"> ภาคเรียนที่ </span>

              <a-select
                v-model="semester"
                style="width: 100px; font-size: 15px"
              >
                <a-select-option :value="1"> 1 </a-select-option>
                <a-select-option :value="2"> 2 </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="summary_data"
                :pagination="false"
                bordered
                size="small"
              >
                <span slot="key" slot-scope="text">
                  <div style="text-align: center">
                    {{ text }}
                  </div>
                </span>

                <span slot="person_name" slot-scope="text">
                  <div style="text-align: center">
                    {{ text }}
                  </div>
                </span>

                <span slot="position_name" slot-scope="text">
                  <div :style="{ textAlign: 'start' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="summary_total" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="summary_total_around" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="summary_total_extra" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="action" slot-scope="text, record">
                  <div :style="{ textAlign: 'center' }">
                    <div v-if="record.summary_total != null">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>แสดงข้อมูลและส่งออกไฟล์สกุล Pdf</span>
                        </template>
                        <a-button
                          type="danger"
                          icon="file-pdf"
                          :style="{ marginRight: '3%' }"
                          @click="exportPDF(record.summary_id)"
                        />
                      </a-tooltip>
                    </div>

                    <div v-if="record.summary_total == null">
                      <router-link
                        :to="{
                          path:
                            '/Calculation_workload?person_id=' +
                            record.person_id,
                        }"
                      >
                        <a-button type="primary" :style="{ marginRight: '3%' }"
                          >คำนวณ</a-button
                        ></router-link
                      >
                    </div>
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
                <a-select-option value="10"> 10 </a-select-option>
                <a-select-option value="25"> 25 </a-select-option>
                <a-select-option value="50"> 50 </a-select-option>
                <a-select-option value="100"> 100 </a-select-option>
              </a-select>

              <a-pagination
                :style="{ display: 'inline' }"
                v-model="current"
                :total="total"
                :page-size="10"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const axios = require("axios");

import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fontsPDF/THSarabunPsk-fonts.js"; // 1. import custom fontss

export default {
  name: "SummaryWorkload",
  components: {},
  data() {
    return {
      month: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      summary_data: [],
      summary_of_report: [],
      export_data: [],
      receipt_data: [],
      semester: 1,
      year: new Date().getFullYear() + 543 , // 2020,

      columns: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: { customRender: "key" },
          styles: "ant-table",
        },
        {
          title: "ชื่อ-สกุล",
          dataIndex: "person_name",
          key: "person_name",
          width: "15%",
          scopedSlots: { customRender: "person_name" },
        },

        {
          title: "ตำแหน่ง",
          dataIndex: "position_name",
          key: "position_name",
          width: "15%",
          scopedSlots: { customRender: "position_name" },
        },

        {
          title: "ภาระงานสอน\n/หน่วยกิต",
          dataIndex: "summary_total",
          key: "summary_total",
          width: "5%",
          scopedSlots: { customRender: "summary_total" },
        },
        {
          title: "หักภาระงานขั้นต่ำ\n/หน่วยกิต",
          dataIndex: "summary_total_around", //Less minimum workload
          key: "summary_total_around",
          width: "5%",
          scopedSlots: { customRender: "summary_total_around" },
        },
        {
          title: "หักภาระงาน Extraworkload\n/หน่วยกิต",
          dataIndex: "summary_total_extra", // Less minimum workload Extraworkload
          key: "summary_total_extra",
          width: "5%",
          scopedSlots: { customRender: "summary_total_extra" },
        },
        {
          title: "ภาระงานที่เบิกได้\n/หน่วยกิต",
          dataIndex: "summary_bonus", //Payable workload
          key: "summary_bonus",
          width: "5%",
          scopedSlots: { customRender: "summary_bonus" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
  
    getdateThai_summary_data() {
      const self = this;

      self.summary_data.forEach((data, index) => {
        let summary_create_date_thai = new Date(data.summary_create_date)
          .toISOString()
          .split("T")[0];
        summary_create_date_thai = `${summary_create_date_thai.split("-")[2]} ${
          self.month[parseInt(summary_create_date_thai.split("-")[1])]
        } ${parseInt(summary_create_date_thai.split("-")[0]) + 543}`;

        let schedule_start_date_thai = new Date(data.schedule_start_date)
          .toISOString()
          .split("T")[0];
        schedule_start_date_thai = ` ${
          parseInt(schedule_start_date_thai.split("-")[0]) + 543
        }`;

        self.summary_data[index].summary_create_date = summary_create_date_thai;
        self.summary_data[index].schedule_start_date = schedule_start_date_thai;
      });
    },
      get_summary_by_year() {
      const self = this;

      if (this.year == 0) {
        this.get_summary();
      } else {
        axios
          .post(this.$store.state.url + "/summaryRouters/get_summary_by_year", {
            summary_year: self.year,
          })
          .then((res) => {
            self.summary_data = [];
            res.data.results.forEach(function (element, index) {
              self.summary_data.push({
                key: index + 1,
                summary_id: element.summary_id,
                summary_total: element.summary_total,
                summary_total_calculate: element.summary_total_calculate,
                summary_total_around: element.summary_total_around,
                summary_total_extra: element.summary_total_extra,
                summary_bonus: element.summary_bonus,
                summary_salary: element.summary_salary,
                summary_lesson: element.summary_lesson,
                summary_create_by: element.summary_create_by,
                summary_create_date: element.summary_create_date,

                schedule_per_credit: element.schedule_per_credit,
                schedule_start_date: element.schedule_start_date,
                schedule_name: element.schedule_name,
                schedule_id: element.schedule_id,
                summary_year: element.summary_year,
                person_name: element.person_name,
                position_name: element.position_name,
                person_address: element.person_address,
                provinces_name: element.provinces_name,
                amphures_name: element.amphures_name,
                districts_name: element.districts_name,
                zip_code: element.zip_code,
              });
              
            });
            
        
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    genDate() {
      const self = this;

      self.receipt_data.forEach((data, index) => {
        let summary_detail_date_thai = new Date(data.summary_detail_date)
          .toISOString()
          .split("T")[0];
        summary_detail_date_thai = `${
          self.month[parseInt(summary_detail_date_thai.split("-")[1])]
        } ${parseInt(summary_detail_date_thai.split("-")[0]) + 543}`;
        let summary_detail_create_date = new Date(
          data.summary_detail_create_date
        )
          .toISOString()
          .split("T")[0];
        summary_detail_create_date = `${
          summary_detail_create_date.split("-")[2]
        } ${self.month[parseInt(summary_detail_create_date.split("-")[1])]} ${
          parseInt(summary_detail_create_date.split("-")[0]) + 543
        }`;

        self.receipt_data[index].summary_detail_date = summary_detail_date_thai;
        self.receipt_data[
          index
        ].summary_detail_create_date = summary_detail_create_date;
      });
    },
    get_summary() {
      const self = this;

      axios
        .post(this.$store.state.url + "/summaryRouters/get_summary")
        .then((res) => {
          self.summary_data = [];
          res.data.results.forEach(function (element, index) {
            self.summary_data.push({
              key: index + 1,
              summary_id: element.summary_id,
              summary_total: element.summary_total,
              summary_total_calculate: element.summary_total_calculate,
              summary_total_around: element.summary_total_around,
              summary_total_extra: element.summary_total_extra,
              summary_bonus: element.summary_bonus,
              summary_salary: element.summary_salary,
              summary_lesson: element.summary_lesson,
              summary_create_by: element.summary_create_by,
              summary_create_date: element.summary_create_date,
              person_id: element.person_id,
              schedule_per_credit: element.schedule_per_credit,
              schedule_start_date: element.schedule_start_date,
              schedule_name: element.schedule_name,
              schedule_id: element.schedule_id,
              summary_year: element.summary_year,
              person_name: element.person_name,
              position_name: element.position_name,
              person_address: element.person_address,
              provinces_name: element.provinces_name,
              amphures_name: element.amphures_name,
              districts_name: element.districts_name,
              zip_code: element.zip_code,
            });
          });

          console.log(self.summary_data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getBase64FromImageUrl(url) {
      var img = new Image();

      img.setAttribute("crossOrigin", "anonymous");

      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      };

      img.src = url;

      return img;
    },
    exportPDF(summary_id) {
      var logo = this.getBase64FromImageUrl("logo/Buu.jpg");
      console.log(logo);
      const self = this;
      var body = [];
      var summary_of_report_workload_sum = 0;
      var summary_of_report_proportion_sum = 0;
      // get data to export_data
      self.summary_data.forEach((data) => {
        if (summary_id == data.summary_id) {
          self.export_data = data;
        }
      });

      console.log(self.export_data);
     
      var headers = {
        colum1: {
          col_1: {
            text: "หมวดวิชา / รหัสวิชา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 26.168,
            _maxWidth: 46.344,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_2: {
            text: "หน่วยกิต",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 19.456,
            _maxWidth: 19.456,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_3: {
            text: "วัน-เวลา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 10.416,
            _maxWidth: 18.72,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_4: {
            text: "กลุ่ม",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 9.656,
            _maxWidth: 9.656,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_5: {
            text: "จำนวนหน่วยกิต",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 35.224000000000004,
            _maxWidth: 35.224000000000004,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_7: {
            text: "จำนวนนิสิตที่ลงทะเบียน\nเรียนในรายวิชา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 52.904,
            _maxWidth: 52.904,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_8: {
            text: "จำนวนกลุ่มที่สอน",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 38.736000000000004,
            _maxWidth: 38.736000000000004,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_10: {
            text: "ภาระงาน",
            style: "headersmall",
            alignment: "center",
            colSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 20.136,
            _maxWidth: 20.136,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_11: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_13: {
            text: "ภาระงานรวม(นก)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 39.632,
            _maxWidth: 39.632,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_14: {
            text: "สัดส่วน\nภาระงาน\nที่สอน\n(สัปดาห์)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 20.136,
            _maxWidth: 20.136,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_15: {
            text: "ภาระงาน\nรวมที่ได้\nตามสัดส่วน\nการสอน(นก)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 28.752,
            _maxWidth: 28.752,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
        },
        colum2: {
          col_1: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_5: {
            text: "บรรยาย",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_6: {
            text: "lab",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 8.120000000000001,
            _maxWidth: 8.120000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_8: {
            text: "บรรยาย",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_9: {
            text: "lab",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 8.120000000000001,
            _maxWidth: 8.120000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_10: {
            text: "ภาระงานพื้นฐาน",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 36.584,
            _maxWidth: 36.584,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_11: {
            text: "ภาระงานตรวจงาน",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 40.856,
            _maxWidth: 40.856,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_13: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_14: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_15: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
        },
        colum3: {
          col_1: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 11.8,
              availableHeight: null,
              availableWidth: 100,
              lastColumnWidth: 100,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 114,
              y: 11.8,
              availableHeight: null,
              availableWidth: 25,
              lastColumnWidth: 25,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 148,
              y: 11.8,
              availableHeight: null,
              availableWidth: 100,
              lastColumnWidth: 100,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 257,
              y: 11.8,
              availableHeight: null,
              availableWidth: 40,
              lastColumnWidth: 40,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_5: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 306,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 345,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 384,
              y: 20.6,
              availableHeight: null,
              availableWidth: 60,
              lastColumnWidth: 60,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_8: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 453,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 492,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_10: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 531,
              y: 34.400000000000006,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_11: {
            text: "ชั่วโมง\nบรรยาย",
            style: "headersmall",
            alignment: "center",
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_12: {
            text: "ชั่วโมง \nlab",
            style: "headersmall",
            alignment: "center",
            _margin: null,
            _inlines: [],
            _minWidth: 14.248000000000001,
            _maxWidth: 14.248000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_13: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 648,
              y: 20.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_14: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 687,
              y: 38.2,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_15: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 726,
              y: 38.2,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
        },
      };
      for (var item in headers) {
        var header = headers[item];
        var row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        row.push(header.col_7);
        row.push(header.col_8);
        row.push(header.col_9);
        row.push(header.col_10);
        row.push(header.col_11);
        row.push(header.col_12);
        row.push(header.col_13);
        row.push(header.col_14);
        row.push(header.col_15);
        body.push(row);
      }
      axios
        .post(this.$store.state.url + "/summaryRouters/get_summary_of_report", {
          summary_id: summary_id,
        })
        .then((res) => {
          self.summary_of_report = res.data.results;
        })
        .catch((err) => {
          console.error(err);
        });

      body.push([
        {
          text: "รายวิชาของคณะ",
          style: "headersmall",
          alignment: "left",
          colSpan: 15,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      if (self.summary_of_report.internal.length != 0) {
        for (let key in self.summary_of_report.internal) {
          let data = self.summary_of_report.internal[key];
          let newrow = new Array();
          newrow.push({
            text: data.summary_of_report_course_code.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_course_unit.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_section_detail.toString(),
            alignment: "left",
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_section_number.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_lecture_credits.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_lab_credits.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_section_student.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_groups_of_lecture.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_groups_of_lab.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_workload.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_Ins_lecture.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_Ins_lab.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_workload_sum.toString(),
            style: "numbersmall",
          });

          newrow.push({
            text: data.summary_of_report_week_teaching.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_proportion.toString(),
            style: "numbersmall",
          });
          summary_of_report_workload_sum += data.summary_of_report_workload_sum;
          summary_of_report_proportion_sum += data.summary_of_report_proportion;
          body.push(newrow);
        }
      } else {
        let newrow = new Array();
        newrow.push(
          {
            text: "-",
            colSpan: 15,
            style: "numbersmall",
            alignment: "center",
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        );

        body.push(newrow);
      }

      body.push([
        {
          text: "รายวิชาศึกษาทั่วไป",
          style: "headersmall",
          alignment: "left",
          colSpan: 15,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      if (self.summary_of_report.external.length != 0) {
        for (let key in self.summary_of_report.external) {
          let data = self.summary_of_report.external[key];
          let newrow = new Array();
          newrow.push({
            text: data.summary_of_report_course_code.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_course_unit.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_section_detail.toString(),
            alignment: "left",
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_section_number.toString(),
            style: "fontsmall",
          });
          newrow.push({
            text: data.summary_of_report_lecture_credits.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_lab_credits.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_section_student.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_groups_of_lecture.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_groups_of_lab.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_workload.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_Ins_lecture.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_Ins_lab.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_workload_sum.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_week_teaching.toString(),
            style: "numbersmall",
          });
          newrow.push({
            text: data.summary_of_report_proportion.toString(),
            style: "numbersmall",
          });
          summary_of_report_workload_sum += data.summary_of_report_workload_sum;
          summary_of_report_proportion_sum += data.summary_of_report_proportion;
          body.push(newrow);
        }
      } else {
        let newrow = new Array();
        newrow.push(
          {
            text: "-",
            colSpan: 15,
            style: "numbersmall",
            alignment: "center",
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        );

        body.push(newrow);
      }

      var footers = {
        colum1: {
          col_1: {
            border: [false, true, true, false],
            text: "รวมภาระงานสอน",
            style: "headersmall",
            alignment: "left",
            colSpan: 12,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_5: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_8: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_10: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_11: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },

          col_13: {
            text: summary_of_report_workload_sum,
            style: "headersmall",
            alignment: "right",
          },
          col_14: {},
          col_15: {
            text: summary_of_report_proportion_sum,
            style: "headersmall",
            alignment: "right",
          },
        },
        colum2: {
          col_1: {
            border: [false, false, true, false],
            text: "รวมภาระงานสอน(ปัดเศษ) ข้อ 8",
            style: "headersmall",
            alignment: "left",
            colSpan: 12,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_5: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_8: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_10: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_11: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },

          col_13: {
            text: self.export_data.summary_total_calculate,
            style: "headersmall",
            alignment: "right",
          },
          col_14: {},
          col_15: {
            text: self.export_data.summary_total_calculate,
            style: "headersmall",
            alignment: "right",
          },
        },
      };

      for (let item in footers) {
        let footer = footers[item];
        let row = new Array();
        row.push(footer.col_1);
        row.push(footer.col_2);
        row.push(footer.col_3);
        row.push(footer.col_4);
        row.push(footer.col_5);
        row.push(footer.col_6);
        row.push(footer.col_7);
        row.push(footer.col_8);
        row.push(footer.col_9);
        row.push(footer.col_10);
        row.push(footer.col_11);
        row.push(footer.col_12);
        row.push(footer.col_13);
        row.push(footer.col_14);
        row.push(footer.col_15);
        body.push(row);
      }

      axios
        .post(
          this.$store.state.url +
            "/summaryRouters/get_summary_detail_by_summary_id",
          { summary_id: summary_id }
        )
        .then((res) => {
          self.receipt_data = res.data.results;
          console.log(self.receipt_data);
          this.genDate();
          this.getdateThai_summary_data();
        })
        .catch((err) => {
          console.error(err);
        });

      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        THSarabunPsk: {
          normal: "THSarabun.ttf",
          bold: "THSarabun-Bold.ttf",
          italics: "THSarabu-Italic.ttf",
          bolditalics: "THSarabun-Bold-Italic.ttf",
        },
      };
      console.log(body);
      const Receipt = {
        pageSize: "A4",

        info: {
          title: "บ.๑๔",
          author: "666",
          subject: "Receipt",
          keywords: "Receipt",
        },

        content: [
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD+/v74+Pj7+/v39/fz8/Pm5ubu7u7Ozs7v7++bm5vr6+vk5OSurq7h4eHa2trKysq3t7dZWVmnp6cdHR3b29vDw8MqKirU1NR/f3+goKC4uLhvb2+WlpaLi4tjY2M1NTUZGRlERESCgoI5OTlVVVVsbGwSEhJ3d3dXV1dISEgtLS04ODgWFhaAgIAHagshAAAgAElEQVR4nNU9iZqqOLOCgBuCC4qIAioqNNrn/d/uppZAAth6Zs7MP7fmm9PdypJK7ZVKZTD482DSP+Y/8Oj/DvRgZ0UTBZb+Tzf+v5kc07RsJ5zlebleZ9V3ocJDfJTns8C3LVNH6L+Nnlmzp+WMwvxePXaF8SNsHtXXfuVPh//rof8WWPPlbH97g5oOl2Mc+g7d/t8mooAozU5tBE636iudCYhj+HeWJFl1e7QuelR3b/S/Hv0bsJzV/rbRaFMmcbwM/bHr6Jfa7tRfhnG8/9KnIktd638y9h+B2WrqXRTsNrcknIxsneWsYeuDgTkc+2FQKvTcXGLfUp/7PwbTJFVoHfKqGWSWHLbKRcMoChPgzvJ+3xObrsKJajDcQ/Lr2txfekN6+L+Jyo/gzxpmW+ceY2dawzBI0mNWnXvUTrFbH9N85o2kuRiHs2MtwVUS/XfQGy6POzmwuxc5ODJ7HO6z2+kDhbqr1kfPtZExh6PDvSbk18r5+cX/EoyCjIf0OMYLws730mzTxWXD8N3z1VcZRC7cbG6Do5TKS/DC9fkXYTyTfLWWo1mka90OPKtylgSrVRgxLFcC4lleVRqu39UxQCQHvlfKWSvd/xluQK1pLLVDGQJHmXZYfinE25VpfAjn4xePGLuRkNN9pWB5uq8c5Ndlypx/Kn3tnf8C1K9xYx7ExUP1Pl1mDfF2mbecjy2zc1f9Qf2J5S4O2am582uFUzI93JiD9+6LZ/yzYK6YflmAA/KThhbr1BtpuL0YG37sp2XqD5xVcq/V0iWN8GuPRfwa2K8f8ueBXhTxy7MVfjbZS3W6uc8mzaU/WDT+xoIHbRbw68LbS1IWWYDMuuLX3Fb/csDp/jrTZIcwufaqOhsSYb8bJbyiIg56aVyj3AjEn8OFMxiFqZTjKgHmtJdr5ovtv0hF26NRPGNQL/6M2bVYs7VoI9EDDdKhsQtLAzghN4pY/HACaWl2CSgZ83Ah5oj/efNo0qh84pxdDPI3nPFwrsnyvctsdn8doj6ZOW4ufsT0WTRjmd6lQMexRyJwWwz+aTrizHskKznM7zBgfXeZteMes/tbD34CFujwXZ/AiTWVpivG8ZnCg7c5I/wvaByXCHgNxXuskPmzCj9kIGs4HKpxA3KFHZXIB5vcVobvLI6sumYOqDKaymoy+IdRXBIBkXm2PISbZ/dd2qhRexJ4gJfl7UsB6bZz7TxcJRz9KsMP2UddHwYgDoRv8EfxaYOboJt1gzeOZyQclfdDisVZxfFcqEvjW0zCVDrVJ7QNwm2538s0mP/wwgNPIopESOxT/oN5AB9lo4injYKrDuyS9Ro+dAouI39nfAsTvhL3Jh44eiVcfGADv7sv5fVmR2YtNhabxAQdjrc8oz+LVjPyEDn0GQKuRI5HMlQuMds3CNptjpUxs8XMBGANjBweI2IswbOOEKxTnmfw0LBXG3HSLiDByIDwPv6+8azWRX8EwWGAL7qDBHqPRhrrC2sT58zSA/4qpuE+OBgZ/JKIu05rGGUkyCZ0x9A7roFBXYH+kR6xCFuBBL3cTfFt51hw+ijB3/e2oqv+PuBDhkeSczF7IwptbhNIZM+Sial7LSPQeqgP7pCPuBnpQAzxF3xjwVUCwwpJ785yUDopY+jfNyK0iDpvFjAhCbyBNC5R/G8juXjwZ9ATr0dlXQENiFnPniPIeinAlRljukbegbTeicGYNK5sCh9l9dMilkMc6mZVY0hKZRMNhkP99SCBK3QLdzBxW5TM63LwxwDEn3RMBVqMlPZNTP5IjKl4FDWTCcUpZNQkCnviA8FRVbwcbwfR2VjXTMUYToWquon/D0I8U5g48aC18N/igXc/OB33gPAyQPBdVAK78M+hKCiIinMvEHRp/Lkg2+Jk7PLFSLy52KILXSF3Dq848L34ZHwxin1aGYvtN9CGQWB4NJHUmTVdG48r8TQ8uBSTkgwylFqJncTUilGRZmBMUTDPk8EfgxBZHyZ6hLTcgT101sbJH0THwvg6TGEoX8ZFDHYiFOhyIrgN6D0K0FkJB4LHZwqGgoammJncHIzwAvC7kUmvhbEQutboHfySXg7s6QHTfnuDPySMS5y8WDwnRB2KKnAgsLhBkHg5kNhE30/b3RmpZ2x8S2C0hw8Foda+YwKBUhVDQZIbCRMgdkL9LD7+tTsdgITA0qY7b6do5hmNZCCN6cxiBP8ejiH4McWKBlE/FoydeMvXivAzB/NdMUsL4zYzKgeurMRbh2K0QG+QyEzqjyWw58B+GOebsXGXhtRCRxFtRtbAehJNk+vuclCGgUjQCHLxqOjJfPW38QNaCZ4DFYL+PaIKj3SFsFVgPGwvOcAH5P4bG6CQ8GKKCWGIdqNUMBSjLJyBsxPClhqefQKjKZ6CmadqBZ4PKOIQH3Zo5JB+HlCR34fSwUpY2f4NJEHFGSehJmzUMdcmREt2npA/e/ZgxnHCNEEtB6o1ITb9Jbh4sirXBXMtDlJcMh3YO+GlXIwVJDHA0xEq+ju/iV/JOxDIl+7RyNSh4GtHaILAdZhfpHb4W+n/CSC4AeE+1gaRwQH9EnF8yKrblxgKSlzHbBsRTrUuDTebysY5AHYdkuYcfoGBmXoj90QPy8UErI1rN1vqoNm4iIdvr9Is/Q0Kjk48/OEep66d+Vx+C4sBWYyKhNNeM4bAwzE5n7AMlaVN0tPaLlD3BlmVjwajAp8PTIkxgzAEFQSbEzTxec+YpshMa3H1Atin+FumH2dpc5A+2y9tkRaM97dxWdBoOGyLgVwwVJA8cfk8iFfLhdOb3xgCos7+fHVIiH2eohyfDZHoDufFvh/0G1MpLwuQxeIvm34TLDZK+8BGBMkMm43HC7onYbwoHwjei7EBoyyk7ea+yFtoH1hjJJkg5TPxbcEU38TPkw3qVBMRCvT7kMMvwmhtgYrf27/KpqRbVpKCCsfwA+0buSeD8RVtHPy6pzkRLojnKHj9lBJGOKANXwvCZRSgXKSDvhWo5i0mWCGKgsITMGWXbtLgM0jZvA6zmoLkYNeaK5GuSlhIZePRPZLQ75WcvGIRZ7XSMpEtSMKAbx9amCZfY1xHbFUu07+EoCeVcVxr5YZBnRSjtTTEgGgwFsbsitka52l8h4Sbkmzqo2EddJn8qzOBhZAZXgrsl9TDCLq3kSq22bs59maK3gBODgTjcSODtexAArNq1OMYrS+R05uNtWtfgdn312hFDGcJuSBL4Qrf5d4W5xrFuxTK2eC3ACbVATtxGaGTpZhrhCmaDqOq2T8wLrOLcftzWb6okJMqfAYD8xdBHK80aUQh2g/5l2jwm2YR06I7gUIE2mqtpUMdcENg5oThptzRTOiZvA9DjT/70zm9kioYaONKVFFSMLzJRnQnO1VMPAhTjNPvxlIpuwsuIjjVpof0C8jHnoUoFIF+0ccpSoKpBxNTy66p94D+hNVfSBNc+Kch1ObNqQV3QCGlseSYbj38LSIeWI26MD3C7qrDm5CrbKYN+8Pvm/TV839474uFmymE18bV26bSIYSBBEnLbKADt4uI0sbL9/eBv6NJAYEnr1SBGc2XcDUULbcMflz8Mof2Mg6SPCWIg3jrDF9dvsyudx+TCRAelzS945uITmb12g0BajhQFh67Jp8CepdwY8AmXxt7KOcVprDQHttnFkzHD+7ry1WuMDLsTpf1PRn1oDkSkZdxjjjjVY2YgaYXgWxmFKnqOi7OrPBhPh6LzrM6wK9L2PBG6Ix2LtobHhkyENLzqwQ0eSbL4NhTdtLA9Z5MbO3lQnnnYsBCvcx/7c63JucvHLvltmYbvhppID4ZoVV8jyHJBQYUJTKGkG2V8eezPLAH81AOJhSjv74seZkeZtkPyNWQzULVYIfGPbxjJmswimwFm0zwqVfIQI0/BZcdslwBUeUjWRyCfIHSQlWlUh5Djcxq3on+4apnkqDOrbz24lP0lUld9mG96IYqTDz1kEX1I5FTS/h0EtjNpzBaEEUIRSHLefqswMhjHkV96qmSNTMuyY79Rv44lWkbDaxRUOkobK63Y5kEk2XhjQ5Berxf2sx7gxoTnJ4DspB/aiRgmmT7Bag/1DPW1FFEfgscJ/SoDYHQ8d0yNMyUC68WPowPP/NmshAdSNB/edLPhbf0Sfdir9LpVqZB6FpUnzc/H+hF1igMZseLiuMzRaEDBVYNgTYFY2iCD3V+cFw2Kq9VzCtC8MjlmRgJ3cxP9CkwduVSEUilx/SJ8UiA9W4TiWAfLNKGPJcyPWjTesCsQw32Ib0rxDxhacLh29hBJry+dGtsZrkcv4VZDNW7AMW4m5KXIiKqH0WRWQT8BJyRlp6knAbMp/fyflvBLw1H+pfA6HtLnxtrG86UUqpcDHVBGfw6wzoRLhyk/DCxFhrXKDWebuODw/qAUVqUMtE96B6AoBZz0XCXklunH26whgpD8VWsM7z0TcyDnASjyHvWaoUL8eiJ5Uazhl0vS2tgAVt+1a9wK+N0wuGgh3h1Vsa3Kh2YLgs4SPh5+dRE0hUL4tUvRYdbXpqCb5MIFwdz4Lnbww7Rvh7ooyMRGFaekEG64KQNr+6dgZWgNyYBGerIk7g2vq60aFA/F/ToxQF7Ioj5874GWK6EuUJbr2R4aEEpHQ72YCgxASQMpeJXAwyTRsFsuq4+XATWpey+Fr66NyhehRCEKi3MZVoGTHsb0CgOtQ3Bz3jYi91bZQOTUTnkcqojEcHDXUz/3poZa4v84FJx0fCnr4wRrGafxJetqVFAIaJ4kT9oaTK5QuGDjF4j00/rigWTZu7s0/jXP1mM6YbmANTNVdWje+ERAausS0prDvOsnTdYaY4n5vC7PirMNXggPShqGPatDuI9MWSe8jnog0YTDWjqMjGuh857HYApuFqkZjR1mRjXutgZFXUn2gu0AZLn04EIZyHu+6qFoXHuq5sZ08JhiXpJSwUvDKINpFw6eesGtszG6OuxwBImU0DvRlUCmXYPfW8f9fFxqNqPRVehiyute+sJoNGbFyAcnur3ycBWlEpCbOfURQRdoAwepK+2zKvqG6bpTWj/FUxBO8csLpiu28MT7kgbQfE3bVnY9flBUdddzcb6M3z5xW6NS+vRNWssD4aKK+Kl66uaIpcvmvVyGX4QgUtz0h5gciaAELveKrL4aQ8No3r2O7gzedd5nv+qt27A2oTyFAcV+uaWTheQI1pCprj5OiDyTE+viYiYCUW3gCEqdFpmyh8YUSkibkq0Ae5eNLWsRQwPKCZdWU3kdV2ThUb7yiZmIjcAaOklc+BcjRxyCe5TaKK00FGxYRQxs2t/ISHk0YE5YTarQaNMRFx9b6IS964UHSBEPJxMhrLk+WWdFwylqH13s/DwFaZLyDvyeTfCTn/Vlv4UQn8BftMVLsjYzqUYo389CqzBzRzMDSpzaEJuoEhOsgM2MGi9lRA8qQV84Np0V7229e6Kjlsbfbc/pcIgdTbrrJXHT2ltxbBYyICI6z4ETU4sAT/flQe6FKh/J5hz7WQ/qRCltTgyrdqiLB0aA/eUZnpCx8QpuepKfkIR5rNjPSeMe6z5GyZhfhsPRr3TOyASbsYD/0lEVhKcFpU9fpc9EfSCZHCtlFDWyGjBv0mryEWIdmWij3rZuXwgF3shua8JtE1TuoaF99n9qDAUriDFJGY9riFOY0o0PlqEYG0unBj1227WxnHIFcNajajJfqySKYdlGix5ONmoNHONMOhqli29ZFJUhFVj6sW/8MMjPBvYbbdthnkg8feFY/PoVq1iSB9RhlzLU/AgqLb87OlWhHR8j4FD86YbTlotolsqzecD3DdbOc4GliRvuocAc1eIGACsFLwEUuJ8GyxjQrHRsYcjCP87TXSlLG1asdQgbLA0DEnmd5O2qPDlVw0PZLqU79EqZTJDdzJrCMgN0EY7emCOgbzUUtiMUs0aUZmnQQtvGlilUVuTpEEQFmgqoJusuWgMlEmrC0afn2ly4K2adiqQWVJmUytBgG9O08GgpX3gH65X1PRGqOhQE5Bqvh2fkBkwA9P2v8HdqCxU6E+3fpXQr8gIwUr8yBLP0xQ6Fbm1kzkSgMWaFQ+T196HrCmKJlPoXHvGw7CieT1pdkHjF2enuk+gTGZEp5ZbgkKbN6aCPw2Nc8iOyCPsMCIb8LYPxoD2XX5nUnoEB7PXCE+oZy8Cc4ezG+1Vl6acVcRL64YhYVpFsA8xzFPniuEFayjRaCqekmdspmxfd4e2pyoN7ysnUAiM8T2ReFB0BaSi3+phQYnQ6+SKjFk8bbgNjPeazoaiOEAgM9qxPlhJERiC9/4YNgmC7QMsdEku1FpPTNSJt/5wTzxjVhPHJDk3DFCYPkmvDD5aHNUC6dPvRn34bbEYTlUqMTEOzKI0iWT1PGLSmN9WW5iwKs65FRjFw6jrnhjqiLWfhiZnT1gPYoRq3G2JU7PFaUdrzf2wlC9pBTs4wMkMldZJZQAf+HM8mO9aIRBkF8AdvlGiTQFrsgBkdv7szPqOIazfXb7Mi8A1OzK9e0VkKVxmL2H9A5/T+qXKp8pXhyPid0kaezhg6fdoFpmzaTbOSGtIE3bsyABJW0aVksDkAliG13mRvcTKIrV7GJgTqEfb1ESEqKnq37E40DMba3VTlL2i9++Cdmkfq0zP0KwefpxQgNinGdksqLO4Ut6Nq6Q9UmIOtmd2eIjiIvi0bxebHCfU2Ziif1V6Z+mpm7g1YNh/3DVUoLg2C9QSireDiZkDKa5egoyOZ10djLWlpU0/Fc3GCc5rJj3CRJGdWdJUv+TyVm5KDWt9QfrbrDfOvSEtMKtHYQngCOkLYVTBl7y0mFRO2uKgadJYf3mT1VFvNdmeLQdzXJhA19OD8miZkQKDQoLaZQHeBmicM5nxV5S2ucoPnUQV/QUSuKdXrOqNPICaiH3RneuMs+/9DpNwXZYkD+ekiyD+T88k7XmDjwMoUiNTupmz0CjRbQ0jevAzntvukn7fbFuP752Z0Q59QFYtDGQrsI67rdaaV6vPIincecK1sHizZ9oRCXI7QNnsiQrwbHBtvIFLE5SdDV1BN0C5nzPntaeEYtpxXHsA+XNBP2QIBUHeJsIs1eOjvX20hCeXlHlzWdVv1LZ1U5AbqMwYnVUsKSPoXaezaAXkUkvGHKfx+VEHiT1NZmlIHWZiWCWEY9HHpL1ATNbEND6arZPXVRmmoi9A40L25T6QO4cMQ/UpG4kY09fq1riJ8spX1GMIUcRR3UrJhbjiXvs1b+4HQITusmgSEta8SUAOSU07zDlRDf4beDlI+trYqCSUN9EWnapZaIb/qRTxXUcwuHL8jXoXHNEvJXe1p8n+qGQay3QKyUH0kC1qvqrPtJGa+Yav6nnlHAwXcmsDdGj3bTnWPuVYNFRe+QogGhMmenpGbxYBDP0EvZTNR1uy0dyqhUT4xhWSsafZCl6OyS+oMHrQuhk7EbiJT3vQ5KoQUMUG/b7jOw6T6fME9zcwi2ASwUWX/0WuWAdK7NbUrs0SrR/eOoFQTmpwQFMpU0QcYXg6QUzaCrYfDzo6HNPMxvRdXbUpBREDffLQ3B1uWw2M14GoBuhVVo2Sr1Hk4bX2dlN4AK4b+dEJzyKHidqcUqp7066kI0DGjnpMZxvDLamzlZxY/G09RHF5X0vMTkNvPlLu0M+argAmo0WeGfluXyx7aa1hGSxqDvHrRWET3t23xaQN4FJep+jHZPgBrqlZyOdvFY0pw4RX5SY4yCJttrDTehM9OKK0PpgVk0qNsQSS4+2Idr9204AM6Cme3ppEk5K4S0SUIs8UBwyK5vnT5n9GkGLZU9+VSDbaeL2LZfUbknDNjDtjG7HHv0dPhSpuiUa+6xrV0GzGfDNCJNYK9QXtTiHiwfxW7gf7IxCD7IfnUy+CkkrLyVJL7rdkSELy4TVUCfGb0091FDby8Iu8lwYgRzF5NfjADAMqMHKZ1ecDtxAgovz0Aht37BagEGlnVyNsdVaC0upys9EC1XCRdDpjaI99vFYA+hBhf0sw4PBCfHbDWDE0tF0jL4GC++yHd5hy//w1sEGLbby41q6uxJB4Ezl+E1Bbr+ebTWhbLHM4feA5z09YOLQiUmIeQYQZB6N/ZboNtGsOAnWJkYae/IUMB9aSKkUL1i+J4Z3sS+2fGoX0FaScdJ7LidtPqg/XqCkgawpMHW2wUhrM0yeNUThLqlxq9uK6rQvA9vV386begplNqh5jvZRPMlU5UR4pl5o/EURgoQnaRUjIL+l98Sd7FcXbObo/91+rIilrQ0L5xepUIyhDPcYQ1pJev9SyRtGqLnncf9De9BdiiDHTmLyhhAK3Tza5yWBok+XJKnJdq5evyXCgi3mUfyeGAsxrjOGxuUmBoesuPC8vb9VO6T64/sCzJPMAW6bADSYMwdn/UUHKMeiFPZtNnibearlcjrpUwF0bteeppXbkXi2er7OapB1a2+Xy4M3SctdX5v9iIUgDeGxMa0AhCVaKyaivDxSNv+t5KcB1fd+X6Wy2mtfd9lCNXJip1PSjcR/Rq9CJf35zfba7CGbp/rjOXr2D4ANOY6VCvg3O7QozIV/aVWavafTb7Y078Ditj/d85i3zQqHWWC3cr8kATmsKWxqM2/F4P/2MmYTe/i468OoEr8/MMEkzunaMXO/NanFWsXtsxD8/j4cTCZoQ1opYYJhyBhwf+NghXC8VQnYnWIal0n/5hUusAhh3EUoyDWdYPgPeVbeiznGclngd6hdd83DkRrPQjxOGvGygTvpzoJCrGDYhzF4EpiZde5sl4XiE4AwtBHWOJ3WdtIah681mXiddZ28Qw6+ahoxhe//PMrteLpXu6spFQyN+4+RjoLArejGkSicQgsWK9yy9dcfktk4dQ0rpnNqG3CEM4aXJDzScbFo8pWKoBak9Xgg2AzAmR9pzYyrLZIii1gKRw/1g8Eqs6NPhus0B3HWl3iqvYViacnnmFYYYukIFk1Zbxhj25uTM5kMsoxZkmT94tWPY2gGVqQ8lq7hTqpp7gQsjGqcG8rbnO7Q9bQXGHQy/+zCET8oF7tBRXkkYvnV/ccyQjttO+ObRRUexKJuFEHINjOxddBvL2WWAeCpB63fRb2UMmyU1oUu7GAp9tBtigKMuv3qtaewCYLTE2VY3IVlOu4rYKPJ6WIHRGnv/g8kYN1c5hazEu+hT/jGG4nOoJ+3QcPMmFwBlLVI4cAVqElR9O9Y2nsSR0Y+bDHAf0GrCr/rr4RVW9sJLZ12XNU2DYS+XQpC1S2k1roXhmx1iJnl2cr2x7gDaAxfeqzk/EcpvEkVli9J1+XwrpOrTNMsOhvVKvfYxNVr42bkj6/5kdRl1asA1ONL+4ZBoDFUEPzwcDcZeuYAdibx1T5+mAT3VsocmVjMbpTNoc2n7gTqwU8CUD7ve8wn8lfrjHcVh7JhfXu6RhHeWKm9grvKQVZd1p7toHw2hY04nthjt92WL/u8xZNKTemotxcNZJPuFDf6KM9mvCcsdzoU0J9UrGQeB3itTxwDP6lzLPk1mKJoGYovbD+OWgBXnLzA0FQRZMlqr4adYm+2IW4AjVSJ2cKEKpe/5pgzdPvBL0dKZspJlhTdB+vR9fMixRWa/FBbpt66xAFT3ZIzufj2HBAk9Qzkb3FGk/QZT2s0PMIRHzeroiVJQED1dPoie8SXFS2tRo0RVNLqS4bV+Z3EIBCzp4JzJyeB6dUcGZlW7ElMCMtAnK4BKfBgSDbmW5pPVQxT2VymrUFo92rWy0hHka2q0bzFYzDGMA+1PnZaiCtkuiuSiL97H6bROiYlP7rJFdZcftFqkqnrj0d8auQ48qKWSrW1X59UqT/1sAwvZ6MPCq+eN2u1NGZKI794tPQzkQgUUD8Hyg5JN7KuKacNMpYcOSoSE3+skJPFpb2+qItrtAwGDpWRPZ92BcJqgryytDXquLaKMcJ3zfgM87O4CiduMj5fAtbheTKZcn9UAUpj2kWrb1B1+WW0Y2Y8bMXe/cTfwW+CKCGkHHdWg+qeirP67IBRuj9iIMYp1sW6oxg4bnGct6s3wKrvr4ECcMrwZoHZC7XNaSq2XgE/8+Yty1nqAcMMaow0Y6owRhkakRVPu+iNIJzNXc16uRi/j4dTrLjqGCiPWABy9RTe9lcirfRXL95rw8oM1TugzJ4gHVgIx/IW3QenZ+h2L1wuCAOc0GuG5QNbIO2lDY1dWw3BH/med5ynO6jeDxbyLIZzksYyiQ6AeA3bt20PeAgj9Y6XGlBQPGI+XOxNVUKlV3NLAm+07kdEaF3n32mfcpJJNQjXxa7aubY+qhjYvmr686ygA6AeEEVdckgMglGlTJfUzUD3zpn3q3+Ok/EFVKzP9AlYdh+xxvuaOonRqxaxYkmoReWlWPTaI7OlW7oMDegQ/iiEDoBbSXiPECMz0bSj3m7wFXMfdhL4YwfFSfRtFVZWpt/TnqqVDYalr3XnQbMhsfwFp8UX9bSJlX2EParc39rer4LDY+thDEnn4A4uGW4pDDCZoWqEL7AMb42pdFF7CrJ53y7bdaDS02blXBkgs2TINu5XfNII4NJvbZfJs3KjjvnwG+q23t/UwJi4873wsE8gIZaDmGHXr6a1nanIRXZ9ScpsR0s4tp5V9MnYlLOMcVkGqfiO1YzNDj75xaP7iT3SEWDcbqPYvxrdAQebmg3UdiuSK7oEoWlKUMi6LF+pCgxunrKPmo1UPCmQsZdxh/oAkrTXh+jIXs3PxEPDUB92y2PXIHWWlVtr9hgrPUXPpG2B0lIwq8rgVep4XLuRJZlTEuvuAyfBBMzq/htr9INtlJpqqT0qOuDPCI489gCBOcgG47UFRn5ytmrQZtQOyQVdjWy7jl5PjNUGH+UpnOE/sGQCZDBkhQCkOV9Cu31pTgB7HhLqmaYSgR7m9Fzew5oRikw2gvXi9DK5WejvZi+IhaO5xsahqVqIzw10RUBwX4EUAABTVSURBVJfZ2gbHswX/qMkQ9h+v+loiip7b0Yfmob/nF0IRU57LVtQuWRp4zgVXsS6XquStV/WSBWTnZDveNpAYIjvVvgSMOCGfsUkR1Mst8IufqN3eLDpIYDiNFunxmE4WFNXi0PwGn5RnxUkuPSceAknWXONnK4TGUeHicDUyLcuyHcexTOwYUSgBLCRlq97mG3Bre/MIEHTNfRd67jFX+UbfD4XGnTQxn0KKO/DxgYuGikfJVNYyXbddu2uW+nJNQ4k4cnT4wCspVBLhFGg99SD9sR90FTrYhPNoMH4aSiMiMJFP2lFyahxb/jmOW32pBEyfNc0koJuNEjRqqKg2PYgCOLXzcXo8Llm2j5sToqxAYWPaZC97i9ZABwXokT80FOpJp4BlEDoBq9bNeksJPHGCE1XovG2N6QzATaHWzLLOvKn7cTEvf8Wi5sYfa+rt8UXOFFZ4566tWJp6b0zDohSAIH0mqK5XZIXU7UMgPGFrk8mgLhZJal6VmkTZ2aUW0doHfns+POg+r4P78zf5jEYAaCxB1mgvoLrOdI77bSzj6CequgpqKlA1g5bU6W40FZR9tp/OJSZ2pVML6qNuDu3OU2wqehm79TepoZ3sc2eqcZ5RDwc56UxFh4EaB6WTVwcYR4kaET6RCy1sWoLLZXMtXjxaykO2h9ALEmEXnrOJ1gAOjPvaoY1O6noEKR70UBXEoYr37g/xxIqlUr416KzpYnYAlygKIrVm6Yt1EnZS7+a41fjzjrEH6iw60QbfsatO9LXSndSUfUHo6ZWqELiYu7PREMXTlL2B5XPgY+gjClIfyuCTv2YftNhQqIpVv0TYlLzuVLcQlySMfMciwbfni9VdD+i/6cxKFxkcN2egQr2PHKqW1sZLpxCdH1W2hreoXWooCzxkMWxQ4Z3O0A1gp8y2ULKCfMChUD6SNII7kD5o4kynuAUE7TuVRrCbErWW7g1oEpnPZmmadnpCGSVRiOqLaUcDTDdsHCbdrJ0DIVgxS+OtPTTNSf51VXZBc2sMqEXNtEoKbF6wpB8qzQPEi3e96KlYu94IStn2FBYzIhzhlZ3pw1cHk37IaLrZs8GuFXW8yuk5rc3El/FQoiC3kTZcR1iRk1tbG/oa2HTP3TGUZ4kIb7MU8rW5FuuIzuyogXhyJkdDY+DsCzf7dQ5vHW8DTnIjB5k2iJEMopaBHnNNeUKDx0pfRFQA9jwV7sACsrey/1DTIuYOOAL7ocgv2QX1LMcahBe9PpO8f5wqPNQOJWVIDpg8/M3yy6qNkQpFtV9Q2O6y701iDPU46CORwdAS3f6DzifrIkgbSElJVG3dxjoIN+aqd6Jqu0+hD6yh8vZAyjttzgIeKKhXHQeJpeR2WKftj4SLqpSdGobyVE7iLewDDQ/AXWStLfTJ64QS957RPWwGQPtriClL3JpUa9Rwf4RDwpbAb1mTjIPvseEDV3ogBWgfxYQVSdMjzN4G6fHrqhjJy7pMV5G0vVOP88xcSATcgc1qF6RwNecMSlmKrL2KhOMF+hyH6F8VHUcD0kBnRj/QbjSHsN4NM5m2g04yGei9mciz2GFtMEw2EsdGcofO2F9OJlEyi8S/46Yk0HQl/Vh8h7LbtgxUtKUKaiEi7O5o0N4dgnVhh0Fv2tAkNhVEBP1RtYv9sPlU1uN+kbahwmTcEMR1B77MEl/iSdeVUcE+yCPGjTvRBQ/j/QYKcrD5paUuhC3Pcf/JLlAPQQHAzehT2ofdk/oFji98Wjht7fCCJfaN5Gv96D5afbnX2sHYcDfqsLaG93j5KuHghnGzXsr2AGvycaJcolarhfUFdm1RQ9eq5SnBhynxavUqW5cSWXQ9BBnWGxPQTlsnQZCGz0kAUS65PM3yap+6uKTLrWurDx3afjTLTrVcPrha0cIDlPEoVjqUq+n1iuk1ezHDQxD5mDmtdgk2NokgGTv69KoiyNM8XEzkCElUfLcRtgtBCK/tNTgOzyv0K5xfuB+IDlsf2OFdaVZZbCrhzQSH1cpL0/yqatdiLU/doXNVczwri9A/abtJzdQ4cjPF4aHSC7fNL+I+MHBVL9dguWVJRH6qiVMh2xn+MgI2KJr2LnQbaU62UBSqVrIh0TSt3hZvX/dLvpr3vaE8yL5zesg0NqCVskQpearJKCw2nZOYvVjdwM5OLu1C1vzclJsDwUvv0WChv1XaeLINW27X4/GoLX9V3vrK9hB2WVKr23mKVKPFX84lntSmguCIoDqrdfpUmWnshpOSZd68quNkSwHXXNX4fQJtokI8cEJEANtTpT+A27MWMxRGi9aIjGwidZI13SbZtbVYVXxfqywYSaE2R9zUGx8y5NTbo1s7gV2a18oyoOp9iZjX5h5j/RociPhgdarlhmXNAcgAHDzzpZgTUxowOMyRZjYnDstWjZNnCXO4TZIkLfNjLn4G86k9bNZpVpwPpqNkZbFfq8jNWc3ipTmE/UHngMKwBg9s1RgToo/Xh3hhEwu2cpr1i8F5qkBAKEDKWhaTmerJ3ug8JYJt0vYJvz3ghDH752wwPKZ2NpZTiEAZOXHJBPTXsVXiNyPGw0gkfkVC6mNbjCmI0lzQwSL+haeNAjW/7mgBtcURWSuUcbO3qD6De790X5ejWuOJRE8IAoXOMnda1mYJX0ObNXERcoQl6Ep0ZA7G3K8ViNNOT2lAB7rS2ma7MdOA5SOxraTlFIghzGWXBNz9YA6sUSqThN+X1IsWrq1NmeNso0N8k4mATUbpxaHMkHPM37wCjjKdB44ZHbZUGBqrrwfP4zakHrs/Fr7h0Xd0SLhuMSjvi9Pr0ny2lcBYJthuIauYYaKaius9X61W4WSyPAibmGRq3cnuzjKxkA+5tB8/IdWw4O6Hk50WIU64ESXy6s+LqIHCzu0tpdAOvThjm5ZQ7gJVXxNKolVyFk0/uL82FfLq9MDZg+goSZp2nK4EpnbIa1uCHV3VpsM+PPDPsYLzTTkKBkTymAH9WgiSixBOiR1DYexdF2b4a1QvP2R1Sns4jcoXyxbAnFWylDljv5QL3w81q8cgorPZBOa9ygrQFe0vsbUOCtm7HZhoDH3yYrVD+SCp+qDdfJdu0z6GqC5aPyW1sTaHjhvn93tVM+2mqi7re56M6sMt7bDOIj/iPjbj3Oljhb389HMz8JSSA7fRfXPUjEnG8EjnNChbeAEmFD+RNX7VVEE2qob9FJ5en2MO/APCKjL1yG7R1DwVmd7PVlxohWl6oLIv/HLPNJSPwAqHkhuQfVCbB0cqQbqqc5COyf+U4EqSInBC1S7SlaOy4clT6fnvmMZyw6xxw9d6OImGALFPB6M4xbfO2migtzwifXr5pNESXAiJDJDqTb3LTL4RRHBHy2LDSYXVk50hp8paxPc1X0XuiwDRHi2TrCk7KdaT7oXQyaZu2evf4j0WGsrhDBpSYNeNpulIP+B3mIEtB7TUf3VanZhpiy0AaXatMEReOd3ry8One3wIJwtYeRoI0bPn4pdoEs4yNYbaZH1ruuDBlZM9H3xOC2EL9XVz+GzPjV6PP+MnAQtmAk4DNf4p3go6Fl37EThmm7NWHK48fOSVnfza5vk8ne7VOr2dTs+nbkQ262TReYj4wztT4+41YogJjqPW4RsPA4DaBmS9RecJ/YCdD7YN/RUERMALCxsm7q3fiyBOzR/rBnKbfJIORtglCyombR+TKA8hdS/GDnL9zhIOJ1cB0yjytKdXfVw7gOmsL4fPGl9qd1lgjLEJXhXCAOh0wvqt2uMtN153zuZqw2WdzjXpa1TbwYekUmnTsb+qfa594pgRG4EQvq0AbgCbbOSc7Kpo4Vv+PzAnVM0+hdU4rDPzr+pSrwbmcJJ+vcLyfLrdV5bZcyf8Nc4F98FG1j2sQ389m569DeAKJ2zPAUf/k6Yg9eNXPGVY88w1bPUYQNmcwXkYsdIRpL4ezIE2TCV2s9ztIUir62aDS3Fn+HGp9sFqUROvy1kWlFUXE15WKGJrVNc4Nfdgx7ATn6DzUe1oA9jKP2IVLDNaLCP2r4cHKZXbkbQzDYLaDLdcVeWPqYv7tLcRKNLReNrtmqv+vsjA+G8tbi0PzxY6JdOphCwGuTh5pNXHYEoVNeXYNlW+gX9h6nEhG8gLVuVWGa1z9j4S+PrKVgPKER7DEcLWU2QZqpJz6/3RdDGtQ4dgJY12PPsBYM01iO5Moth+Ahx+Dp97eNSdd2030Gsh0fzsEzz1zzFks3axmN7lPR/iWvulR8QoPRRw/dTtzZFyPYDLWnDa7p1/wXGoT0nR5Zk/qBItBiKOvE+8pj5oHuw91x725B9Cr+cFdSTNxu2LLVT0icltfP7K4eMBK+Ihqs5cPboSYXLG3W45dzMP4OK93P3bHfgbvGpwhBcBnlMCWe1NAgIBVXz71i0OTnwyYIvovX9XFyzZPRBLNGTSQJlrNChU91qGwvXfbEUI2XZ9f3xt17hgw6tqzCXieL7N0BysCpl4kncMMyk86rHhvwt0hlvIrl/RjpesAJqiiWtK9l1yUAqolLw06pD8LZLjFFfRrBtYYDwADi38BH5oEYopa1JuNgtT9tcQ5EouKAikA506vYJ97EWY2WPMhu9t4T2i1rOrV4ervQI7nMGKWUoYCr0CMwdTOvp17onaqTkl1HyQwXb1xN9vAHpLsCJBBwKlVuc5azKJTpCEWGiWccrxRtsnF+/cDKEo3GgBHnDAzU0hlUlnaH45Jlb0Jwo/oKqjhCPUh2Od7WbUr54/Auz+AannOfL9UWq0+lmLskkr4tLOZTYBZkXBOIjo8O02peFR6GLnJOYGzsU7oN8PulnwYQakypbtoaP5w06pGPf/9qnqDcBzMSN1WcjWnHUNhKlexX9wsf0m29ECJbZWyPQrHQfrR91JZFnJDVfKjhAbZIDcCnd58qkj1CZx43WSNoQgTOyiIH/nL/Fn7WZgsRp4TTYK92mhuZwajpAnjo7X2gkqwX3VK8eX37SXUjzLh2MMwCfC9LKH90CHC3fLHqYHhxM1VcDSWaAN/sAjWNx28gfdEX2MI96G8TCsOlM++KmznfLk6QaLcsF8FtwNOS9by8k+I5/Azglg/D0qixxOIQbNmMNBToyhk2l78zl0XG0kBVGL7n5Po7UxpLlZ4bruQT6z9xBnAJkhisg8C7fvZu6Nk8ZlI5ZQxFBWAsMCLJzNAtMiPntI+z1uvcisFzVWcjCbT4P6H9Hk9WaYtgNV5o26TouJi8xI3z2qV6D4Eo6e1dypuYphACmmIhDcvMM/YNzkQCWtp0uIqAcobPVGd/m05Hf/HfTg/+1T2gpq4XzqRGJw4WSdMhJQHhLLtuFaUDNXuVSYiESomSjh/qnkmKWNF9waucUVYL5UCrdPNjF9BlS5c3R5YcsoUn2JVP1tjyQAt2sdHGat1PGci20Rqe3OSOwvoyrBDk5vSG5TaKFT3tqQTqqM1wwgD4YZqfc9iX4HCLEveCQV2FXbmsKtXpUVFFwpp4oqHIdHD2IRXlILIG3Cz02eGbiu30vAUjcq66ECSKjXft8y92Ow0YO/AnuSMBSB0wxcm4yStuDeYPHeaKUjR0xDkrojaAp0Ku42fJS9VhoulSahCvBIndo9L/87YNJyBaxbcgnNmvLheq6C/oe9/qDGh6sdDLv5Tjjz2NYlRAxTpCQeSjYSX52CV+M1QyrMgf7LfL513fvsD6EIj6HldVx75rY6ubZjvnYOxX9+yGYz0zumgMsMCj6XZ7DI+EfMx9QZaI9rYEFTiqaYtmfwEvefIyABlUhgxsnneuVDd51Bf+tePQXdRGyuq7AsoHAHugpDRZzppep6RXvYLjdnxdM8VlRmvR38WQrW7yZhwIax1OHfuPBa0SuRH8701QhHLqOBBzH82vU3n1Ue5h4IP3Th+eCL/JPtyn8NzBXVmoDCcWKe2nrB9n1Pf/G/k1anU3Xk1bkftoTiw4ZEM2ODLSQOqOOuwZ9mTg1YkWLLdZ87O5fbl2mZliXBP+zR6EMamLKEE3MYTqNO/1GYklRghsGcUEFFwUcB/17Wwqw9335wZZ+323II1ESxKGb2n1cw7eHxhp8Ew5aAczRZ2Lty0TElPRf0091f8RLkFQtruHb8+tej3d8B8o65Racd8Eguwe95iaZZm88uRLI0eoMvkU3R0v6jk/48WEs+5hirkP0Zj+a5Z2ZViNXYyDaYOn7N8bym68m14WsMjGKtaO/N5c25CH8UhnTYhvBrACf7IDca7OLFSEFGCc9fyQ6Tsv56PpFlJ0WFhW4O9/bZxP+cjegFn1o9G3fcEzIMsxMP7LQPVRtv9sqacoEC1nJVFzk8jlg8Zq9YndLpXf+onegMSu5N4/onN6m3856z1aTeCPs60afFJaa7VHpkXuggCNfjnRjZ8sUz/hGQm4cH9oKNxZXWY8aTvF65/35ksuecxKbzHPmLNfXD5KuuIS5O6QL3qCzkDtMstH/mhH8GEM9oTdUw38kCpcRaHE9KEdspDcPIn7+MVEejRRQeSqWif3M9+ujIuaEskluHr9ngXwBzwrxarLlYT3Cbtve+EE5amobL0B8pEIVhnOfXp7bCv7mlvBXKl3ZW4Df4X+IHYE+4zKu45iGlH5woLK+t6oSi2J0U2BStokyBXcglJ74nO+ufs/BfVqA9YEIlQr0lu0jZWljO2I+rx+ZdcSmgsXlU+WRKqAxHUV3C+cjdT07Y+nfAjetC2VMuFCl9ajn+Mr5n1XXTt61kt9ldqvtxNvFlDaaz9Or9z7ss+CHw+J9AlDbNHy6C44a15AydrR8GQTAL8htBKf4K/a2vbIUaT1bHpobqOsMFkh89838NGi3uTsp6jMXmmgWHhaMfYWJOCbRk9tBdHOL7oylRvKaRVnz4vwclILLmuVYA9cjycBJtR/OeoTrzkS9UarI+KzfsLnv/vyN8/WBHQabrUUHPU5mkwVLCRHBsmn6d2juFdmtvobaG+O+CtZjEPbubixp61M4lCSfb/zr1BmoUYTuuH5TP3csyfYn2eXdNVyPXUR/wX6dhcyaVORwvVof9fX25XHZYuPddFPhzc71cbvdjcFhuW4to/3XsEMxOKtOxHX+xFf9Fk8kCQW/D8/8DrwY0Nns3drP180/D/wHsQIHB+P9ZFgAAAABJRU5ErkJggg==,",
                   width: 65,
	                height: 65,
                   margin: [218, 5, 0, 5],
                    style: "images",
                    
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 1 ( " +
                      self.receipt_data[0].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[0].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[0].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 1
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
               image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD+/v74+Pj7+/v39/fz8/Pm5ubu7u7Ozs7v7++bm5vr6+vk5OSurq7h4eHa2trKysq3t7dZWVmnp6cdHR3b29vDw8MqKirU1NR/f3+goKC4uLhvb2+WlpaLi4tjY2M1NTUZGRlERESCgoI5OTlVVVVsbGwSEhJ3d3dXV1dISEgtLS04ODgWFhaAgIAHagshAAAgAElEQVR4nNU9iZqqOLOCgBuCC4qIAioqNNrn/d/uppZAAth6Zs7MP7fmm9PdypJK7ZVKZTD482DSP+Y/8Oj/DvRgZ0UTBZb+Tzf+v5kc07RsJ5zlebleZ9V3ocJDfJTns8C3LVNH6L+Nnlmzp+WMwvxePXaF8SNsHtXXfuVPh//rof8WWPPlbH97g5oOl2Mc+g7d/t8mooAozU5tBE636iudCYhj+HeWJFl1e7QuelR3b/S/Hv0bsJzV/rbRaFMmcbwM/bHr6Jfa7tRfhnG8/9KnIktd638y9h+B2WrqXRTsNrcknIxsneWsYeuDgTkc+2FQKvTcXGLfUp/7PwbTJFVoHfKqGWSWHLbKRcMoChPgzvJ+3xObrsKJajDcQ/Lr2txfekN6+L+Jyo/gzxpmW+ceY2dawzBI0mNWnXvUTrFbH9N85o2kuRiHs2MtwVUS/XfQGy6POzmwuxc5ODJ7HO6z2+kDhbqr1kfPtZExh6PDvSbk18r5+cX/EoyCjIf0OMYLws730mzTxWXD8N3z1VcZRC7cbG6Do5TKS/DC9fkXYTyTfLWWo1mka90OPKtylgSrVRgxLFcC4lleVRqu39UxQCQHvlfKWSvd/xluQK1pLLVDGQJHmXZYfinE25VpfAjn4xePGLuRkNN9pWB5uq8c5Ndlypx/Kn3tnf8C1K9xYx7ExUP1Pl1mDfF2mbecjy2zc1f9Qf2J5S4O2am582uFUzI93JiD9+6LZ/yzYK6YflmAA/KThhbr1BtpuL0YG37sp2XqD5xVcq/V0iWN8GuPRfwa2K8f8ueBXhTxy7MVfjbZS3W6uc8mzaU/WDT+xoIHbRbw68LbS1IWWYDMuuLX3Fb/csDp/jrTZIcwufaqOhsSYb8bJbyiIg56aVyj3AjEn8OFMxiFqZTjKgHmtJdr5ovtv0hF26NRPGNQL/6M2bVYs7VoI9EDDdKhsQtLAzghN4pY/HACaWl2CSgZ83Ah5oj/efNo0qh84pxdDPI3nPFwrsnyvctsdn8doj6ZOW4ufsT0WTRjmd6lQMexRyJwWwz+aTrizHskKznM7zBgfXeZteMes/tbD34CFujwXZ/AiTWVpivG8ZnCg7c5I/wvaByXCHgNxXuskPmzCj9kIGs4HKpxA3KFHZXIB5vcVobvLI6sumYOqDKaymoy+IdRXBIBkXm2PISbZ/dd2qhRexJ4gJfl7UsB6bZz7TxcJRz9KsMP2UddHwYgDoRv8EfxaYOboJt1gzeOZyQclfdDisVZxfFcqEvjW0zCVDrVJ7QNwm2538s0mP/wwgNPIopESOxT/oN5AB9lo4injYKrDuyS9Ro+dAouI39nfAsTvhL3Jh44eiVcfGADv7sv5fVmR2YtNhabxAQdjrc8oz+LVjPyEDn0GQKuRI5HMlQuMds3CNptjpUxs8XMBGANjBweI2IswbOOEKxTnmfw0LBXG3HSLiDByIDwPv6+8azWRX8EwWGAL7qDBHqPRhrrC2sT58zSA/4qpuE+OBgZ/JKIu05rGGUkyCZ0x9A7roFBXYH+kR6xCFuBBL3cTfFt51hw+ijB3/e2oqv+PuBDhkeSczF7IwptbhNIZM+Sial7LSPQeqgP7pCPuBnpQAzxF3xjwVUCwwpJ785yUDopY+jfNyK0iDpvFjAhCbyBNC5R/G8juXjwZ9ATr0dlXQENiFnPniPIeinAlRljukbegbTeicGYNK5sCh9l9dMilkMc6mZVY0hKZRMNhkP99SCBK3QLdzBxW5TM63LwxwDEn3RMBVqMlPZNTP5IjKl4FDWTCcUpZNQkCnviA8FRVbwcbwfR2VjXTMUYToWquon/D0I8U5g48aC18N/igXc/OB33gPAyQPBdVAK78M+hKCiIinMvEHRp/Lkg2+Jk7PLFSLy52KILXSF3Dq848L34ZHwxin1aGYvtN9CGQWB4NJHUmTVdG48r8TQ8uBSTkgwylFqJncTUilGRZmBMUTDPk8EfgxBZHyZ6hLTcgT101sbJH0THwvg6TGEoX8ZFDHYiFOhyIrgN6D0K0FkJB4LHZwqGgoammJncHIzwAvC7kUmvhbEQutboHfySXg7s6QHTfnuDPySMS5y8WDwnRB2KKnAgsLhBkHg5kNhE30/b3RmpZ2x8S2C0hw8Foda+YwKBUhVDQZIbCRMgdkL9LD7+tTsdgITA0qY7b6do5hmNZCCN6cxiBP8ejiH4McWKBlE/FoydeMvXivAzB/NdMUsL4zYzKgeurMRbh2K0QG+QyEzqjyWw58B+GOebsXGXhtRCRxFtRtbAehJNk+vuclCGgUjQCHLxqOjJfPW38QNaCZ4DFYL+PaIKj3SFsFVgPGwvOcAH5P4bG6CQ8GKKCWGIdqNUMBSjLJyBsxPClhqefQKjKZ6CmadqBZ4PKOIQH3Zo5JB+HlCR34fSwUpY2f4NJEHFGSehJmzUMdcmREt2npA/e/ZgxnHCNEEtB6o1ITb9Jbh4sirXBXMtDlJcMh3YO+GlXIwVJDHA0xEq+ju/iV/JOxDIl+7RyNSh4GtHaILAdZhfpHb4W+n/CSC4AeE+1gaRwQH9EnF8yKrblxgKSlzHbBsRTrUuDTebysY5AHYdkuYcfoGBmXoj90QPy8UErI1rN1vqoNm4iIdvr9Is/Q0Kjk48/OEep66d+Vx+C4sBWYyKhNNeM4bAwzE5n7AMlaVN0tPaLlD3BlmVjwajAp8PTIkxgzAEFQSbEzTxec+YpshMa3H1Atin+FumH2dpc5A+2y9tkRaM97dxWdBoOGyLgVwwVJA8cfk8iFfLhdOb3xgCos7+fHVIiH2eohyfDZHoDufFvh/0G1MpLwuQxeIvm34TLDZK+8BGBMkMm43HC7onYbwoHwjei7EBoyyk7ea+yFtoH1hjJJkg5TPxbcEU38TPkw3qVBMRCvT7kMMvwmhtgYrf27/KpqRbVpKCCsfwA+0buSeD8RVtHPy6pzkRLojnKHj9lBJGOKANXwvCZRSgXKSDvhWo5i0mWCGKgsITMGWXbtLgM0jZvA6zmoLkYNeaK5GuSlhIZePRPZLQ75WcvGIRZ7XSMpEtSMKAbx9amCZfY1xHbFUu07+EoCeVcVxr5YZBnRSjtTTEgGgwFsbsitka52l8h4Sbkmzqo2EddJn8qzOBhZAZXgrsl9TDCLq3kSq22bs59maK3gBODgTjcSODtexAArNq1OMYrS+R05uNtWtfgdn312hFDGcJuSBL4Qrf5d4W5xrFuxTK2eC3ACbVATtxGaGTpZhrhCmaDqOq2T8wLrOLcftzWb6okJMqfAYD8xdBHK80aUQh2g/5l2jwm2YR06I7gUIE2mqtpUMdcENg5oThptzRTOiZvA9DjT/70zm9kioYaONKVFFSMLzJRnQnO1VMPAhTjNPvxlIpuwsuIjjVpof0C8jHnoUoFIF+0ccpSoKpBxNTy66p94D+hNVfSBNc+Kch1ObNqQV3QCGlseSYbj38LSIeWI26MD3C7qrDm5CrbKYN+8Pvm/TV839474uFmymE18bV26bSIYSBBEnLbKADt4uI0sbL9/eBv6NJAYEnr1SBGc2XcDUULbcMflz8Mof2Mg6SPCWIg3jrDF9dvsyudx+TCRAelzS945uITmb12g0BajhQFh67Jp8CepdwY8AmXxt7KOcVprDQHttnFkzHD+7ry1WuMDLsTpf1PRn1oDkSkZdxjjjjVY2YgaYXgWxmFKnqOi7OrPBhPh6LzrM6wK9L2PBG6Ix2LtobHhkyENLzqwQ0eSbL4NhTdtLA9Z5MbO3lQnnnYsBCvcx/7c63JucvHLvltmYbvhppID4ZoVV8jyHJBQYUJTKGkG2V8eezPLAH81AOJhSjv74seZkeZtkPyNWQzULVYIfGPbxjJmswimwFm0zwqVfIQI0/BZcdslwBUeUjWRyCfIHSQlWlUh5Djcxq3on+4apnkqDOrbz24lP0lUld9mG96IYqTDz1kEX1I5FTS/h0EtjNpzBaEEUIRSHLefqswMhjHkV96qmSNTMuyY79Rv44lWkbDaxRUOkobK63Y5kEk2XhjQ5Berxf2sx7gxoTnJ4DspB/aiRgmmT7Bag/1DPW1FFEfgscJ/SoDYHQ8d0yNMyUC68WPowPP/NmshAdSNB/edLPhbf0Sfdir9LpVqZB6FpUnzc/H+hF1igMZseLiuMzRaEDBVYNgTYFY2iCD3V+cFw2Kq9VzCtC8MjlmRgJ3cxP9CkwduVSEUilx/SJ8UiA9W4TiWAfLNKGPJcyPWjTesCsQw32Ib0rxDxhacLh29hBJry+dGtsZrkcv4VZDNW7AMW4m5KXIiKqH0WRWQT8BJyRlp6knAbMp/fyflvBLw1H+pfA6HtLnxtrG86UUqpcDHVBGfw6wzoRLhyk/DCxFhrXKDWebuODw/qAUVqUMtE96B6AoBZz0XCXklunH26whgpD8VWsM7z0TcyDnASjyHvWaoUL8eiJ5Uazhl0vS2tgAVt+1a9wK+N0wuGgh3h1Vsa3Kh2YLgs4SPh5+dRE0hUL4tUvRYdbXpqCb5MIFwdz4Lnbww7Rvh7ooyMRGFaekEG64KQNr+6dgZWgNyYBGerIk7g2vq60aFA/F/ToxQF7Ioj5874GWK6EuUJbr2R4aEEpHQ72YCgxASQMpeJXAwyTRsFsuq4+XATWpey+Fr66NyhehRCEKi3MZVoGTHsb0CgOtQ3Bz3jYi91bZQOTUTnkcqojEcHDXUz/3poZa4v84FJx0fCnr4wRrGafxJetqVFAIaJ4kT9oaTK5QuGDjF4j00/rigWTZu7s0/jXP1mM6YbmANTNVdWje+ERAausS0prDvOsnTdYaY4n5vC7PirMNXggPShqGPatDuI9MWSe8jnog0YTDWjqMjGuh857HYApuFqkZjR1mRjXutgZFXUn2gu0AZLn04EIZyHu+6qFoXHuq5sZ08JhiXpJSwUvDKINpFw6eesGtszG6OuxwBImU0DvRlUCmXYPfW8f9fFxqNqPRVehiyute+sJoNGbFyAcnur3ycBWlEpCbOfURQRdoAwepK+2zKvqG6bpTWj/FUxBO8csLpiu28MT7kgbQfE3bVnY9flBUdddzcb6M3z5xW6NS+vRNWssD4aKK+Kl66uaIpcvmvVyGX4QgUtz0h5gciaAELveKrL4aQ8No3r2O7gzedd5nv+qt27A2oTyFAcV+uaWTheQI1pCprj5OiDyTE+viYiYCUW3gCEqdFpmyh8YUSkibkq0Ae5eNLWsRQwPKCZdWU3kdV2ThUb7yiZmIjcAaOklc+BcjRxyCe5TaKK00FGxYRQxs2t/ISHk0YE5YTarQaNMRFx9b6IS964UHSBEPJxMhrLk+WWdFwylqH13s/DwFaZLyDvyeTfCTn/Vlv4UQn8BftMVLsjYzqUYo389CqzBzRzMDSpzaEJuoEhOsgM2MGi9lRA8qQV84Np0V7229e6Kjlsbfbc/pcIgdTbrrJXHT2ltxbBYyICI6z4ETU4sAT/flQe6FKh/J5hz7WQ/qRCltTgyrdqiLB0aA/eUZnpCx8QpuepKfkIR5rNjPSeMe6z5GyZhfhsPRr3TOyASbsYD/0lEVhKcFpU9fpc9EfSCZHCtlFDWyGjBv0mryEWIdmWij3rZuXwgF3shua8JtE1TuoaF99n9qDAUriDFJGY9riFOY0o0PlqEYG0unBj1227WxnHIFcNajajJfqySKYdlGix5ONmoNHONMOhqli29ZFJUhFVj6sW/8MMjPBvYbbdthnkg8feFY/PoVq1iSB9RhlzLU/AgqLb87OlWhHR8j4FD86YbTlotolsqzecD3DdbOc4GliRvuocAc1eIGACsFLwEUuJ8GyxjQrHRsYcjCP87TXSlLG1asdQgbLA0DEnmd5O2qPDlVw0PZLqU79EqZTJDdzJrCMgN0EY7emCOgbzUUtiMUs0aUZmnQQtvGlilUVuTpEEQFmgqoJusuWgMlEmrC0afn2ly4K2adiqQWVJmUytBgG9O08GgpX3gH65X1PRGqOhQE5Bqvh2fkBkwA9P2v8HdqCxU6E+3fpXQr8gIwUr8yBLP0xQ6Fbm1kzkSgMWaFQ+T196HrCmKJlPoXHvGw7CieT1pdkHjF2enuk+gTGZEp5ZbgkKbN6aCPw2Nc8iOyCPsMCIb8LYPxoD2XX5nUnoEB7PXCE+oZy8Cc4ezG+1Vl6acVcRL64YhYVpFsA8xzFPniuEFayjRaCqekmdspmxfd4e2pyoN7ysnUAiM8T2ReFB0BaSi3+phQYnQ6+SKjFk8bbgNjPeazoaiOEAgM9qxPlhJERiC9/4YNgmC7QMsdEku1FpPTNSJt/5wTzxjVhPHJDk3DFCYPkmvDD5aHNUC6dPvRn34bbEYTlUqMTEOzKI0iWT1PGLSmN9WW5iwKs65FRjFw6jrnhjqiLWfhiZnT1gPYoRq3G2JU7PFaUdrzf2wlC9pBTs4wMkMldZJZQAf+HM8mO9aIRBkF8AdvlGiTQFrsgBkdv7szPqOIazfXb7Mi8A1OzK9e0VkKVxmL2H9A5/T+qXKp8pXhyPid0kaezhg6fdoFpmzaTbOSGtIE3bsyABJW0aVksDkAliG13mRvcTKIrV7GJgTqEfb1ESEqKnq37E40DMba3VTlL2i9++Cdmkfq0zP0KwefpxQgNinGdksqLO4Ut6Nq6Q9UmIOtmd2eIjiIvi0bxebHCfU2Ziif1V6Z+mpm7g1YNh/3DVUoLg2C9QSireDiZkDKa5egoyOZ10djLWlpU0/Fc3GCc5rJj3CRJGdWdJUv+TyVm5KDWt9QfrbrDfOvSEtMKtHYQngCOkLYVTBl7y0mFRO2uKgadJYf3mT1VFvNdmeLQdzXJhA19OD8miZkQKDQoLaZQHeBmicM5nxV5S2ucoPnUQV/QUSuKdXrOqNPICaiH3RneuMs+/9DpNwXZYkD+ekiyD+T88k7XmDjwMoUiNTupmz0CjRbQ0jevAzntvukn7fbFuP752Z0Q59QFYtDGQrsI67rdaaV6vPIincecK1sHizZ9oRCXI7QNnsiQrwbHBtvIFLE5SdDV1BN0C5nzPntaeEYtpxXHsA+XNBP2QIBUHeJsIs1eOjvX20hCeXlHlzWdVv1LZ1U5AbqMwYnVUsKSPoXaezaAXkUkvGHKfx+VEHiT1NZmlIHWZiWCWEY9HHpL1ATNbEND6arZPXVRmmoi9A40L25T6QO4cMQ/UpG4kY09fq1riJ8spX1GMIUcRR3UrJhbjiXvs1b+4HQITusmgSEta8SUAOSU07zDlRDf4beDlI+trYqCSUN9EWnapZaIb/qRTxXUcwuHL8jXoXHNEvJXe1p8n+qGQay3QKyUH0kC1qvqrPtJGa+Yav6nnlHAwXcmsDdGj3bTnWPuVYNFRe+QogGhMmenpGbxYBDP0EvZTNR1uy0dyqhUT4xhWSsafZCl6OyS+oMHrQuhk7EbiJT3vQ5KoQUMUG/b7jOw6T6fME9zcwi2ASwUWX/0WuWAdK7NbUrs0SrR/eOoFQTmpwQFMpU0QcYXg6QUzaCrYfDzo6HNPMxvRdXbUpBREDffLQ3B1uWw2M14GoBuhVVo2Sr1Hk4bX2dlN4AK4b+dEJzyKHidqcUqp7066kI0DGjnpMZxvDLamzlZxY/G09RHF5X0vMTkNvPlLu0M+argAmo0WeGfluXyx7aa1hGSxqDvHrRWET3t23xaQN4FJep+jHZPgBrqlZyOdvFY0pw4RX5SY4yCJttrDTehM9OKK0PpgVk0qNsQSS4+2Idr9204AM6Cme3ppEk5K4S0SUIs8UBwyK5vnT5n9GkGLZU9+VSDbaeL2LZfUbknDNjDtjG7HHv0dPhSpuiUa+6xrV0GzGfDNCJNYK9QXtTiHiwfxW7gf7IxCD7IfnUy+CkkrLyVJL7rdkSELy4TVUCfGb0091FDby8Iu8lwYgRzF5NfjADAMqMHKZ1ecDtxAgovz0Aht37BagEGlnVyNsdVaC0upys9EC1XCRdDpjaI99vFYA+hBhf0sw4PBCfHbDWDE0tF0jL4GC++yHd5hy//w1sEGLbby41q6uxJB4Ezl+E1Bbr+ebTWhbLHM4feA5z09YOLQiUmIeQYQZB6N/ZboNtGsOAnWJkYae/IUMB9aSKkUL1i+J4Z3sS+2fGoX0FaScdJ7LidtPqg/XqCkgawpMHW2wUhrM0yeNUThLqlxq9uK6rQvA9vV386begplNqh5jvZRPMlU5UR4pl5o/EURgoQnaRUjIL+l98Sd7FcXbObo/91+rIilrQ0L5xepUIyhDPcYQ1pJev9SyRtGqLnncf9De9BdiiDHTmLyhhAK3Tza5yWBok+XJKnJdq5evyXCgi3mUfyeGAsxrjOGxuUmBoesuPC8vb9VO6T64/sCzJPMAW6bADSYMwdn/UUHKMeiFPZtNnibearlcjrpUwF0bteeppXbkXi2er7OapB1a2+Xy4M3SctdX5v9iIUgDeGxMa0AhCVaKyaivDxSNv+t5KcB1fd+X6Wy2mtfd9lCNXJip1PSjcR/Rq9CJf35zfba7CGbp/rjOXr2D4ANOY6VCvg3O7QozIV/aVWavafTb7Y078Ditj/d85i3zQqHWWC3cr8kATmsKWxqM2/F4P/2MmYTe/i468OoEr8/MMEkzunaMXO/NanFWsXtsxD8/j4cTCZoQ1opYYJhyBhwf+NghXC8VQnYnWIal0n/5hUusAhh3EUoyDWdYPgPeVbeiznGclngd6hdd83DkRrPQjxOGvGygTvpzoJCrGDYhzF4EpiZde5sl4XiE4AwtBHWOJ3WdtIah681mXiddZ28Qw6+ahoxhe//PMrteLpXu6spFQyN+4+RjoLArejGkSicQgsWK9yy9dcfktk4dQ0rpnNqG3CEM4aXJDzScbFo8pWKoBak9Xgg2AzAmR9pzYyrLZIii1gKRw/1g8Eqs6NPhus0B3HWl3iqvYViacnnmFYYYukIFk1Zbxhj25uTM5kMsoxZkmT94tWPY2gGVqQ8lq7hTqpp7gQsjGqcG8rbnO7Q9bQXGHQy/+zCET8oF7tBRXkkYvnV/ccyQjttO+ObRRUexKJuFEHINjOxddBvL2WWAeCpB63fRb2UMmyU1oUu7GAp9tBtigKMuv3qtaewCYLTE2VY3IVlOu4rYKPJ6WIHRGnv/g8kYN1c5hazEu+hT/jGG4nOoJ+3QcPMmFwBlLVI4cAVqElR9O9Y2nsSR0Y+bDHAf0GrCr/rr4RVW9sJLZ12XNU2DYS+XQpC1S2k1roXhmx1iJnl2cr2x7gDaAxfeqzk/EcpvEkVli9J1+XwrpOrTNMsOhvVKvfYxNVr42bkj6/5kdRl1asA1ONL+4ZBoDFUEPzwcDcZeuYAdibx1T5+mAT3VsocmVjMbpTNoc2n7gTqwU8CUD7ve8wn8lfrjHcVh7JhfXu6RhHeWKm9grvKQVZd1p7toHw2hY04nthjt92WL/u8xZNKTemotxcNZJPuFDf6KM9mvCcsdzoU0J9UrGQeB3itTxwDP6lzLPk1mKJoGYovbD+OWgBXnLzA0FQRZMlqr4adYm+2IW4AjVSJ2cKEKpe/5pgzdPvBL0dKZspJlhTdB+vR9fMixRWa/FBbpt66xAFT3ZIzufj2HBAk9Qzkb3FGk/QZT2s0PMIRHzeroiVJQED1dPoie8SXFS2tRo0RVNLqS4bV+Z3EIBCzp4JzJyeB6dUcGZlW7ElMCMtAnK4BKfBgSDbmW5pPVQxT2VymrUFo92rWy0hHka2q0bzFYzDGMA+1PnZaiCtkuiuSiL97H6bROiYlP7rJFdZcftFqkqnrj0d8auQ48qKWSrW1X59UqT/1sAwvZ6MPCq+eN2u1NGZKI794tPQzkQgUUD8Hyg5JN7KuKacNMpYcOSoSE3+skJPFpb2+qItrtAwGDpWRPZ92BcJqgryytDXquLaKMcJ3zfgM87O4CiduMj5fAtbheTKZcn9UAUpj2kWrb1B1+WW0Y2Y8bMXe/cTfwW+CKCGkHHdWg+qeirP67IBRuj9iIMYp1sW6oxg4bnGct6s3wKrvr4ECcMrwZoHZC7XNaSq2XgE/8+Yty1nqAcMMaow0Y6owRhkakRVPu+iNIJzNXc16uRi/j4dTrLjqGCiPWABy9RTe9lcirfRXL95rw8oM1TugzJ4gHVgIx/IW3QenZ+h2L1wuCAOc0GuG5QNbIO2lDY1dWw3BH/med5ynO6jeDxbyLIZzksYyiQ6AeA3bt20PeAgj9Y6XGlBQPGI+XOxNVUKlV3NLAm+07kdEaF3n32mfcpJJNQjXxa7aubY+qhjYvmr686ygA6AeEEVdckgMglGlTJfUzUD3zpn3q3+Ok/EFVKzP9AlYdh+xxvuaOonRqxaxYkmoReWlWPTaI7OlW7oMDegQ/iiEDoBbSXiPECMz0bSj3m7wFXMfdhL4YwfFSfRtFVZWpt/TnqqVDYalr3XnQbMhsfwFp8UX9bSJlX2EParc39rer4LDY+thDEnn4A4uGW4pDDCZoWqEL7AMb42pdFF7CrJ53y7bdaDS02blXBkgs2TINu5XfNII4NJvbZfJs3KjjvnwG+q23t/UwJi4873wsE8gIZaDmGHXr6a1nanIRXZ9ScpsR0s4tp5V9MnYlLOMcVkGqfiO1YzNDj75xaP7iT3SEWDcbqPYvxrdAQebmg3UdiuSK7oEoWlKUMi6LF+pCgxunrKPmo1UPCmQsZdxh/oAkrTXh+jIXs3PxEPDUB92y2PXIHWWlVtr9hgrPUXPpG2B0lIwq8rgVep4XLuRJZlTEuvuAyfBBMzq/htr9INtlJpqqT0qOuDPCI489gCBOcgG47UFRn5ytmrQZtQOyQVdjWy7jl5PjNUGH+UpnOE/sGQCZDBkhQCkOV9Cu31pTgB7HhLqmaYSgR7m9Fzew5oRikw2gvXi9DK5WejvZi+IhaO5xsahqVqIzw10RUBwX4EUAABTVSURBVJfZ2gbHswX/qMkQ9h+v+loiip7b0Yfmob/nF0IRU57LVtQuWRp4zgVXsS6XquStV/WSBWTnZDveNpAYIjvVvgSMOCGfsUkR1Mst8IufqN3eLDpIYDiNFunxmE4WFNXi0PwGn5RnxUkuPSceAknWXONnK4TGUeHicDUyLcuyHcexTOwYUSgBLCRlq97mG3Bre/MIEHTNfRd67jFX+UbfD4XGnTQxn0KKO/DxgYuGikfJVNYyXbddu2uW+nJNQ4k4cnT4wCspVBLhFGg99SD9sR90FTrYhPNoMH4aSiMiMJFP2lFyahxb/jmOW32pBEyfNc0koJuNEjRqqKg2PYgCOLXzcXo8Llm2j5sToqxAYWPaZC97i9ZABwXokT80FOpJp4BlEDoBq9bNeksJPHGCE1XovG2N6QzATaHWzLLOvKn7cTEvf8Wi5sYfa+rt8UXOFFZ4566tWJp6b0zDohSAIH0mqK5XZIXU7UMgPGFrk8mgLhZJal6VmkTZ2aUW0doHfns+POg+r4P78zf5jEYAaCxB1mgvoLrOdI77bSzj6CequgpqKlA1g5bU6W40FZR9tp/OJSZ2pVML6qNuDu3OU2wqehm79TepoZ3sc2eqcZ5RDwc56UxFh4EaB6WTVwcYR4kaET6RCy1sWoLLZXMtXjxaykO2h9ALEmEXnrOJ1gAOjPvaoY1O6noEKR70UBXEoYr37g/xxIqlUr416KzpYnYAlygKIrVm6Yt1EnZS7+a41fjzjrEH6iw60QbfsatO9LXSndSUfUHo6ZWqELiYu7PREMXTlL2B5XPgY+gjClIfyuCTv2YftNhQqIpVv0TYlLzuVLcQlySMfMciwbfni9VdD+i/6cxKFxkcN2egQr2PHKqW1sZLpxCdH1W2hreoXWooCzxkMWxQ4Z3O0A1gp8y2ULKCfMChUD6SNII7kD5o4kynuAUE7TuVRrCbErWW7g1oEpnPZmmadnpCGSVRiOqLaUcDTDdsHCbdrJ0DIVgxS+OtPTTNSf51VXZBc2sMqEXNtEoKbF6wpB8qzQPEi3e96KlYu94IStn2FBYzIhzhlZ3pw1cHk37IaLrZs8GuFXW8yuk5rc3El/FQoiC3kTZcR1iRk1tbG/oa2HTP3TGUZ4kIb7MU8rW5FuuIzuyogXhyJkdDY+DsCzf7dQ5vHW8DTnIjB5k2iJEMopaBHnNNeUKDx0pfRFQA9jwV7sACsrey/1DTIuYOOAL7ocgv2QX1LMcahBe9PpO8f5wqPNQOJWVIDpg8/M3yy6qNkQpFtV9Q2O6y701iDPU46CORwdAS3f6DzifrIkgbSElJVG3dxjoIN+aqd6Jqu0+hD6yh8vZAyjttzgIeKKhXHQeJpeR2WKftj4SLqpSdGobyVE7iLewDDQ/AXWStLfTJ64QS957RPWwGQPtriClL3JpUa9Rwf4RDwpbAb1mTjIPvseEDV3ogBWgfxYQVSdMjzN4G6fHrqhjJy7pMV5G0vVOP88xcSATcgc1qF6RwNecMSlmKrL2KhOMF+hyH6F8VHUcD0kBnRj/QbjSHsN4NM5m2g04yGei9mciz2GFtMEw2EsdGcofO2F9OJlEyi8S/46Yk0HQl/Vh8h7LbtgxUtKUKaiEi7O5o0N4dgnVhh0Fv2tAkNhVEBP1RtYv9sPlU1uN+kbahwmTcEMR1B77MEl/iSdeVUcE+yCPGjTvRBQ/j/QYKcrD5paUuhC3Pcf/JLlAPQQHAzehT2ofdk/oFji98Wjht7fCCJfaN5Gv96D5afbnX2sHYcDfqsLaG93j5KuHghnGzXsr2AGvycaJcolarhfUFdm1RQ9eq5SnBhynxavUqW5cSWXQ9BBnWGxPQTlsnQZCGz0kAUS65PM3yap+6uKTLrWurDx3afjTLTrVcPrha0cIDlPEoVjqUq+n1iuk1ezHDQxD5mDmtdgk2NokgGTv69KoiyNM8XEzkCElUfLcRtgtBCK/tNTgOzyv0K5xfuB+IDlsf2OFdaVZZbCrhzQSH1cpL0/yqatdiLU/doXNVczwri9A/abtJzdQ4cjPF4aHSC7fNL+I+MHBVL9dguWVJRH6qiVMh2xn+MgI2KJr2LnQbaU62UBSqVrIh0TSt3hZvX/dLvpr3vaE8yL5zesg0NqCVskQpearJKCw2nZOYvVjdwM5OLu1C1vzclJsDwUvv0WChv1XaeLINW27X4/GoLX9V3vrK9hB2WVKr23mKVKPFX84lntSmguCIoDqrdfpUmWnshpOSZd68quNkSwHXXNX4fQJtokI8cEJEANtTpT+A27MWMxRGi9aIjGwidZI13SbZtbVYVXxfqywYSaE2R9zUGx8y5NTbo1s7gV2a18oyoOp9iZjX5h5j/RociPhgdarlhmXNAcgAHDzzpZgTUxowOMyRZjYnDstWjZNnCXO4TZIkLfNjLn4G86k9bNZpVpwPpqNkZbFfq8jNWc3ipTmE/UHngMKwBg9s1RgToo/Xh3hhEwu2cpr1i8F5qkBAKEDKWhaTmerJ3ug8JYJt0vYJvz3ghDH752wwPKZ2NpZTiEAZOXHJBPTXsVXiNyPGw0gkfkVC6mNbjCmI0lzQwSL+haeNAjW/7mgBtcURWSuUcbO3qD6De790X5ejWuOJRE8IAoXOMnda1mYJX0ObNXERcoQl6Ep0ZA7G3K8ViNNOT2lAB7rS2ma7MdOA5SOxraTlFIghzGWXBNz9YA6sUSqThN+X1IsWrq1NmeNso0N8k4mATUbpxaHMkHPM37wCjjKdB44ZHbZUGBqrrwfP4zakHrs/Fr7h0Xd0SLhuMSjvi9Pr0ny2lcBYJthuIauYYaKaius9X61W4WSyPAibmGRq3cnuzjKxkA+5tB8/IdWw4O6Hk50WIU64ESXy6s+LqIHCzu0tpdAOvThjm5ZQ7gJVXxNKolVyFk0/uL82FfLq9MDZg+goSZp2nK4EpnbIa1uCHV3VpsM+PPDPsYLzTTkKBkTymAH9WgiSixBOiR1DYexdF2b4a1QvP2R1Sns4jcoXyxbAnFWylDljv5QL3w81q8cgorPZBOa9ygrQFe0vsbUOCtm7HZhoDH3yYrVD+SCp+qDdfJdu0z6GqC5aPyW1sTaHjhvn93tVM+2mqi7re56M6sMt7bDOIj/iPjbj3Oljhb389HMz8JSSA7fRfXPUjEnG8EjnNChbeAEmFD+RNX7VVEE2qob9FJ5en2MO/APCKjL1yG7R1DwVmd7PVlxohWl6oLIv/HLPNJSPwAqHkhuQfVCbB0cqQbqqc5COyf+U4EqSInBC1S7SlaOy4clT6fnvmMZyw6xxw9d6OImGALFPB6M4xbfO2migtzwifXr5pNESXAiJDJDqTb3LTL4RRHBHy2LDSYXVk50hp8paxPc1X0XuiwDRHi2TrCk7KdaT7oXQyaZu2evf4j0WGsrhDBpSYNeNpulIP+B3mIEtB7TUf3VanZhpiy0AaXatMEReOd3ry8One3wIJwtYeRoI0bPn4pdoEs4yNYbaZH1ruuDBlZM9H3xOC2EL9XVz+GzPjV6PP+MnAQtmAk4DNf4p3go6Fl37EThmm7NWHK48fOSVnfza5vk8ne7VOr2dTs+nbkQ262TReYj4wztT4+41YogJjqPW4RsPA4DaBmS9RecJ/YCdD7YN/RUERMALCxsm7q3fiyBOzR/rBnKbfJIORtglCyombR+TKA8hdS/GDnL9zhIOJ1cB0yjytKdXfVw7gOmsL4fPGl9qd1lgjLEJXhXCAOh0wvqt2uMtN153zuZqw2WdzjXpa1TbwYekUmnTsb+qfa594pgRG4EQvq0AbgCbbOSc7Kpo4Vv+PzAnVM0+hdU4rDPzr+pSrwbmcJJ+vcLyfLrdV5bZcyf8Nc4F98FG1j2sQ389m569DeAKJ2zPAUf/k6Yg9eNXPGVY88w1bPUYQNmcwXkYsdIRpL4ezIE2TCV2s9ztIUir62aDS3Fn+HGp9sFqUROvy1kWlFUXE15WKGJrVNc4Nfdgx7ATn6DzUe1oA9jKP2IVLDNaLCP2r4cHKZXbkbQzDYLaDLdcVeWPqYv7tLcRKNLReNrtmqv+vsjA+G8tbi0PzxY6JdOphCwGuTh5pNXHYEoVNeXYNlW+gX9h6nEhG8gLVuVWGa1z9j4S+PrKVgPKER7DEcLWU2QZqpJz6/3RdDGtQ4dgJY12PPsBYM01iO5Moth+Ahx+Dp97eNSdd2030Gsh0fzsEzz1zzFks3axmN7lPR/iWvulR8QoPRRw/dTtzZFyPYDLWnDa7p1/wXGoT0nR5Zk/qBItBiKOvE+8pj5oHuw91x725B9Cr+cFdSTNxu2LLVT0icltfP7K4eMBK+Ihqs5cPboSYXLG3W45dzMP4OK93P3bHfgbvGpwhBcBnlMCWe1NAgIBVXz71i0OTnwyYIvovX9XFyzZPRBLNGTSQJlrNChU91qGwvXfbEUI2XZ9f3xt17hgw6tqzCXieL7N0BysCpl4kncMMyk86rHhvwt0hlvIrl/RjpesAJqiiWtK9l1yUAqolLw06pD8LZLjFFfRrBtYYDwADi38BH5oEYopa1JuNgtT9tcQ5EouKAikA506vYJ97EWY2WPMhu9t4T2i1rOrV4ervQI7nMGKWUoYCr0CMwdTOvp17onaqTkl1HyQwXb1xN9vAHpLsCJBBwKlVuc5azKJTpCEWGiWccrxRtsnF+/cDKEo3GgBHnDAzU0hlUlnaH45Jlb0Jwo/oKqjhCPUh2Od7WbUr54/Auz+AannOfL9UWq0+lmLskkr4tLOZTYBZkXBOIjo8O02peFR6GLnJOYGzsU7oN8PulnwYQakypbtoaP5w06pGPf/9qnqDcBzMSN1WcjWnHUNhKlexX9wsf0m29ECJbZWyPQrHQfrR91JZFnJDVfKjhAbZIDcCnd58qkj1CZx43WSNoQgTOyiIH/nL/Fn7WZgsRp4TTYK92mhuZwajpAnjo7X2gkqwX3VK8eX37SXUjzLh2MMwCfC9LKH90CHC3fLHqYHhxM1VcDSWaAN/sAjWNx28gfdEX2MI96G8TCsOlM++KmznfLk6QaLcsF8FtwNOS9by8k+I5/Azglg/D0qixxOIQbNmMNBToyhk2l78zl0XG0kBVGL7n5Po7UxpLlZ4bruQT6z9xBnAJkhisg8C7fvZu6Nk8ZlI5ZQxFBWAsMCLJzNAtMiPntI+z1uvcisFzVWcjCbT4P6H9Hk9WaYtgNV5o26TouJi8xI3z2qV6D4Eo6e1dypuYphACmmIhDcvMM/YNzkQCWtp0uIqAcobPVGd/m05Hf/HfTg/+1T2gpq4XzqRGJw4WSdMhJQHhLLtuFaUDNXuVSYiESomSjh/qnkmKWNF9waucUVYL5UCrdPNjF9BlS5c3R5YcsoUn2JVP1tjyQAt2sdHGat1PGci20Rqe3OSOwvoyrBDk5vSG5TaKFT3tqQTqqM1wwgD4YZqfc9iX4HCLEveCQV2FXbmsKtXpUVFFwpp4oqHIdHD2IRXlILIG3Cz02eGbiu30vAUjcq66ECSKjXft8y92Ow0YO/AnuSMBSB0wxcm4yStuDeYPHeaKUjR0xDkrojaAp0Ku42fJS9VhoulSahCvBIndo9L/87YNJyBaxbcgnNmvLheq6C/oe9/qDGh6sdDLv5Tjjz2NYlRAxTpCQeSjYSX52CV+M1QyrMgf7LfL513fvsD6EIj6HldVx75rY6ubZjvnYOxX9+yGYz0zumgMsMCj6XZ7DI+EfMx9QZaI9rYEFTiqaYtmfwEvefIyABlUhgxsnneuVDd51Bf+tePQXdRGyuq7AsoHAHugpDRZzppep6RXvYLjdnxdM8VlRmvR38WQrW7yZhwIax1OHfuPBa0SuRH8701QhHLqOBBzH82vU3n1Ue5h4IP3Th+eCL/JPtyn8NzBXVmoDCcWKe2nrB9n1Pf/G/k1anU3Xk1bkftoTiw4ZEM2ODLSQOqOOuwZ9mTg1YkWLLdZ87O5fbl2mZliXBP+zR6EMamLKEE3MYTqNO/1GYklRghsGcUEFFwUcB/17Wwqw9335wZZ+323II1ESxKGb2n1cw7eHxhp8Ew5aAczRZ2Lty0TElPRf0091f8RLkFQtruHb8+tej3d8B8o65Racd8Eguwe95iaZZm88uRLI0eoMvkU3R0v6jk/48WEs+5hirkP0Zj+a5Z2ZViNXYyDaYOn7N8bym68m14WsMjGKtaO/N5c25CH8UhnTYhvBrACf7IDca7OLFSEFGCc9fyQ6Tsv56PpFlJ0WFhW4O9/bZxP+cjegFn1o9G3fcEzIMsxMP7LQPVRtv9sqacoEC1nJVFzk8jlg8Zq9YndLpXf+onegMSu5N4/onN6m3856z1aTeCPs60afFJaa7VHpkXuggCNfjnRjZ8sUz/hGQm4cH9oKNxZXWY8aTvF65/35ksuecxKbzHPmLNfXD5KuuIS5O6QL3qCzkDtMstH/mhH8GEM9oTdUw38kCpcRaHE9KEdspDcPIn7+MVEejRRQeSqWif3M9+ujIuaEskluHr9ngXwBzwrxarLlYT3Cbtve+EE5amobL0B8pEIVhnOfXp7bCv7mlvBXKl3ZW4Df4X+IHYE+4zKu45iGlH5woLK+t6oSi2J0U2BStokyBXcglJ74nO+ufs/BfVqA9YEIlQr0lu0jZWljO2I+rx+ZdcSmgsXlU+WRKqAxHUV3C+cjdT07Y+nfAjetC2VMuFCl9ajn+Mr5n1XXTt61kt9ldqvtxNvFlDaaz9Or9z7ss+CHw+J9AlDbNHy6C44a15AydrR8GQTAL8htBKf4K/a2vbIUaT1bHpobqOsMFkh89838NGi3uTsp6jMXmmgWHhaMfYWJOCbRk9tBdHOL7oylRvKaRVnz4vwclILLmuVYA9cjycBJtR/OeoTrzkS9UarI+KzfsLnv/vyN8/WBHQabrUUHPU5mkwVLCRHBsmn6d2juFdmtvobaG+O+CtZjEPbubixp61M4lCSfb/zr1BmoUYTuuH5TP3csyfYn2eXdNVyPXUR/wX6dhcyaVORwvVof9fX25XHZYuPddFPhzc71cbvdjcFhuW4to/3XsEMxOKtOxHX+xFf9Fk8kCQW/D8/8DrwY0Nns3drP180/D/wHsQIHB+P9ZFgAAAABJRU5ErkJggg==,",
                   width: 65,
	                height: 65,
                   margin: [218, 5, 0, 5],
                    style: "images",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,

                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 2 ( " +
                      self.receipt_data[1].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[1].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[1].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 2

          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
                      image:
                      "data:image/png;base64,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,",
                   width: 65,
	                height: 65,
                   margin: [218, 5, 0, 5],
                    style: "images",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 3 ( " +
                      self.receipt_data[2].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[2].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[2].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 3
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
               image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD+/v74+Pj7+/v39/fz8/Pm5ubu7u7Ozs7v7++bm5vr6+vk5OSurq7h4eHa2trKysq3t7dZWVmnp6cdHR3b29vDw8MqKirU1NR/f3+goKC4uLhvb2+WlpaLi4tjY2M1NTUZGRlERESCgoI5OTlVVVVsbGwSEhJ3d3dXV1dISEgtLS04ODgWFhaAgIAHagshAAAgAElEQVR4nNU9iZqqOLOCgBuCC4qIAioqNNrn/d/uppZAAth6Zs7MP7fmm9PdypJK7ZVKZTD482DSP+Y/8Oj/DvRgZ0UTBZb+Tzf+v5kc07RsJ5zlebleZ9V3ocJDfJTns8C3LVNH6L+Nnlmzp+WMwvxePXaF8SNsHtXXfuVPh//rof8WWPPlbH97g5oOl2Mc+g7d/t8mooAozU5tBE636iudCYhj+HeWJFl1e7QuelR3b/S/Hv0bsJzV/rbRaFMmcbwM/bHr6Jfa7tRfhnG8/9KnIktd638y9h+B2WrqXRTsNrcknIxsneWsYeuDgTkc+2FQKvTcXGLfUp/7PwbTJFVoHfKqGWSWHLbKRcMoChPgzvJ+3xObrsKJajDcQ/Lr2txfekN6+L+Jyo/gzxpmW+ceY2dawzBI0mNWnXvUTrFbH9N85o2kuRiHs2MtwVUS/XfQGy6POzmwuxc5ODJ7HO6z2+kDhbqr1kfPtZExh6PDvSbk18r5+cX/EoyCjIf0OMYLws730mzTxWXD8N3z1VcZRC7cbG6Do5TKS/DC9fkXYTyTfLWWo1mka90OPKtylgSrVRgxLFcC4lleVRqu39UxQCQHvlfKWSvd/xluQK1pLLVDGQJHmXZYfinE25VpfAjn4xePGLuRkNN9pWB5uq8c5Ndlypx/Kn3tnf8C1K9xYx7ExUP1Pl1mDfF2mbecjy2zc1f9Qf2J5S4O2am582uFUzI93JiD9+6LZ/yzYK6YflmAA/KThhbr1BtpuL0YG37sp2XqD5xVcq/V0iWN8GuPRfwa2K8f8ueBXhTxy7MVfjbZS3W6uc8mzaU/WDT+xoIHbRbw68LbS1IWWYDMuuLX3Fb/csDp/jrTZIcwufaqOhsSYb8bJbyiIg56aVyj3AjEn8OFMxiFqZTjKgHmtJdr5ovtv0hF26NRPGNQL/6M2bVYs7VoI9EDDdKhsQtLAzghN4pY/HACaWl2CSgZ83Ah5oj/efNo0qh84pxdDPI3nPFwrsnyvctsdn8doj6ZOW4ufsT0WTRjmd6lQMexRyJwWwz+aTrizHskKznM7zBgfXeZteMes/tbD34CFujwXZ/AiTWVpivG8ZnCg7c5I/wvaByXCHgNxXuskPmzCj9kIGs4HKpxA3KFHZXIB5vcVobvLI6sumYOqDKaymoy+IdRXBIBkXm2PISbZ/dd2qhRexJ4gJfl7UsB6bZz7TxcJRz9KsMP2UddHwYgDoRv8EfxaYOboJt1gzeOZyQclfdDisVZxfFcqEvjW0zCVDrVJ7QNwm2538s0mP/wwgNPIopESOxT/oN5AB9lo4injYKrDuyS9Ro+dAouI39nfAsTvhL3Jh44eiVcfGADv7sv5fVmR2YtNhabxAQdjrc8oz+LVjPyEDn0GQKuRI5HMlQuMds3CNptjpUxs8XMBGANjBweI2IswbOOEKxTnmfw0LBXG3HSLiDByIDwPv6+8azWRX8EwWGAL7qDBHqPRhrrC2sT58zSA/4qpuE+OBgZ/JKIu05rGGUkyCZ0x9A7roFBXYH+kR6xCFuBBL3cTfFt51hw+ijB3/e2oqv+PuBDhkeSczF7IwptbhNIZM+Sial7LSPQeqgP7pCPuBnpQAzxF3xjwVUCwwpJ785yUDopY+jfNyK0iDpvFjAhCbyBNC5R/G8juXjwZ9ATr0dlXQENiFnPniPIeinAlRljukbegbTeicGYNK5sCh9l9dMilkMc6mZVY0hKZRMNhkP99SCBK3QLdzBxW5TM63LwxwDEn3RMBVqMlPZNTP5IjKl4FDWTCcUpZNQkCnviA8FRVbwcbwfR2VjXTMUYToWquon/D0I8U5g48aC18N/igXc/OB33gPAyQPBdVAK78M+hKCiIinMvEHRp/Lkg2+Jk7PLFSLy52KILXSF3Dq848L34ZHwxin1aGYvtN9CGQWB4NJHUmTVdG48r8TQ8uBSTkgwylFqJncTUilGRZmBMUTDPk8EfgxBZHyZ6hLTcgT101sbJH0THwvg6TGEoX8ZFDHYiFOhyIrgN6D0K0FkJB4LHZwqGgoammJncHIzwAvC7kUmvhbEQutboHfySXg7s6QHTfnuDPySMS5y8WDwnRB2KKnAgsLhBkHg5kNhE30/b3RmpZ2x8S2C0hw8Foda+YwKBUhVDQZIbCRMgdkL9LD7+tTsdgITA0qY7b6do5hmNZCCN6cxiBP8ejiH4McWKBlE/FoydeMvXivAzB/NdMUsL4zYzKgeurMRbh2K0QG+QyEzqjyWw58B+GOebsXGXhtRCRxFtRtbAehJNk+vuclCGgUjQCHLxqOjJfPW38QNaCZ4DFYL+PaIKj3SFsFVgPGwvOcAH5P4bG6CQ8GKKCWGIdqNUMBSjLJyBsxPClhqefQKjKZ6CmadqBZ4PKOIQH3Zo5JB+HlCR34fSwUpY2f4NJEHFGSehJmzUMdcmREt2npA/e/ZgxnHCNEEtB6o1ITb9Jbh4sirXBXMtDlJcMh3YO+GlXIwVJDHA0xEq+ju/iV/JOxDIl+7RyNSh4GtHaILAdZhfpHb4W+n/CSC4AeE+1gaRwQH9EnF8yKrblxgKSlzHbBsRTrUuDTebysY5AHYdkuYcfoGBmXoj90QPy8UErI1rN1vqoNm4iIdvr9Is/Q0Kjk48/OEep66d+Vx+C4sBWYyKhNNeM4bAwzE5n7AMlaVN0tPaLlD3BlmVjwajAp8PTIkxgzAEFQSbEzTxec+YpshMa3H1Atin+FumH2dpc5A+2y9tkRaM97dxWdBoOGyLgVwwVJA8cfk8iFfLhdOb3xgCos7+fHVIiH2eohyfDZHoDufFvh/0G1MpLwuQxeIvm34TLDZK+8BGBMkMm43HC7onYbwoHwjei7EBoyyk7ea+yFtoH1hjJJkg5TPxbcEU38TPkw3qVBMRCvT7kMMvwmhtgYrf27/KpqRbVpKCCsfwA+0buSeD8RVtHPy6pzkRLojnKHj9lBJGOKANXwvCZRSgXKSDvhWo5i0mWCGKgsITMGWXbtLgM0jZvA6zmoLkYNeaK5GuSlhIZePRPZLQ75WcvGIRZ7XSMpEtSMKAbx9amCZfY1xHbFUu07+EoCeVcVxr5YZBnRSjtTTEgGgwFsbsitka52l8h4Sbkmzqo2EddJn8qzOBhZAZXgrsl9TDCLq3kSq22bs59maK3gBODgTjcSODtexAArNq1OMYrS+R05uNtWtfgdn312hFDGcJuSBL4Qrf5d4W5xrFuxTK2eC3ACbVATtxGaGTpZhrhCmaDqOq2T8wLrOLcftzWb6okJMqfAYD8xdBHK80aUQh2g/5l2jwm2YR06I7gUIE2mqtpUMdcENg5oThptzRTOiZvA9DjT/70zm9kioYaONKVFFSMLzJRnQnO1VMPAhTjNPvxlIpuwsuIjjVpof0C8jHnoUoFIF+0ccpSoKpBxNTy66p94D+hNVfSBNc+Kch1ObNqQV3QCGlseSYbj38LSIeWI26MD3C7qrDm5CrbKYN+8Pvm/TV839474uFmymE18bV26bSIYSBBEnLbKADt4uI0sbL9/eBv6NJAYEnr1SBGc2XcDUULbcMflz8Mof2Mg6SPCWIg3jrDF9dvsyudx+TCRAelzS945uITmb12g0BajhQFh67Jp8CepdwY8AmXxt7KOcVprDQHttnFkzHD+7ry1WuMDLsTpf1PRn1oDkSkZdxjjjjVY2YgaYXgWxmFKnqOi7OrPBhPh6LzrM6wK9L2PBG6Ix2LtobHhkyENLzqwQ0eSbL4NhTdtLA9Z5MbO3lQnnnYsBCvcx/7c63JucvHLvltmYbvhppID4ZoVV8jyHJBQYUJTKGkG2V8eezPLAH81AOJhSjv74seZkeZtkPyNWQzULVYIfGPbxjJmswimwFm0zwqVfIQI0/BZcdslwBUeUjWRyCfIHSQlWlUh5Djcxq3on+4apnkqDOrbz24lP0lUld9mG96IYqTDz1kEX1I5FTS/h0EtjNpzBaEEUIRSHLefqswMhjHkV96qmSNTMuyY79Rv44lWkbDaxRUOkobK63Y5kEk2XhjQ5Berxf2sx7gxoTnJ4DspB/aiRgmmT7Bag/1DPW1FFEfgscJ/SoDYHQ8d0yNMyUC68WPowPP/NmshAdSNB/edLPhbf0Sfdir9LpVqZB6FpUnzc/H+hF1igMZseLiuMzRaEDBVYNgTYFY2iCD3V+cFw2Kq9VzCtC8MjlmRgJ3cxP9CkwduVSEUilx/SJ8UiA9W4TiWAfLNKGPJcyPWjTesCsQw32Ib0rxDxhacLh29hBJry+dGtsZrkcv4VZDNW7AMW4m5KXIiKqH0WRWQT8BJyRlp6knAbMp/fyflvBLw1H+pfA6HtLnxtrG86UUqpcDHVBGfw6wzoRLhyk/DCxFhrXKDWebuODw/qAUVqUMtE96B6AoBZz0XCXklunH26whgpD8VWsM7z0TcyDnASjyHvWaoUL8eiJ5Uazhl0vS2tgAVt+1a9wK+N0wuGgh3h1Vsa3Kh2YLgs4SPh5+dRE0hUL4tUvRYdbXpqCb5MIFwdz4Lnbww7Rvh7ooyMRGFaekEG64KQNr+6dgZWgNyYBGerIk7g2vq60aFA/F/ToxQF7Ioj5874GWK6EuUJbr2R4aEEpHQ72YCgxASQMpeJXAwyTRsFsuq4+XATWpey+Fr66NyhehRCEKi3MZVoGTHsb0CgOtQ3Bz3jYi91bZQOTUTnkcqojEcHDXUz/3poZa4v84FJx0fCnr4wRrGafxJetqVFAIaJ4kT9oaTK5QuGDjF4j00/rigWTZu7s0/jXP1mM6YbmANTNVdWje+ERAausS0prDvOsnTdYaY4n5vC7PirMNXggPShqGPatDuI9MWSe8jnog0YTDWjqMjGuh857HYApuFqkZjR1mRjXutgZFXUn2gu0AZLn04EIZyHu+6qFoXHuq5sZ08JhiXpJSwUvDKINpFw6eesGtszG6OuxwBImU0DvRlUCmXYPfW8f9fFxqNqPRVehiyute+sJoNGbFyAcnur3ycBWlEpCbOfURQRdoAwepK+2zKvqG6bpTWj/FUxBO8csLpiu28MT7kgbQfE3bVnY9flBUdddzcb6M3z5xW6NS+vRNWssD4aKK+Kl66uaIpcvmvVyGX4QgUtz0h5gciaAELveKrL4aQ8No3r2O7gzedd5nv+qt27A2oTyFAcV+uaWTheQI1pCprj5OiDyTE+viYiYCUW3gCEqdFpmyh8YUSkibkq0Ae5eNLWsRQwPKCZdWU3kdV2ThUb7yiZmIjcAaOklc+BcjRxyCe5TaKK00FGxYRQxs2t/ISHk0YE5YTarQaNMRFx9b6IS964UHSBEPJxMhrLk+WWdFwylqH13s/DwFaZLyDvyeTfCTn/Vlv4UQn8BftMVLsjYzqUYo389CqzBzRzMDSpzaEJuoEhOsgM2MGi9lRA8qQV84Np0V7229e6Kjlsbfbc/pcIgdTbrrJXHT2ltxbBYyICI6z4ETU4sAT/flQe6FKh/J5hz7WQ/qRCltTgyrdqiLB0aA/eUZnpCx8QpuepKfkIR5rNjPSeMe6z5GyZhfhsPRr3TOyASbsYD/0lEVhKcFpU9fpc9EfSCZHCtlFDWyGjBv0mryEWIdmWij3rZuXwgF3shua8JtE1TuoaF99n9qDAUriDFJGY9riFOY0o0PlqEYG0unBj1227WxnHIFcNajajJfqySKYdlGix5ONmoNHONMOhqli29ZFJUhFVj6sW/8MMjPBvYbbdthnkg8feFY/PoVq1iSB9RhlzLU/AgqLb87OlWhHR8j4FD86YbTlotolsqzecD3DdbOc4GliRvuocAc1eIGACsFLwEUuJ8GyxjQrHRsYcjCP87TXSlLG1asdQgbLA0DEnmd5O2qPDlVw0PZLqU79EqZTJDdzJrCMgN0EY7emCOgbzUUtiMUs0aUZmnQQtvGlilUVuTpEEQFmgqoJusuWgMlEmrC0afn2ly4K2adiqQWVJmUytBgG9O08GgpX3gH65X1PRGqOhQE5Bqvh2fkBkwA9P2v8HdqCxU6E+3fpXQr8gIwUr8yBLP0xQ6Fbm1kzkSgMWaFQ+T196HrCmKJlPoXHvGw7CieT1pdkHjF2enuk+gTGZEp5ZbgkKbN6aCPw2Nc8iOyCPsMCIb8LYPxoD2XX5nUnoEB7PXCE+oZy8Cc4ezG+1Vl6acVcRL64YhYVpFsA8xzFPniuEFayjRaCqekmdspmxfd4e2pyoN7ysnUAiM8T2ReFB0BaSi3+phQYnQ6+SKjFk8bbgNjPeazoaiOEAgM9qxPlhJERiC9/4YNgmC7QMsdEku1FpPTNSJt/5wTzxjVhPHJDk3DFCYPkmvDD5aHNUC6dPvRn34bbEYTlUqMTEOzKI0iWT1PGLSmN9WW5iwKs65FRjFw6jrnhjqiLWfhiZnT1gPYoRq3G2JU7PFaUdrzf2wlC9pBTs4wMkMldZJZQAf+HM8mO9aIRBkF8AdvlGiTQFrsgBkdv7szPqOIazfXb7Mi8A1OzK9e0VkKVxmL2H9A5/T+qXKp8pXhyPid0kaezhg6fdoFpmzaTbOSGtIE3bsyABJW0aVksDkAliG13mRvcTKIrV7GJgTqEfb1ESEqKnq37E40DMba3VTlL2i9++Cdmkfq0zP0KwefpxQgNinGdksqLO4Ut6Nq6Q9UmIOtmd2eIjiIvi0bxebHCfU2Ziif1V6Z+mpm7g1YNh/3DVUoLg2C9QSireDiZkDKa5egoyOZ10djLWlpU0/Fc3GCc5rJj3CRJGdWdJUv+TyVm5KDWt9QfrbrDfOvSEtMKtHYQngCOkLYVTBl7y0mFRO2uKgadJYf3mT1VFvNdmeLQdzXJhA19OD8miZkQKDQoLaZQHeBmicM5nxV5S2ucoPnUQV/QUSuKdXrOqNPICaiH3RneuMs+/9DpNwXZYkD+ekiyD+T88k7XmDjwMoUiNTupmz0CjRbQ0jevAzntvukn7fbFuP752Z0Q59QFYtDGQrsI67rdaaV6vPIincecK1sHizZ9oRCXI7QNnsiQrwbHBtvIFLE5SdDV1BN0C5nzPntaeEYtpxXHsA+XNBP2QIBUHeJsIs1eOjvX20hCeXlHlzWdVv1LZ1U5AbqMwYnVUsKSPoXaezaAXkUkvGHKfx+VEHiT1NZmlIHWZiWCWEY9HHpL1ATNbEND6arZPXVRmmoi9A40L25T6QO4cMQ/UpG4kY09fq1riJ8spX1GMIUcRR3UrJhbjiXvs1b+4HQITusmgSEta8SUAOSU07zDlRDf4beDlI+trYqCSUN9EWnapZaIb/qRTxXUcwuHL8jXoXHNEvJXe1p8n+qGQay3QKyUH0kC1qvqrPtJGa+Yav6nnlHAwXcmsDdGj3bTnWPuVYNFRe+QogGhMmenpGbxYBDP0EvZTNR1uy0dyqhUT4xhWSsafZCl6OyS+oMHrQuhk7EbiJT3vQ5KoQUMUG/b7jOw6T6fME9zcwi2ASwUWX/0WuWAdK7NbUrs0SrR/eOoFQTmpwQFMpU0QcYXg6QUzaCrYfDzo6HNPMxvRdXbUpBREDffLQ3B1uWw2M14GoBuhVVo2Sr1Hk4bX2dlN4AK4b+dEJzyKHidqcUqp7066kI0DGjnpMZxvDLamzlZxY/G09RHF5X0vMTkNvPlLu0M+argAmo0WeGfluXyx7aa1hGSxqDvHrRWET3t23xaQN4FJep+jHZPgBrqlZyOdvFY0pw4RX5SY4yCJttrDTehM9OKK0PpgVk0qNsQSS4+2Idr9204AM6Cme3ppEk5K4S0SUIs8UBwyK5vnT5n9GkGLZU9+VSDbaeL2LZfUbknDNjDtjG7HHv0dPhSpuiUa+6xrV0GzGfDNCJNYK9QXtTiHiwfxW7gf7IxCD7IfnUy+CkkrLyVJL7rdkSELy4TVUCfGb0091FDby8Iu8lwYgRzF5NfjADAMqMHKZ1ecDtxAgovz0Aht37BagEGlnVyNsdVaC0upys9EC1XCRdDpjaI99vFYA+hBhf0sw4PBCfHbDWDE0tF0jL4GC++yHd5hy//w1sEGLbby41q6uxJB4Ezl+E1Bbr+ebTWhbLHM4feA5z09YOLQiUmIeQYQZB6N/ZboNtGsOAnWJkYae/IUMB9aSKkUL1i+J4Z3sS+2fGoX0FaScdJ7LidtPqg/XqCkgawpMHW2wUhrM0yeNUThLqlxq9uK6rQvA9vV386begplNqh5jvZRPMlU5UR4pl5o/EURgoQnaRUjIL+l98Sd7FcXbObo/91+rIilrQ0L5xepUIyhDPcYQ1pJev9SyRtGqLnncf9De9BdiiDHTmLyhhAK3Tza5yWBok+XJKnJdq5evyXCgi3mUfyeGAsxrjOGxuUmBoesuPC8vb9VO6T64/sCzJPMAW6bADSYMwdn/UUHKMeiFPZtNnibearlcjrpUwF0bteeppXbkXi2er7OapB1a2+Xy4M3SctdX5v9iIUgDeGxMa0AhCVaKyaivDxSNv+t5KcB1fd+X6Wy2mtfd9lCNXJip1PSjcR/Rq9CJf35zfba7CGbp/rjOXr2D4ANOY6VCvg3O7QozIV/aVWavafTb7Y078Ditj/d85i3zQqHWWC3cr8kATmsKWxqM2/F4P/2MmYTe/i468OoEr8/MMEkzunaMXO/NanFWsXtsxD8/j4cTCZoQ1opYYJhyBhwf+NghXC8VQnYnWIal0n/5hUusAhh3EUoyDWdYPgPeVbeiznGclngd6hdd83DkRrPQjxOGvGygTvpzoJCrGDYhzF4EpiZde5sl4XiE4AwtBHWOJ3WdtIah681mXiddZ28Qw6+ahoxhe//PMrteLpXu6spFQyN+4+RjoLArejGkSicQgsWK9yy9dcfktk4dQ0rpnNqG3CEM4aXJDzScbFo8pWKoBak9Xgg2AzAmR9pzYyrLZIii1gKRw/1g8Eqs6NPhus0B3HWl3iqvYViacnnmFYYYukIFk1Zbxhj25uTM5kMsoxZkmT94tWPY2gGVqQ8lq7hTqpp7gQsjGqcG8rbnO7Q9bQXGHQy/+zCET8oF7tBRXkkYvnV/ccyQjttO+ObRRUexKJuFEHINjOxddBvL2WWAeCpB63fRb2UMmyU1oUu7GAp9tBtigKMuv3qtaewCYLTE2VY3IVlOu4rYKPJ6WIHRGnv/g8kYN1c5hazEu+hT/jGG4nOoJ+3QcPMmFwBlLVI4cAVqElR9O9Y2nsSR0Y+bDHAf0GrCr/rr4RVW9sJLZ12XNU2DYS+XQpC1S2k1roXhmx1iJnl2cr2x7gDaAxfeqzk/EcpvEkVli9J1+XwrpOrTNMsOhvVKvfYxNVr42bkj6/5kdRl1asA1ONL+4ZBoDFUEPzwcDcZeuYAdibx1T5+mAT3VsocmVjMbpTNoc2n7gTqwU8CUD7ve8wn8lfrjHcVh7JhfXu6RhHeWKm9grvKQVZd1p7toHw2hY04nthjt92WL/u8xZNKTemotxcNZJPuFDf6KM9mvCcsdzoU0J9UrGQeB3itTxwDP6lzLPk1mKJoGYovbD+OWgBXnLzA0FQRZMlqr4adYm+2IW4AjVSJ2cKEKpe/5pgzdPvBL0dKZspJlhTdB+vR9fMixRWa/FBbpt66xAFT3ZIzufj2HBAk9Qzkb3FGk/QZT2s0PMIRHzeroiVJQED1dPoie8SXFS2tRo0RVNLqS4bV+Z3EIBCzp4JzJyeB6dUcGZlW7ElMCMtAnK4BKfBgSDbmW5pPVQxT2VymrUFo92rWy0hHka2q0bzFYzDGMA+1PnZaiCtkuiuSiL97H6bROiYlP7rJFdZcftFqkqnrj0d8auQ48qKWSrW1X59UqT/1sAwvZ6MPCq+eN2u1NGZKI794tPQzkQgUUD8Hyg5JN7KuKacNMpYcOSoSE3+skJPFpb2+qItrtAwGDpWRPZ92BcJqgryytDXquLaKMcJ3zfgM87O4CiduMj5fAtbheTKZcn9UAUpj2kWrb1B1+WW0Y2Y8bMXe/cTfwW+CKCGkHHdWg+qeirP67IBRuj9iIMYp1sW6oxg4bnGct6s3wKrvr4ECcMrwZoHZC7XNaSq2XgE/8+Yty1nqAcMMaow0Y6owRhkakRVPu+iNIJzNXc16uRi/j4dTrLjqGCiPWABy9RTe9lcirfRXL95rw8oM1TugzJ4gHVgIx/IW3QenZ+h2L1wuCAOc0GuG5QNbIO2lDY1dWw3BH/med5ynO6jeDxbyLIZzksYyiQ6AeA3bt20PeAgj9Y6XGlBQPGI+XOxNVUKlV3NLAm+07kdEaF3n32mfcpJJNQjXxa7aubY+qhjYvmr686ygA6AeEEVdckgMglGlTJfUzUD3zpn3q3+Ok/EFVKzP9AlYdh+xxvuaOonRqxaxYkmoReWlWPTaI7OlW7oMDegQ/iiEDoBbSXiPECMz0bSj3m7wFXMfdhL4YwfFSfRtFVZWpt/TnqqVDYalr3XnQbMhsfwFp8UX9bSJlX2EParc39rer4LDY+thDEnn4A4uGW4pDDCZoWqEL7AMb42pdFF7CrJ53y7bdaDS02blXBkgs2TINu5XfNII4NJvbZfJs3KjjvnwG+q23t/UwJi4873wsE8gIZaDmGHXr6a1nanIRXZ9ScpsR0s4tp5V9MnYlLOMcVkGqfiO1YzNDj75xaP7iT3SEWDcbqPYvxrdAQebmg3UdiuSK7oEoWlKUMi6LF+pCgxunrKPmo1UPCmQsZdxh/oAkrTXh+jIXs3PxEPDUB92y2PXIHWWlVtr9hgrPUXPpG2B0lIwq8rgVep4XLuRJZlTEuvuAyfBBMzq/htr9INtlJpqqT0qOuDPCI489gCBOcgG47UFRn5ytmrQZtQOyQVdjWy7jl5PjNUGH+UpnOE/sGQCZDBkhQCkOV9Cu31pTgB7HhLqmaYSgR7m9Fzew5oRikw2gvXi9DK5WejvZi+IhaO5xsahqVqIzw10RUBwX4EUAABTVSURBVJfZ2gbHswX/qMkQ9h+v+loiip7b0Yfmob/nF0IRU57LVtQuWRp4zgVXsS6XquStV/WSBWTnZDveNpAYIjvVvgSMOCGfsUkR1Mst8IufqN3eLDpIYDiNFunxmE4WFNXi0PwGn5RnxUkuPSceAknWXONnK4TGUeHicDUyLcuyHcexTOwYUSgBLCRlq97mG3Bre/MIEHTNfRd67jFX+UbfD4XGnTQxn0KKO/DxgYuGikfJVNYyXbddu2uW+nJNQ4k4cnT4wCspVBLhFGg99SD9sR90FTrYhPNoMH4aSiMiMJFP2lFyahxb/jmOW32pBEyfNc0koJuNEjRqqKg2PYgCOLXzcXo8Llm2j5sToqxAYWPaZC97i9ZABwXokT80FOpJp4BlEDoBq9bNeksJPHGCE1XovG2N6QzATaHWzLLOvKn7cTEvf8Wi5sYfa+rt8UXOFFZ4566tWJp6b0zDohSAIH0mqK5XZIXU7UMgPGFrk8mgLhZJal6VmkTZ2aUW0doHfns+POg+r4P78zf5jEYAaCxB1mgvoLrOdI77bSzj6CequgpqKlA1g5bU6W40FZR9tp/OJSZ2pVML6qNuDu3OU2wqehm79TepoZ3sc2eqcZ5RDwc56UxFh4EaB6WTVwcYR4kaET6RCy1sWoLLZXMtXjxaykO2h9ALEmEXnrOJ1gAOjPvaoY1O6noEKR70UBXEoYr37g/xxIqlUr416KzpYnYAlygKIrVm6Yt1EnZS7+a41fjzjrEH6iw60QbfsatO9LXSndSUfUHo6ZWqELiYu7PREMXTlL2B5XPgY+gjClIfyuCTv2YftNhQqIpVv0TYlLzuVLcQlySMfMciwbfni9VdD+i/6cxKFxkcN2egQr2PHKqW1sZLpxCdH1W2hreoXWooCzxkMWxQ4Z3O0A1gp8y2ULKCfMChUD6SNII7kD5o4kynuAUE7TuVRrCbErWW7g1oEpnPZmmadnpCGSVRiOqLaUcDTDdsHCbdrJ0DIVgxS+OtPTTNSf51VXZBc2sMqEXNtEoKbF6wpB8qzQPEi3e96KlYu94IStn2FBYzIhzhlZ3pw1cHk37IaLrZs8GuFXW8yuk5rc3El/FQoiC3kTZcR1iRk1tbG/oa2HTP3TGUZ4kIb7MU8rW5FuuIzuyogXhyJkdDY+DsCzf7dQ5vHW8DTnIjB5k2iJEMopaBHnNNeUKDx0pfRFQA9jwV7sACsrey/1DTIuYOOAL7ocgv2QX1LMcahBe9PpO8f5wqPNQOJWVIDpg8/M3yy6qNkQpFtV9Q2O6y701iDPU46CORwdAS3f6DzifrIkgbSElJVG3dxjoIN+aqd6Jqu0+hD6yh8vZAyjttzgIeKKhXHQeJpeR2WKftj4SLqpSdGobyVE7iLewDDQ/AXWStLfTJ64QS957RPWwGQPtriClL3JpUa9Rwf4RDwpbAb1mTjIPvseEDV3ogBWgfxYQVSdMjzN4G6fHrqhjJy7pMV5G0vVOP88xcSATcgc1qF6RwNecMSlmKrL2KhOMF+hyH6F8VHUcD0kBnRj/QbjSHsN4NM5m2g04yGei9mciz2GFtMEw2EsdGcofO2F9OJlEyi8S/46Yk0HQl/Vh8h7LbtgxUtKUKaiEi7O5o0N4dgnVhh0Fv2tAkNhVEBP1RtYv9sPlU1uN+kbahwmTcEMR1B77MEl/iSdeVUcE+yCPGjTvRBQ/j/QYKcrD5paUuhC3Pcf/JLlAPQQHAzehT2ofdk/oFji98Wjht7fCCJfaN5Gv96D5afbnX2sHYcDfqsLaG93j5KuHghnGzXsr2AGvycaJcolarhfUFdm1RQ9eq5SnBhynxavUqW5cSWXQ9BBnWGxPQTlsnQZCGz0kAUS65PM3yap+6uKTLrWurDx3afjTLTrVcPrha0cIDlPEoVjqUq+n1iuk1ezHDQxD5mDmtdgk2NokgGTv69KoiyNM8XEzkCElUfLcRtgtBCK/tNTgOzyv0K5xfuB+IDlsf2OFdaVZZbCrhzQSH1cpL0/yqatdiLU/doXNVczwri9A/abtJzdQ4cjPF4aHSC7fNL+I+MHBVL9dguWVJRH6qiVMh2xn+MgI2KJr2LnQbaU62UBSqVrIh0TSt3hZvX/dLvpr3vaE8yL5zesg0NqCVskQpearJKCw2nZOYvVjdwM5OLu1C1vzclJsDwUvv0WChv1XaeLINW27X4/GoLX9V3vrK9hB2WVKr23mKVKPFX84lntSmguCIoDqrdfpUmWnshpOSZd68quNkSwHXXNX4fQJtokI8cEJEANtTpT+A27MWMxRGi9aIjGwidZI13SbZtbVYVXxfqywYSaE2R9zUGx8y5NTbo1s7gV2a18oyoOp9iZjX5h5j/RociPhgdarlhmXNAcgAHDzzpZgTUxowOMyRZjYnDstWjZNnCXO4TZIkLfNjLn4G86k9bNZpVpwPpqNkZbFfq8jNWc3ipTmE/UHngMKwBg9s1RgToo/Xh3hhEwu2cpr1i8F5qkBAKEDKWhaTmerJ3ug8JYJt0vYJvz3ghDH752wwPKZ2NpZTiEAZOXHJBPTXsVXiNyPGw0gkfkVC6mNbjCmI0lzQwSL+haeNAjW/7mgBtcURWSuUcbO3qD6De790X5ejWuOJRE8IAoXOMnda1mYJX0ObNXERcoQl6Ep0ZA7G3K8ViNNOT2lAB7rS2ma7MdOA5SOxraTlFIghzGWXBNz9YA6sUSqThN+X1IsWrq1NmeNso0N8k4mATUbpxaHMkHPM37wCjjKdB44ZHbZUGBqrrwfP4zakHrs/Fr7h0Xd0SLhuMSjvi9Pr0ny2lcBYJthuIauYYaKaius9X61W4WSyPAibmGRq3cnuzjKxkA+5tB8/IdWw4O6Hk50WIU64ESXy6s+LqIHCzu0tpdAOvThjm5ZQ7gJVXxNKolVyFk0/uL82FfLq9MDZg+goSZp2nK4EpnbIa1uCHV3VpsM+PPDPsYLzTTkKBkTymAH9WgiSixBOiR1DYexdF2b4a1QvP2R1Sns4jcoXyxbAnFWylDljv5QL3w81q8cgorPZBOa9ygrQFe0vsbUOCtm7HZhoDH3yYrVD+SCp+qDdfJdu0z6GqC5aPyW1sTaHjhvn93tVM+2mqi7re56M6sMt7bDOIj/iPjbj3Oljhb389HMz8JSSA7fRfXPUjEnG8EjnNChbeAEmFD+RNX7VVEE2qob9FJ5en2MO/APCKjL1yG7R1DwVmd7PVlxohWl6oLIv/HLPNJSPwAqHkhuQfVCbB0cqQbqqc5COyf+U4EqSInBC1S7SlaOy4clT6fnvmMZyw6xxw9d6OImGALFPB6M4xbfO2migtzwifXr5pNESXAiJDJDqTb3LTL4RRHBHy2LDSYXVk50hp8paxPc1X0XuiwDRHi2TrCk7KdaT7oXQyaZu2evf4j0WGsrhDBpSYNeNpulIP+B3mIEtB7TUf3VanZhpiy0AaXatMEReOd3ry8One3wIJwtYeRoI0bPn4pdoEs4yNYbaZH1ruuDBlZM9H3xOC2EL9XVz+GzPjV6PP+MnAQtmAk4DNf4p3go6Fl37EThmm7NWHK48fOSVnfza5vk8ne7VOr2dTs+nbkQ262TReYj4wztT4+41YogJjqPW4RsPA4DaBmS9RecJ/YCdD7YN/RUERMALCxsm7q3fiyBOzR/rBnKbfJIORtglCyombR+TKA8hdS/GDnL9zhIOJ1cB0yjytKdXfVw7gOmsL4fPGl9qd1lgjLEJXhXCAOh0wvqt2uMtN153zuZqw2WdzjXpa1TbwYekUmnTsb+qfa594pgRG4EQvq0AbgCbbOSc7Kpo4Vv+PzAnVM0+hdU4rDPzr+pSrwbmcJJ+vcLyfLrdV5bZcyf8Nc4F98FG1j2sQ389m569DeAKJ2zPAUf/k6Yg9eNXPGVY88w1bPUYQNmcwXkYsdIRpL4ezIE2TCV2s9ztIUir62aDS3Fn+HGp9sFqUROvy1kWlFUXE15WKGJrVNc4Nfdgx7ATn6DzUe1oA9jKP2IVLDNaLCP2r4cHKZXbkbQzDYLaDLdcVeWPqYv7tLcRKNLReNrtmqv+vsjA+G8tbi0PzxY6JdOphCwGuTh5pNXHYEoVNeXYNlW+gX9h6nEhG8gLVuVWGa1z9j4S+PrKVgPKER7DEcLWU2QZqpJz6/3RdDGtQ4dgJY12PPsBYM01iO5Moth+Ahx+Dp97eNSdd2030Gsh0fzsEzz1zzFks3axmN7lPR/iWvulR8QoPRRw/dTtzZFyPYDLWnDa7p1/wXGoT0nR5Zk/qBItBiKOvE+8pj5oHuw91x725B9Cr+cFdSTNxu2LLVT0icltfP7K4eMBK+Ihqs5cPboSYXLG3W45dzMP4OK93P3bHfgbvGpwhBcBnlMCWe1NAgIBVXz71i0OTnwyYIvovX9XFyzZPRBLNGTSQJlrNChU91qGwvXfbEUI2XZ9f3xt17hgw6tqzCXieL7N0BysCpl4kncMMyk86rHhvwt0hlvIrl/RjpesAJqiiWtK9l1yUAqolLw06pD8LZLjFFfRrBtYYDwADi38BH5oEYopa1JuNgtT9tcQ5EouKAikA506vYJ97EWY2WPMhu9t4T2i1rOrV4ervQI7nMGKWUoYCr0CMwdTOvp17onaqTkl1HyQwXb1xN9vAHpLsCJBBwKlVuc5azKJTpCEWGiWccrxRtsnF+/cDKEo3GgBHnDAzU0hlUlnaH45Jlb0Jwo/oKqjhCPUh2Od7WbUr54/Auz+AannOfL9UWq0+lmLskkr4tLOZTYBZkXBOIjo8O02peFR6GLnJOYGzsU7oN8PulnwYQakypbtoaP5w06pGPf/9qnqDcBzMSN1WcjWnHUNhKlexX9wsf0m29ECJbZWyPQrHQfrR91JZFnJDVfKjhAbZIDcCnd58qkj1CZx43WSNoQgTOyiIH/nL/Fn7WZgsRp4TTYK92mhuZwajpAnjo7X2gkqwX3VK8eX37SXUjzLh2MMwCfC9LKH90CHC3fLHqYHhxM1VcDSWaAN/sAjWNx28gfdEX2MI96G8TCsOlM++KmznfLk6QaLcsF8FtwNOS9by8k+I5/Azglg/D0qixxOIQbNmMNBToyhk2l78zl0XG0kBVGL7n5Po7UxpLlZ4bruQT6z9xBnAJkhisg8C7fvZu6Nk8ZlI5ZQxFBWAsMCLJzNAtMiPntI+z1uvcisFzVWcjCbT4P6H9Hk9WaYtgNV5o26TouJi8xI3z2qV6D4Eo6e1dypuYphACmmIhDcvMM/YNzkQCWtp0uIqAcobPVGd/m05Hf/HfTg/+1T2gpq4XzqRGJw4WSdMhJQHhLLtuFaUDNXuVSYiESomSjh/qnkmKWNF9waucUVYL5UCrdPNjF9BlS5c3R5YcsoUn2JVP1tjyQAt2sdHGat1PGci20Rqe3OSOwvoyrBDk5vSG5TaKFT3tqQTqqM1wwgD4YZqfc9iX4HCLEveCQV2FXbmsKtXpUVFFwpp4oqHIdHD2IRXlILIG3Cz02eGbiu30vAUjcq66ECSKjXft8y92Ow0YO/AnuSMBSB0wxcm4yStuDeYPHeaKUjR0xDkrojaAp0Ku42fJS9VhoulSahCvBIndo9L/87YNJyBaxbcgnNmvLheq6C/oe9/qDGh6sdDLv5Tjjz2NYlRAxTpCQeSjYSX52CV+M1QyrMgf7LfL513fvsD6EIj6HldVx75rY6ubZjvnYOxX9+yGYz0zumgMsMCj6XZ7DI+EfMx9QZaI9rYEFTiqaYtmfwEvefIyABlUhgxsnneuVDd51Bf+tePQXdRGyuq7AsoHAHugpDRZzppep6RXvYLjdnxdM8VlRmvR38WQrW7yZhwIax1OHfuPBa0SuRH8701QhHLqOBBzH82vU3n1Ue5h4IP3Th+eCL/JPtyn8NzBXVmoDCcWKe2nrB9n1Pf/G/k1anU3Xk1bkftoTiw4ZEM2ODLSQOqOOuwZ9mTg1YkWLLdZ87O5fbl2mZliXBP+zR6EMamLKEE3MYTqNO/1GYklRghsGcUEFFwUcB/17Wwqw9335wZZ+323II1ESxKGb2n1cw7eHxhp8Ew5aAczRZ2Lty0TElPRf0091f8RLkFQtruHb8+tej3d8B8o65Racd8Eguwe95iaZZm88uRLI0eoMvkU3R0v6jk/48WEs+5hirkP0Zj+a5Z2ZViNXYyDaYOn7N8bym68m14WsMjGKtaO/N5c25CH8UhnTYhvBrACf7IDca7OLFSEFGCc9fyQ6Tsv56PpFlJ0WFhW4O9/bZxP+cjegFn1o9G3fcEzIMsxMP7LQPVRtv9sqacoEC1nJVFzk8jlg8Zq9YndLpXf+onegMSu5N4/onN6m3856z1aTeCPs60afFJaa7VHpkXuggCNfjnRjZ8sUz/hGQm4cH9oKNxZXWY8aTvF65/35ksuecxKbzHPmLNfXD5KuuIS5O6QL3qCzkDtMstH/mhH8GEM9oTdUw38kCpcRaHE9KEdspDcPIn7+MVEejRRQeSqWif3M9+ujIuaEskluHr9ngXwBzwrxarLlYT3Cbtve+EE5amobL0B8pEIVhnOfXp7bCv7mlvBXKl3ZW4Df4X+IHYE+4zKu45iGlH5woLK+t6oSi2J0U2BStokyBXcglJ74nO+ufs/BfVqA9YEIlQr0lu0jZWljO2I+rx+ZdcSmgsXlU+WRKqAxHUV3C+cjdT07Y+nfAjetC2VMuFCl9ajn+Mr5n1XXTt61kt9ldqvtxNvFlDaaz9Or9z7ss+CHw+J9AlDbNHy6C44a15AydrR8GQTAL8htBKf4K/a2vbIUaT1bHpobqOsMFkh89838NGi3uTsp6jMXmmgWHhaMfYWJOCbRk9tBdHOL7oylRvKaRVnz4vwclILLmuVYA9cjycBJtR/OeoTrzkS9UarI+KzfsLnv/vyN8/WBHQabrUUHPU5mkwVLCRHBsmn6d2juFdmtvobaG+O+CtZjEPbubixp61M4lCSfb/zr1BmoUYTuuH5TP3csyfYn2eXdNVyPXUR/wX6dhcyaVORwvVof9fX25XHZYuPddFPhzc71cbvdjcFhuW4to/3XsEMxOKtOxHX+xFf9Fk8kCQW/D8/8DrwY0Nns3drP180/D/wHsQIHB+P9ZFgAAAABJRU5ErkJggg==,",
                   width: 65,
	                height: 65,
                   margin: [218, 5, 0, 5],
                    style: "images",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,

                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 4 ( " +
                      self.receipt_data[3].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[3].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[3].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 4
          {
            columns: [
              {
                  image:
                      "data:image/png;base64,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,",
                   width: 50,
	                height: 50,
                   margin: [20, 5, 0, 5],
                    style: "images",
              },
              {
                text: "บันทึกข้อความ",
                style: "header",
                alignment: "left",
                margin: [180,5, 0, 5],
              },
            ],
          },
          {
            margin: [0, 30, 0, 0],
            columns: [
              {
                text: "ส่วนงาน",
                style: "bold",
                width: 50,
              },
              {
                text: "คณะวิทยาการสารสนเทศ สำนักงานคณบดี โทร 3060",
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                text: "ที่",
                style: "bold",
                width: 50,
              },
              {
                text: "อว 8113.1/",
                alignment: "left",
                margin: [10, 0, 0, 0],
                width: 305,
              },
              {
                text: "วันที่",
                style: "bold",
                width: 50,
              },
              {
                text: self.export_data.summary_create_date,
                alignment: "left",
                margin: [8, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                text: "เรื่อง",
                style: "bold",
                width: 50,
              },
              {
                text:
                  "ขออนุมัติเบิกค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ประจำภาคต้น ปีการศึกษา " +
                  self.export_data.summary_year,
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 20, 0, 0],
            columns: [
              {
                text: "เรียน",
                style: "bold",
                width: 50,
              },
              {
                text: "คณบดีคณะวิทยาการสารสนเทศ",
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },

          {
            margin: [0, 35, 0, 0],
            text:
              "ตามที่ " +
              self.export_data.person_name +
              "    ส่งภาระงานเพื่อประกอบการเบิกจ่ายค่าตอบแทนสอนเกินเกณฑ์\n ประจำภาคต้น ปีการศึกษา " +
              self.export_data.summary_year +
              " นั้น ดังนั้นเพื่อให้การเบิกจ่ายค่าตอบแทนสอนเกินเกณฑ์เป็นไปด้วยความเรียบร้อยงานการเงินคณะวิทยาการสารสนเทศ \nจึงเรียนมาเพื่อขออนุมัติเบิกค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ประจำภาคต้น ปีการศึกษา " +
              self.export_data.summary_year +
              " งวดที่ 4 (เดือน " +
              self.receipt_data[3].summary_detail_date +
              ") ตามประกาศคณะวิทยาการสารสนเทศ เรื่อง " +
              self.export_data.schedule_name +
              "\n พ.ศ. " +
              self.export_data.schedule_start_date +
              " และที่แก้ไขเพิ่มเติม รายละเอียดดังนี้",
            alignment: "left",
          },
          {
            margin: [0, 25, 0, 0],
            table: {
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              widths: [30, 200, 55, 60, 65, 62],
              body: [
                [
                  {
                    text: "ลำดับ",
                    style: "tableHeader",
                  },
                  {
                    text: "ชื่อ-สกุล",
                    style: "tableHeader",
                  },
                  {
                    text: "จำนวนที่เบิกได้\n(หน่วยกิต)",
                    style: "tableHeader",
                  },
                  {
                    text: "อัตรา/\n(หน่วยกิต)",
                    style: "tableHeader",
                  },
                  {
                    text: "รวมเป็นเงิน\n15 สัปดาห์",
                    style: "tableHeader",
                  },
                  {
                    text: "จำนวนเงิกที่เบิกแบ่งจ่าย4งวด\n(งวด4)",
                    style: "tableHeader",
                  },
                ],
                [
                  { text: "1", alignment: "center" },
                  { text: self.export_data.person_name },
                  { text: self.export_data.summary_bonus, style: "number" },
                  {
                    text: self.export_data.schedule_per_credit,
                    style: "number",
                  },
                  { text: self.export_data.summary_salary, style: "number" },
                  { text: self.export_data.summary_lesson, style: "number" },
                ],
                [
                  {
                    colSpan: 2,
                    text: "รวมเป็นเงิน",
                    style: "tableHeader",
                    alignment: "right",
                  },
                  {},

                  {
                    text: self.export_data.summary_bonus,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.schedule_per_credit,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.summary_salary,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.summary_lesson,
                    style: ["tableHeader", "number"],
                  },
                ],
              ],
            },
          },
          {
            margin: [0, 35, 0, 0],
            alignment: "center",
            text:
              "จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ โดยเบิกจากเงินรายได้ แผนงานจัดการจัดศึกษาอุดมศึกษา งานจัดการศึกษาระดับปริญญาตรีด้านวิทยาศาสตร์และเทคโนโลยี ",
          },
          {
            margin: [0, 5, 0, 0],
            text:
              "งบดำเนินงาน หมวดค่าตอบแทนใช้สอยและวัสดุ เป็นเงิน " +
              self.export_data.summary_lesson +
              " บาท",
          },
          {
            margin: [0, 70, 70, 0],
            text:
              "................................................................",
            alignment: "right",
          },
          {
            margin: [0, 5, 90, 0],
            alignment: "right",
            text: "(นางสาวหรรษา รอดเงิน)",
          },
          {
            margin: [0, 5, 90, 0],
            alignment: "right",
            text: "นักวิชาการเงินและบัญชี",
          },
          {
            margin: [65, 70, 0, 0],
            text: "อนุมัติ",
            alignment: "left",
          },
          {
            margin: [25, 40, 0, 0],
            text:
              "..............................................................",
            alignment: "left",
          },
          {
            margin: [28, 5, 0, 0],
            text: "(ผู้ช่วยศาสตราจารย์กฤษณะ ชินสาร)",
            alignment: "left",
          },
          {
            margin: [30, 5, 0, 0],
            text: "คณบดีคณะวิทยาการสารสนเทศ",
            alignment: "left",
          },

          {
            pageOrientation: "landscape",
            pageBreak: "before",
            alignment: "center",
            text:
              "สรุปภาระงานสอนเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ\nภาคต้น ปีการศึกษา " +
              self.export_data.summary_year,
          },
          {
            alignment: "left",
            text: "ชื่อ - สกุล " + self.export_data.person_name,
          },
          {
            style: "bold",
            text:
              ".................................................................................................................................................................................................................................................................................................................................................................................",
          },

          {
            table: {
              widths: [
                100,
                25,
                100,
                40,
                30,
                30,
                60,
                30,
                30,
                30,
                30,
                30,
                30,
                30,
                30,
                // 15 col
              ],

              body: body,
            },
          },

          //สิ้นสุดสรุปภาระงาน
          {
            pageBreak: "before",
            text: "สรุปภาระงาน",
            bold: true,
            alignment: "left",
            decoration: "underline",
          },
          {
            margin: [0, 15, 0, 0],
            text: "ตามประกาศคณะวิทยาการสารสนเทศ ที่ 0045/2563",
            bold: true,
            alignment: "left",
          },
          {
            margin: [0, 15, 0, 0],
            text:
              "เรื่อง " +
              self.export_data.schedule_name +
              " พ.ศ. " +
              self.export_data.summary_year,
            bold: true,
            alignment: "left",
          },
          {
            margin: [0, 15, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "1)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "รวมภาระงานสอบ(ปัดเศษ) ข้อ 8",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_calculate,
                alignment: "center",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "2)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "หัก ภาระงานขั้นต่ำ",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_around,
                alignment: "center",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "3)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "หัก ภาระงาน Extra workload",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_extra,
                alignment: "center",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "4)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "รวมภาระงานที่สามารถเบิกค่าตอบแทน",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_bonus,
                alignment: "center",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                width: 50,
                text: "",
              },
              {
                width: 250,
                text:
                  "ค่าสอน หน่วยกิตละ " +
                  self.export_data.schedule_per_credit +
                  " บาท จำนวน 15 สัปดาห์ เป็นเงิน  ",
              },
              {
                width: 100,
                text: self.export_data.summary_salary + "  บาท",
                alignment: "center",
              },
              {
                width: 100,
                text: "แบ่งจ่ายเป็น 4 งวด ",
                alignment: "left",
              },
              {
                text: self.export_data.summary_lesson + " บาท",
                alignment: "center",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                width: 50,
                text: "",
              },
              {
                text:
                  "ข้าพเจ้าขอรับรองว่าได้ตรวจสอบข้อมูลข้างต้นแล้วและขอรับรองว่าข้อมูลดังกล่าวเป็นจริง",
              },
            ],
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 130, 0],
            alignment: "right",
            text: "(        " + self.export_data.person_name + "        )",
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 135, 0],
            alignment: "right",
            text: "(       นางสาวหรรษา รอดเงิน       )",
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 125, 0],
            alignment: "right",
            text: "(       อาจารย์เบญจภรณ์ จันทรกองกุล       )",
          },
          {
            margin: [360, 5, 0, 0],
            alignment: "center",
            text: "รองคณบดี\nผู้รับรอง",
          },
          {
            alignment: "left",
            margin: [45, 10, 0, 0],
            text: "อนุมัติ",
          },
          {
            margin: [0, 20, 0, 0],
            alignment: "left",
            text:
              "...............................................................",
          },
          {
            margin: [0, 5, 0, 0],
            alignment: "left",
            text: "(ผู้ช่วยศาสตราจารย์กฤษณะ ชินสาร)",
          },
          {
            margin: [10, 5, 0, 0],
            alignment: "left",
            text: "คณบดีคณะวิทยาการสารสนเทศ",
          },
        ],

        styles: {
          fontsmall: {
            fontSize: 8,
            color: "black",
            alignment: "center",
          },
          numbersmall: {
            fontSize: 8,
            color: "black",
            alignment: "right",
          },
          headersmall: {
            bold: true,
            fontSize: 8,
            color: "black",
            alignment: "center",
          },
          number: {
            alignment: "right",
          },
          images: {
            margin: [25, 30, 25, 25],
          },
          tab: {
            margin: [15, 0, 0, 0],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
            alignment: "center",
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          header: {
            fontSize: 20,
            bold: true,
          },
          bold: {
            bold: true,
          },
          anotherStyle: {
            italics: true,
            alignment: "right",
          },
          table: {
            fontSize: 30,
          },
        },

        defaultStyle: {
          font: "THSarabunPsk",
        },
      };

      console.log(Receipt);
      pdfMake.createPdf(Receipt).open({});
    },
    // create_row(data){
    //   console.log(data);
    // }
  },
  created() {
    // this.get_summary();
    this.get_summary_by_year()
  },
};
</script>

<style lang="scss" scoped>
</style>