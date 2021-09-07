import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { categories } from "../../data/categories";
import { statuts } from "../../data/statuts";
import { Link } from "react-router-dom";
import { photoService } from "../../service/photoService";

function PhotoVehicule() {
  const [logging, setlogging] = useState(false);
  const [message, setmessage] = useState("");
  const [imgPreview, SetImgPreview] = useState("");

  const schema = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),
    statut: Yup.string().required("statut est obligatoire"),
    categorie: Yup.string().required("categorie est obligatoire"),
    kilometrageCurrent: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("kilometrage est obligatoire")
      .test("kmPositif", "Pas de Kilometrage Négatif", (number) => number > 0),

    capacityReservoir: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
    image: Yup.mixed()
      .required("Charger le fichier")
      .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
        console.log(value);
        return value.length && value[0].size <= 2000000;
      })
      .test("fileFormat", "format autorisé .jpg ou .jpeg ou .png ", (value) => {
        console.log(value);
        return (
          value.length &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type)
        );
      }),
  });

  const { register, handleSubmit, watch, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const imageWacth = watch("image");

  const handleChange = (e) => {
    SetImgPreview(URL.createObjectURL(e.target.files[0]));
    // Do something with values, in my case I have used the 'setActiveFilter' function above.
  };
  const onSubmit = (data) => {
    setlogging(true);
    const photoVehicule = {
      // dateCreation: data.dateCreation,
      immatricule: data.immatricule,
      statut: data.statut,
      categorie: data.categorie,
      kilometrageCurrent: data.kilometrageCurrent,
      capacityReservoir: data.capacityReservoir,
    };
    const formData = new FormData();
    formData.append("imageFile", data.image[0]);
    formData.append("photoVehicule", JSON.stringify(photoVehicule));
    console.log(formData.get("imageFile"));
    console.log(formData.get("photoVehicule"));
    photoService
      .upload(formData)
      .then((res) => {
        setlogging(false);
        alert("save photo vehicule avec succes");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        alert("Echec save photo vehicule ");
        console.log(e);
      });
  };
  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Nouveau Véhicule
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
                <Link to="/vehicule" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <div className="h3"> Ajouter Véhicule</div>

                <img
                  className="img-fluid w-25 mb-3"
                  src={imgPreview}
                  alt="vehicule foto"
                />
                <form
                  className="col-12 col-sm-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Photo Vehicule</label>
                      <input
                        className={
                          errors?.image
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png"
                        ref={register}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        {errors.image?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Matricule</label>
                      <input
                        className={
                          errors?.immatricule
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="immatricule"
                        placeholder="immatricule"
                      />
                      <div className="invalid-feedback">
                        {errors.immatricule?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        className={
                          errors?.role
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="statut"
                        type="selected"
                      >
                        {statuts.map((statut, index) => (
                          <option key={index} value={statut}>
                            {statut}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.statut?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Catégorie</label>
                      <select
                        className={
                          errors?.role
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="categorie"
                        type="selected"
                      >
                        {categories.map((categorie, index) => (
                          <option key={index} value={categorie}>
                            {categorie}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.categorie?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Kilomètrage</label>
                      <input
                        className={
                          errors?.kilometrageCurrent
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="kilometrageCurrent"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.kilometrageCurrent?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Capacité Réservoir</label>
                      <input
                        className={
                          errors?.capacityReservoir
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="capacityReservoir"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.capacityReservoir?.message}
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

export default PhotoVehicule;
