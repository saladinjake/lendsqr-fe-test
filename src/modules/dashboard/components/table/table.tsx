import React, { FC } from "react";
import { useState } from "react";

import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import TableFilters from  "./TableFilters"


interface UserInfo {
  accountBalance: String;
  accountNumber: String;
  createdAt: String;
  education: Object;
  email: String;
  guarantor: Object;
  id: String;
  lastActiveDate: String;
  orgName: String;
  phoneNumber: String;
  profile: String;
  socials: Object;
  userName: String;
}
interface Props {
  allRecords: UserInfo[];
  loading: Boolean;
}

const tableHeaders = [
  "Organization",
  "Username",
  "Email",
  "Phone number",
  "Date joined",
  "Status",
  "",
];

const Table: FC<Props> = ({ allRecords, loading }) => {
  const [toggleFilter, setToggleFilter] = useState<null | Number>(null);
  const [toggleOption, setToggleOption] = useState<null | Number>(null);
  const navigate = useNavigate()

  return (
    <div data-testid="table-responsive" className="table-responsive">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              return (
                <th key={index}>
                  <div>
                    <span>{header}</span>
                    {header && (
                      <img
                        src="/images/icons/filter-icon.svg"
                        alt="filter-icon"
                        onClick={() =>
                          toggleFilter === index
                            ? setToggleFilter(null)
                            : setToggleFilter(index)
                        }
                      />
                    )}
                  </div>
                  {toggleFilter === index ? <TableFilters /> : ""}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {allRecords.map((user: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/users/${user?.id}`}>
                    {user?.orgName}
                  </Link>
                </td>
                <td>{user?.userName}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{moment(user?.createdAt).format("MMM D, YYYY h:mm a")}</td>
                <td>
                  <span className="status active"> Active</span>
                </td>
                <td>
                  <img
                    src="/images/icons/more-icon.svg"
                    alt="more"
                    onClick={() =>
                      toggleOption === index
                        ? setToggleOption(null)
                        : setToggleOption(index)
                    }
                  />

                  {toggleOption === index ? (
					  <div className="options-dropdown">
					  <ul>
						<li onClick={() => navigate("/users/"+ user.id)}>
						  <img src="/images/icons/eye-icon.svg" alt="eye icon" />{" "}
						  <span>View Details</span>
						</li>
						<li>
						  <img src="/images/icons/user-x-icon.svg" alt="eye icon" />{" "}
						  <span>Blacklist User</span>
						</li>
						<li>
						  <img src="/images/icons/user-check-icon.svg" alt="eye icon" />{" "}
						  <span>Activate User</span>
						</li>
					  </ul>
					</div>
				  ) : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
