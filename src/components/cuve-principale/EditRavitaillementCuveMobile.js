import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import moment from "moment";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";
function EditRavitaillementCuveMobile({ location, history }) {
  const { updateRavitaillementCuveMobile, cuvesPrincipale } = useContext(
    CuvePrincipaleContext
  );
  const { cuves } = useContext(CuveContext);

  const { logging } = useContext(TableListContext);
  const ravitaillement = location.state;
  const validationStation = Yup.object().shape({
    cuvePrincipale: Yup.string().required("cuvePrincipale est obligatoire"),
    cuveMobile: Yup.string().required("cuve Mobile est obligatoire"),
    quantiteRavitaillee: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("Quantité est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    dateRavitaillementCuveMobile: Yup.string().required(
      "date Ravitaillement est obligatoire"
    ),
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
    // localStorage.setItem("station", rajout.station);
    setValue("cuvePrincipale", ravitaillement.cuvePrincipale);
    setValue("cuveMobile", ravitaillement.cuveMobile);
    setValue(
      "dateRavitaillementCuveMobile",
      moment(
        ravitaillement.dateRavitaillementCuveMobile,
        "DD/MM/YYYY hh:mm"
      ).format("yyyy-MM-DDThh:mm")
    );
    setValue("quantiteRavitaillee", ravitaillement.quantiteRavitaillee);
    // console.log("get station", getValues("stationName"));
    // // console.log("get qte", getValues("qteRajout"));
  }, []);
  // useEffect(() => {
  //   unregister({ name: "stationName" });
  //   unregister({ name: "cuveName" });
  // }, [cuves]);

  const onSubmit = (data) => {
    let ravitaillementCuveMobileEdit = {
      id: ravitaillement.id,
      cuvePrincipale: data.cuvePrincipale,
      cuveMobile: data.cuveMobile,
      quantiteRavitaillee: data.quantiteRavitaillee,
      dateRavitaillementCuveMobile: (data.dateRavitaillementCuveMobile = moment(
        data.dateRavitaillementCuveMobile,
        "yyyy-MM-DDTHH:mm"
      ).format(" DD/MM/YYYY HH:mm")),
    };
    console.log(ravitaillementCuveMobileEdit);
    updateRavitaillementCuveMobile(ravitaillementCuveMobileEdit);
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6  " data-target="#users" href>
                Editer Ravitaillement Cuve Mobile
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className=" card-title ">
            <Link
              to="/cuve-principale/ravitaillements-cuve-mobile"
              className="my-link"
            >
              <i className="fa fa-arrow-left mx-2"></i>
              Retour Liste
            </Link>
            <div className="card-body">
              <h6 className="text-center">MODIFICATION</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Editer Station</div> */}
                <form
                  className="col-12 col-md-6 col-lg-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Cuve Principale</label>
                      <select
                        className={
                          errors?.cuvePrincipale
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="cuvePrincipale"
                      >
                        {cuvesPrincipale.map((cuve, index) => (
                          <option key={index} value={cuve.cuveName}>
                            {cuve.cuveName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.cuvePrincipale?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Cuve Mobile</label>
                      <select
                        className={
                          errors?.cuveMobile
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="cuveMobile"
                        // defaultValue={localStorage.getItem("station")}
                      >
                        {cuves.map((cuve, index) => (
                          <option key={index} value={cuve.cuveName}>
                            {cuve.cuveName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.cuveMobile?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Ravitaillement</label>
                      <input
                        className={
                          errors?.quantiteRavitaillee
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="quantiteRavitaillee"
                      />
                      <div className="invalid-feedback">
                        {errors.quantiteRavitaillee?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Date Ravitaillement</label>
                      <input
                        className={
                          errors?.dateRavitaillementCuveMobile
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="datetime-local"
                        name="dateRavitaillementCuveMobile"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.dateRavitaillementCuveMobile?.message}
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

export default EditRavitaillementCuveMobile;
