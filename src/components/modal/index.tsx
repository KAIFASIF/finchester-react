import React, { forwardRef, useImperativeHandle, useState } from "react";
import { GrFormClose } from "react-icons/gr";

export interface modalMethods {
  openModal: () => void;
  closeModal: () => void;
}

const Modal = forwardRef<
  modalMethods,
  {
    showCloseIcon?: boolean;
    closeOnClick?: boolean;
    modalSize?: string;
    children?: any;
  }
>((props, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };
  const doNothing = () => {};

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  return (
    <div>
      {isVisible && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={props?.closeOnClick ? closeModal : doNothing}
          id="wrapper"
        >
          <div
            className={`bg-white rounded p-5 flex flex-col  ${
              props?.modalSize ? props?.modalSize : "sm:w-[60%] "
            }  `}
          >
            {props?.showCloseIcon && (
              <div className="flex justify-end mb-4">
                <div
                  className=" rounded-3xl p-1  border-red-600 border-2"
                  onClick={closeModal}
                >
                  <GrFormClose className="cursor-pointer text-red-600 place-self-end text-2xl" />
                </div>
              </div>
            )}
            {props?.children}
          </div>
        </div>
      )}
    </div>
  );
});

export default React.memo(Modal);
