declare module '*.vue' {
  import { Component, DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, Component>
  export default component
}
