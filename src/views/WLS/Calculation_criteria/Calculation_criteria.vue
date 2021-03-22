<template>
  <div id="Calculation_criteria" name="Calculation_criteria">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col
              :xs="24"
              :sm="20"
              :md="18"
              :lg="15"
              :xl="10"
              style="margin: 0.2em 0px"
            >
              <a-card-meta
                title="หลักเกณฑ์การกำหนดภาระงานสอนเพื่อการจ่ายค่าตอบแทน"
              >
                <a-icon
                  slot="avatar"
                  type="schedule"
                  :style="{
                    fontSize: '150%',
                  }"
                /> </a-card-meta
            ></a-col>

            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              :style="{ textAlign: 'right' }"
            >
            <!-- <div v-if="positionAccessId[0].position_access_id == 17 || positionAccessId[0].position_access_id == 1">
              <router-link :to="{ path: '/Calculation_criteria/Add_criteria' }">
                <a-button type="primary" icon="setting">
                  ตั้งค่าอัตราการจ่ายค่าตอบแทนภาระงานสอน
                </a-button>
              </router-link>
            </div> -->
            </a-col>
          </a-row>
          <hr style="width: 100%" />
          <a-row :gutter="[8, 8]" justify="end">
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              style="text-align: end"
            >
              <a-table
                :columns="columns_schedule"
                :data-source="schedule_of_data"
                :pagination="false"
                size="small"
               
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span slot="schedule_name" slot-scope="text">
                  <div :style="{ textAlign: 'left' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="schedule_start_date" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="schedule_status" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    <span v-if="text === 1">
                      <a-tag color="green"> กำลังใช้งาน </a-tag></span
                    >
                    <span v-if="text === 0">
                      <a-tag color="red"> ไม่ใช้งาน </a-tag>
                    </span>
                  </div>
                </span>
                <span slot="action" slot-scope="record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ดูรายละเอียด</span>
                      </template>
                      <a-button
                        type="warning"
                        icon="search"
                        @click="go_to_detail(index)"
                      >
                      </a-button>
                    </a-tooltip>
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const axios = require("axios");
// const JSON = require('json');
export default {
 
  data() {
    return {
      columns_schedule: [
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
          title: "ชื่อหลักเกณฑ์การกำหนดภาระงาน",
          dataIndex: "schedule_name",
          key: "schedule_name",
          width: "15%",
          scopedSlots: {
            customRender: "schedule_name",
          },
        },
        {
          title: "วันที่เริ่มใช้งาน",
          dataIndex: "schedule_start_date",
          key: "schedule_start_date",
          width: "5%",
          scopedSlots: {
            customRender: "schedule_start_date",
          },
        },
        {
          title: "สถานะการใช้งาน",
          dataIndex: "schedule_status",
          key: "schedule_status",
          width: "5%",
          scopedSlots: {
            customRender: "schedule_status",
          },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
     
      schedule_of_data: [],
      positionAccessId:[],
    };
  },

  methods: {
   
    getByIdPerson(){
      const self = this;
   
      axios.post(this.$store.state.url + "/personRouters/getPositionAccessById",{
          person_id: self.$store.state.user.user_id,
        })
      .then(res => {
  

       
    
              let data = {
            
              person_id: res.data.results[0].person_id,
              position_access_id:  res.data.results[0].position_access_id,
              position_access_name_TH:  res.data.results[0].position_access_name_TH,
              prepair_status:  res.data.results[0].prepair_status
            
            };   
              self.positionAccessId.push(data);

    
      })
      .catch(err => {
        console.error(err); 
      })

          console.log( self.positionAccessId);
    },
    go_to_detail(index) {
      console.log(index);
      this.$store.state.schedule = index;
      this.$router.push("Calculation_criteria/Detail_criteria");
    },
    get_all_schedule() {
  
      const self = this;
      
       axios
        .post(this.$store.state.url + "/WlsRouters/Get_all_schedule")
        .then(function (response) {
          response.data.results.schedule.forEach((data,index) => {
              let schedule_data = {
              ket:index+1,
              schedule_id:data.schedule_id,
              schedule_name: data.schedule_name,
              schedule_start_date: data.schedule_start_date,
              schedule_per_credit: data.schedule_per_credit,
              schedule_general_min: data.schedule_general_min,
              schedule_general_max: data.schedule_general_max,
              schedule_status: data.schedule_status,
              schedule_create_by: data.schedule_create_by,
              schedule_create_date: data.schedule_create_date,
            };   
              self.schedule_of_data.push(schedule_data);
          });
             console.log(self.schedule_of_data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed  ถ้าเจอ  Eror ทำไรต่อ
        });
    },
  },
  created() {
        this.getByIdPerson();
    this.get_all_schedule();

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
