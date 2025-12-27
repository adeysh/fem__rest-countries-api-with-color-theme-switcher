import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/AppLayout.jsx", [
    index("./pages/Home.jsx"),
    route("country/:code", "./pages/CountryDetail.jsx"),
    route("*", "./pages/NotFound.jsx"),
  ]),
];
