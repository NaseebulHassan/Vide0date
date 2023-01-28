import Vue from "vue";
import Router from "vue-router";
import { scrollBehavior } from "~/utils";

Vue.use(Router);

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m);

const routes = [
  { path: "/", name: "welcome", component: page("welcome.vue") },

  { path: "/login", name: "login", component: page("auth/login.vue") },
  { path: "/register", name: "register", component: page("auth/register.vue") },
  { path: "/test", name: "test", component: page("test.vue") },
  { path: "/test2", name: "test2", component: page("test2.vue") },
  { path: "/test3", name: "test3", component: page("test3.vue") },
  { path: "/short", name: "short", component: page("short.vue") },
  { path: "/debug", name: "debug", component: page("debug.vue") },

  { path: "/pre-signup", name: "preSignup", component: page("pre-signup.vue") },
  {
    path: "/password/reset",
    name: "password.request",
    component: page("auth/password/email.vue"),
  },
  {
    path: "/password/reset/:token",
    name: "password.reset",
    component: page("auth/password/reset.vue"),
  },
  {
    path: "/email/verify/:id",
    name: "verification.verify",
    component: page("auth/verification/verify.vue"),
  },
  {
    path: "/email/resend",
    name: "verification.resend",
    component: page("auth/verification/resend.vue"),
  },

  { path: "/home", name: "home", component: page("home.vue") },
  {
    path: "/settings",
    component: page("settings/index.vue"),
    children: [
      { path: "", redirect: { name: "settings.profile" } },
      {
        path: "profile",
        name: "settings.profile",
        component: page("settings/profile.vue"),
      },
      {
        path: "password",
        name: "settings.password",
        component: page("settings/password.vue"),
      },
    ],
  },
];

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: "history",
  });
}
