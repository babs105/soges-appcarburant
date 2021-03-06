import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StationContext } from "../../context/StationContext";
import { TableListContext } from "../../context/TableListContext";
import MenuStation from "./MenuStation";

function AddStation({ history }) {
  const { addStation } = useContext(StationContext);
  const { logging } = useContext(TableListContext);
  const validationStation = Yup.object().shape({
    stationName: Yup.string().required("Nom Station est obligatoire"),
    adresse: Yup.string().required("Adresse est obligatoire"),
    tel: Yup.number()
      .required("Telephone est obligatoire")
      .min(9, "Telephone doit avoir 9 nombre au moins"),
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

  const onSubmit = (data) => {
    addStation(data);
    reset();
    history.push("/station");
  };

  return (
    <div className="row w-100 mx-0">
      <MenuStation />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users" href>
                Nouvelle Station
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className="card-title">
            <Link to="/station" className="my-link">
              <i className="fa fa-fw fa-arrow-left"></i>
              Retour Liste
            </Link>

            <div className="card-body">
              <div className="h6 text-center mb-4"> ENREGISTREMENT</div>

              <div className="d-flex flex-column justify-content-center align-items-center ">
                <form
                  className="col-12 col-md-6 col-lg-4 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row ">
                    <div className="col-12">
                      <div className="form-group">
                        <label>Station</label>
                        <input
                          className={
                            errors?.stationName
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="stationName"
                          placeholder="Station"
                        />
                        <div className="invalid-feedback">
                          {errors.stationName?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group">
                        <label>Adresse</label>
                        <input
                          className={
                            errors?.adresse
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="adresse"
                          placeholder="johnny.s"
                        />
                        <div className="invalid-feedback">
                          {errors.adresse?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>T??l??phone</label>
                        <input
                          className={
                            errors?.tel
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          ref={register}
                          type="text"
                          name="tel"
                          // disabled={isEditUser ? true : false}
                          placeholder="776822328"
                        />
                        <div className="invalid-feedback">
                          {errors.tel?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 ">
                      <button
                        className="btn btn-success btn-block mt-4"
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
export default AddStation;
