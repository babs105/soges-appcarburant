import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TableListContext } from "../context/TableListContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { date } from "yup/lib/locale";
function Register() {
  const { logging, setLogging } = useContext(TableListContext);
  const [user, setUser] = useState({});

  const { addUser } = useContext(UserContext);

  // let history = useHistory();

  useEffect(() => {
    // alertClear();
    setLogging(false);
  }, []);
  // form validation rules
  const validationUser = Yup.object().shape({
    firstName: Yup.string().required("prenom obligatoire"),
    lastName: Yup.string().required("Nom obligatoire"),
    username: Yup.string()
      .required("Email obligatoire")
      .email("Email invalide"),

    // dob: Yup.string()
    //     .required('Date of Birth is required')
    //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    // email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required(
        "Mot de Passe obligatoire"
        // .transform((x) => (x === "" ? "" : x))
        // .concat(
        //   !isEditUser || (isEditUser && watchEditPassword)
        //     ? Yup.string().required("Mot de Passe obligatoire")
        //     : null
      )
      .min(6, "Password doit contenir 6 caracteres au moins"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirmer Password obligatoire");
      })
      .oneOf([Yup.ref("password")], "Passwords non identiques "),
    // role: Yup.string().required("Choississez un profil"),
  });

  const { register, handleSubmit, reset, errors, formState } = useForm({
    resolver: yupResolver(validationUser),
  });

  const onSubmit = (data) => {
    data.role = "Agent";
    addUser(data);
  };
  return (
    <div className="bg-dark w-100 h-100">
      <div className="d-flex justify-content-center align-items-center">
        <form
          className="col-12 col-md-5 mt-4 card px-5 py-3 w-100"
          // style={{ minWidth: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className=" text-success mt-2 text-center">Création Compte</h2>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-12 col-sm-6 ">
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
                      placeholder="Prenom"
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
                      placeholder="Nom"
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
                    <label>E-mail</label>
                    <input
                      className={
                        errors?.username
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      ref={register}
                      type="email"
                      name="username"
                      // disabled={isEditUser ? true : false}
                      placeholder="user@example.com"
                    />
                    <div className="invalid-feedback">
                      {errors.username?.message}
                    </div>
                  </div>
                </div>
              </div>

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
                      placeholder="Mot de Passe"
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
                      <span className="d-none d-xl-inline">Mot de passe</span>
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
                      placeholder="Mot de Passe"
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mx-0 mt-4">
            <button
              className="btn btn-success btn-block "
              type="submit"
              id="mybutton"
              disabled={logging}
            >
              {logging && (
                <span className="spinner-border spinner-border-sm mr-3"></span>
              )}
              Valider
            </button>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
              <Link className="" to="/">
                Annuler
              </Link>
            </div>
            <div>
              {" "}
              <Link className="" to="/login">
                J'ai déja un compte
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
