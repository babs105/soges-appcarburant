import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../../context/TableListContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";

function AddCuvePrincipale({ history }) {
  const { addCuvePrincipale } = useContext(CuvePrincipaleContext);
  const { logging } = useContext(TableListContext);
  const validationCuve = Yup.object().shape({
    cuveName: Yup.string().required("Nom Cuve est obligatoire"),
    capacite: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
    quantiteActuelle: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("quantité intitiale est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0),
    //   .min(1, "1 Chiffre au moins"),
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
    addCuvePrincipale(data);
    reset();
    history.push("/cuve-principale");
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users " href>
                Nouvelle Cuve
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link active" data-target="#commandes">
                Commande
              </a>
            </li> */}
          </ul>
        </div>
        <div className="card mt-2" style={{}}>
          <div className="card-title">
            <Link to="/cuve-principale" className="my-link">
              <i className=" fa fa-arrow-left mx-1"></i>
              Retour Cuve Principale
            </Link>
            <div className="card-body p-0">
              <h6 className="text-center my-3"> ENREGISTREMENT</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Ajout Station</div> */}
                <form
                  className="col-12 col-md-6 col-lg-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Nom Cuve Principale</label>
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
                          errors?.capacite
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="capacite"
                        placeholder="Capacité"
                      />
                      <div className="invalid-feedback">
                        {errors.capacite?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Carburant</label>
                      <input
                        className={
                          errors?.quantiteActuelle
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="quantiteActuelle"
                        placeholder="Volume de Carburant"
                      />
                      <div className="invalid-feedback">
                        {errors.quantiteActuelle?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success btn-block my-4"
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

export default AddCuvePrincipale;
