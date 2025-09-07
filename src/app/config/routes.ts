type Route = {
  path: string;
  name: string;
};

type Routes = {
  [key: string]: Route;
};

export const routes: Routes = {
  home: {
    path: "/",
    name: "Home",
  },
  pricing: {
    path: "/pricing",
    name: "Pricing",
  },
  examples: {
    path: "/examples",
    name: "Examples",
  },
};
