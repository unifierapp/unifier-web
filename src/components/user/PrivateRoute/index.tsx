import PrivateRouteComponent from "@/components/user/PrivateRoute/_index";
import dynamic from "next/dynamic";

const PrivateRoute = dynamic(async () => PrivateRouteComponent, {
    ssr: false
});

export default PrivateRoute;