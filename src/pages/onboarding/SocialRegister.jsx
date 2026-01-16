import React, { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { LoginBgTopShapes } from "../../assets/export";
import OnboardingStepper from "../../components/onboarding/OnboardingSteps";
import { RxFileText } from "react-icons/rx";
import { CiFileOn } from "react-icons/ci";
import VerifyDocuments from "../../components/onboarding/VerifyDocuments";
import CompanyProfile from "../../components/onboarding/CompanyProfile";
import AddStore from "../../components/onboarding/AddStore";
import PaymentMethod from "../../components/onboarding/PaymentMethod";
import { setOnboardingStep } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateSocialAccount from "../../components/onboarding/CreateSocialAccount";
export default function SocialRegister() {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { isOnboardingStep } = useSelector((state) => state.auth);
  const providerSteps = [
    { icon: RxFileText, title: "Business Details" },
    { icon: CiFileOn, title: "Identification and Verification" },
    { icon: LiaIdCard, title: "Company details" },
    { icon: PiCertificateBold, title: "Multiple Store Location" },
    { icon: MdOutlinePayment, title: "Payment Method" },
  ];
  const [email, setEmail] = useState("");
  const steps = providerSteps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    active: index === currentStep,
  }));
  useEffect(() => {
    if (isOnboardingStep != currentStep) {
      setCurrentStep(isOnboardingStep);
    }
  }, [isOnboardingStep]);
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      dispatch(setOnboardingStep(currentStep + 1));
    }
  };

  return (
    <div className={`grid grid-cols-12 gap-6  h-full w-full`}>
      <OnboardingStepper steps={steps} currentStep={currentStep} />

      <div className="col-span-12 lg:col-span-8 px-5 md:px-10 h-full flex justify-center items-center">
        <div
          className={`bg-white w-full relative flex justify-center flex-col items-center h-full backdrop-blur-[34px] rounded-[28px]`}
        >
          {/* Bg Image */}
          <img
            src={LoginBgTopShapes}
            className="h-full absolute z-[-1] right-0"
            alt="LoginBgTopShapes"
          />
          {currentStep === 0 ? (
            <CreateSocialAccount setEmail={setEmail} handleNext={handleNext} />
          ) : currentStep === 1 ? (
            <VerifyDocuments email={email} handleNext={handleNext} />
          ) : currentStep === 2 ? (
            <CompanyProfile handleNext={handleNext} />
          ) : currentStep === 3 ? (
            <AddStore handleNext={handleNext} />
          ) : currentStep === 4 ? (
            <PaymentMethod handleNext={handleNext} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
