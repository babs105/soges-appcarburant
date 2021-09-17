import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { TableListContext } from "../../context/TableListContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import "moment/locale/fr";
import { RapportContext } from "../../context/RapportContext";
import TableRaviCPResult from "./TableRaviCPResult";

function RapportCPRavitaillementCM({ history }) {
  const { cuvesPrincipale } = useContext(CuvePrincipaleContext);
  const {
    rapportRaviCP,
    setRapportRaviCP,
    getAllRaviCuvePrincipale,
    getAllRaviCuvePrincipaleByMonth,
    getAllRaviCuvePrincipaleBetweenDate,
    getAllRaviCuvePrincipaleByCuveName,
    getAllRaviCuvePrincipaleByCuveNameAndMonth,
    getAllRaviCuvePrincipaleByCuveNameBetweenDate,
  } = useContext(RapportContext);
  const { logging, search } = useContext(TableListContext);
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");

  // const months = moment.months();
  const months = {
    "01": "janvier",
    "02": "février",
    "03": "mars",
    "04": "avril",
    "05": "mai",
    "06": "juin",
    "07": "juillet",
    "08": "août",
    "09": "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
  };
  useEffect(() => {
    setRapportRaviCP([]);
  }, []);
  const validationRavitaillement = Yup.object().shape({
    typeRapport: Yup.string().required("type rapport est obligatoire"),
    periode: Yup.string().required("une periode est obligatoire"),
    cuveName: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("typeRapport", (typeRapport, schema) => {
        if (typeRapport === "allRajoutOneCp") {
          return schema.required("Cuve Principale est obligatoire");
        }
      }),
    mois: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("periode", (periode, schema) => {
        if (periode === "Mois") {
          return schema.required("le mois est obligatoire");
        }
      }),
    // format: Yup.string().required("format est obligatoire"),
    startDateTime: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("periode", (periode, schema) => {
        if (periode === "Plage") {
          return schema.required("Date Début est obligatoire");
        }
      }),
    endDateTime: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("periode", (periode, schema) => {
        if (periode === "Plage") {
          // setShowRapportAllRajoutAllCp(false);
          return schema.required("Date Fin est obligatoire");
        }
      }),
  });

  const { register, handleSubmit, reset, watch, errors, getValues, formState } =
    useForm({
      resolver: yupResolver(validationRavitaillement),
    });

  let periode = watch("periode");
  let typeRapport = watch("typeRapport");

  const onSubmit = (data) => {
    if (data.startDateTime && data.startDateTime) {
      data.startDateTime = moment(
        data.startDateTime,
        "yyyy-MM-DDTHH:mm"
      ).format("DD/MM/YYYY HH:mm");
      data.endDateTime = moment(data.endDateTime, "yyyy-MM-DDTHH:mm").format(
        "DD/MM/YYYY HH:mm"
      );
    }

    // let cuve = getValues("cuveName");
    if (
      data.typeRapport === "allRavitaillementAllCp" &&
      data.periode === "lesMois"
    ) {
      setTitle("Les Ravitaillements Cuves Principales  ");
      getAllRaviCuvePrincipale();
    }
    if (
      data.typeRapport === "allRavitaillementAllCp" &&
      data.mois !== "" &&
      data.periode === "Mois"
    ) {
      setTitle(
        `Les Ravitaillements Cuves Principales Mois ${months[
          data.mois
        ].toUpperCase()}`
      );
      getAllRaviCuvePrincipaleByMonth(data.mois);
    }
    if (
      data.typeRapport === "allRavitaillementAllCp" &&
      data.periode === "Plage" &&
      data.startDateTime !== "" &&
      data.endDateTime !== ""
    ) {
      let date = { dateDebut: data.startDateTime, dateFin: data.endDateTime };
      setTitle(
        `Les Ravitaillments Cuves Principales du ${data.startDateTime} au ${data.endDateTime} `
      );
      getAllRaviCuvePrincipaleBetweenDate(date);
    }
    if (
      data.typeRapport === "allRavitaillementOneCp" &&
      data.cuveName !== "" &&
      data.periode === "lesMois"
    ) {
      setTitle(`Les Ravitaillements de la Cuve Principale ${data.cuveName}`);
      getAllRaviCuvePrincipaleByCuveName(data.cuveName);
      console.log(data.cuveName);
    }
    if (
      data.typeRapport === "allRavitaillementOneCp" &&
      data.cuveName !== "" &&
      data.periode === "Mois" &&
      data.mois !== ""
    ) {
      let req = { cuveName: data.cuveName, month: data.mois };
      setTitle(
        `Les Rajouts de la Cuve Principale ${data.cuveName} mois de ${months[
          data.mois
        ].toUpperCase()}`
      );
      getAllRaviCuvePrincipaleByCuveNameAndMonth(req);
      console.log(data.cuveName);
    }
    if (
      data.typeRapport === "allRavitaillementOneCp" &&
      data.cuveName !== "" &&
      data.periode === "Plage" &&
      data.startDateTime !== "" &&
      data.endDateTime !== ""
    ) {
      let req = {
        cuveName: data.cuveName,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
      };
      setTitle(
        `Les Ravitaillements Cuve Principale ${data.cuveName} du ${data.startDateTime} au ${data.endDateTime} `
      );
      console.log(req);
      getAllRaviCuvePrincipaleByCuveNameBetweenDate(req);
    }
  };
  let i = 1;
  return (
    <div className="row w-100 mx-0">
      <div className="col col-lg-10 mt-2 mx-auto">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users" href="#/">
                Rapports Ravitaillements
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title">
            <div className=" card-body">
              <div className="d-flex  justify-content-between">
                <Link to="/rapports" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>

                <div className="h3"> </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-md-8 col-lg-8 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-6">
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
                          <option value="allRavitaillementAllCp">
                            Les Ravitaillements des Cuves Principales
                          </option>
                          <option value="allRavitaillementOneCp">
                            Les Ravitaillements de la Cuve Principale
                          </option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.typeRapport?.message}
                        </div>
                      </div>
                    </div>
                    {typeRapport === "allRavitaillementOneCp" && (
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <label>Sélectionnez la Cuve Principale</label>
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
                            {cuvesPrincipale.map((cuve) => (
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
                    )}

                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Période</label>
                        <select
                          className={
                            errors?.periode
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="periode"
                        >
                          <option value={"lesMois"}>{"Tous les Mois "}</option>
                          <option value={"Mois"}>{"Par Mois"}</option>
                          <option value={"Plage"}>
                            {"Par Intervalle Date"}
                          </option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.periode?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  {periode === "Mois" && (
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <label>Mois</label>
                          <select
                            className={
                              errors?.mois
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            ref={register}
                            name="mois"
                            placeholder="Le Mois"
                          >
                            <option key="janvier" value="01">
                              janvier
                            </option>
                            <option key="févier" value="02">
                              février
                            </option>
                            <option key="mars" value="03">
                              mars
                            </option>
                            <option key="avril" value="04">
                              avril
                            </option>
                            <option key="mai" value="05">
                              mai
                            </option>
                            <option key="juin" value="06">
                              juin
                            </option>
                            <option key="juillet" value="07">
                              juillet
                            </option>
                            <option key="août" value="08">
                              août
                            </option>
                            <option key="septembre" value="09">
                              septembre
                            </option>
                            <option key="octobre" value="10">
                              octobre
                            </option>
                            <option key="novembre" value="11">
                              novembre
                            </option>
                            <option key="décembre" value="12">
                              décembre
                            </option>
                          </select>
                          <div className="invalid-feedback">
                            {errors.mois?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {periode === "Plage" && (
                    <div className="row">
                      <div className="col-sm-6 ">
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

                      <div className="col-sm-6 ">
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
                  <div className="row ">
                    <hr className=" bg-success h-5 w-100 mt-5" />
                    <div className="col-12 col-sm-2 ml-auto ">
                      <button
                        className="btn btn-success  "
                        type="submit"
                        id="mybutton"
                      >
                        Exécuter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <TableRaviCPResult
          logging={logging}
          rapportRaviCP={rapportRaviCP}
          search={search}
          title={title}
        />
      </div>
    </div>
  );
}
export default RapportCPRavitaillementCM;
