import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import { CuveContext } from "../../context/CuveContext";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

function EditRavitaillement({ location, history }) {
  const ravitaillement = location.state;
  const { updateRavitaillement } = useContext(RavitaillementContext);
  const { vehicules } = useContext(VehiculeContext);
  const { cuves } = useContext(CuveContext);
  const { logging } = useContext(TableListContext);
  const { user } = useContext(UserContext);

  const validationRavitaillement = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),

    dateRavitaillement: Yup.string().required("Date Rajout est obligatoire"),
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
    const populateEditForm = () => {
      setValue("immatricule", ravitaillement.immatricule);
      setValue("kilometrageCurrent", ravitaillement.stationName);
      setValue(
        "dateRavitaillement",
        moment(ravitaillement.dateRavitaillement, "DD/MM/YYYY hh:mm").format(
          "yyyy-MM-DDThh:mm"
        )
      );
      setValue("chauffeur", ravitaillement.chauffeur);
      setValue("lieu", ravitaillement.lieu);
      setValue("kilometrageCurrent", ravitaillement.kilometrageCurrent);
      setValue("quantityRavitaillement", ravitaillement.quantityRavitaillement);
    };

    populateEditForm();
  }, []);

  const onSubmit = (data) => {
    data.id = ravitaillement.id;
    data.username = user.username;
    data.dateRavitaillement = moment(
      data.dateRavitaillement,
      "yyyy-MM-DDTHH:mm"
    ).format(" DD/MM/YYYY HH:mm");
    console.log(data);
    updateRavitaillement(data);
    history.push("/ravitaillement");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active text-success " data-target="#users">
                Modification Ravitaillement
              </a>
            </li>
            {/* <li className="nav-item">
        <a className="nav-link active" data-target="#commandes">
          Commande
        </a>
      </li> */}
          </ul>
        </div>
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <div className="d-flex  justify-content-between">
                <Link to="/ravitaillement" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>
                {/* <div className="h3"> Ajouter Véhicule</div> */}
                <div className="h3"> </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-sm-12"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Cuve</label>
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
                          {errors.immatricule?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
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
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Kilomètrage</label>
                        <input
                          className={
                            errors?.kilometrageCurrent
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="kilometrageCurrent"
                          placeholder="Compteur kilomètrage"
                        />
                        <div className="invalid-feedback">
                          {errors.kilometrageCurrent?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Quantité </label>
                        <input
                          className={
                            errors?.quantityRavitaillement
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
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
                    <div className="col-sm-6 ">
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
                    <div className="col-sm-6 ">
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
                    <div className="col-sm-6">
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

                  <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success"
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
    </>
  );
}

export default EditRavitaillement;
