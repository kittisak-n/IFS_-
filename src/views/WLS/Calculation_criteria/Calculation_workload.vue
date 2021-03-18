<template>
  <div id="">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>

    <div class="steps-content">
      <a-row :gutter="[8, 8]" v-if="current == 0">
        <a-col :span="24">
          <a-card size="small" title="">
            <a-row :gutter="[8, 8]" type="flex" justify="center">
              <a-col :span="24" style="text-align: center">
                <h1>
                  สรุปภาระงานเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ
                </h1>
              </a-col>
            </a-row>
            <a-row :gutter="[8, 8]" type="flex" justify="center">
              <a-col :span="8" style="text-align: end">
                <span style="font-size: 18px">ปีการศึกษา 2564</span>
              </a-col>
              <a-col :span="8" style="text-align: start">
                <span style="font-size: 18px"> ภาคเรียนที่ 1</span>
              </a-col>
            </a-row>
            <p>
              อาจารย์ :
              {{
                person_data.person_firstname_TH +
                  " " +
                  person_data.person_lastname_TH
              }}
            </p>

            <a-row :gutter="[8, 8]">
              <a-col :span="24">
                <a-table
                  size="small"
                  :columns="columns"
                  :data-source="course_data"
                  bordered
                  :pagination="false"
                >
                  <a-table
                    size="small"
                    slot="expandedRowRender"
                    slot-scope="record, index"
                    :columns="sub_columns"
                    :data-source="course_data.sub_data"
                    :pagination="false"
                  >
                    <span slot="section_number" slot-scope="text">
                      <div
                        :style="{
                          textAlign: 'center',
                          margin: 'auto',
                        }"
                      >
                        {{ text }}
                      </div>
                    </span>
                    <span
                      slot="section_student"
                      slot-scope="text, records, sub_index"
                    >
                      <div
                        :style="{
                          textAlign: 'center',
                          margin: 'auto',
                        }"
                      >
                        <a-input
                          style="width:100%"
                          v-model="
                            course_data[index].sub_data[sub_index]
                              .section_student
                          "
                        />
                      </div>
                    </span>
                    <span
                      slot="count_group_lecture"
                      slot-scope="text, records, sub_index"
                    >
                      <div
                        :style="{
                          textAlign: 'center',
                          margin: 'auto',
                        }"
                      >
                        <a-input
                          style="width:100%"
                          v-model="
                            course_data[index].sub_data[sub_index]
                              .count_group_lecture
                          "
                        />
                      </div>
                    </span>
                    <span
                      slot="count_group_lab"
                      slot-scope="text, records, sub_index"
                    >
                      <div
                        :style="{
                          textAlign: 'center',
                          margin: 'auto',
                        }"
                      >
                        <a-input
                          style="width:100%"
                          v-model="
                            course_data[index].sub_data[sub_index]
                              .count_group_lab
                          "
                        />
                      </div>
                    </span>
                    <span
                      slot="section_person_time"
                      slot-scope="text, records, sub_index"
                    >
                      <div
                        :style="{
                          textAlign: 'center',
                          margin: 'auto',
                        }"
                      >
                        <a-input
                          style="width:100%"
                          v-model="
                            course_data[index].sub_data[sub_index]
                              .section_person_time
                          "
                        />
                      </div>
                    </span>
                  </a-table>
                </a-table>

                <div style="margin-top:50px">
                  <router-link
                    :to="{
                      path: '/calculation_subworkload?person_id=' + person_id,
                    }"
                  >
                    <a-button
                      type="primary"
                      style="margin-left:720px"
                      @click="save()"
                    >
                      คำนวณ
                    </a-button></router-link
                  >
                  <router-link to="/SummaryWorkload">
                    <a-button style="margin-left:20px">ย้อนกลับ</a-button>
                  </router-link>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <!-- <a-row :gutter="[8, 8]" v-if="current == 1">
        <a-col :span="24">
          <a-card size="small" title="">
            <a-row :gutter="[8, 8]" type="flex" justify="center">
              <a-col :span="24" style="text-align: center">
                <h1>
                  สรุปภาระงานเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ
                </h1>
              </a-col>
            </a-row>
            <a-row :gutter="[8, 8]" type="flex" justify="center">
              <a-col :span="8" style="text-align: end">
                <span style="font-size: 18px">ปีการศึกษา 2564</span>
              </a-col>
              <a-col :span="8" style="text-align: start">
                <span style="font-size: 18px"> ภาคเรียนที่ 1</span>
              </a-col>
            </a-row>
            <p>อาจารย์ : {{ data[0].person_name }}</p>
            <a-row :gutter="[8, 8]">
              <a-col :span="24">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  bordered
                  :pagination="false"
                >
                </a-table>
                <div align="left" class="row">
                  <a-card title="รวมค่าภาระงานสอน" style="width: 420px">
                    <p>รวมภาระงานสอน : {{ data[1].all_proportion }} หน่วยกิต</p>
                    <p>
                      รวมภาระงานสอน(ปัดเศษ) :
                      {{ data[1].avg_proportion }} หน่วยกิต
                    </p>
                  </a-card>
                </div>
                <div align="center">
                  <router-link to="/Conclude_workload">
                    <a-button type="primary">
                      บันทึก
                    </a-button>
                  </router-link>
                  <router-link to="/Calculation_workload">
                    <a-button style="margin-left:20px">ย้อนกลับ</a-button>
                  </router-link>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row> -->

      <!-- <a-row :gutter="[8, 8]" v-if="current == 2">
        33333
      </a-row> -->
    </div>

    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const renderTitleContent = (value, row) => {
  const obj = {
    children: value,
    attrs: {},
  };
  if (row.species) {
    obj.attrs.colSpan = 8;
  }
  return obj;
};
const renderContent = (value, row) => {
  const obj = {
    children: value,
    attrs: {},
  };
  if (row.species) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
const columns = [
  {
    title: "หมวด/รหัสวิชา",
    dataIndex: "course_code",
    customRender: renderTitleContent,
  }, //หมวด/รหัสวิชา

  {
    title: "หน่วยกิต",
    dataIndex: "course_unitt",
    customRender: renderContent,
  }, //หน่วยกิต

  {
    title: "ชื่อรายวิชา",
    dataIndex: "course_name",
    customRender: renderContent,
  }, //ชื่อรายวิชา

  {
    title: "จำนวนกลุ่ม",
    dataIndex: "count_group",
    customRender: renderContent,
  }, //กลุ่ม

  {
    title: "จำนวนหน่วยกิต",
    children: [
      {
        title: "บรรยาย",
        dataIndex: "course_lactrue_unit",
        key: "course_lactrue_unit",
        width: 90,
        customRender: renderContent,
      },
      {
        title: "lab",
        dataIndex: "course_lab_unit",
        key: "course_lab_unit",
        width: 90,
        customRender: renderContent,
      },
    ],
  }, //จำนวนหน่วยกิต

  {
    title: "จำนวนนิสิตทั้งหมดที่ลงทะเบียนในรายวิชา",
    dataIndex: "section_student",
    customRender: renderContent,
  }, //จำนวนนิสิตทั้งหมดที่ลงทะเบียนในรายวิชา
];
const sub_columns = [
  {
    title: "วัน-เวลา",
    dataIndex: "time",
    width: 180,
  }, //วัน-เวลา
  {
    title: "กลุ่ม",
    dataIndex: "section_number",
    width: "10%",
    scopedSlots: { customRender: "section_number" },
  }, //กลุ่มที่
  {
    title: "จำนวนนิสิตที่ลงทะเบียนในรายวิชา",
    dataIndex: "section_student",
    width: 180,
    // customRender: renderContent,
    scopedSlots: { customRender: "section_student" },
  }, //จำนวนนิสิตที่ลงทะเบียนในรายวิชา
  {
    title: "จำนวนกลุ่มที่สอน",
    children: [
      {
        title: "บรรยาย",
        dataIndex: "count_group_lecture",
        // key: "count_group_lecture",
        width: 90,
        scopedSlots: { customRender: "count_group_lecture" },
      },
      {
        title: "lab",
        dataIndex: "count_group_lab",
        // key: "count_group_lab",
        width: 90,
        scopedSlots: { customRender: "count_group_lab" },
      },
    ],
  }, //จำนวนกลุ่มที่สอน
  {
    title: "สัดส่วนภาระงานที่สอน(สัปดาห์)",
    dataIndex: "section_person_time",
    width: 150,
    scopedSlots: { customRender: "section_person_time" },
  }, //สัดส่วนภาระงานที่สอน(สัปดาห์)
];
const sec_columns = [
  {
    title: "หมวด/รหัสวิชา",
    dataIndex: "code_major",
    customRender: renderContent,
  },
  {
    title: "ชื่อรายวิชา",
    dataIndex: "course_name",
    customRender: renderContent,
  },
  {
    title: "ภาระงาน",
    children: [
      {
        title: "ภาระงานพื้นฐาน",
        dataIndex: "std_workload",
        key: "std_workload",
        customRender: renderContent,
      },
      {
        title: "ภาระงานตรวจสอบ",
        children: [
          {
            title: "ชั่วโมงบรรยาย",
            dataIndex: "hour_lecture_workload",
            key: "hour_lecture_workload",
            customRender: renderContent,
          },
          {
            title: "ชั่วโมง lab",
            dataIndex: "hour_lab_workload",
            key: "hour_lab_workload",
            customRender: renderContent,
          },
        ],
      },
    ],
  }, //ภาระงาน
  {
    title: "ภาระงานรวม",
    dataIndex: "sum_workload",
    customRender: renderContent,
  }, //ภาระงานรวม
  {
    title: "ภาระงานรวมที่ได้รับตามสัดส่วนการสอน",
    dataIndex: "sum_proportion",
    customRender: renderContent,
  }, //ภาระงานรวมที่ได้รับตามสัดส่วนการสอน
];
var data = [];
export default {
  data() {
    return {
      data,
      columns,
      sec_columns,
      sub_columns,
      person_id: 0,
      person_data: {},
      course_data: [
        {
          sub_data: [],
        },
      ],
      current: 0,
      steps: [
        {
          title: "First",
          content: "First-content",
        },
        {
          title: "Second",
          content: "Second-content",
        },
        {
          title: "Last",
          content: "Last-content",
        },
      ],
    };
  },
  methods: {
    Get_course_by_Id() {
      const self = this;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      self.person_id = urlParams.get("person_id");
      axios
        .post(self.$store.state.url + "/Wlscalculate/Get_course_by_Id", {
          person_id: parseInt(self.person_id),
        })
        .then(function(res) {
          self.course_data = res.data.results;
          console.log(self.course_data);
          self.course_data.forEach((ele) => {
            console.log(ele);
            axios
              .post(
                self.$store.state.url +
                  "/Wlscalculate/Get_subcourse_by_course_id",
                {
                  section_course_id: ele.course_id,
                  person_id: parseInt(self.person_id),
                }
              )
              .then((res) => {
                self.course_data.sub_data = res.data.results;
                console.log(res);
                console.log(self.course_data);
              })
              .catch((err) => {
                console.error(err);
              });
          });
          console.log(self.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Get_person_by_Id() {
      const self = this;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      self.person_id = urlParams.get("person_id");

      axios
        .post(self.$store.state.url + "/Wlscalculate/Get_person_by_Id", {
          person_id: parseInt(self.person_id),
        })
        .then((res) => {
          self.person_data = res.data.results[0];
          console.log(self.person_data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // Get_dataCal_by_Id() {
    //   // const self = this;
    //   // const queryString = window.location.search;
    //   // const urlParams = new URLSearchParams(queryString);
    //   // const param_person_id = urlParams.get("person_id");
    //   // console.log(parseInt(param_person_id));
    //   // axios
    //   //   .post(self.$store.state.url + "/Wlscalculate/Get_dataCal_by_Id", {
    //   //     person_id: param_person_id,
    //   //   })
    //   //   .then(function(response) {
    //   //     self.data = [];
    //   //     const data = response.data.results;
    //   //     data.forEach(function(ele, index) {
    //   //       let subject = {
    //   //         key: index + 1,
    //   //         person_name:
    //   //           ele.person_firstname_TH + " " + ele.person_lastname_TH,
    //   //         type: ele.course_syllabus_id,
    //   //         subtype: "lec+lab",
    //   //         code_major: ele.course_code, //รหัสวิชา
    //   //         course_name: ele.course_name, //ชื่อวิชา
    //   //         count_student: ele.section_student, //จำนวนนิสิตที่ลงทะเบียนในรายวิชา
    //   //         count_credit_lecture: ele.course_lactrue_unit, //จำนวนหน่วยกิต (lec)
    //   //         count_credit_lab: ele.course_lab_unit, //จำนวนหน่วยกิต (lab)
    //   //         count_group_lecture: ele.section_person_lec, //จำนวนกลุ่มที่สอน (lec)
    //   //         count_group_lab: ele.section_person_lab, //จำนวนกลุ่มที่สอน (lab)
    //   //         proportion_workload: ele.section_person_time, //จำนวนสัปดาห์ที่สอน
    //   //         std_workload: 0, //ภาระงานพื้นฐาน
    //   //         hour_lecture_workload: 0, // ภาระงานตรวจสอบ.ชั่วโมงบรรยาย
    //   //         hour_lab_workload: 0, // ภาระงานตรวจสอบ.ชั่วโมง lab
    //   //         sum_workload: 0, //ภาระงานรวม
    //   //         sum_proportion: 0, //ภาระงานรวมที่ได้รับตามสัดส่วนการสอน
    //   //         all_proportion: 0, //ค่ารวมภาระงานสอน *ไม่น่าได้เก็บเข้า Database ใช้ avg_proportion แทนเพราะปัดเศษแล้ว
    //   //         avg_proportion: 0, //รวมภาระงานสอน(ปัดเศษ)
    //   //       };

    //   //       if (subject.type == 0) {
    //   //         if (subject.subtype == "lec+lab") {
    //   //           subject.std_workload =
    //   //             subject.count_credit_lecture * subject.count_group_lecture +
    //   //             subject.count_credit_lab * subject.count_group_lab * 1.25; // ภาระงานพื้นฐาน

    //   //           subject.sum_workload =
    //   //             subject.std_workload +
    //   //             subject.hour_lecture_workload +
    //   //             subject.hour_lab_workload; // ภาระงานรวม(นก)

    //   //           subject.sum_proportion =
    //   //             (subject.sum_workload * subject.proportion_workload) /
    //   //             subject.proportion_workload; //สัดส่วนภาระงานที่สอน(นก)

    //   //           subject.all_proportion += subject.sum_proportion[index]; //รวมภาระงานสอน
    //   //           console.log(subject.all_proportion);
    //   //         } else if (subject.subtype == "lec") {
    //   //           subject.std_workload =
    //   //             subject.count_credit_lecture * subject.count_group_lecture +
    //   //             subject.count_credit_lab * subject.count_group_lab; // ภาระงานพื้นฐาน

    //   //           subject.sum_workload =
    //   //             subject.std_workload +
    //   //             subject.hour_lecture_workload +
    //   //             subject.hour_lab_workload; // ภาระงานรวม(นก)

    //   //           subject.sum_proportion =
    //   //             (subject.sum_workload * subject.proportion_workload) /
    //   //             subject.proportion_workload; // สัดส่วนภาระงานที่สอน(นก)

    //   //           subject.all_proportion += subject.sum_proportion; //รวมภาระงานสอน
    //   //         }
    //   //       } else if (subject.type == 1) {
    //   //         subject.std_workload =
    //   //           subject.count_credit_lecture * subject.hour_lecture_workload +
    //   //           subject.count_credit_lab * subject.hour_lab_workload; // ภาระงานพื้นฐาน

    //   //         subject.sum_workload =
    //   //           subject.std_workload +
    //   //           subject.hour_lecture_workload +
    //   //           subject.hour_lab_workload; // ภาระงานรวม(นก)

    //   //         subject.sum_proportion =
    //   //           (subject.sum_workload * subject.proportion_workload) /
    //   //           subject.proportion_workload; // สัดส่วนภาระงานที่สอน(นก)

    //   //         subject.all_proportion += subject.sum_proportion; //รวมภาระงานสอน
    //   //       }

    //   //       var dcm_proportion = subject.all_proportion
    //   //         .toString()
    //   //         .substring(
    //   //           subject.all_proportion.toString().length - 2,
    //   //           subject.all_proportion.toString().length
    //   //         );
    //   //       if (parseInt(dcm_proportion) < 25) {
    //   //         subject.avg_proportion =
    //   //           subject.all_proportion - dcm_proportion / 100;
    //   //       } else if (
    //   //         parseInt(dcm_proportion) >= 25 &&
    //   //         parseInt(dcm_proportion) <= 49
    //   //       ) {
    //   //         subject.avg_proportion =
    //   //           subject.all_proportion - parseInt(dcm_proportion) / 100 + 0.25;
    //   //       } else if (
    //   //         parseInt(dcm_proportion) >= 50 &&
    //   //         parseInt(dcm_proportion) <= 74
    //   //       ) {
    //   //         subject.avg_proportion =
    //   //           subject.all_proportion - parseInt(dcm_proportion) / 100 + 0.5;
    //   //       } else if (
    //   //         parseInt(dcm_proportion) >= 75 &&
    //   //         parseInt(dcm_proportion) <= 99
    //   //       ) {
    //   //         subject.avg_proportion =
    //   //           subject.all_proportion - parseInt(dcm_proportion) / 100 + 0.75;
    //   //       }

    //   //       self.data.push(subject);
    //   //       console.log(subject);
    //   //     });
    //   //   })
    //   //   .catch(function(error) {
    //   //     console.log(error);
    //   //   });
    // },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    save() {
      console.log(this.data);
    },
  },
  created() {
    this.Get_course_by_Id();
    this.Get_person_by_Id();
    // this.Get_dataCal_by_Id();
    this.Get_subcourse_by_course_id();
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
