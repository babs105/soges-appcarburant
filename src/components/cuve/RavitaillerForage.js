import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { TableListContext } from "../../context/TableListContext";
import { StationContext } from "../../context/StationContext";
import { CuveContext } from "../../context/CuveContext";
import { RavitaillementForageContext } from "../../context/RavitaillementForageContext";
import MenuCuveMobile from "./MenuCuveMobile";
import { ForageContext } from "../../context/ForageContext";

function RavitaillerForage({ location }) {
  const cuve = location.state;
  const history = useHistory();
  const { addRavitaillementForage } = useContext(RavitaillementForageContext);
  const { logging } = useContext(TableListContext);
  const { forages } = useContext(ForageContext);

  const validation = Yup.object().shape({
    nomForage: Yup.string().required("Nom Forage obligatoire"),
    // cuveName: Yup.string().required("Cuve Mobile est obligatoire"),
    quantiteApprov: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateApprov: Yup.string().required("Date Ravitaillement est obligatoire"),
    nomConducteur: Yup.string().required("Cuve Mobile est obligatoire"),
  });
  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validation),
    });

  useEffect(() => {
    setValue("cuveName", cuve["cuveName"]);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    data.cuveName = cuve["cuveName"];
    data.dateApprov = moment(data.dateApprov, "yyyy-MM-DDTHH:mm").format(
      " DD/MM/YYYY HH:mm"
    );

    console.log(data);
    addRavitaillementForage(data);
    reset();
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs  ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users" href>
                Ravitailler Forage
              </a>
            </li>
            {/* <li className="nav-item">
        <a className="nav-link active" data-target="#commandes">
          Commande
        </a>
      </li> */}
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title">
            <Link to="/cuve" className="my-link p-2">
              <i className="fa fa-arrow-left mr-1"></i>
              Retour Liste
            </Link>
            <div className="card-body pt-0">
              <h6 className="text-center p-0 mb-4">RAVITAILLEMENT</h6>
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <form
                  className="col-12 col-md-6 col-lg-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Cuve Mobile</label>
                        <input
                          disabled
                          className={
                            errors?.cuveName
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="cuveName"
                        />
                        <div className="invalid-feedback">
                          {errors.cuveName?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Nom Forage</label>
                        <select
                          className={
                            errors?.nomForage
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="nomForage"
                          type="selected"
                        >
                          {forages.map((forage) => (
                            <option key={forage.id} value={forage.nomForage}>
                              {forage.nomForage}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.nomForage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité Approvisionnement</label>
                        <input
                          className={
                            errors?.quantiteApprov
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="quantiteApprov"
                          placeholder="Quantité Déposé en litre"
                        />
                        <div className="invalid-feedback">
                          {errors.quantiteApprov?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Nom du Conducteur</label>
                        <input
                          className={
                            errors?.nomConducteur
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="nomConducteur"
                          placeholder="Conducteur"
                        />
                        <div className="invalid-feedback">
                          {errors.nomConducteur?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Date Ravitaillement</label>
                        <input
                          className={
                            errors?.dateApprov
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="datetime-local"
                          name="dateApprov"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.dateApprov?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0  ">
                    <button
                      className="btn btn-success btn-block mt-3 "
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RavitaillerForage;
