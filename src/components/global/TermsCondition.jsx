import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
const TermsConditionModal = ({ isOpen, setIsOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white rounded-[16px] shadow-lg  w-[760px] h-[670px]   flex flex-col text-center justify-center gap-3 ">
                <div className="flex justify-end p-3 w-full">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <HiOutlineXMark size={23} />
                    </button>
                </div>
                {/* Content */}
                <div className="text-start overflow-y-scroll  p-10 pt-5 ">
                    <h3 className="capitalize text-[28px] font-bold ">terms & conditions</h3>
                    {/* Section 1 */}
                    <section className="mt-10" >
                        <h2 className="font-[600] text-[16px] text-[#181818] mb-4">1. Acceptance of Terms</h2>
                        <p className="text-[#181818B2] font-[400] text-[16px] leading-relaxed">
                            By accessing or using our mobile application (the "App"), you agree to be bound by
                            these Terms of Service. If you do not agree to these Terms, please do not use the App.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="mt-5" >
                        <h2 className="font-[600] text-[16px] text-[#181818] mb-4">2. User Conduct</h2>
                        <p className="text-[#181818] font-[600] text-[16px] leading-relaxed mb-4">You agree not to:</p>
                        <ul className="space-y-3 text-[#181818B2] list-disc font-[400] text-[16px] leading-relaxed">
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#181818B2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Use the App for any illegal or unauthorized purpose.
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#181818B2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Interfere with the security or functionality of the App.
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#181818B2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Attempt to gain unauthorized access to the App or its systems.
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#181818B2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Use the App in a way that could harm, disable, overburden, or impair the App or
                                interfere with other users' enjoyment of the App.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="mt-5" >
                        <h2 className="font-[600] text-[16px] text-[#181818] mb-4">3. Intellectual Property</h2>
                        <p className="text-[#181818B2] font-[400] text-[16px] leading-relaxed mb-4">
                            All content and materials on the App, including but not limited to text, graphics,
                            logos, images, and software,
                        </p>
                        <p className="text-[#181818B2] font-[400] text-[16px] leading-relaxed">
                            are the property or its licensors and are protected by copyright and other intellectual
                            property laws.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="mt-5" >
                        <h2 className="font-[600] text-[16px] text-[#181818] mb-4">4. Disclaimer of Warranties</h2>
                        <p className="text-[#181818B2] font-[400] text-[16px] leading-relaxed">
                            The App is provided "as is" without warranty of any kind, express or implied,
                            including, but not limited to, the implied warranties of merchantability, fitness for a
                            particular purpose, and non-infringement.
                        </p>
                    </section>
                </div>

            </div>
        </Modal>
    );
};

export default TermsConditionModal;
