<template>
  <div id="addposition">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card>
          <a-row :gutter="[8, 8]" type="flex">
            <a-col :span="4" style="text-align:end">
              <b>ชื่อสิทธิ์การเข้าถึง:</b>
            </a-col>
            <a-col :span="16">
              <a-input
                style="width:100%"
                placeholder="โปรดกรอกชื่อตำแหน่ง"
                v-model="positionAccess.name_positionaccess"
              >
              </a-input>
            </a-col>
          </a-row>
          <br />
          <a-row
            :gutter="[8, 8]"
            type="flex"
            v-for="(ele, index) in select_system"
            :key="ele.system_id"
          >
            <a-col :span="4" style="text-align:end">
              <b>เมนูหลัก:</b>
            </a-col>
            <a-col :span="15">
              <a-row type="flex">
                <a-select
                  style="width:100%"
                  v-model="select_system[index].system_id"
                  @change="add_subsystem(index)"
                >
                  <a-select-option :value="null" disabled>
                    โปรดเลือกเมนูหลัก
                  </a-select-option>
                  <a-select-option
                    v-for="item in System"
                    :key="item.key"
                    :value="item.system_id"
                    :disabled="
                      select_system.find(
                        (ele) => ele.system_id === item.system_id
                      )
                    "
                  >
                    {{ item.system_name }} <br />
                  </a-select-option>
                </a-select>
              </a-row>
              <br />
              <a-row v-if="select_system[index].system_id != null">
                <a-col :span="24">
                  <a-checkbox
                    v-for="(ele_sub, index_sub) in select_system[index]
                      .sub_system"
                    :key="ele_sub.key"
                    v-model="select_system[index].sub_system[index_sub].status"
                  >
                    {{ ele_sub.sub_system_name }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="1">
              <a-button
                v-if="index == select_system.length - 1"
                type="primary"
                icon="plus"
                @click="add_select_system()"
              />
              <a-button
                v-if="index < select_system.length - 1"
                type="danger"
                icon="line"
                @click="pop_select_system(index)"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="text-align:center">
              <a-col :span="12" style="text-align:right">
                <router-link :to="{ path: '/permission_manage' }">
                  <a-button>ยกเลิก</a-button>
                </router-link>
              </a-col>
              <a-col :span="12" style="text-align:left">
                <!-- <router-link :to="{ path: '/permission_manage' }"> -->
                <a-button type="primary" @click="savePositionAssess()">
                  บันทึก
                </a-button>
                <!-- </router-link> -->
              </a-col>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      System: [],
      sub_System: [],
      positionAccess: {
        name_positionaccess: "",
        create_by: this.$store.state.user.user_id,
      },
      select_system: [
        {
          system_id: null,
          sub_system: [],
        },
      ],
      checkSelect: true,
    };
  },
  methods: {
    checkSpecificKey(data) {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < data.length; i++) {
        if (specialKey.indexOf(data.substr(i, 1)) != -1) {
          return false;
        }
        if (data[i] == " ") {
          return false;
        }
      }
      return true;
    },
    add_select_system() {
      this.select_system.push({
        system_id: null,
        sub_system: [],
      });
    },
    pop_select_system(index) {
      this.select_system.splice(index, 1);
    },

    add_subsystem(index) {
      const self = this;
      self.select_system[index].sub_system = [];
      self.sub_System.forEach(function(ele, index_ele) {
        if (self.select_system[index].system_id == ele.system_id) {
          self.select_system[index].sub_system.push({
            key: index_ele + 1,
            sub_system_id: ele.sub_system_id,
            sub_system_name: ele.sub_system_name,
            system_id: ele.system_id,
            status: false,
          });
        }
      });
      console.log(self.select_system);
    },
    getSystem() {
      const self = this;
      axios
        .post(self.$store.state.url + "/systemRouters/getSystem")
        .then(function(res) {
          console.log(res);
          res.data.results.forEach(function(ele, index) {
            let data = {
              key: index + 1,
              system_id: ele.system_id,
              system_name: ele.system_name_TH,
            };
            self.System.push(data);
          });
        });
    },
    getSubSystem() {
      const self = this;
      axios
        .post(self.$store.state.url + "/systemRouters/getSubSystem")
        .then(function(res) {
          res.data.results.forEach(function(ele, index) {
            let data = {
              key: index + 1,
              sub_system_id: ele.sub_system_id,
              sub_system_name: ele.sub_system_name_TH,
              system_id: ele.system_id,
            };
            self.sub_System.push(data);
          });
        });
    },
    savePositionAssess() {
      console.log(this.positionAccess.name_positionaccess);
      if (!this.checkSpecificKey(this.positionAccess.name_positionaccess)) {
        this.$notification["warning"]({
          message: "การแจ้งเตือน",
          description: "อักษรพิเศษและช่องว่างไม่สามารถกรอกได้",
          duration: 3,
        });
      } else if (this.positionAccess.name_positionaccess == "") {
        this.$notification["warning"]({
          message: "ชื่อสิทธิ์การเข้าถึง ไม่ได้กรอกข้อมูล",
          description: "กรุณากรอกชื่อสิทธิ์การเข้าถึง",
          duration: 3,
        });
      } else {
        const self = this;
        let obj = [];
        self.select_system.forEach(function(ele) {
          if (ele.sub_system.length == 0) {
            let data = {
              system_id: ele.system_id,
              sub_system_id: null,
            };
            obj.push(data);
          } else {
            ele.sub_system.forEach(function(ele_sub) {
              if (ele_sub.status) {
                let data = {
                  system_id: ele_sub.system_id,
                  sub_system_id: ele_sub.sub_system_id,
                };
                obj.push(data);
              }
            });
          }
        });
        self.checkSelect = true;
        obj.forEach(function(ele) {
          if (ele.system_id == null) {
            self.checkSelect = false;
          }
        });
        console.log(self.checkSelect);

        if (self.checkSelect) {
          this.sentdata(obj);
          this.$notification["success"]({
            message: "การแจ้งเตือน",
            description: "บันทึกสำเร็จ",
            duration: 3,
          });
          this.$router.push({ path: "permission_manage" });
        } else if (!self.checkSelect) {
          this.$notification["warning"]({
            message: "การแจ้งเตือน",
            description: "กรุณาเลือกระบบ",
            duration: 3,
          });
        }
      }
    },
    sentdata(obj) {
      console.log(obj);
      const self = this;
      axios
        .post(
          self.$store.state.url + "/positionAccessRouters/insertPositionAccess",
          { positionAccess: self.positionAccess, system: obj }
        )
        .then(function(res) {
          console.log(res);
        });
    },
  },
  created() {
    this.getSystem();
    this.getSubSystem();
  },
};
</script>

<style></style>
