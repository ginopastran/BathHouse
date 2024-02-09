import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  correo: string;
  text: string;
  imgen:
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Hola, {firstName}, ha completado el formulario de presupuesto!</h1>
  </div>
);
