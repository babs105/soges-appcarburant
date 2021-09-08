import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../../context/TableListContext";

function Profile() {
  const { logging } = useContext(TableListContext);
  const { user, editUser } = useContext(UserContext);
  const [isEditUser, setIsEditUser] = useState(false);

  let watchEditPassword = false;
  useEffect(() => {}, []);

  // form validation rules
  const validationUser = Yup.object().shape({
    firstName: Yup.string().required("prenom is required"),
    lastName: Yup.string().required("Nom is required"),
    // username: Yup.string().required("Username is required"),

    username: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .concat(
        !isEditUser || (isEditUser && watchEditPassword)
          ? Yup.string().required("Mot de Passe obligatoire")
          : null
      )
      .min(6, "Password doit avoir 6 caracteres au moins"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("password", (password, schema) => {
        if (password || !isEditUser || (isEditUser && watchEditPassword))
          return schema.required("Confirmer Password obligatoire");
      })
      .oneOf([Yup.ref("password")], "Passwords non identiques "),
    // role: Yup.string().required("Choississez un profil"),
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
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationUser),
  });

  watchEditPassword = watch("editPassword", false);
  const getEditUser = (currentUser) => {
    clearErrors();
    console.log(currentUser);
    const fields = ["firstName", "lastName", "username", "role"];
    fields.forEach((field) => setValue(field, currentUser[field]));
    // setUser((prevState) => ({ ...prevState, ...currentUser }));
  };
  const editUtilisateur = (data) => {
    let userEdit = {
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
    };
    editUser(userEdit);
  };
  return (
    <div className="row mx-0">
      <div className=" mx-auto col-12  col-md-5 ">
        <div className="card py-4 px-5 mt-4  ">
          <div className="d-flex flex-column justify-content-center align-items-center  text-center">
            <img
              className="img-fluid w-50  "
              src={"/images/user-profile.svg"}
              alt=""
            />
            <h3 className=""> {user.firstName} </h3>
            <h3> {user.lastName}</h3>

            <div className="row">
              <h6 className="col-12 col-sm-12 lead ">
                <span className="h5">E-mail</span>: {user.username}
              </h6>
              <h6 className="col-12 col-sm-12   lead">
                {" "}
                <span className="h5">Role</span> : {user.role}
              </h6>
              <button
                className=" col-12  col-md-5 mx-auto mt-4 mx-2 btn btn-success shadow-none"
                onClick={() => {
                  setIsEditUser(true);
                  getEditUser(user);
                }}
                data-toggle="modal"
                data-target="#user-form-modal"
              >
                Editer Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal " role="dialog" tabIndex="-1" id="user-form-modal">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editer Profil</h5>
              <button type="button" className=" close" data-dismiss="modal">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="py-1">
                <form className="" onSubmit={handleSubmit(editUtilisateur)}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Prénom</label>
                            <input
                              className={
                                errors?.firstName
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              type="text"
                              name="firstName"
                              placeholder="john"
                            />
                            <div className="invalid-feedback">
                              {errors.firstName?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Nom</label>
                            <input
                              className={
                                errors?.lastName
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              type="text"
                              name="lastName"
                              placeholder="johnny.s"
                            />
                            <div className="invalid-feedback">
                              {errors.lastName?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              className={
                                errors?.username
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              name="username"
                              type="email"
                              placeholder="user@example.com"
                            />
                            <div className="invalid-feedback">
                              {errors.username?.message}
                            </div>
                          </div>
                        </div>
                      </div>

                      {isEditUser && (
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className=" d-flex justify-content-between align-items-baseline">
                              <label className=" pt-3 ">
                                <span className=" h6">
                                  Changer Mot de Passe ?
                                </span>
                              </label>
                              <input
                                type="checkbox"
                                name="editPassword"
                                ref={register}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {isEditUser ? (
                        watchEditPassword && (
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Mot de Passe</label>
                                <input
                                  className={
                                    errors?.password
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  ref={register}
                                  type="password"
                                  name="password"
                                />
                                <div className="invalid-feedback">
                                  {errors.password?.message}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>
                                  Confirmer{" "}
                                  <span className="d-none d-xl-inline">
                                    mot de passe
                                  </span>
                                </label>
                                <input
                                  className={
                                    errors?.confirmPassword
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  ref={register}
                                  type="password"
                                  name="confirmPassword"
                                />
                                <div className="invalid-feedback">
                                  {errors.confirmPassword?.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Mot de Passe</label>
                              <input
                                className={
                                  errors?.password
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                ref={register}
                                type="password"
                                name="password"
                              />
                              <div className="invalid-feedback">
                                {errors.password?.message}
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>
                                Confirmer{" "}
                                <span className="d-none d-xl-inline">
                                  mot de passe
                                </span>
                              </label>
                              <input
                                className={
                                  errors?.confirmPassword
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                ref={register}
                                type="password"
                                name="confirmPassword"
                              />
                              <div className="invalid-feedback">
                                {errors.confirmPassword?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col d-flex justify-content-end">
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
    </div>
  );
}

export default Profile;
