"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWraper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }
    if (!token) {
      setError("Falta el token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Algo salió mal");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Suspense>
      <CardWraper
        headerLabel="Confirma tu verificación"
        backButtonLabel="Volver al inicio de sesión"
        backButtonHref="/auth/login"
      >
        <div className=" flex items-center w-full justify-center">
          {!success && !error && <BarLoader color="#ffffff" />}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWraper>
    </Suspense>
  );
};
