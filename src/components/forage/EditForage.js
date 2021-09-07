import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../../context/TableListContext";
import { ForageContext } from "../../context/ForageContext";
import MenuForage from "./MenuForage";

function EditForage({ history, location }) {
  const forage = location.state;
  const { updateForage } = useContext(ForageContext);
  const { logging } = useContext(TableListContext);
  const validation = Yup.object().shape({
    nomForage: Yup.string().required("Nom Forage est obligatoire"),
    departement: Yup.string().required("Département est obligatoire"),
    commune: Yup.string().required("commune est obligatoire"),
    capaciteGroupeElectrogene: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    //   .min(2, "Deux Chiffres au moins"),
    indexCompteur: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("index Compteur est obligatoire")
      .test("qtePositive", "Pas de nombre Négative", (number) => number >= 0),
    compteurHoraire: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Compteur Horaire est obligatoire")
      .test("qtePositive", "Pas de nombre Négative", (number) => number >= 0),
    quantiteStock: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("quantiteStock est obligatoire")
      .test("qtePositive", "Pas de nombre Négative", (number) => number >= 0),
    // .min(2, "Deux Chiffres au moins"),
  });

  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validation),
    });

  useEffect(() => {
    const fields = [
      "nomForage",
      "departement",
      "commune",
      "capaciteGroupeElectrogene",
      "indexCompteur",
      "compteurHoraire",
      "quantiteStock",
    ];
    fields.forEach((field) => setValue(field, forage[field]));
  }, []);
  const onSubmit = (data) => {
    data.id = forage.id;
    console.log(data);
    updateForage(data);
    reset();
  };

  return (
    <div className="row w-100 mx-0">
      <MenuForage />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users" href>
                Editer Forage
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className="card-title">
            <Link to="/forage" className="my-link">
              <i className=" fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center mb-4"> MODICIFATION</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Ajout Station</div> */}
                <form
                  className="col-12 col-md-8 col-lg-8 col-xl-6 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col col-sm-6">
                      <div className="form-group">
                        <label>Nom du Forage</label>
                        <input
                          className={
                            errors?.nomForage
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="nomForage"
                          placeholder="Dénomination"
                        />
                        <div className="invalid-feedback">
                          {errors.nomForage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Département</label>
                        <input
                          className={
                            errors?.departement
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="departement"
                          placeholder="Département"
                        />
                        <div className="invalid-feedback">
                          {errors.departement?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Commune</label>
                        <input
                          className={
                            errors?.commune
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="commune"
                          placeholder="Nom de la Commnune"
                        />
                        <div className="invalid-feedback">
                          {errors.commune?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Capacité Groupe</label>
                        <input
                          className={
                            errors?.capaciteGroupeElectrogene
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="capaciteGroupeElectrogene"
                          placeholder="capacité"
                        />
                        <div className="invalid-feedback">
                          {errors.capaciteGroupeElectrogene?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Index du Compteur</label>
                        <input
                          className={
                            errors?.indexCompteur
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="indexCompteur"
                          placeholder="Index  Compteur"
                        />
                        <div className="invalid-feedback">
                          {errors.indexCompteur?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Compteur Horaire</label>
                        <input
                          className={
                            errors?.compteurHoraire
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="compteurHoraire"
                          placeholder="Compteur Horaire"
                        />
                        <div className="invalid-feedback">
                          {errors.compteurHoraire?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité en Stock</label>
                        <input
                          className={
                            errors?.quantiteStock
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="quantiteStock"
                          placeholder="Quantite"
                        />
                        <div className="invalid-feedback">
                          {errors.quantiteStock?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-12  ">
                      <button
                        className="btn btn-success btn-block mt-2"
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
export default EditForage;
