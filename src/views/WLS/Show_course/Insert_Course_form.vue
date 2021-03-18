<template>
  <div id="content">
    <a-card title="เพิ่มรายวิชา">
      <a-row :span="24" :gutter="[8, 8]">
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">รหัสวิชา :</p>
        </a-col>
        <a-col :span="3">
          <a-input name="course-id" />
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ปีหลักสูตร :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 100%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> --- โปรดเลือก --- </a-select-option>
            <a-select-option v-for="item in course_years" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ชื่อวิชา :</p>
        </a-col>
        <a-col :span="5">
          <a-input name="course_name" />
        </a-col>
      </a-row>
      <a-row :span="24" :gutter="[8, 8]">
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">หน่วยกิต :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 70%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> 1 หน่วย </a-select-option>
            <a-select-option value="2"> 2 หน่วย </a-select-option>
            <a-select-option value="3"> 3 หน่วย </a-select-option>
            <a-select-option value="4"> 4 หน่วย </a-select-option>
            <a-select-option value="5"> 5 หน่วย </a-select-option>
            <a-select-option value="6"> 6 หน่วย </a-select-option>
            <a-select-option value="7"> 7 หน่วย </a-select-option>
            <a-select-option value="8"> 8 หน่วย </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ชั่วโมงบรรยาย :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 70%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> 1 ชั่วโมง </a-select-option>
            <a-select-option value="2"> 2 ชั่วโมง </a-select-option>
            <a-select-option value="3"> 3 ชั่วโมง </a-select-option>
            <a-select-option value="4"> 4 ชั่วโมง </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ชั่วโมงปฏิบัติ :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 70%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> 1 ชั่วโมง </a-select-option>
            <a-select-option value="2"> 2 ชั่วโมง </a-select-option>
            <a-select-option value="3"> 3 ชั่วโมง </a-select-option>
            <a-select-option value="4"> 4 ชั่วโมง </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">เรียนรู้ด้วยตนเอง :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 70%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> 1 ชั่วโมง </a-select-option>
            <a-select-option value="2"> 2 ชั่วโมง </a-select-option>
            <a-select-option value="3"> 3 ชั่วโมง </a-select-option>
            <a-select-option value="4"> 4 ชั่วโมง </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :span="24" :gutter="[8, 8]">
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">กลุ่ม :</p>
        </a-col>
        <a-col :span="3">
          <a-input-number
            id="inputNumber"
            v-model="sec"
            :min="1"
            @change="SeconChange"
            style="width: 80px"
          />
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">จำนวนลงทะเบียน :</p>
        </a-col>
        <a-col :span="3">
          <a-input-number
            id="inputNumber"
            v-model="student"
            :min="1"
            @change="StudentChange"
            style="width: 80px"
          />
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">วันที่สอน :</p>
        </a-col>
        <a-col :span="5">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 100px"
            :default-value="{ key: '2' }"
          >
            <a-select-option value="1"> SUN </a-select-option>
            <a-select-option value="2"> MON </a-select-option>
            <a-select-option value="3"> TU </a-select-option>
            <a-select-option value="4"> WE </a-select-option>
            <a-select-option value="5"> TH </a-select-option>
            <a-select-option value="6"> FRI </a-select-option>
            <a-select-option value="7"> ST </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :span="24" :gutter="[8, 8]">
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">เวลาเริ่มเรียน :</p>
        </a-col>
        <a-col :span="3">
          <a-time-picker
            :default-value="moment('09:00', 'HH:mm')"
            format="HH:mm"
          />
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">เวลาเลิกเรียน :</p>
        </a-col>
        <a-col :span="3">
          <a-time-picker
            :default-value="moment('12:00', 'HH:mm')"
            format="HH:mm"
          />
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ห้องเรียน :</p>
        </a-col>
        <a-col :span="3">
          <a-input name="course_room" />
        </a-col>
      </a-row>
      <a-row :span="24" :gutter="[10, 10]">
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ภาคเรียนที่ :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 60px"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> 1 </a-select-option>
            <a-select-option value="2"> 2 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'end' }">
          <p style="margin-top: 5px">ปีการศึกษา :</p>
        </a-col>
        <a-col :span="3">
          <a-select
            label-in-value
            @change="DatehandleChange"
            style="width: 100%"
            :default-value="{ key: '1' }"
          >
            <a-select-option value="1"> --- โปรดเลือก --- </a-select-option>
            <a-select-option v-for="item in course_years" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>

      <a-row :span="24" :gutter="[30, 10]">
        <a-col :span="5" :offset="1">
          <a-card title="อาจารย์ที่สอน" style="width: 100%">
            <a slot="extra" @click="clear_status()">Clear</a>
            <div>
              <a-input-search
                placeholder="ค้นหา ชื่ออาจารย์"
                style="width: 100%"
              />
            </div>
            <div v-for="item in all_teacher" :key="item.id">
              <p v-if="item.status == 1">
                <a-col :span="20"
                  ><label
                    >{{ item.position }}{{ item.name }} {{ item.lastname }}
                  </label></a-col
                >
                <a-col :span="4"
                  ><a-button icon="minus" @click="delete_status(item.id)"
                /></a-col>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :span="5">
          <a-card title="รายชื่ออาจารย์" style="width: 100%">
            <div>
              <a-input-search
                placeholder="ค้นหา ชื่ออาจารย์"
                style="width: 100%"
              />
            </div>
            <div
              v-for="item in all_teacher"
              :key="item.id"
              :scroll="{ x: 1500, y: 300 }"
            >
              <p v-if="item.status == 0">
                <a-col :span="20"
                  ><label
                    >{{ item.position }}{{ item.name }} {{ item.lastname }}
                  </label></a-col
                >
                <a-col :span="4"
                  ><a-button icon="plus" @click="add_status(item.id)"
                /></a-col>
              </p>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-row :span="24" :gutter="[10, 40]">
        <a-col :span="12" :style="{ textAlign: 'end' }"
          ><a-button type="danger" style="width: 20%">ยกเลิก</a-button></a-col
        >
        <a-col :span="12"
          ><a-button type="success" style="width: 20%">บันทึก</a-button></a-col
        >
      </a-row>
    </a-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      credit: "",
      all_teacher: [
        {
          id: "1",
          position: "อาจารย์",
          name: "พีระศักดิ์",
          lastname: "เพียรประสิทธิ์",
          status: 0,
        },
        {
          id: "2",
          position: "อาจารย์",
          name: "พิเชษ",
          lastname: "วะยะลุน",
          status: 0,
        },
        {
          id: "3",
          position: "อาจารย์",
          name: "กิตติพา",
          lastname: "คลังวิสาร",
          status: 0,
        },
      ],
      course_years: [],
      sec: 1,
      student: 1,
    };
  },
  methods: {
    moment,
    add_status(id) {
      for (var i = this.all_teacher.length - 1; i > -1; i--) {
        if (this.all_teacher[i].id == id) {
          this.all_teacher[i].status = 1;
        }
      }
    },
    delete_status(id) {
      for (var i = this.all_teacher.length - 1; i > -1; i--) {
        if (this.all_teacher[i].id == id) {
          this.all_teacher[i].status = 0;
        }
      }
    },
    clear_status() {
      for (var i = this.all_teacher.length - 1; i > -1; i--) {
        this.all_teacher[i].status = 0;
      }
    },
    Years_course() {
      var j = 0;
      for (var i = 10; i > -1; i--) {
        if (i == 10) {
          this.course_years.push(new Date().getFullYear() + 543);
        } else {
          this.course_years.push(new Date().getFullYear() - j + 543);
        }
        j++;
      }
      console.log(this.course_years);
    },
    credit_format() {
      var pattern = new String("_-_-_-"); // กำหนดรูปแบบในนี้
      var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
      var returnText = new String("");
      var obj_l = this.credit.length;
      var obj_l2 = obj_l - 1;
      for (var i = 0; i < pattern.length; i++) {
        if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
          if (i == 0) {
            returnText += this.credit + "(";
            this.credit = returnText;
          } else {
            returnText += this.credit + pattern_ex;
            this.credit = returnText;
          }
        }
      }
      if (obj_l >= pattern.length) {
        this.credit = this.credit.substr(0, pattern.length);
      }
    },
  },
  mounted() {
    this.Years_course();
  },
};
</script>

<style>
</style>