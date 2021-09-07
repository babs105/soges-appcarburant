import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";
import { StationContext } from "../../context/StationContext";
import { CuveContext } from "../../context/CuveContext";
function EditRajout({ location, history }) {
  const { updateRajout } = useContext(RajoutContext);
  const { stations } = useContext(StationContext);
  const { cuves } = useContext(CuveContext);
  const { logging } = useContext(TableListContext);
  const rajout = location.state;
  const validationStation = Yup.object().shape({
    cuveName: Yup.string().required("cuveName est obligatoire"),
    stationName: Yup.string().required("station est obligatoire"),
    qteRajout: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateRajout: Yup.string().required("stationServiceName est obligatoire"),
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
    resolver: yupResolver(validationStation),
  });
  useEffect(() => {
    // console.log("in edit form");
    // register({ name: "stationName" });
    // register({ name: "cuveName" });
    localStorage.setItem("station", rajout.stationName);
    setValue("cuveName", rajout.cuveName);
    setValue("stationName", rajout.stationName);
    setValue(
      "dateRajout",
      moment(rajout.dateRajout, "DD/MM/YYYY hh:mm").format("yyyy-MM-DDThh:mm")
    );
    setValue("qteRajout", rajout.qteRajout);
    // console.log("get station", getValues("stationName"));
    // console.log("get qte", getValues("qteRajout"));
  }, []);
  // useEffect(() => {
  //   unregister({ name: "stationName" });
  //   unregister({ name: "cuveName" });
  // }, [cuves]);

  const onSubmit = (data) => {
    let rajoutEdit = {
      id: rajout.id,
      cuveName: data.cuveName,
      stationName: data.stationName,
      qteRajout: data.qteRajout,
      dateRajout: (data.dateRajout = moment(
        data.dateRajout,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(rajoutEdit);
    updateRajout(rajoutEdit);
    history.push("/rajout");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Editer Approvisionnement
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
              <Link to="/rajout" className="my-link">
                <i className="fa fa-fw fa-arrow-left"></i>
                Retour
              </Link>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                {/* <div className="h3"> Editer Station</div> */}
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
                      >
                        {cuves.map((cuve, index) => (
                          <option key={index} value={cuve.cuveName}>
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
                        defaultValue={localStorage.getItem("station")}
                      >
                        {stations.map((station, index) => (
                          <option key={index} value={station.stationName}>
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
                        Editer
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

export default EditRajout;
