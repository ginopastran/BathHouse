"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings } from "lucide-react";
import Image from "next/image";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsThreeDots,
  BsTwitter,
} from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

const Hero = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  const onLogout = () => {
    logout();
  };

  return (
    <div className="text-white z-0  flex flex-col  justify-center items-center w-full">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="backdrop w-[13rem] sm:w-[23rem] md:w-[26rem] lg:w-[34rem] min-h-[16rem] sm:min-h-[20rem] md:min-h-[20rem] lg:min-h-[20rem] bg-[#191D24] bg-opacity-[65%] rounded-xl p-1 px-4 sm:px-10 text-white border-white/30 border-1 shadow-lg">
            <div className="flex flex-col h-full justify-between py-6">
              <h1 className=" text-md sm:text-2xl lg:text-3xl font-bold text-shadow">
                El mejor servicio, precio y calidad hoy y siempre.
              </h1>
              <p className=" text-sm sm:text-md lg:text-xl">
                Deja tu proyecto en nuestras manos, te brindamos un hogar.
              </p>
              <button
                className=" bg-orange-600 w-full p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold"
                onClick={onOpen}
              >
                Presupuestar
              </button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
              >
                <ModalContent className=" w-[20rem] sm:w-[25rem] min-h-[13.5rem]">
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Presupuestos
                      </ModalHeader>
                      <ModalBody>
                        <div className=" flex flex-col gap-6">
                          <Button
                            className=" bg-orange-600 text-white w-full p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold hover:bg-orange-800"
                            asChild
                          >
                            <Link href="/otro">Presupuesto Basico</Link>
                          </Button>
                          <Button
                            className=" bg-orange-600 text-white w-full p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold hover:bg-orange-800"
                            asChild
                          >
                            <Link href="/premiun">Presupuesto Premium</Link>
                          </Button>
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div className="backdrop w-[13rem] sm:w-[23rem] md:w-[26rem] lg:w-[34rem] min-h-[16rem] sm:min-h-[20rem] md:min-h-[20rem] lg:min-h-[20rem] bg-[#191D24] bg-opacity-[65%] rounded-xl p-1 px-4 sm:px-10 text-white border-white/30 border-1 shadow-lg">
            <div className="flex flex-col h-full justify-between py-6">
              <h1 className=" text-md sm:text-2xl lg:text-3xl font-bold text-shadow">
                Reportar Error
              </h1>
              <p className=" text-xs sm:text-md lg:text-xl">
                Es posible que encuentre inconvenientes en el uso. Puede
                adjuntar el inconveniente con foto y su comentario en el chat de
                la esquina inferior derecha.
              </p>
              <div className=" flex items-center justify-end">
                <ArrowRight className=" h-7 w-7 sm:h-12 sm:w-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="backdrop w-[10rem] sm:w-[18rem] md:w-[20rem] min-h-[23rem] sm:min-h-[30rem] md:min-h-[31rem] bg-[#191D24] bg-opacity-[65%] rounded-xl p-1 sm:px-10 px-4 text-white border-white/30 border-1 shadow-lg">
            <div className="flex flex-col h-full justify-between py-6">
              <h1 className="text-[1rem] text-sm sm:text-[1.4rem] md:text-[1.7rem] sm:text-xl md:text-2xl font-bold text-shadow">
                No solo construimos casas, construimos sueños.
              </h1>
              <div className="flex flex-col gap-3">
                <input
                  disabled
                  className=" bg-[#18161A] bg-opacity-[65%] py-1 sm:py-2 rounded-lg border-1 border-white/30"
                />
                <input
                  disabled
                  className=" bg-[#18161A] bg-opacity-[65%] py-1 sm:py-2 rounded-lg border-1 border-white/30"
                />
                <input
                  disabled
                  className=" bg-[#18161A] bg-opacity-[65%] py-1 sm:py-2 rounded-lg border-1 border-white/30"
                />
              </div>
              <div className=" flex items-center justify-center">
                {session && (
                  <Dropdown
                    placement="top"
                    className=" flex flex-col items-center"
                  >
                    <DropdownTrigger>
                      <Settings className=" text-white h-8 w-8 sm:h-10 sm:w-10" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                      <DropdownItem href="/historial" color="primary">
                        Historial
                      </DropdownItem>
                      <DropdownItem color="danger" onClick={onLogout}>
                        Cerrar Sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                {!session && (
                  <Dropdown
                    placement="top"
                    className=" flex flex-col items-center"
                  >
                    <DropdownTrigger>
                      <Settings className=" text-white h-8 w-8 sm:h-10 sm:w-10" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                      <DropdownItem href="/historial" color="primary">
                        Historial
                      </DropdownItem>
                      <DropdownItem color="primary" href="/auth/login">
                        Iniciar Sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
              <div className="flex justify-between items-center px-2">
                <BsInstagram className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <BsFacebook className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <BsTwitter className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <BsLinkedin className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
              </div>
            </div>
          </div>
          <div className="backdrop w-[10rem] sm:w-[18rem] md:w-[20rem] min-h-[9rem] sm:min-h-[10rem] md:min-h-[9rem] bg-[#191D24] bg-opacity-[65%] rounded-xl p-1 px-10 text-white border-white/30 border-1 shadow-lg">
            <div className="flex flex-col h-full items-center justify-center py-6">
              <Image
                src="/powered-by-ciclo.png"
                alt="Ciclo Tech"
                width={220}
                height={220}
                className="hidden sm:block"
              />
              <Image
                src="/powered-by-ciclo-mobile.png"
                alt="Ciclo Tech"
                width={900}
                height={900}
                className="flex sm:hidden object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/bathouse-logo-name.png"
        alt="Bathouse-Logo"
        width={150}
        height={150}
        className="block sm:hidden pt-12"
      />
    </div>
  );
};

export default Hero;
