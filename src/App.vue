<template>
  <div id="app">
    <a-layout
      id="components-layout-demo-custom-trigger"
      :style="{
        height: '100%',
      }"
      v-if="this.$store.state.status_login"
    >
      <a-layout-sider
        width="220"
        v-model="collapsed"
        :trigger="null"
        collapsible
        :style="{ Background: '#035096' }"
      >
        <div class="logo">
          <img
            class="img-logo"
            src="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/iclub-noGradient-CircleBk.png"
          />
        </div>
        <a-menu
          class="menu"
          theme="dark"
          mode="inline"
          :style="{ Background: '#035096' }"
          :default-selected-keys="['home']"
        >
          <a-menu-item
            v-for="system in this.$store.state.user_menu"
            :key="system.system_key"
            v-show="system.subSystem.length == 0"
          >
            <router-link :to="{ path: '/' + system.Path }">
              <a-icon :type="system.icon" />
              <span>{{ system.Name }}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu
            v-for="system in this.$store.state.user_menu"
            :key="system.system_key"
            v-show="system.subSystem.length != 0"
          >
            <span slot="title">
              <a-icon :type="system.icon" />
              <span>{{ system.Name }}</span>
            </span>
            <a-menu-item
              v-for="subsystem in system.subSystem"
              :key="subsystem.sub_system_key"
            >
              <router-link :to="{ path: '/' + subsystem.Path }">
                <a-icon :type="subsystem.icon" />
                <span> {{ subsystem.Name }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="poweroff" @click="Userlogout()">
            <a-icon type="poweroff" />
            <span>ออกจากระบบ</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-affix :offset-top="0.01" style="width:auto">
          <a-layout-header
            :style="{
              backgroundColor: '#e8e8e8',
              padding: '0px',
              textAlign: 'left',
              color: '#000000',
            }"
          >
            <a-row :gutter="[16, 0]" class="display_web">
              <a-col class="gutter-row" :span="10">
                <a-icon
                  class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="() => (collapsed = !collapsed)"
                />
                <span :style="{ fontSize: '20px' }">
                  <b>INFORMATICS SYSTEM</b>
                </span>
              </a-col>
              <a-col
                class="gutter-row"
                :span="14"
                :style="{
                  textAlign: 'end',
                }"
              >
                <span
                  :style="{
                    fontSize: '16px',
                  }"
                >
                  {{ this.$store.state.user.user_name }}
                </span>
                <a-icon
                  slot="count"
                  type="exclamation"
                  style="color: #f5222d"
                />
                <a-dropdown placement="bottomRight">
                  <a-avatar
                    @click="(e) => e.preventDefault()"
                    shape="square"
                    :size="36"
                    :style="{
                      marginRight: '20px',
                    }"
                    src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-9/116792568_3107531436021477_941072729078493831_n.jpg?_nc_cat=110&_nc_sid=730e14&_nc_ohc=xa-rE7az62MAX-G6EHp&_nc_ht=scontent.fbkk12-4.fna&oh=72ac5d3434718e78e51293b004689639&oe=5F90AE28"
                  />

                  <br />
                  <a-menu
                    slot="overlay"
                    :style="{
                      marginTop: '12px',
                      width: '200px',
                    }"
                  >
                    <a-menu-item
                      :style="{
                        fontSize: '16px',
                        lineHeight: '2',
                      }"
                    >
                      <router-link :to="{ path: '/personal_data' }">
                        <a-icon type="user" />
                        <span> ข้อมูลส่วนตัว</span>
                      </router-link>
                    </a-menu-item>

                    <a-menu-item
                      :style="{
                        fontSize: '16px',
                        lineHeight: '2',
                      }"
                      @click="Userlogout()"
                    >
                      <a-icon type="poweroff" /><span>ออกจากระบบ</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-col>
            </a-row>
            <a-row :gutter="[0, 0]" class="display_mobile">
              <a-col class="gutter-row" :span="16">
                <a-icon
                  class="trigger"
                  :type="visible ? 'menu-unfold' : 'menu-fold'"
                  @click="() => (visible = !visible)"
                />
                <span class="logo"> </span>
              </a-col>
              <a-col
                class="gutter-row"
                :span="8"
                :style="{
                  textAlign: 'end',
                }"
              >
              </a-col>
            </a-row>
          </a-layout-header>
        </a-affix>
        <a-layout-content
          :style="{
            margin: '10px 10px',
            textAlign: 'left',
          }"
        >
          <div>
            <a-page-header :title="crumbs[crumbs.length - 1].breadcrumbName">
              ตำแหน่งที่อยู่ :
              <span>
                <a-breadcrumb :routes="crumbs">
                  <a-breadcrumb-item>Location</a-breadcrumb-item>
                  <a-breadcrumb-separator>:</a-breadcrumb-separator>
                  <template slot="itemRender" slot-scope="{ route, routes }">
                    <span v-if="routes.indexOf(route) === routes.length - 1">
                      {{ route.breadcrumbName }}
                    </span>
                    <router-link v-else :to="route.to">
                      {{ route.breadcrumbName }}
                    </router-link>
                  </template>
                </a-breadcrumb>
              </span>
            </a-page-header>
          </div>
          <div class="body-router">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- Bug -->
    <a-layout
      :style="{
        height: '100%',
      }"
      v-if="!this.$store.state.status_login"
    >
      <a-layout-content>
        <div class="layout-login">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
    <!-- End [Bug] -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadcrumbList: [],
      collapsed: false,
      visible: false,
      placement: "left",
    };
  },
  methods: {
    checkUser() {
      const self = this;
      if (
        sessionStorage.getItem("person_name") &&
        sessionStorage.getItem("person_id") &&
        sessionStorage.getItem("person_menu")
      ) {
        self.$store.state.status_login = true;
        self.$store.state.user.user_name = sessionStorage.getItem(
          "person_name"
        );
        self.$store.state.user.user_id = sessionStorage.getItem("person_id");
        self.$store.state.user_menu = JSON.parse(
          sessionStorage.getItem("person_menu")
        );
      } else {
        self.$store.state.status_login = false;
        self.$router.push({ path: "login" });
      }
    },
    Userlogout() {
      const self = this;
      sessionStorage.clear();
      self.$store.state.status_login = false;
      self.$router.push({ path: "login" });
    },
    clearSession() {
      window.onbeforeunload = function() {
        const storage = window.localStorage;
        storage.clear();
      };
    },
  },
  computed: {
    crumbs: function() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          breadcrumbName: this.$route.matched[idx].meta.breadCrumb || path,
        });
        return breadcrumbArray;
      }, []);
      console.log(breadcrumbs);
      return breadcrumbs;
    },
  },
  created() {
    this.checkUser();
  },
  mounted() {
    this.clearSession();
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.layout-login {
  background-image: url("https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/07/NormalView.jpg") !important;

  background-size: cover;
  background-repeat: no-repeat;
}
.ant-layout-sider {
  background: #ffffff !important;
}
#components-layout-demo-custom-trigger .trigger {
  left: 0%;
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}

hr {
  width: 80%;
  border-top: 1px solid #d1d0ce;
}

.img-logo {
  height: 32px;
  width: 32px;
}

#components-layout-demo-custom-trigger .menu {
  text-align: left;
  background: #035096;
}

.ant-menu-sub {
  .ant-menu-item {
    padding-left: 30px !important;
  }
}

.ant-drawer-body {
  padding: 0px !important;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.ant-layout-sider-children {
  background: #035096;
}

.ant-menu-sub.ant-menu-inline {
  color: #ffffff;
  background: #035096;
}

.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #7280 !important;
  /* color: #000000 !important; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45) inset;
}

.ant-drawer-wrapper-body {
  height: 100%;
  overflow: auto;
  background: #035096;
}

.ant-menu-dark.ant-menu-inline,
.ant-menu-dark.ant-menu-vertical,
.ant-menu-dark.ant-menu-vertical-left,
.ant-menu-dark.ant-menu-vertical-right {
  border-right: 0;
  background: #035096;
}

.ant-page-header-content {
  padding-top: 0px !important;
  overflow: hidden;
}

.ant-page-header {
  padding: 12px !important;
  background: #fff !important;
}

.ant-breadcrumb {
  display: inline;
}

.body-router {
  margin-top: 10px;
}

.fixed-header {
  top: 0;
}
.ant-table {
  .ant-btn {
    margin: 0px 1%;
  }
}

.ant-btn-success {
  color: #fff !important;
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-success-disabled,
.ant-btn-success.disabled,
.ant-btn-success[disabled],
.ant-btn-success-disabled:hover,
.ant-btn-success.disabled:hover,
.ant-btn-success[disabled]:hover,
.ant-btn-success-disabled:focus,
.ant-btn-success.disabled:focus,
.ant-btn-success[disabled]:focus,
.ant-btn-success-disabled:active,
.ant-btn-success.disabled:active,
.ant-btn-success[disabled]:active,
.ant-btn-success-disabled.active,
.ant-btn-success.disabled.active,
.ant-btn-success[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-success:hover,
.ant-btn-success:focus {
  color: #fff !important;
  background-color: #34ce57 !important;
  border-color: #34ce57 !important;
}
.ant-btn-success:active,
.ant-btn-success.active {
  color: #fff !important;
  background-color: #1e7e34 !important;
  border-color: #1e7e34 !important;
}
.ant-btn-background-ghost.ant-btn-success {
  color: #28a745 !important;
  background: transparent !important;
  border-color: #28a745 !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-success:hover,
.ant-btn-background-ghost.ant-btn-success:focus {
  color: #34ce57 !important;
  background: transparent !important;
  border-color: #34ce57 !important;
}
.ant-btn-background-ghost.ant-btn-success:active,
.ant-btn-background-ghost.ant-btn-success.active {
  color: #28a745 !important;
  background: transparent !important;
  border-color: #1e7e34 !important;
}
.ant-btn-warning {
  color: #fff !important;
  background-color: #eca52b !important;
  border-color: #eca52b !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-warning-disabled,
.ant-btn-warning.disabled,
.ant-btn-warning[disabled],
.ant-btn-warning-disabled:hover,
.ant-btn-warning.disabled:hover,
.ant-btn-warning[disabled]:hover,
.ant-btn-warning-disabled:focus,
.ant-btn-warning.disabled:focus,
.ant-btn-warning[disabled]:focus,
.ant-btn-warning-disabled:active,
.ant-btn-warning.disabled:active,
.ant-btn-warning[disabled]:active,
.ant-btn-warning-disabled.active,
.ant-btn-warning.disabled.active,
.ant-btn-warning[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-warning:hover,
.ant-btn-warning:focus {
  color: #fff !important;
  background-color: #f0b95a !important;
  border-color: #f0b95a !important;
}
.ant-btn-warning:active,
.ant-btn-warning.active {
  color: #fff !important;
  background-color: #d18b13 !important;
  border-color: #d18b13 !important;
}
.ant-btn-background-ghost.ant-btn-warning {
  color: #eca52b !important;
  background: transparent !important;
  border-color: #eca52b !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-warning:hover,
.ant-btn-background-ghost.ant-btn-warning:focus {
  color: #f0b95a !important;
  background: transparent !important;
  border-color: #f0b95a !important;
}
.ant-btn-background-ghost.ant-btn-warning:active,
.ant-btn-background-ghost.ant-btn-warning.active {
  color: #eca52b !important;
  background: transparent !important;
  border-color: #d18b13 !important;
}
.ant-btn-info {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-info-disabled,
.ant-btn-info.disabled,
.ant-btn-info[disabled],
.ant-btn-info-disabled:hover,
.ant-btn-info.disabled:hover,
.ant-btn-info[disabled]:hover,
.ant-btn-info-disabled:focus,
.ant-btn-info.disabled:focus,
.ant-btn-info[disabled]:focus,
.ant-btn-info-disabled:active,
.ant-btn-info.disabled:active,
.ant-btn-info[disabled]:active,
.ant-btn-info-disabled.active,
.ant-btn-info.disabled.active,
.ant-btn-info[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-info:hover,
.ant-btn-info:focus {
  color: #fff !important;
  background-color: #1fc8e3 !important;
  border-color: #1fc8e3 !important;
}
.ant-btn-info:active,
.ant-btn-info.active {
  color: #fff !important;
  background-color: #117a8b !important;
  border-color: #117a8b !important;
}
.ant-btn-background-ghost.ant-btn-info {
  color: #17a2b8 !important;
  background: transparent !important;
  border-color: #17a2b8 !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-info:hover,
.ant-btn-background-ghost.ant-btn-info:focus {
  color: #1fc8e3 !important;
  background: transparent !important;
  border-color: #1fc8e3 !important;
}
.ant-btn-background-ghost.ant-btn-info:active,
.ant-btn-background-ghost.ant-btn-info.active {
  color: #17a2b8 !important;
  background: transparent !important;
  border-color: #117a8b !important;
}

// usage :
// <Button type="primary">Primary Button</Button>
// <Button type="danger">Danger Button</Button>
// <Button type="success">Success Button</Button>
// <Button type="info">Info Button</Button>
// <Button type="warning">Warning Button</Button>

.tableNoborded {
  .ant-table {
    border: 0px !important;
    th {
      text-align: start !important;
      border: none !important;
    }

    .ant-btn {
      margin: 0px 1%;
    }
  }
}
.highcharts-credits {
  display: none;
}

.ant-card {
  .ant-card-meta {
    padding: 0.5% 0px !important;
    .ant-card-meta-avatar {
      float: left;
      padding-right: 0.5% !important;
    }
  }
}
.ant-menu-item .anticon,
.ant-menu-submenu-title .anticon {
  margin-right: 8px !important;
}
</style>
