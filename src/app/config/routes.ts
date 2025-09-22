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
  signin: {
    path: "/signin",
    name: "Sign In",
  },
  signup: {
    path: "/signup",
    name: "Sign Up",
  },
};
