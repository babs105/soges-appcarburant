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
import { RajoutContext } from "../../context/RajoutContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";

function RajoutCuvePrincipale({ location }) {
  const cuve = location.state;
  const history = useHistory();
  const { addRajoutCuvePrincipale } = useContext(CuvePrincipaleContext);
  const { logging } = useContext(TableListContext);
  const { stations } = useContext(StationContext);

  const validationRajout = Yup.object().shape({
    // cuvePrincipale: Yup.string().required("Nom Cuve est obligatoire"),
    station: Yup.string().required("Station est obligatoire"),
    qteRajout: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateRajout: Yup.string().required("Date Rajout est obligatoire"),
  });
  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validationRajout),
    });

  useEffect(() => {
    setValue("cuvePrincipale", cuve["cuveName"]);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    data.cuvePrincipale = cuve["cuveName"];
    data.dateRajout = moment(data.dateRajout, "yyyy-MM-DDTHH:mm").format(
      " DD/MM/YYYY HH:mm"
    );

    console.log(data);
    addRajoutCuvePrincipale(data);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs  ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users" href>
                Rajout Cuve Principale
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
            <Link to="/cuve-principale" className="my-link p-2">
              <i className="fa fa-arrow-left mr-1"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center">APPROVISIONNEMENT</h6>
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
                      <label>Station</label>
                      <select
                        className={
                          errors?.station
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="station"
                        type="selected"
                      >
                        {stations.map((station) => (
                          <option key={station.id} value={station.stationName}>
                            {station.stationName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.station?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Approvisionnement</label>
                      <input
                        className={
                          errors?.qteRajout
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="qteRajout"
                        placeholder="Quantité en litre"
                      />
                      <div className="invalid-feedback">
                        {errors.qteRajout?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Date Approvisionnement</label>
                      <input
                        className={
                          errors?.dateRajout
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="datetime-local"
                        name="dateRajout"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.dateRajout?.message}
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

export default RajoutCuvePrincipale;
