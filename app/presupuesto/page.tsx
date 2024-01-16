"use client";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";

export default function Presupuesto() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      "nombre-completo": "",
      ubicacion: "",
      "metros-cuadrados-de-planta-baja": "",
      "metros-cuadrados-de-planta-alta": "",
      "superficie-p-rgolas-cubiertas-techado": "",
      "superficie-p-rgolas-semi-cubierta-p-rgola": "",
      "altura-de-muro-planta-baja": "",
      "altura-de-muro-planta-alta": "",
      churrasquera: "",
      "aires-acondicionados": "",
      "pozo-filtrante": "",
      "cisterna-enterrada": "",
      "con-pluviales": "",
      agua: ["Si"],
      cloaca: ["Si"],
      gas: ["Si"],
      "pozo-filtrante-bool": ["Si"],
      "losa-radiante-de-agua": ["no"],
      "losa-radiante-electrica": ["Si"],
      "molduras-de-cumbrera": ["Si"],
      "moldura-de-ventanas": ["Si"],
      "cielorraso-de-placa-de-yeso": ["Si"],
      "cielorraso-de-yeso": ["no"],
      porcelanato: ["Si"],
      "rayado-o-fino-de-muros": ["Si"],
      "vereda-vehiculo": ["Si"],
      "churrasquera-de-ladrillo-y-o-hogar": ["Si"],
      "cuenta-con-arquitecto": ["Si"],
      "cuenta-con-proyecto": ["Si"],
    },
  });
  const onSubmit = async (data: any) => {
    try {
      // Enviar datos al servidor
      await axios.post("/api/actualizarExcel", data);

      const response = await axios.get("/api/actualizarExcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BATHOUSE-Enero-2024.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Formulario</h1>

      <div>
        <label>
          <span>Nombre Completo</span>
          <input
            {...register("nombre-completo", {
              required: true,
            })}
            aria-invalid={errors["nombre-completo"] ? "true" : "false"}
            placeholder="Nombre completo"
            type="text"
            className=" text-b"
          />
        </label>
        {errors["nombre-completo"] && (
          <p role="alert">{errors["nombre-completo"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Ubicación de la Obra</span>
          <select
            {...register("ubicacion", {
              required: true,
            })}
            aria-invalid={errors["ubicacion"] ? "true" : "false"}
          >
            <option value="Mendoza">Mendoza</option>
            <option value="Chaco">Chaco</option>
          </select>
          {errors["ubicacion"] && (
            <p role="alert">{errors["ubicacion"]?.message}</p>
          )}
        </label>
      </div>

      <div>
        <label>
          <span>Metros cuadrados de planta baja</span>
          <input
            {...register("metros-cuadrados-de-planta-baja", {
              required: true,
            })}
            aria-invalid={
              errors["metros-cuadrados-de-planta-baja"] ? "true" : "false"
            }
            placeholder="m2"
            type="number"
          />
        </label>
        {errors["metros-cuadrados-de-planta-baja"] && (
          <p role="alert">
            {errors["metros-cuadrados-de-planta-baja"]?.message}
          </p>
        )}
      </div>

      <div>
        <label>
          <span>Metros cuadrados de planta alta</span>
          <input
            {...register("metros-cuadrados-de-planta-alta", {
              required: "Please fill in this field.",
            })}
            aria-invalid={
              errors["metros-cuadrados-de-planta-alta"] ? "true" : "false"
            }
            placeholder="m2"
            type="number"
          />
        </label>
        {errors["metros-cuadrados-de-planta-alta"] && (
          <p role="alert">
            {errors["metros-cuadrados-de-planta-alta"]?.message}
          </p>
        )}
      </div>

      <div>
        <label>
          <span>Superficie Pérgolas cubiertas (techado)</span>
          <input
            {...register("superficie-p-rgolas-cubiertas-techado", {
              required: "Please fill in this field.",
            })}
            aria-invalid={
              errors["superficie-p-rgolas-cubiertas-techado"] ? "true" : "false"
            }
            placeholder="m2"
            type="number"
          />
        </label>
        {errors["superficie-p-rgolas-cubiertas-techado"] && (
          <p role="alert">
            {errors["superficie-p-rgolas-cubiertas-techado"]?.message}
          </p>
        )}
      </div>

      <div>
        <label>
          <span>Superficie Pérgolas semi cubierta (pérgola)</span>
          <input
            {...register("superficie-p-rgolas-semi-cubierta-p-rgola", {
              required: "Please fill in this field.",
            })}
            aria-invalid={
              errors["superficie-p-rgolas-semi-cubierta-p-rgola"]
                ? "true"
                : "false"
            }
            placeholder="m2"
            type="number"
          />
        </label>
        {errors["superficie-p-rgolas-semi-cubierta-p-rgola"] && (
          <p role="alert">
            {errors["superficie-p-rgolas-semi-cubierta-p-rgola"]?.message}
          </p>
        )}
      </div>

      <div>
        <label>
          <span>Altura de Muro planta baja</span>
          <input
            {...register("altura-de-muro-planta-baja", {
              required: "Please fill in this field.",
            })}
            aria-invalid={
              errors["altura-de-muro-planta-baja"] ? "true" : "false"
            }
            placeholder="ml"
            type="number"
          />
        </label>
        {errors["altura-de-muro-planta-baja"] && (
          <p role="alert">{errors["altura-de-muro-planta-baja"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Altura de Muro planta alta</span>
          <input
            {...register("altura-de-muro-planta-alta", {
              required: "Please fill in this field.",
            })}
            aria-invalid={
              errors["altura-de-muro-planta-alta"] ? "true" : "false"
            }
            placeholder="ml"
            type="number"
          />
        </label>
        {errors["altura-de-muro-planta-alta"] && (
          <p role="alert">{errors["altura-de-muro-planta-alta"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Cuantas Churrasquera u hogar</span>
          <input
            {...register("churrasquera", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors["churrasquera"] ? "true" : "false"}
            placeholder="cantidad"
            type="number"
          />
        </label>
        {errors["churrasquera"] && (
          <p role="alert">{errors["churrasquera"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Cantidad de aires acondicionados</span>
          <input
            {...register("aires-acondicionados", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors["aires-acondicionados"] ? "true" : "false"}
            placeholder="cantidad"
            type="number"
          />
        </label>
        {errors["aires-acondicionados"] && (
          <p role="alert">{errors["aires-acondicionados"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Pozo filtrante</span>
          <input
            {...register("pozo-filtrante", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors["pozo-filtrante"] ? "true" : "false"}
            placeholder="cantidad"
            type="number"
          />
        </label>
        {errors["pozo-filtrante"] && (
          <p role="alert">{errors["pozo-filtrante"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Cisterna enterrada</span>
          <input
            {...register("cisterna-enterrada", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors["cisterna-enterrada"] ? "true" : "false"}
            placeholder="cantidad"
            type="number"
          />
        </label>
        {errors["cisterna-enterrada"] && (
          <p role="alert">{errors["cisterna-enterrada"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Con Pluviales</span>
          <input
            {...register("con-pluviales", {
              required: "Please fill in this field.",
            })}
            aria-invalid={errors["con-pluviales"] ? "true" : "false"}
            placeholder="cantidad"
            type="number"
          />
        </label>
        {errors["con-pluviales"] && (
          <p role="alert">{errors["con-pluviales"]?.message}</p>
        )}
      </div>

      <div>
        <p>Agua</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("agua", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["agua"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["agua"] && <p role="alert">{errors["agua"]?.message}</p>}
      </div>

      <div>
        <p>Cloaca</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("cloaca", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["cloaca"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["cloaca"] && <p role="alert">{errors["cloaca"]?.message}</p>}
      </div>

      <div>
        <p>Gas</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("gas", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["gas"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["gas"] && <p role="alert">{errors["gas"]?.message}</p>}
      </div>

      <div>
        <p>Pozo filtrante</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("pozo-filtrante-bool", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["pozo-filtrante-bool"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["pozo-filtrante-bool"] && (
          <p role="alert">{errors["pozo-filtrante-bool"]?.message}</p>
        )}
      </div>

      <div>
        <p>Losa radiante de agua</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("losa-radiante-de-agua", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["losa-radiante-de-agua"] ? "true" : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["losa-radiante-de-agua"] && (
          <p role="alert">{errors["losa-radiante-de-agua"]?.message}</p>
        )}
      </div>

      <div>
        <p>Losa radiante eléctrica</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("losa-radiante-electrica", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["losa-radiante-electrica"] ? "true" : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["losa-radiante-electrica"] && (
          <p role="alert">{errors["losa-radiante-electrica"]?.message}</p>
        )}
      </div>

      <div>
        <p>Molduras de cumbrera</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("molduras-de-cumbrera", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["molduras-de-cumbrera"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["molduras-de-cumbrera"] && (
          <p role="alert">{errors["molduras-de-cumbrera"]?.message}</p>
        )}
      </div>

      <div>
        <p>Moldura de ventanas</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("moldura-de-ventanas", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["moldura-de-ventanas"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["moldura-de-ventanas"] && (
          <p role="alert">{errors["moldura-de-ventanas"]?.message}</p>
        )}
      </div>

      <div>
        <p>Cielorraso de placa de Yeso</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("cielorraso-de-placa-de-yeso", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["cielorraso-de-placa-de-yeso"] ? "true" : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["cielorraso-de-placa-de-yeso"] && (
          <p role="alert">{errors["cielorraso-de-placa-de-yeso"]?.message}</p>
        )}
      </div>

      <div>
        <p>Cielorraso de Yeso</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("cielorraso-de-yeso", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["cielorraso-de-yeso"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["cielorraso-de-yeso"] && (
          <p role="alert">{errors["cielorraso-de-yeso"]?.message}</p>
        )}
      </div>

      <div>
        <p>Porcelanato</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("porcelanato", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["porcelanato"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["porcelanato"] && (
          <p role="alert">{errors["porcelanato"]?.message}</p>
        )}
      </div>

      <div>
        <p>Rayado o fino de muros interiores</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("rayado-o-fino-de-muros", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["rayado-o-fino-de-muros"] ? "true" : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["rayado-o-fino-de-muros"] && (
          <p role="alert">{errors["rayado-o-fino-de-muros"]?.message}</p>
        )}
      </div>

      <div>
        <p>Vereda vehicular y peatonal peperndic. a la calle</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("vereda-vehiculo", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["vereda-vehiculo"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["vereda-vehiculo"] && (
          <p role="alert">{errors["vereda-vehiculo"]?.message}</p>
        )}
      </div>

      <div>
        <p>Churrasquera de ladrillo y/o Hogar</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("churrasquera-de-ladrillo-y-o-hogar", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["churrasquera-de-ladrillo-y-o-hogar"]
                    ? "true"
                    : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["churrasquera-de-ladrillo-y-o-hogar"] && (
          <p role="alert">
            {errors["churrasquera-de-ladrillo-y-o-hogar"]?.message}
          </p>
        )}
      </div>

      <div>
        <p>Cuenta con arquitecto?</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("cuenta-con-arquitecto", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={
                  errors["cuenta-con-arquitecto"] ? "true" : "false"
                }
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["cuenta-con-arquitecto"] && (
          <p role="alert">{errors["cuenta-con-arquitecto"]?.message}</p>
        )}
      </div>

      <div>
        <p>Cuenta con proyecto?</p>
        {[
          { label: "Si", value: "Si" },
          { label: "no", value: "no" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("cuenta-con-proyecto", {
                  required: "Please select an item in the list.",
                })}
                aria-invalid={errors["cuenta-con-proyecto"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["cuenta-con-proyecto"] && (
          <p role="alert">{errors["cuenta-con-proyecto"]?.message}</p>
        )}
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
