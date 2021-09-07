import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../../context/TableListContext";
import { ForageContext } from "../../context/ForageContext";
import MenuForage from "./MenuForage";

function AddForage({ history }) {
  const { addForage } = useContext(ForageContext);
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
    // .min(2, "Deux Chiffres au moins"),
  });

  const { register, handleSubmit, reset, errors, formState } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = (data) => {
    addForage(data);
    reset();
  };

  return (
    <div className="row w-100 mx-0">
      <MenuForage />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users">
                Nouveau Forage
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
          <div className="card-title">
            <Link to="/forage" className="my-link">
              <i className=" fa fa-arrow-left mx-2"></i>
              Retour
            </Link>
            <div className="card-body">
              <h6 className="text-center mb-4"> ENREGISTREMENT</h6>
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
                          type="text"
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
                          type="text"
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
                          type="text"
                          name="compteurHoraire"
                          placeholder="Compteur Horaire"
                        />
                        <div className="invalid-feedback">
                          {errors.compteurHoraire?.message}
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
export default AddForage;
