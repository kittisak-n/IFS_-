<template>
  <div>
    <div>
      <h1 id="components-layout-demo-basic">
        สรุปภาระงานสอนเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ
      </h1>
      <h1 id="components-layout-demo-basic">ภาคต้น ปีการศึกษา 2563</h1>
      <h1 style="margin-left: 65px">
        ชื่อ-สกุล อาจารย์พีระศักดิ์ เพียรประสิทธิ์
      </h1>
      <hr style="width: 1500px; margin-left:130px" />
    </div>

    <div style="width: 1570px; margin:auto;">
      <a-table :columns="columns" :data-source="data" bordered :pagination="false">
    
      </a-table>
      <!-- <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template> -->
    </div>
  </div>
</template>

<script>
const renderContent = (value, row, index) => {
  var obj = {
    children: value,
    attrs: {},
  };
  if (index === 0) {
    obj.attrs.colSpan = 1;
  }
  return obj;
};

var data = [
  {
    groupData: "informatics",
    type: "lec+lab",
    key: "1",
    code_major: "88814259",
    credit: "1(0-3-6)",
    time: "Lab WE17:00-19:50 IF-3C04",
    group: "3+4",

    count_credit_lecture: 0,
    count_credit_lab: 1,

    count_student: "50",

    count_group_lecture: 0,
    count_group_lab: 1,

    std_workload: 1.25,
    hour_lecture_workload: 0,
    hour_lab_workload: 0.02,

    sum_workload: 0,
    proportion_workload: 15,
    sum_proportion: 0,
  },

  {
    groupData: "informatics",
    type: "lec",
    key: "2",
    code_major: "88832359",
    credit: "3(3-0-6)",
    time: "Lecture MO17:00-19:50 IF-3C04",
    group: "1+2+3",

    count_credit_lecture: 3,
    count_credit_lab: 0,

    count_student: "92",

    count_group_lecture: 1,
    count_group_lab: 0,

    std_workload: 3,
    hour_lecture_workload: 0.48,
    hour_lab_workload: 0,

    sum_workload: 0,
    proportion_workload: 15,
    sum_proportion: 0,
  },

  {
    groupData: "informatics",
    type: "lec",
    key: "3",
    code_major: "88823459",
    credit: "3(3-0-6)",
    time: "Lab WE17:00-19:50 IF-3C04",
    group: "3+4",

    count_credit_lecture: 3,
    count_credit_lab: 0,

    count_student: "53",

    count_group_lecture: 1,
    count_group_lab: 0,

    std_workload: 6,
    hour_lecture_workload: 0,
    hour_lab_workload: 0,

    sum_workload: 0,
    proportion_workload: 15,
    sum_proportion: 0,
  },
];

var data2 = [
  {
    groupType: "รายวิชาของคณะ(ระดับปริญญาตรี)",
  },
  // {
  //   groupType: "Lecture + lab 3 ชั่วโมง",
  // },
  // {
  //   groupType: "Lecture อย่างเดียว",
  // },
  {
    groupType: "รายวิชาศึกษาทั่วไป",
  },
];

const columns = [
//   {
//     title: "ชนิด",
//     dataIndex: "groupType",
//     customRender: renderContent,
//   },
  {
    title: "หมวด/รหัสวิชา",
    dataIndex: "code_major",
    customRender: renderContent,
  }, //หมวด/รหัสวิชา

  {
    title: "หน่วยกิต",
    dataIndex: "credit",
    customRender: renderContent,
  }, //หน่วยกิต

  {
    title: "วัน-เวลา",
    dataIndex: "time",
    customRender: renderContent,
  }, //วัน-เวลา

  {
    title: "กลุ่ม",
    dataIndex: "group",
    customRender: renderContent,
  }, //กลุ่ม

  {
    title: "จำนวนหน่วยกิต",
    children: [
      {
        title: "บรรยาย",
        dataIndex: "count_credit_lecture",
        key: "count_credit_lecture",
        width: 90,
        customRender: renderContent,
      },
      {
        title: "lab",
        dataIndex: "count_credit_lab",
        key: "count_credit_lab",
        width: 90,
        customRender: renderContent,
      },
    ],
  }, //จำนวนหน่วยกิต

  {
    title: "จำนวนนิสิตที่ลงทะเบียนในรายวิชา",
    dataIndex: "count_student",
    customRender: renderContent,
  }, //จำนวนนิสิตที่ลงทะเบียนในรายวิชา

  {
    title: "จำนวนกลุ่มที่สอน",
    children: [
      {
        title: "บรรยาย",
        dataIndex: "count_group_lecture",
        key: "count_group_lecture",
        width: 90,
        customRender: renderContent,
      },
      {
        title: "lab",
        dataIndex: "count_group_lab",
        key: "count_group_lab",
        width: 90,
        customRender: renderContent,
      },
    ],
  }, //จำนวนกลุ่มที่สอน

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
    title: "สัดส่วนภาระงานที่สอน(สัปดาห์)",
    dataIndex: "proportion_workload",
    customRender: renderContent,
  }, //สัดส่วนภาระงานที่สอน(สัปดาห์)

  {
    title: "ภาระงานรวมที่ได้รับตามสัดส่วนการสอน",
    dataIndex: "sum_proportion",
    customRender: renderContent,
  }, //ภาระงานรวมที่ได้รับตามสัดส่วนการสอน
];
const columns2 = [
  {
    title: "หมวด/รหัสวิชา",
    dataIndex: "code_major",
    colSpan: 0,
    customRender: renderContent,
  }, //หมวด/รหัสวิชา

  {
    title: "หน่วยกิต",
    dataIndex: "credit",
    colSpan: 0,
    customRender: renderContent,
  }, //หน่วยกิต

  {
    title: "วัน-เวลา",
    dataIndex: "time",
    colSpan: 0,
    customRender: renderContent,
  }, //วัน-เวลา

  {
    title: "กลุ่ม",
    dataIndex: "group",
    colSpan: 0,
    customRender: renderContent,
  }, //กลุ่ม

  {
    title: "บรรยาย",
    dataIndex: "count_credit_lecture",
    key: "count_credit_lecture",
    colSpan: 0,
    width: 90,
    customRender: renderContent,
  },
  {
    title: "lab",
    dataIndex: "count_credit_lab",
    key: "count_credit_lab",
    colSpan: 0,
    width: 90,
    customRender: renderContent,
  }, //จำนวนหน่วยกิต

  {
    title: "จำนวนนิสิตที่ลงทะเบียนในรายวิชา",
    dataIndex: "count_student",
    colSpan: 0,
    customRender: renderContent,
  }, //จำนวนนิสิตที่ลงทะเบียนในรายวิชา

  {
    title: "บรรยาย",
    dataIndex: "count_group_lecture",
    key: "count_group_lecture",
    colSpan: 0,
    width: 90,
    customRender: renderContent,
  },
  {
    title: "lab",
    dataIndex: "count_group_lab",
    key: "count_group_lab",
    colSpan: 0,
    width: 90,
    customRender: renderContent,
  },
  //จำนวนกลุ่มที่สอน

  {
    title: "ภาระงานพื้นฐาน",
    dataIndex: "std_workload",
    colSpan: 0,
    key: "std_workload",
    customRender: renderContent,
  },
  {
    title: "ชั่วโมงบรรยาย",
    colSpan: 0,
    dataIndex: "hour_lecture_workload",
    key: "hour_lecture_workload",
    customRender: renderContent,
  },
  {
    title: "ชั่วโมง lab",
    colSpan: 0,
    dataIndex: "hour_lab_workload",
    key: "hour_lab_workload",
    customRender: renderContent,
  },

  //ภาระงาน

  {
    title: "ภาระงานรวม",
    colSpan: 0,
    dataIndex: "sum_workload",
    customRender: renderContent,
  }, //ภาระงานรวม

  {
    title: "สัดส่วนภาระงานที่สอน(สัปดาห์)",
    colSpan: 0,
    dataIndex: "proportion_workload",
    customRender: renderContent,
  }, //สัดส่วนภาระงานที่สอน(สัปดาห์)

  {
    title: "ภาระงานรวมที่ได้รับตามสัดส่วนการสอน",
    colSpan: 0,
    dataIndex: "sum_proportion",
    customRender: renderContent,
  }, //ภาระงานรวมที่ได้รับตามสัดส่วนการสอน
];

console.log(data2);

for (let i = 0; i < data.length; i++) {
  if (data[i].type == "lec+lab") {
    data[i].sum_workload =
      data[i].std_workload +
      data[i].hour_lecture_workload +
      data[i].hour_lab_workload;

    data[i].sum_proportion =
      (data[i].sum_workload * data[i].proportion_workload) /
      data[i].proportion_workload;
  } else if (data[i].type == "lec") {
    data[i].sum_workload =
      data[i].std_workload +
      data[i].hour_lecture_workload +
      data[i].hour_lab_workload;

    data[i].sum_proportion =
      (data[i].sum_workload * data[i].proportion_workload) /
      data[i].proportion_workload;
  }
}

export default {
  data() {
    return {
      data,
      columns,
      data2,
      columns2,
    };
  },
  
};
</script>

<style>
#components-layout-demo-basic {
  text-align: center;
}
</style>
