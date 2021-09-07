import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";
import { StationContext } from "../../context/StationContext";
import { CuveContext } from "../../context/CuveContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";
function EditRajoutCuvePrincipale({ location, history }) {
  const { updateRajoutCuvePrincipale, cuvesPrincipale } = useContext(
    CuvePrincipaleContext
  );
  const [newcuve, setNewcuve] = useState("");
  const { stations } = useContext(StationContext);
  const rajout = location.state;
  const { logging } = useContext(TableListContext);

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
    dateRajout: Yup.string().required("date Approvisionement est obligatoire"),
  });
  const {
    register,
    handleSubmit,
    setValue,
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
    // localStorage.setItem("station", rajout.station);

    // window.onbeforeunload = (event) => {
    //   const e = event || window.event;
    //   // Cancel the event
    //   e.preventDefault();
    //   if (e) {
    //     e.returnValue = ""; // Legacy method for cross browser support
    //   }
    //   return ""; // Legacy method for cross browser support
    // };

    setNewcuve(rajout.cuvePrincipale);

    console.log("new cuve", newcuve);
    console.log("testes");
    console.log("idiiid", rajout.id);
    setValue("stationName", rajout.station);
    setValue(
      "dateRajout",
      moment(rajout.dateRajout, "DD/MM/YYYY hh:mm").format("yyyy-MM-DDThh:mm")
    );
    setValue("qteRajout", rajout.qteRajout);

    // React.memo("cuveName");
    console.log("cuveName", getValues("cuveName"));
  }, []);
  // useEffect(() => {
  //   unregister({ name: "stationName" });
  //   unregister({ name: "cuveName" });
  // }, [cuves]);
  //  useEffect(() => {
  //   setCount(JSON.parse(window.localStorage.getItem('count')));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('count', count);
  // }, [count]);

  const onSubmit = (data) => {
    let rajoutEdit = {
      id: rajout.id,
      cuvePrincipale: data.cuveName,
      station: data.stationName,
      qteRajout: data.qteRajout,
      dateRajout: (data.dateRajout = moment(
        data.dateRajout,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(rajoutEdit);
    updateRajoutCuvePrincipale(rajoutEdit);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users" href>
                Editer Rajout Cuve Principale
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title ">
            <Link to="/cuve-principale/appoints" className="my-link">
              <i className="fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center ">MODIFICATION</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Editer Station</div> */}
                <form
                  className="col-12 col-md-6 col-lg-4"
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
                        {cuvesPrincipale.map((cuve, index) => (
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
                        // defaultValue={localStorage.getItem("station")}
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
                      <label>Quantité Approvisionnement</label>
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
                        className="btn btn-success btn-block mt-2"
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
    </div>
  );
}

export default EditRajoutCuvePrincipale;
