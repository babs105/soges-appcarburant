import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { categories } from "../../data/categories";
import { statuts } from "../../data/statuts";
import { v4 as uuidv4 } from "uuid";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";
import { StationContext } from "../../context/StationContext";
import { CuveContext } from "../../context/CuveContext";

function AddRajout({ history }) {
  const { addRajout } = useContext(RajoutContext);
  const { logging } = useContext(TableListContext);
  const { stations } = useContext(StationContext);
  const { cuves } = useContext(CuveContext);

  const validationRajout = Yup.object().shape({
    cuveName: Yup.string().required("Nom Cuve est obligatoire"),
    stationName: Yup.string().required("Station est obligatoire"),
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

  const { register, handleSubmit, reset, errors, formState } = useForm({
    resolver: yupResolver(validationRajout),
  });

  const onSubmit = (data) => {
    console.log(data);

    data.dateRajout = moment(data.dateRajout, "yyyy-MM-DDTHH:mm").format(
      " DD/MM/YYYY HH:mm"
    );

    console.log(data);
    addRajout(data);
    history.push("/rajout");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Approvisionnement Cuve
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
                <Link to="/rajout" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>
                <div className="h3"> </div>
                <div className="h3"> </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-sm-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Cuve</label>
                      <select
                        className={
                          errors?.cuveName
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="cuveName"
                        type="selected"
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
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Station</label>
                      <select
                        className={
                          errors?.stationName
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="stationName"
                        type="selected"
                      >
                        {stations.map((station) => (
                          <option key={station.id} value={station.stationName}>
                            {station.stationName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.stationName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Rajout</label>
                      <input
                        className={
                          errors?.qteRajout
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="qteRajout"
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

export default AddRajout;
