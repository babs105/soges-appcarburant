import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../../context/TableListContext";
import moment from "moment";
import MenuForage from "./MenuForage";
import { RavitaillementGroupeContext } from "../../context/RavitaillementGroupeContext";

function RavitaillerGroupe({ history, location }) {
  const ravitaillement = location.state;
  const { updateRavitaillementGroupe } = useContext(
    RavitaillementGroupeContext
  );
  const { logging } = useContext(TableListContext);
  const validation = Yup.object().shape({
    nomForage: Yup.string().required("Nom Forage est obligatoire"),
    // departement: Yup.string().required("Département est obligatoire"),
    // commune: Yup.string().required("commune est obligatoire"),
    quantiteRavitaillee: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    dateRavitaillementGe: Yup.string().required(
      "Date Ravitaillement Groupe  est obligatoire"
    ),
    stockForage: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("quatntité Stock  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    volumePompe: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Volume pompé  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    tempsDepompage: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Temps de pompage  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
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

  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validation),
    });
  useEffect(() => {
    const fields = [
      "nomForage",
      "quantiteRavitaillee",
      "volumePompe",
      "tempsDepompage",
      "indexCompteur",
      "compteurHoraire",
      "stockForage",
    ];
    fields.forEach((field) => setValue(field, ravitaillement[field]));

    setValue(
      "dateRavitaillementGe",
      moment(ravitaillement.dateRavitaillementGe, "DD/MM/YYYY hh:mm").format(
        "yyyy-MM-DDThh:mm"
      )
    );
  }, []);

  const onSubmit = (data) => {
    let ravitaillementGroupe = {
      ...data,
      id: ravitaillement.id,
      nomForage: ravitaillement.nomForage,
      dateRavitaillementGe: (data.dateRavitaillementGe = moment(
        data.dateRavitaillementGe,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(ravitaillementGroupe);
    updateRavitaillementGroupe(ravitaillementGroupe);
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
                Editer Ravitaillement Groupe
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
            <Link to="/forage/ravitaillements-groupe" className="my-link">
              <i className=" fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              {/* <h6 className="text-center mb-4"> ENREGISTREMENT</h6> */}
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Ajout Station</div> */}
                <form
                  className="col-12 col-md-8 col-lg-8 col-xl-6 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col col-sm-6">
                      <div className="form-group">
                        <label>Forage/Groupe</label>
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
                        <label>Index du Compteur</label>
                        <input
                          className={
                            errors?.indexCompteur
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="indexCompteur"
                          placeholder="Index"
                        />
                        <div className="invalid-feedback">
                          {errors.indexCompteur?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité ravitaillée</label>
                        <input
                          className={
                            errors?.quantiteRavitaillee
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="quantiteRavitaillee"
                          placeholder="Quantité"
                        />
                        <div className="invalid-feedback">
                          {errors.quantiteRavitaillee?.message}
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
                          placeholder="Compteur "
                        />
                        <div className="invalid-feedback">
                          {errors.compteurHoraire?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité en Stock </label>
                        <input
                          className={
                            errors?.stockForage
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="stockForage"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.stockForage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Volume Pompé</label>
                        <input
                          className={
                            errors?.volumePompe
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="volumePompe"
                          // placeholder="Compteur "
                        />
                        <div className="invalid-feedback">
                          {errors.volumePompe?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Temps de Pompage</label>
                        <input
                          className={
                            errors?.tempsDepompage
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="tempsDepompage"
                          // placeholder="Compteur "
                        />
                        <div className="invalid-feedback">
                          {errors.tempsDepompage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Date Ravitaillement</label>
                        <input
                          className={
                            errors?.dateRavitaillementGe
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="datetime-local"
                          name="dateRavitaillementGe"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.dateRavitaillementGe?.message}
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

export default RavitaillerGroupe;
