<template>
  <div id="basic_settings">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-card-meta title="รายการ">
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
              <router-link :to="{ path: '/permission_manage/adduser' }">
                <a-button type="primary" icon="plus">
                  เพิ่มตำแหน่ง
                </a-button>
              </router-link>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <br />
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                size="small"
              >
                <a slot="action" href="javascript:;">Delete</a>
                <p
                  slot="expandedRowRender"
                  slot-scope="record"
                  style="margin: 0"
                >
                  {{ record.description }}
                </p>
              </a-table>
            </a-col>
          </a-row>
          <br />
          <a-row>
            <a-col :span="15">
              <p :style="{ margin: '0.3em 0.5%' }">1-10 จาก 10 รายการ</p>
            </a-col>
            <a-col :span="9" :style="{ textAlign: 'Right' }">
              แสดงทีละ
              <a-select
                default-value="10"
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
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
];

const data = [
  {
    key: 1,
    name: "John Brown",

  },
  {
    key: 2,
    name: "Jim Green",

  },
  {
    key: 3,
    name: "Joe Black",

  },
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
