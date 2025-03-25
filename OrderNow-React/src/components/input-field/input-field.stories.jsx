import InputField from "./input-field";

export default {
    title: "components/input-field",
    component: InputField,
    args: {
        children: "Label",
        type: "text",
        id: { control: "text"},
        required: {control: "boolean"},
    }
};

const Template = (args) => <InputField{...args}/>;

export const Text = Template.bind({});
Text.args = {
    type: "text",
}

export const Email = Template.bind({});
Email.args = {
    type: "email",
    children: "E-mail",
    required: true,
}

export const Password = Template.bind({});
Password.args = {
    type: "password",
    children: "Password",
    required: true,
}

export const Date = Template.bind({});
Date.args = {
    type: "date",
    children: "Select a date"
}

export const Phone = Template.bind({});
Phone.args = {
    type: "tel",
    children: "Insert your phone number"
}