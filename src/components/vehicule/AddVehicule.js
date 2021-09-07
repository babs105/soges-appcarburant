import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { statuts } from "../../data/statuts";
import { v4 as uuidv4 } from "uuid";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";
import MenuVehicule from "./MenuVehicule";

function AddVehicule({ history }) {
  const { addVehicule } = useContext(VehiculeContext);
  const { logging } = useContext(TableListContext);

  const validationVehicule = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),
    statut: Yup.string().required("statut est obligatoire"),
    categorie: Yup.string().required("categorie est obligatoire"),
    kilometrageInitial: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("kilometrage est obligatoire")
      .test("kmPositif", "Pas de Kilometrage Négatif", (number) => number > 0),

    capacityReservoir: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
  });

  const { register, handleSubmit, reset, errors, formState } = useForm({
    resolver: yupResolver(validationVehicule),
  });

  const onSubmit = (data) => {
    addVehicule(data);
    history.push("/vehicule");
  };

  return (
    <div className="row w-100 mx-0">
      <MenuVehicule />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tab ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6" data-target="#users" href>
                Nouveau Véhicule
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className="card-title ">
            <Link to="/vehicule" className="my-link">
              <i className="fa fa-arrow-left mx-1"></i>
              Retour
            </Link>
            <div className="card-body">
              <h6 className="text-center mt-0 mb-3"> ENREGISTREMENT</h6>
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-md-8 col-lg-6 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Matricule</label>
                        <input
                          className={
                            errors?.immatricule
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="immatricule"
                          placeholder="immatricule"
                        />
                        <div className="invalid-feedback">
                          {errors.immatricule?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Statut</label>
                        <select
                          className={
                            errors?.role
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="statut"
                          type="selected"
                        >
                          {statuts.map((statut, index) => (
                            <option key={index} value={statut}>
                              {statut}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.statut?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Catégorie</label>
                        <select
                          className={
                            errors?.role
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="categorie"
                          type="selected"
                        >
                          {categories.map((categorie, index) => (
                            <option key={index} value={categorie}>
                              {categorie}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.categorie?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Kilomètrage</label>
                        <input
                          className={
                            errors?.kilometrageInitial
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="kilometrageInitial"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.kilometrageInitial?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Capacité Réservoir</label>
                        <input
                          className={
                            errors?.capacityReservoir
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="capacityReservoir"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.capacityReservoir?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 ">
                      <button
                        className="btn btn-success btn-block mt-4"
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

export default AddVehicule;
