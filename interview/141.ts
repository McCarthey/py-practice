/**
 * react router 对象数组递归转换成 antd breadcrumbs router 对象数组
 */
interface Route {
  name?: string;
  icon?: string;
  path?: string;
  routes?: Route[];
}

interface BreadCrumbRoute {
  path: string;
  breadcrumbName: string;
  children?: BreadCrumbRoute[];
}

const mapRouteToBreadCrumb = (route: Route) => {
  const bcRoute = {
    path: route.path || "",
    breadcrumbName: route.name || "",
  };
  return bcRoute;
};

const recursion = (routes: Route[]) => {
  const result = [];
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.routes) {
      result.push({
        ...mapRouteToBreadCrumb(route),
        children: recursion(route.routes),
      });
    } else {
      result.push(mapRouteToBreadCrumb(route));
    }
  }
  console.log("[result]", result);
  return result;
};
