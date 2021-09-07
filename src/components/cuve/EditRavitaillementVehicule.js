import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import { VehiculeContext } from "../../context/VehiculeContext";
import MenuCuveMobile from "./MenuCuveMobile";

function EditRavitaillementVehicule({ location, history }) {
  const { updateRavitaillementVehicule } = useContext(RavitaillementContext);
  const { vehicules } = useContext(VehiculeContext);
  const { cuves } = useContext(CuveContext);

  const { logging } = useContext(TableListContext);
  const ravitaillement = location.state;
  const validationRavitaillement = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),

    dateRavitaillement: Yup.string().required(
      "Date Raviitaillement est obligatoire"
    ),
    kilometrageCurrent: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("kilometrage est obligatoire")
      .test("kmPositif", "Pas de Kilometrage Négatif", (number) => number >= 0),
    quantityRavitaillement: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
    chauffeur: Yup.string().notRequired(),
  });

  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validationRavitaillement),
    });
  useEffect(() => {
    // console.log("in edit form");
    // register({ name: "stationName" });
    // register({ name: "cuveName" });
    // localStorage.setItem("station", rajout.station);
    setValue("immatricule", ravitaillement.immatricule);
    setValue("kilometrageCurrent", ravitaillement.kilometrageCurrent);
    setValue(
      "dateRavitaillement",
      moment(ravitaillement.dateRavitaillement, "DD/MM/YYYY hh:mm").format(
        "yyyy-MM-DDThh:mm"
      )
    );
    setValue("quantityRavitaillement", ravitaillement.quantityRavitaillement);
    setValue("chauffeur", ravitaillement.chauffeur);
    setValue("lieu", ravitaillement.lieu);
  }, []);

  const onSubmit = (data) => {
    let ravitaillementEdit = {
      ...data,
      id: ravitaillement.id,
      dateRavitaillement: (data.dateRavitaillement = moment(
        data.dateRavitaillement,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(ravitaillementEdit);
    updateRavitaillementVehicule(ravitaillementEdit);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6  " data-target="#users" href>
                Editer Ravitaillement véhicule
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title ">
            <Link to="/cuve/ravitaillements-vehicules" className="my-link">
              <i className="fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center mb-4">MODIFICATION</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Editer Station</div> */}
                <form
                  className="col-12 col-md-8 col-lg-8 col-xl-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Cuve Mobile</label>
                        <select
                          className={
                            errors?.cuveName
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="cuveName"
                          placeholder="Cuve"
                        >
                          {cuves.map((cuve) => (
                            <option key={cuve.id} value={cuve.cuveName}>
                              {cuve.cuveName}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.cuveName?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Matricule du Véhicule</label>
                        <select
                          className={
                            errors?.immatricule
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="immatricule"
                          placeholder="immatricule"
                        >
                          {vehicules.map((vehicule) => (
                            <option
                              key={vehicule.id}
                              value={vehicule.immatricule}
                            >
                              {vehicule.immatricule}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.immatricule?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Kilomètrage</label>
                        <input
                          className={
                            errors?.kilometrageCurrent
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="kilometrageCurrent"
                          placeholder="Compteur kilomètrage"
                        />
                        <div className="invalid-feedback">
                          {errors.kilometrageCurrent?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité </label>
                        <input
                          className={
                            errors?.quantityRavitaillement
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="quantityRavitaillement"
                          placeholder="Quantité ravitaillée "
                        />
                        <div className="invalid-feedback">
                          {errors.quantityRavitaillement?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Conducteur</label>
                        <input
                          className={
                            errors?.chauffeur
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="chauffeur"
                          type="text"
                          placeholder="Nom du Conducteur"
                        />

                        <div className="invalid-feedback">
                          {errors.chauffeur?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Lieu de Ravitaillement</label>
                        <input
                          className={
                            errors?.lieu
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="lieu"
                          type="text"
                          placeholder="Lieu Ravitaillement"
                        />

                        <div className="invalid-feedback">
                          {errors.lieu?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 ">
                      <div className="form-group">
                        <label>Date et Heure</label>
                        <input
                          className={
                            errors?.dateRavitaillement
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="dateRavitaillement"
                          type="datetime-local"
                        />

                        <div className="invalid-feedback">
                          {errors.dateRavitaillement?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-12  mt-4 p-0">
                    <button
                      className="btn btn-success  btn-block "
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

export default EditRavitaillementVehicule;
