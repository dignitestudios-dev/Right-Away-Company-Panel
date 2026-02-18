import React, { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { LoginBgTopShapes } from "../../assets/export";
import OnboardingStepper from "../../components/onboarding/OnboardingSteps";
import { RxFileText } from "react-icons/rx";
import { CiFileOn } from "react-icons/ci";
import CreateAccount from "../../components/onboarding/CreateAccount";
import VerifyAccount from "../../components/onboarding/VerifyAccount";
import VerifyDocuments from "../../components/onboarding/VerifyDocuments";
import CompanyProfile from "../../components/onboarding/CompanyProfile";
import AddStore from "../../components/onboarding/AddStore";
import PaymentMethod from "../../components/onboarding/PaymentMethod";
import { getProfile, setOnboardingStep } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { isOnboardingStep, company, token } = useSelector(
    (state) => state.auth,
  );
  const providerSteps = [
    { icon: RxFileText, title: "Business Details" },
    { icon: IoMailOutline, title: "Verify Email" },
    { icon: CiFileOn, title: "Identification And Verification" },
    { icon: LiaIdCard, title: "Company Details" },
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
    const fetchProfileAndSetStep = async () => {
      try {
        const res = token && (await dispatch(getProfile()).unwrap());
        const updatedCompany = res?.data?.company;
        if (!updatedCompany) return;

        if (updatedCompany.profileStatus === "in-review") {
          setCurrentStep(2);
        } else if (updatedCompany.isEmailVerified) {
          setCurrentStep(2);
        } else if (
          updatedCompany.profileStatus === "approved" &&
          updatedCompany.isDetails
        ) {
          setCurrentStep(4);
        } else if (updatedCompany.profileStatus === "approved") {
          setCurrentStep(3);
        } else if (updatedCompany.isStripeCompleted) {
          setCurrentStep(5);
        } else {
          setCurrentStep(0);
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };

    fetchProfileAndSetStep();
  }, [dispatch]);

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
            <CreateAccount setEmail={setEmail} handleNext={handleNext} />
          ) : currentStep === 1 ? (
            <VerifyAccount email={email} handleNext={handleNext} />
          ) : currentStep === 2 ? (
            <VerifyDocuments email={email} handleNext={handleNext} />
          ) : currentStep === 3 ? (
            <CompanyProfile handleNext={handleNext} />
          ) : currentStep === 4 ? (
            <AddStore handleNext={handleNext} />
          ) : currentStep === 5 ? (
            <PaymentMethod handleNext={handleNext} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
