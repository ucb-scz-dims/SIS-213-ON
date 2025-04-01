import Card from "./card";
import ReactLogo from "../../assets/react.svg";

export default {
    title: "components/Card",
    component: Card,
    args: {
        path: {ReactLogo},
        alt: "Example",
        fit: "object-cover",
        disabled: false,
    },
    argTypes: {
        handleClick: {action: "handleClick"},
        fit: {control: 'select', options: ["object-cover", "object-contain", "object-fill", "object-scale-down", "object-none"] },
    },
    parameters: {
        docs: {
            description: {
              component: 'Tarjeta con imagen, ideal para listar productos de restaurantes',
            },
        },
    },
};

const Template = (args) => <Card{...args}/>;

export const Bollos = Template.bind({});
Bollos.args = {
    path: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Surtido_de_boller%C3%ADa.jpg",
    alt: "Bollos",
    fit: "object-cover",
    title: "Bollos",
    desc: "Horneados dulces",
    price: "999$",
    disabled: false
}

export const Pollo_NoDisponible = Template.bind({});
Pollo_NoDisponible.args = {
    path: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    alt: "Pollo asado",
    fit: "object-cover",
    title: "Pollo asado entero",
    desc: "Es el pollo entero",
    price: "No disponible",
    disabled: true,
}