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
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
  },
  analytics: {
    path: "/analytics",
    name: "Analytics",
  },
  publish: {
    path: "/publish",
    name: "Publish",
  },
  basic_info: {
    path: "portfolio/basic-info",
    name: "Basic Info",
  },
  ai: {
    path: "portfolio/ai",
    name: "AI",
  },
  tools: {
    path: "portfolio/tools",
    name: "Tools",
  },
  questions: {
    path: "portfolio/questions",
    name: "Questions",
  },
};
