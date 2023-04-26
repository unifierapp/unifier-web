import dynamic from "next/dynamic";

const OnboardingWrapper = dynamic(() => import("./_index"), {
    ssr: false,
});
export default OnboardingWrapper;