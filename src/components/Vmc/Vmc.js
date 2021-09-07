import React from "react";

function Vmc() {
  return (
    <section className="section bg-c-light border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="main-heading"> VISION ET MISSION</h3>
            <div className="underline mx-auto"></div>

            <h3> Sastrans, une nouvelle vision de la mobilité </h3>
            <p className="">
              {" "}
              La sécurité de la mobilité au service du développement économique
              et du rapprochement social.
            </p>
          </div>
          <div className="col-md-4">
            <div className="card shadow h-100">
              <img
                src={"/images/securite.jpg"}
                className="w-100 img-fluid border-bottom "
                alt="..."
              />
              <div className="card-body ">
                <h5 className="text-center mt-2">Sécurité </h5>
                <div className="underline mx-auto"></div>
                <p>
                  La sécurité sur les routes est un préalable pour une mobilité
                  optimale.Ainsi nous nous attelons et ceux par tous les moyens
                  à :
                </p>
                <ul className="text-left">
                  <li>Protéger les usagers et le personnel d’intervention.</li>
                </ul>
                <p className="font-weight-bold">
                  Notre vision est de faire votre trajet, un moment de sérénité.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card shadow h-100">
              <img
                src={"/images/viabilite.jpg"}
                className="w-100 img-fluid border-bottom  "
                alt="..."
              />
              <div className="card-body">
                <h5 className="text-center mt-2">Viabilité </h5>
                <div className="underline mx-auto"></div>
                <p>
                  Bien au-delà de couvrir une distance, la mobilité fait partie
                  du mode de vie standard de la société et de l’économie
                  contemporaine.
                </p>
                <ul className="text-left">
                  <li>Guider et informer les usagers.</li>
                  <li>Participer au partage harmonieux de l’espace public.</li>
                  {/* <li>Signaler la présence de dangers.</li> */}
                  {/* <li>
                    Mettre en valeur l’infrastructure autoroutière et
                    matérialiser le code de la route. La fluidité de la
                    circulation et le confort des usagers dépendent de nous et
                    nous faisons en sorte que la conduite soit plaisir..
                  </li> */}
                </ul>
                <p className="font-weight-bold">
                  Roulez, votre confort notre mission.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card shadow h-100">
              <img
                src={"/images/stationnement.jpg"}
                className="w-100 img-fluid border-bottom  "
                alt="..."
              />
              <div className="card-body">
                <h5 className="text-center">Stationnement </h5>
                <div className="underline mx-auto"></div>
                <p>
                  La finalité de tout trajet est le Stationnement. Le
                  stationnement consiste à laisser un véhicule immobilisé un
                  certain temps. Il est un maillon essentiel de la chaîne de
                  mobilité des véhicules. En milieu urbain, la plupart des
                  véhicules arrivés à destination circulent à la recherche d’une
                  place de stationnement et mettent du temps pour trouver une
                  place.
                </p>

                <p className="font-weight-bold">
                  Notre but est de vous faciliter l’accès aux parking en temps
                  opportun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vmc;
