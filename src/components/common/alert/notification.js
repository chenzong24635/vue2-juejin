// notification.js
import Alert from './alert.vue';
import Vue from 'vue';
console.log(Alert);

Alert.newInstance = properties => {
  const props = properties || {};
  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      });
    }
  });
  const component = Instance.$mount();
  console.log(Instance);
  console.log(component);
  document.body.appendChild(component.$el);
  const alert = Instance.$children[0];
  return {
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
};

export default Alert;