<template>
  <div id="Detail_criteria">
    <a-card size="small">
      <a-row :gutter="[8, 8]">
        <a-col :span="24" style="margin: 0.2em 0px">
          <a-card-meta title="แสดงรายละเอียดหลักเกณฑ์การกำหนดภาระงานสอน">
            <a-icon
              slot="avatar"
              type="search"
              :style="{
                fontSize: '150%',
              }"
            /> </a-card-meta
        ></a-col>
      </a-row>
    </a-card>

    <a-card size="small">
      <a-row :gutter="[8, 8]">
        <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
        <a-col :span="6" style="margin: 0.2em 0px">ชื่อกำหนดการ:</a-col>
        <a-col :span="6" style="margin: 0.2em 0px">
          <a-input
            style="width: 100%"
            disabled
            v-model="schedule.schedule_name"
        /></a-col>
        <a-col :span="6" style="margin: 0.2em 0px"></a-col>
      </a-row>

      <a-row :gutter="[8, 8]">
        <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
        <a-col :span="6" style="margin: 0.2em 0px">วันที่เริ่มใช้:</a-col>
        <a-col :span="6" style="margin: 0.2em 0px">
          <a-input
            style="width: 100%"
            v-model="schedule.schedule_start_date"
            disabled
          />
        </a-col>
        <a-col :span="6" style="margin: 0.2em 0px"></a-col>
      </a-row>

      <a-row :gutter="[8, 8]">
        <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
        <a-col :span="6" style="margin: 0.2em 0px">ผู้สร้างกำหนดการ:</a-col>
        <a-col :span="6" style="margin: 0.2em 0px">
          <a-input
            v-model="schedule.schedule_create_by"
            style="width: 100%"
            disabled
        /></a-col>
        <a-col :span="6" style="margin: 0.2em 0px"></a-col>
      </a-row>
      <a-row :gutter="[8, 8]">
        <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
        <a-col :span="6" style="margin: 0.2em 0px">อัตราเงินต่อหน่วยกิต:</a-col>
        <a-col :span="6" style="margin: 0.2em 0px">
          <a-input
            style="width: 100%"
            v-model="schedule.schedule_per_credit"
            disabled
            addon-after="บาท"
            type="number"
        /></a-col>
        <a-col :span="6" style="margin: 0.2em 0px"></a-col>
      </a-row>

      <a-row :gutter="[8, 8]" style="text-align: start">
        <a-col :span="24" style="margin: 0.2em 0px"
          ><h1>
            กำหนดภาระงานเพื่อการจ่ายค่าตอบแทนสอนเกินของคณาจารย์ประจำที่ไม่ได้ดำรงตำแหน่งบริหาร
          </h1></a-col
        >
      </a-row>

      <a-row :gutter="[8, 8]" style="text-align: center">
        <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
          ขั้นต่ำ:
          <a-input
            addon-after="หน่วยภาระงานสอน"
            type="number"
            style="width: 70%"
            disabled
            v-model="schedule.schedule_general_min"
          />
        </a-col>

        <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
          ขั้นสูง:
          <a-input
            addon-after="หน่วยภาระงานสอน"
            type="number"
            style="width: 70%"
            v-model="schedule.schedule_general_max"
            disabled
          />
        </a-col>
      </a-row>
    </a-card>
    <!-- สิ้นสุด ส่วนตั้งค่าทั่วไป -->
    
    <!-- วิชาในหลักสูตร -->
     <a-row :gutter="[8, 8]">
      <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0p">
              <a-card-meta title="วิชาในหลักสูตร"> </a-card-meta>
            </a-col>
          </a-row>
        </a-card>
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <h1>การสอนแบบบรรยาย</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
              <h1>จำนวนนิสิตต่อกลุ่ม</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับปริญญาตรี :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_Internal.lecture.schedule_detail_bachelor"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับบัณฑิตศึกษา :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_Internal.lecture.schedule_detail_graduate"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
              <h1>เงื่อนไขค่าน้ำหนัก</h1>
            </a-col>
          </a-row>

          <a-row
            :gutter="[8, 8]"
            v-for="data in schedule_Internal.lecture.condition"
            :key="data.schedule_condition_id"
          >
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <span>จำนวนนิสิตที่เกิน: </span>
              <a-input
                :value="data.schedule_condition_min"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> ถึง </span>
              <a-input
                :value="data.schedule_condition_max"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> เท่ากับ </span
              ><a-input
                :value="data.schedule_condition_weight_per_credit"
                disabled
                style="width: 100px"
              />
              <span> ค่าน้ำหนักต่อหน่วยกิต</span>
            </a-col>
          </a-row>
        </a-card>
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <h1>การสอนแบบปฏิบัติการ</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
              <h1>จำนวนนิสิตต่อกลุ่ม</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับปริญญาตรี :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_Internal.lab.schedule_detail_bachelor"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับบัณฑิตศึกษา :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_Internal.lab.schedule_detail_graduate"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
              <h1>เงื่อนไขค่าน้ำหนัก</h1>
            </a-col>
          </a-row>

          <a-row
            :gutter="[8, 8]"
            v-for="data in schedule_Internal.lab.condition"
            :key="data.schedule_condition_id"
          >
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <span>จำนวนนิสิตที่เกิน: </span>
              <a-input
                :value="data.schedule_condition_min"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> ถึง </span>
              <a-input
                :value="data.schedule_condition_max"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> เท่ากับ </span
              ><a-input
                :value="data.schedule_condition_weight_per_credit"
                disabled
                style="width: 100px"
              />
              <span> ค่าน้ำหนักต่อหน่วยกิต</span>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- สิ้นสุด วิชาในหลักสูตร -->

      <!-- วิชาศึกษาทั่วไป -->
       <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0p">
              <a-card-meta title="วิชาศึกษาทั่วไป"> </a-card-meta>
            </a-col>
          </a-row>
        </a-card>
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <h1>การสอนแบบบรรยาย</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
              <h1>จำนวนนิสิตต่อกลุ่ม</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับปริญญาตรี :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_external.lecture.schedule_detail_bachelor"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับบัณฑิตศึกษา :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_external.lecture.schedule_detail_graduate"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
              <h1>เงื่อนไขค่าน้ำหนัก</h1>
            </a-col>
          </a-row>

          <a-row
            :gutter="[8, 8]"
            v-for="data in schedule_external.lecture.condition"
            :key="data.schedule_condition_id"
          >
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <span>จำนวนนิสิตที่เกิน: </span>
              <a-input
                :value="data.schedule_condition_min"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> ถึง </span>
              <a-input
                :value="data.schedule_condition_max"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> เท่ากับ </span
              ><a-input
                :value="data.schedule_condition_weight_per_credit"
                disabled
                style="width: 100px"
              />
              <span> ค่าน้ำหนักต่อหน่วยกิต</span>
            </a-col>
          </a-row>
        </a-card>
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <h1>การสอนแบบปฏิบัติการ</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
              <h1>จำนวนนิสิตต่อกลุ่ม</h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับปริญญาตรี :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_external.lab.schedule_detail_bachelor"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <span> ระดับบัณฑิตศึกษา :</span>
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
              <a-input
                v-model="schedule_external.lab.schedule_detail_graduate"
                disabled
                addon-after="คน"
                type="number"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
              <h1>เงื่อนไขค่าน้ำหนัก</h1>
            </a-col>
          </a-row>

          <a-row
            :gutter="[8, 8]"
            v-for="data in schedule_external.lab.condition"
            :key="data.schedule_condition_id"
          >
            <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
              <span>จำนวนนิสิตที่เกิน: </span>
              <a-input
                :value="data.schedule_condition_min"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> ถึง </span>
              <a-input
                :value="data.schedule_condition_max"
                disabled
                style="width: 100px"
                addon-after="คน"
              />
              <span> เท่ากับ </span
              ><a-input
                :value="data.schedule_condition_weight_per_credit"
                disabled
                style="width: 100px"
              />
              <span> ค่าน้ำหนักต่อหน่วยกิต</span>
            </a-col>
          </a-row>
        </a-card> 
      </a-col>
    </a-row> 
    <!-- END -->

 
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      
      schedule: {},
      // วิชาในหลักสูตร
      schedule_Internal: {
        lab: {
          schedule_detail_bachelor: null,
          schedule_detail_graduate: null,
          condition: [],
        },
        lecture: {
          schedule_detail_bachelor: null,
          schedule_detail_graduate: null,
          condition: [],
        },
      },

      // วิชานอกหลักสูตร
      schedule_external: {
        lab: {
          schedule_detail_bachelor: null,
          schedule_detail_graduate: null,
          condition: [],
        },
        lecture: {
          schedule_detail_bachelor: null,
          schedule_detail_graduate: null,

          condition: [],
        },
      },
    };
  },

  methods: {
    get_schedule_detail() {
      const self = this;
      this.schedule = this.$store.state.schedule;

      axios
        .post(
          this.$store.state.url +
            "/WlsRouters/Get_schedule_detail_by_scheduleID",
          this.schedule
        )
        .then((res) => {


        
      
          res.data.results.schedule_detail.forEach((data,index) => {
            if (data.schedule_detail_type == 0) {
              // 0 internal 1 external

                 
              if (data.schedule_detail_subject == 0) {
                // 0 lucther 1 lab
              
                self.schedule_Internal.lab.schedule_detail_bachelor = res.data.results.schedule_detail[index].schedule_detail_bachelor;
                self.schedule_Internal.lab.schedule_detail_graduate = res.data.results.schedule_detail[index].schedule_detail_graduate;

 
                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Get_condition_by_schedule_detail_id",
                    data
                  )
                  .then((res) => {
                    console.log("ข้อมูลเงื่อนไข ของวิชาใน lucther");
                    self.schedule_Internal.lecture.condition = res.data.results.condition;

                    console.log( self.schedule_Internal.lecture.condition)
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else if (data.schedule_detail_subject == 1) {

                self.schedule_Internal.lecture.schedule_detail_bachelor = res.data.results.schedule_detail[index].schedule_detail_bachelor;
                self.schedule_Internal.lecture.schedule_detail_graduate = res.data.results.schedule_detail[index].schedule_detail_graduate;

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Get_condition_by_schedule_detail_id",
                    data
                  )
                  .then((res) => {
                    console.log("ข้อมูลเงื่อนไข ของวิชาใน lab");
         

                       self.schedule_Internal.lab.condition = res.data.results.condition;

                    console.log( self.schedule_Internal.lab)

                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            } else if (data.schedule_detail_type == 1) {
              if (data.schedule_detail_subject == 0) {
                // 0 lucther 1 lab
    
                self.schedule_external.lecture.schedule_detail_bachelor = res.data.results.schedule_detail[index].schedule_detail_bachelor;
                self.schedule_external.lecture.schedule_detail_graduate = res.data.results.schedule_detail[index].schedule_detail_graduate;

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Get_condition_by_schedule_detail_id",
                    data
                  )
                  .then((res) => {
                    console.log("ข้อมูลเงื่อนไข ของวิชานอก lucther");
                        self.schedule_external.lecture.condition = res.data.results.condition;

                    console.log( self.schedule_external.lecture.condition)
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else if (data.schedule_detail_subject == 1) {

                
                self.schedule_external.lab.schedule_detail_bachelor = res.data.results.schedule_detail[index].schedule_detail_bachelor;
                self.schedule_external.lab.schedule_detail_graduate = res.data.results.schedule_detail[index].schedule_detail_graduate;


                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Get_condition_by_schedule_detail_id",
                    data
                  )
                  .then((res) => {
                    console.log("ข้อมูลเงื่อนไข ของวิชานอก lab");
                     self.schedule_external.lab.condition = res.data.results.condition;

                    console.log( self.schedule_external.lab.condition)
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });

      // schedule_detail_id ใช้ หา condition
    },
  },
  created() {
    this.get_schedule_detail();
  },
};
</script>

<style>
</style>