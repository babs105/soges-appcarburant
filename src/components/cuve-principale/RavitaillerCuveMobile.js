import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";

function RavitaillerCuveMobile({ location }) {
  const cuve = location.state;
  const history = useHistory();
  const { ravitaillerCuveMobile } = useContext(CuvePrincipaleContext);
  const { logging } = useContext(TableListContext);
  const { cuves } = useContext(CuveContext);

  const validationRajout = Yup.object().shape({
    // cuvePrincipale: Yup.string().required("Nom Cuve est obligatoire"),
    cuveMobile: Yup.string().required("Station est obligatoire"),
    quantiteRavitaillee: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateRavitaillementCuveMobile: Yup.string().required(
      "Date Ravitallement est obligatoire"
    ),
  });
  const { register, handleSubmit, setValue, errors, formState } = useForm({
    resolver: yupResolver(validationRajout),
  });

  useEffect(() => {
    setValue("cuvePrincipale", cuve["cuveName"]);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    data.cuvePrincipale = cuve["cuveName"];
    data.dateRavitaillementCuveMobile = moment(
      data.dateRavitaillementCuveMobile,
      "yyyy-MM-DDTHH:mm"
    ).format(" DD/MM/YYYY HH:mm");

    console.log(data);
    ravitaillerCuveMobile(data);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link  h6 active " data-target="#users" href>
                Ravitailler Cuve Mobile
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title">
            <Link to="/cuve-principale" className="my-link p-2">
              <i className="fa fa-arrow-left mr-1"></i>
              Retour Liste
            </Link>
            <div className="card-body ">
              <h6 className="text-center ">RAVITAILLEMENT </h6>
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <form
                  className="col-12 col-md-6 col-lg-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Cuve Principale</label>
                      <input
                        disabled
                        className={
                          errors?.cuvePrincipale
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="cuvePrincipale"
                      />
                      <div className="invalid-feedback">
                        {errors.cuvePrincipale?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Cuve Mobile</label>
                      <select
                        className={
                          errors?.cuveMobile
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="cuveMobile"
                        type="selected"
                      >
                        {cuves.map((cuve) => (
                          <option key={cuve.id} value={cuve.cuveName}>
                            {cuve.cuveName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.cuveMobile?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Ravitaillement</label>
                      <input
                        className={
                          errors?.quantiteRavitaillee
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="quantiteRavitaillee"
                        placeholder="Quantité en litre"
                      />
                      <div className="invalid-feedback">
                        {errors.quantiteRavitaillee?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Date Ravitaillement</label>
                      <input
                        className={
                          errors?.dateRavitaillementCuveMobile
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="datetime-local"
                        name="dateRavitaillementCuveMobile"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.dateRavitaillementCuveMobile?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success btn-block mt-3"
                        type="submit"
                        id="mybutton"
                        disabled={formState.isSubmitting}
                      >
                        {logging && (
                          <span className="spinner-border spinner-border-sm mr-1 "></span>
                        )}
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RavitaillerCuveMobile;
