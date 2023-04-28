import GuestRouteComponent from "@/components/user/GuestRoute/_index";
import dynamic from "next/dynamic";

const GuestRoute = dynamic(async () => GuestRouteComponent, {
    ssr: false
});

export default GuestRoute;