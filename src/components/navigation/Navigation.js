import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import { UserContext } from "../../context/UserContext";
function Navigation() {
  const { user } = useContext(UserContext);
  // const { getCuvePrincipaleList } = useContext(CuvePrincipaleContext);
  return (
    <div className="  px-4 py-1 border-bottom ">
      <ul className="nav font-weight-normal mx-auto ">
        <li className="nav-item ">
          <NavLink to="/dashboard" className="nav-link px-2 text-success">
            <i className="fa fa-bar-chart mr-1 h-5"></i>
            <span className="">Tableau de Bord</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-2 text-success" to="/station">
            <i className="fa fa-university mr-1" aria-hidden="true"></i>
            <span>Station</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link px-2 text-success"
            to="/cuve-principale"
            // onClick={() => getCuvePrincipaleList()}
          >
            <i className="fa fa-truck mr-1"></i>
            <span>Cuve Principale</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-2 text-success" to="/cuve">
            <i className="fa fa-bus mr-1" aria-hidden="true"></i>
            <span>Cuve mobile</span>
          </NavLink>
        </li>
        {/* <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/rajout">
              <i className="fa fa-fw fa-plus-circle"></i>
              <span>Approvision Cuve</span>
            </NavLink>
          </li> */}

        <li className="nav-item">
          <NavLink className="nav-link px-2 text-success" to="/forage">
            <i class="fa fa-building mr-1" aria-hidden="true"></i>
            <span>Forages</span>
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link px-2 text-success" to="/vehicule">
            <i className="fa fa-fw fa-car mr-1"></i>
            <span>Vehicules</span>
          </NavLink>
        </li>
        {user.role === "Admin" && (
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/users">
              <i className="fa fa-users mr-1"></i>
              <span>Utilisateurs</span>
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          {/* <NavLink className="nav-link px-2 text-success" to="/#"> */}
          <i className="fa fa-upload  mr-1"></i>
          <span>Rapports</span>
          {/* </NavLink> */}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
