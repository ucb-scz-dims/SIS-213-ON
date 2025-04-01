import LoginForm from "./login-form";

export default {
    title: "components/Login Form",
    component: LoginForm,
    args: {
        submitAction: "",
        recoveryLink: "https://www.google.com/",
    },
}

const Template = (args) => <LoginForm{...args}/>;

export const Example = Template.bind({});