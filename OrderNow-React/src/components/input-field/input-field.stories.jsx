import InputField from "./input-field";

export default {
    title: 'components/Input',
    component: InputField,
    args: {
        type: "text",
        id: "text",
        placeholder: "Insert some text...",
        required: false,
    },
    argTypes: {
        type: {control: 'select', options: ["text", "email", "password", "date", "color", "number", "tel"]}
    }
};

const Template = (args) => <InputField{...args}/>;

export const Example = Template.bind({});