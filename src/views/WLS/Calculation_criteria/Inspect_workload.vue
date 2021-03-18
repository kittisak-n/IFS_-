<template>
  <div id="Inspect_workload">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small" title="ตารางแสดงรายละเอียดการจ่ายค่าตอบแทน">
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
     
                v-model="year"
                style="width: 100px; font-size: 15px"
              >
                <a-select-option :value="2564"> 2564 </a-select-option>
                <a-select-option :value="2563"> 2563 </a-select-option>
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
                :data-source="data"
                :pagination="false"
                bordered
                size="small"
              >
       

                <span  slot="key" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }" >
                    {{ index + 1 }}
                  </div>
                  <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>
         

                <span slot="name" slot-scope="text, record, index">
                  <div v-if="year == data[index].year"  :style="{ textAlign: 'start' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>
                <span  slot="position" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'start' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>
                <span  slot="TeachingJobs" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>
                <span  slot="LMW" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>

                <span  slot="LMWE" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>

                <span  slot="PW" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
                  </div>
                </span>

                <span  slot="action" slot-scope="text, record, index">
                  <div v-if="year == data[index].year" :style="{ textAlign: 'center' }">
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>แสดงรายละเอียด</span>
                      </template>

                      <a-button type="primary" icon="search"> </a-button>
                    </a-tooltip>

                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ส่งออกไฟล์ PDF</span>
                      </template>
                      <a-button
                        type="danger"
                        icon="file-pdf"
                        :style="{ marginRight: '3%' }"
                        @click="exportPDF()"
                      />
                    </a-tooltip>

                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ส่งออกไฟล์ EXCEL</span>
                      </template>
                      <a-button
                        type="success"
                        icon="file-excel"
                        :style="{ marginRight: '3%' }"
                      />
                    </a-tooltip>
                  </div>
                      <div v-else :style="{ textAlign: 'center' }">
                     ไม่มีข้อมูล
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
import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fontsPDF/THSarabunPsk-fonts.js"; // 1. import custom fonts


const data = [
  {
    key: "1",
    year: 2564,
    name: "อ.ณัฐพร  ภักดี",
    position: "อาจารย์ประจำ",
    TeachingJobs: 32,
    LMW: 3,
    LMWE: 4.0,
    PW: 3.5,
  }
  
];

export default {


  name: "Inspect_workload",
  components: {},
 
  data() {
    return {
      data,
      
      semester:1,
      year:   new Date().getFullYear()+543, // 2020,
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: { customRender: "key" },
        },

        {
          title: "ชื่อ-สกุล",
          dataIndex: "name",
          key: "name",
          width: "15%",
          scopedSlots: { customRender: "name" },
        },

        {
          title: "ตำแหน่ง",
          dataIndex: "position",
          key: "position",
          width: "15%",
          scopedSlots: { customRender: "position" },
        },

        {
          title: "ภาระงานสอน",
          dataIndex: "TeachingJobs",
          key: "TeachingJobs",
          width: "5%",
          scopedSlots: { customRender: "TeachingJobs" },
        },
        {
          title: "หักภาระงานขั้นต่ำ",
          dataIndex: "LMW", //Less minimum workload
          key: "LMW",
          width: "5%",
          scopedSlots: { customRender: "LMW" },
        },
        {
          title: "หักภาระงาน Extraworkload",
          dataIndex: "LMWE", // Less minimum workload Extraworkload
          key: "LMWE",
          width: "5%",
          scopedSlots: { customRender: "LMWE" },
        },
        {
          title: "ภาระงานที่เบิกได้",
          dataIndex: "PW", //Payable workload
          key: "PW",
          width: "5%",
          scopedSlots: { customRender: "PW" },
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

      exportPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        THSarabunPsk: {
          normal: "THSarabun.ttf",
          bold: "THSarabun-Bold.ttf",
          italics: "THSarabu-Italic.ttf",
          bolditalics: "THSarabun-Bold-Italic.ttf",
        },
      };
      const docDefinition = {
        content: ["English", "ไทย"],
        defaultStyle: {
          font: "THSarabunPsk",
        },
      };
      pdfMake.createPdf(docDefinition).open({}, window.open());
    },
  },
};
</script>

<style scoped>
</style>