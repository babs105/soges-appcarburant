import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StationContext } from "../../context/StationContext";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import MenuCuveMobile from "./MenuCuveMobile";

function AddCuve({ history }) {
  const { addCuve } = useContext(CuveContext);
  const { logging } = useContext(TableListContext);
  const validationCuve = Yup.object().shape({
    cuveName: Yup.string().required("Nom Cuve est obligatoire"),
    capacityCuve: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
    quantityCurrentCuve: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("quantité intitiale est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    // .min(2, "Deux Chiffres au moins"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(validationCuve),
  });

  const onSubmit = (data) => {
    addCuve(data);
    reset();
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users">
                Nouvelle Cuve Mobile
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
            <Link to="/cuve" className="my-link">
              <i className=" fa fa-arrow-left mx-1"></i>
              Retour
            </Link>
            <div className="card-body">
              <h6 className="text-center"> ENREGISTREMENT</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Ajout Station</div> */}
                <form
                  className="col-12 col-md-6 col-lg-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Nom de la Cuve Mobile</label>
                      <input
                        className={
                          errors?.cuveName
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="cuveName"
                        placeholder="Dénomination"
                      />
                      <div className="invalid-feedback">
                        {errors.cuveName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Capacité </label>
                      <input
                        className={
                          errors?.capacityCuve
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="capacityCuve"
                        placeholder="capacite"
                      />
                      <div className="invalid-feedback">
                        {errors.capacityCuve?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Carburant</label>
                      <input
                        className={
                          errors?.quantityCurrentCuve
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="quantityCurrentCuve"
                        placeholder="Quantité de Carburant"
                      />
                      <div className="invalid-feedback">
                        {errors.quantityCurrentCuve?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success btn-block mt-2"
                        type="submit"
                        id="mybutton"
                        disabled={formState.isSubmitting}
                      >
                        {logging && (
                          <span className="spinner-border spinner-border-sm mr-1 "></span>
                        )}
                        Ajouter
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
export default AddCuve;
