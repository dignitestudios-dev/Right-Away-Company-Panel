export default function OnboardingStepper({ steps = [], currentStep = 0 }) {
  return (
    <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-start h-full px-0 lg:px-10">
      <div className="w-full mt-4 lg:mt-10">
        <div
          className="
          hidden-scrollbar
          py-4
          overflow-auto
        flex flex-row lg:flex-col
        items-center lg:items-start
        justify-between lg:justify-normal
        w-full
        gap-0 lg:gap-0
        relative
      "
        >
          {steps?.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps?.length - 1;

            return (
              <div
                key={index}
                className="relative flex  flex-col items-center lg:items-start text-center lg:text-left flex-1"
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-1 lg:mb-8">
                  <div
                    className={`
                  w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center
                  transition-all duration-300 z-10
                  ${
                    step.completed || step.active
                      ? "bg-white shadow-lg"
                      : "bg-white/20 backdrop-blur-sm border border-white/30"
                  }
                `}
                  >
                    <Icon
                      size={20}
                      className={`lg:text-[22px] transition-all duration-300 ${
                        step.completed || step.active
                          ? "text-[#22B573]"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <div
                    className={`
                text-[10px] hidden  lg:flex sm:text-[8px] lg:text-lg lg:font-medium transition-all duration-300
                ${
                  step.completed || step.active ? "text-white" : "text-white/60"
                }
              `}
                  >
                    {step.title}
                  </div>
                </div>

                {/* Step Title */}
                <div
                  className={`
                text-[10px] ml-4 text-nowrap lg:hidden sm:text-[8px] lg:text-lg lg:font-medium transition-all duration-300
                ${
                  step.completed || step.active ? "text-white" : "text-white/60"
                }
              `}
                >
                  {step.title}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`
                  absolute transition-all duration-500
                  ${index < currentStep ? "bg-white" : "bg-white/20"}
                  /* Horizontal line (mobile) */
                  top-[35%] w-full h-px left-20
                  /* Vertical line (desktop) */
                  lg:w-px lg:h-16 lg:left-6 lg:top-12
                `}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
