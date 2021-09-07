import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TableListContext } from "../context/TableListContext";

const LoginForm = ({ history }) => {
  // let history = useHistory();
  const { login } = useContext(UserContext);
  const { logging, setLogging } = useContext(TableListContext);

  useEffect(() => {
    console.log("in loginForm");
    setLogging(false);
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email obligatoire")
      .email("Email invalide"),
    password: Yup.string()
      .min(6, "Password au moins 6 caractères")
      .required("Password obligatoire"),
    // confirmPassword: Yup.string()
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //     .required('Confirm Password is required'),
    // acceptTerms: Yup.bool()
    //     .oneOf([true], 'Accept Ts & Cs is required')
  });

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log("submit data", data);
    login(data);
  };
  return (
    <div className=" bg-dark " style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center  ">
        <form
          className="col-12 col-md-5 col-lg-4 my-5 card px-5 py-3 shadow "
          // style={{ minWidth: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-success mb-2 text-center">Connexion</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className={
                errors?.username ? "is-invalid form-control" : "form-control"
              }
              name="username"
              type="email"
              ref={register}
              placeholder="username@gmail.com"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="form-group  ">
            <label className="" htmlFor="password">
              Mot de Passe
            </label>
            <input
              type="password"
              className={
                errors?.password ? "is-invalid form-control" : "form-control"
              }
              ref={register}
              placeholder="Mot de Passe"
              name="password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className=" mt-5  ">
            <button
              className="btn btn-success btn-block d-flex justify-content-center align-items-center "
              disabled={logging}
            >
              {logging ? (
                <>
                  <span className="spinner-border spinner-border-sm m-2"></span>
                  <span> CONNEXION EN COURS</span>
                </>
              ) : (
                <span> SE CONNECTER</span>
              )}
            </button>
          </div>
          <div className=" p-1 mt-3 d-flex justify-content-center align-items-center ">
            <Link to="/">Annuler</Link>
            {/* <Link to="/register">Ouvrir Compte</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
