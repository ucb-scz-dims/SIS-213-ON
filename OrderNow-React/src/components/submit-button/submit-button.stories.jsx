import SubmitButton from "./submit-button";

export default {
    title: "components/submit-button",
    component: SubmitButton,
    args: {
        children: "Submit!",
    }
};

const Template = (args) => <SubmitButton{...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    children: "Botón de submit"
}