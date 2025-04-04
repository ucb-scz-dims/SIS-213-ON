import RegisterForm from "./register-form";

export default {
    title: "components/Register Form",
    component: RegisterForm,
};

const Template = (args) => <RegisterForm{...args}/>;

export const Example = Template.bind({});