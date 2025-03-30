import Button from "./button";

export default {
    title: "components/Botón",
    component: Button,
    args: {
        label: "Botón",
        type: "button"
    }
};

const Template = (args) => <Button{...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    label: "Presiona aquí",
    type: "button",
}