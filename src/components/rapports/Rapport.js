import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import { CuveContext } from "../../context/CuveContext";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

function Rapport({ history }) {
  const { addRavitaillement } = useContext(RavitaillementContext);
  const { vehicules } = useContext(VehiculeContext);
  const { cuves } = useContext(CuveContext);
  const { logging } = useContext(TableListContext);
  const { user } = useContext(UserContext);

  const urLReport = "https://gcarburant.herokuapp.com/operationsCuve";
  // const urLReport = "http://localhost:8080/operationsCuve";
  const current = new Date();
  const currentMonth = current.toLocaleString("default", { month: "long" });

  current.setMonth(current.getMonth() - 1);
  const previousMonth = current.toLocaleString("default", { month: "long" });

  const validationRavitaillement = Yup.object().shape({
    typeRapport: Yup.string().required("immatricule est obligatoire"),
    periode: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("critere", (critere, schema) => {
        if (critere === "Mois")
          return schema.required("periode est obligatoire");
      }),
    format: Yup.string().required("format est obligatoire"),
    startDateTime: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("critere", (critere, schema) => {
        if (critere === "Plage")
          return schema.required("Date Début est obligatoire");
      }),
    endDateTime: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("critere", (critere, schema) => {
        if (critere === "Plage")
          return schema.required("Date Fin est obligatoire");
      }),
  });

  const { register, handleSubmit, reset, watch, errors, getValues, formState } =
    useForm({
      resolver: yupResolver(validationRavitaillement),
    });

  let critere = watch("critere");
  let typeRapport = watch("typeRapport");

  const onSubmit = (data) => {
    data.startDateTime = moment(data.startDateTime, "yyyy-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm"
    );
    data.endDateTime = moment(data.endDateTime, "yyyy-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm"
    );
    let cuve = getValues("cuveName");
    if (typeRapport === "allVehicule") {
      if (cuve === "Cuves" && critere === "lesMois") {
        window.open(
          `${urLReport}/getReportAllOperationsCuveAllMonthAllCuves?title=${data.typeRapport}&format=${data.format}`
        );
      }
      if (cuve === "Cuves" && critere === "Mois") {
        window.open(
          `${urLReport}/generateReportMonthly?title=${data.typeRapport}&periode=${data.periode}&format=${data.format}`
        );
      }
      if (cuve === "Cuves" && critere === "Plage") {
        window.open(
          `${urLReport}/getReportAllRavitaillementInDateRange?title=${data.typeRapport}&startDateTime=${data.startDateTime}&endDateTime=${data.endDateTime}&format=${data.format}`
        );
      }

      if (
        (cuve === "Cuve Mobile" || cuve === "Cuve Kirene") &&
        critere === "lesMois"
      ) {
        window.open(
          `${urLReport}/generateReportAllMonthByCuveName?title=${data.typeRapport}&cuveName=${data.cuveName}&format=${data.format}`
        );
      }
      if (
        (cuve === "Cuve Mobile" || cuve === "Cuve Kirene") &&
        critere === "Mois"
      ) {
        window.open(
          `${urLReport}/generateReportMonthlyByCuveName?title=${data.typeRapport}&cuveName=${data.cuveName}&periode=${data.periode}&format=${data.format}`
        );
      }
      if (
        (cuve === "Cuve Mobile" || cuve === "Cuve Kirene") &&
        critere === "Plage"
      ) {
        window.open(
          `${urLReport}/generateReportInDateRangeByCuveName?title=${data.typeRapport}&cuveName=${data.cuveName}&startDateTime=${data.startDateTime}&endDateTime=${data.endDateTime}&format=${data.format}`
        );
      }
    }
    if (typeRapport === "oneVehicule") {
      console.log(data);
      window.open(
        `${urLReport}/generateReportByVehicule?title=${data.typeRapport}&immatricule=${data.immatricule}&critere=${data.critere}&periode=${data.periode}&startDateTime=${data.startDateTime}&endDateTime=${data.endDateTime}&format=${data.format}`
      );
    }
  };

  return (
    <>
      <div className="col-12">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Rapports
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
                <Link to="/ravitaillement" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>
                {/* <div className="h3"> Ajouter Véhicule</div> */}
                <div className="h3"> </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-sm-12"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="form-group">
                        <label>Type Rapport</label>
                        <select
                          className={
                            errors?.typeRapport
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="typeRapport"
                          placeholder="Type Rapport"
                        >
                          <option value="allVehicule">
                            Ravitaillement des Véhicules
                          </option>
                          <option value="oneVehicule">
                            Ravitaillement du véhicule
                          </option>
                          {/* <option  value="Ravitaillement">
                          Ravitaillement
                            </option> */}
                        </select>
                        <div className="invalid-feedback">
                          {errors.typeRapport?.message}
                        </div>
                      </div>
                    </div>
                    {typeRapport === "oneVehicule" && (
                      <div className="col-12 col-sm-4">
                        <div className="form-group">
                          <label>Matricule du Véhicule</label>
                          <select
                            className={
                              errors?.immatricule
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            type="text"
                            name="immatricule"
                            placeholder="immatricule"
                          >
                            {vehicules.map((vehicule) => (
                              <option
                                key={vehicule.id}
                                value={vehicule.immatricule}
                              >
                                {vehicule.immatricule}
                              </option>
                            ))}
                          </select>
                          <div className="invalid-feedback">
                            {errors.immatricule?.message}
                          </div>
                        </div>
                      </div>
                    )}

                    {typeRapport === "allVehicule" && (
                      <div className="col-12 col-sm-4">
                        <div className="form-group">
                          <label>Sélectionnez cuve</label>
                          <select
                            className={
                              errors?.cuveName
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            type="text"
                            name="cuveName"
                          >
                            <option value={"Cuves"}>Toutes les Cuves </option>
                            <option value={"Cuve Mobile"}>Cuve Mobile</option>
                            <option value={"Cuve Kirene"}>Cuve Kirene</option>
                          </select>
                          <div className="invalid-feedback">
                            {errors.cuveName?.message}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-12 col-sm-4">
                      <div className="form-group">
                        <label>Période</label>
                        <select
                          className={
                            errors?.critere
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="critere"
                        >
                          <option value={"lesMois"}>{"Tous les Mois "}</option>
                          <option value={"Mois"}>{"Par Mois"}</option>
                          <option value={"Plage"}>
                            {"Par Intervalle Date"}
                          </option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.critere?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  {critere === "Mois" && (
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="form-group">
                          <label>Mois</label>
                          <select
                            className={
                              errors?.periode
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            type="text"
                            name="periode"
                            placeholder="Le Mois"
                          >
                            <option value={currentMonth}>{currentMonth}</option>
                            <option value={previousMonth}>
                              {previousMonth}
                            </option>
                          </select>
                          <div className="invalid-feedback">
                            {errors.periode?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {critere === "Plage" && (
                    <div className="row">
                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label>Date Heure Début</label>
                          <input
                            className={
                              errors?.startDateTime
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            name="startDateTime"
                            type="datetime-local"
                          />

                          <div className="invalid-feedback">
                            {errors.startDateTime?.message}
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label>Date Heure Fin</label>
                          <input
                            className={
                              errors?.endDateTime
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            name="endDateTime"
                            type="datetime-local"
                          />

                          <div className="invalid-feedback">
                            {errors.endDateTime?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row d-flex mt-4 justify-content-center">
                    <div className="col-12 col-sm-2">
                      <div className="form-group">
                        <label>Format rapport</label>
                        <select
                          className={
                            errors?.format
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="format"
                        >
                          <option value={"PDF"}>Pdf</option>
                          <option value={"XLS"}>Excel</option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.format?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2 ">
                      <div className="d-flex justify-content-end align-items-center h-100 ">
                        <button
                          className="btn btn-success d-block mt-3"
                          type="submit"
                          id="mybutton"
                        >
                          {/* {logging && (
                            <span className="spinner-border spinner-border-sm mr-1 "></span>
                          )} */}
                          <i className="fa fa-fw fa-upload"></i>
                          Générer
                        </button>
                      </div>
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

export default Rapport;
