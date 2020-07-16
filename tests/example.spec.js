import { mount } from "@vue/test-utils";
import Counter from "@/componentsCounter.vue";

describe("Counter.vue", () => {
  it("increments counter", () => {
    const wrapper = mount(Counter);

    expect(wrapper.html()).toMatchSnapshot();

    wrapper.find('[jest="increment-button"]').trigger("click");

    expect(wrapper.html()).toMatchSnapshot();
  });
});
