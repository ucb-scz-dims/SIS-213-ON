import Button from "./Button";

export default {
    title: "components/Button",
    component: Button,
    args: {
        children: "Boton",
    }
};

const Template = (args) => <Button{...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    type: "primary",
}

export const Secondary = Template.bind({});
Secondary.args = {
    type: "secondary",
}

export const Tertiary = Template.bind({});
Tertiary.args = {
    type: "tertiary",
}