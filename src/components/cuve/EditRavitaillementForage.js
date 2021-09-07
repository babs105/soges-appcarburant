import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import { VehiculeContext } from "../../context/VehiculeContext";
import MenuCuveMobile from "./MenuCuveMobile";
import { RavitaillementForageContext } from "../../context/RavitaillementForageContext";
import { ForageContext } from "../../context/ForageContext";

function EditRavitaillementForage({ location, history }) {
  const { updateRavitaillementForage } = useContext(
    RavitaillementForageContext
  );
  const { forages } = useContext(ForageContext);
  const { cuves } = useContext(CuveContext);

  const { logging } = useContext(TableListContext);
  const ravitaillement = location.state;
  const validation = Yup.object().shape({
    nomForage: Yup.string().required("Nom Forage obligatoire"),
    cuveName: Yup.string().required("Cuve Mobile est obligatoire"),
    quantiteApprov: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    quantiteStock: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateApprov: Yup.string().required("Date Ravitaillement est obligatoire"),
    nomConducteur: Yup.string().required("Cuve Mobile est obligatoire"),
  });
  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validation),
    });

  useEffect(() => {
    // console.log("in edit form");
    // register({ name: "stationName" });
    // register({ name: "cuveName" });
    // localStorage.setItem("station", rajout.station);
    setValue("cuveName", ravitaillement.cuveName);
    setValue("nomForage", ravitaillement.nomForage);
    setValue(
      "dateApprov",
      moment(ravitaillement.dateApprov, "DD/MM/YYYY hh:mm").format(
        "yyyy-MM-DDThh:mm"
      )
    );
    setValue("nomConducteur", ravitaillement.nomConducteur);
    setValue("quantiteApprov", ravitaillement.quantiteApprov);
    setValue("quantiteStock", ravitaillement.quantiteStock);

    // console.log("get station", getValues("stationName"));
    // // console.log("get qte", getValues("qteRajout"));
  }, []);
  // useEffect(() => {
  //   unregister({ name: "stationName" });
  //   unregister({ name: "cuveName" });
  // }, [cuves]);

  const onSubmit = (data) => {
    let ravitaillementForageEdit = {
      ...data,
      id: ravitaillement.id,
      dateApprov: (data.dateApprov = moment(
        data.dateApprov,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(ravitaillementForageEdit);
    updateRavitaillementForage(ravitaillementForageEdit);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6  " data-target="#users" href>
                Editer Ravitaillement Forage
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title ">
            <Link to="/cuve/approvisionnement-forages" className="my-link">
              <i className="fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center mb-4">MODIFICATION</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Editer Station</div> */}
                <form
                  className="col-12 col-md-6 col-lg-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Cuve Mobile</label>
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
                    <div className="col-12 col-sm-6 ">
                      <div className="form-group">
                        <label>Nom Forage</label>
                        <select
                          className={
                            errors?.nomForage
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="nomForage"
                          type="selected"
                        >
                          {forages.map((forage) => (
                            <option key={forage.id} value={forage.nomForage}>
                              {forage.nomForage}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.nomForage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité Approvisionnement</label>
                        <input
                          className={
                            errors?.quantiteApprov
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="quantiteApprov"
                          placeholder="Quantité Déposé en litre"
                        />
                        <div className="invalid-feedback">
                          {errors.quantiteApprov?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Nom du Conducteur</label>
                        <input
                          className={
                            errors?.nomConducteur
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          name="nomConducteur"
                          placeholder="Conducteur"
                        />
                        <div className="invalid-feedback">
                          {errors.nomConducteur?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Date Ravitaillement</label>
                        <input
                          className={
                            errors?.dateApprov
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="datetime-local"
                          name="dateApprov"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.dateApprov?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Quantité Stock</label>
                        <input
                          className={
                            errors?.quantiteStock
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          //   type="number"
                          name="quantiteStock"
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.quantiteStock?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0  ">
                    <button
                      className="btn btn-success btn-block mt-3 "
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRavitaillementForage;
