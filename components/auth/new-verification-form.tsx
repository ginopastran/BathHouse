import { Suspense, useState, useEffect, useCallback } from "react";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWraper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationFormContent />
    </Suspense>
  );
};

const NewVerificationFormContent = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWraper
      headerLabel="Confirma tu verificación"
      backButtonLabel="Volver al inicio de sesión"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {isLoading && <BarLoader color="#ffffff" />}
        {!isLoading && (
          <>
            <FormSuccess message={success} />
            <FormError message={error} />
          </>
        )}
      </div>
    </CardWraper>
  );
};
