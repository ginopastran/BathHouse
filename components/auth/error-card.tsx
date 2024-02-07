import { CardWraper } from "./card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
  return (
    <CardWraper
      headerLabel="Oops! Algo salió mal!"
      backButtonHref="/auth/login"
      backButtonLabel="Volver al inicio de sesión"
    >
      <div className=" w-full flex justify-center items-center ">
        <BsExclamationTriangle className=" text-destructive" />
      </div>
    </CardWraper>
  );
};
