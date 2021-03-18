<template>
  <div id="">
    <a-row :gutter="[8, 8]">
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
              <span style="font-size: 18px">ปีการศึกษา </span>
              <a-select
                :default-value="2564"
                style="width: 100px; font-size: 15px"
              >
                <a-select-option :value="2564"> 2564 </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="8" style="text-align: start">
              <span style="font-size: 18px"> ภาคเรียนที่ </span>
              <a-select
                :default-value="1"
                style="width: 100px; font-size: 15px"
              >
                <a-select-option :value="1"> 1 </a-select-option>
                <a-select-option :value="2"> 2 </a-select-option>
              </a-select>
            </a-col>
          </a-row>
         <p>อาจารย์ : พีระศักดิ์ เพียรประสิทธิ์</p>
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="data"
                bordered
                :pagination="false"
                :style="{ width: '1600px', margin: 'auto' }"
              >
                <span slot="count_group_lecture">
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100px',
                      margin: 'auto',
                    }"
                  >
                    <input style="width:80px" />
                  </div>
                </span>
                <span slot="count_group_lab">
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100px',
                      margin: 'auto',
                    }"
                  >
                    <input style="width:80px" />
                  </div>
                </span>
                <span slot="proportion_workload">
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '120px',
                      margin: 'auto',
                    }"
                  >
                    <input style="width:120px" />
                  </div>
                </span>
              </a-table>
              <div style="margin-top:50px">
                <router-link to="/calculator/Conclude_workload">
                <a-button type="primary" style="margin-left:720px">
                  คำนวณ
                </a-button>
                </router-link>
                <router-link to="/calculator/calculation_workload">
                <a-button style="margin-left:20px">ย้อนกลับ</a-button>
                </router-link>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
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
    std_workload: 1.25,
    hour_lecture_workload: 0,
    hour_lab_workload: 0.02,
    sum_workload: 0,
    sum_proportion: 0,
  },
];
const columns = [
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

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
