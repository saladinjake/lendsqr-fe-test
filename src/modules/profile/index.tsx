import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/basic/Loader";

interface Props {}

const Profile: FC<Props> = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<null | any>();
  const { id } = useParams();
  const tabs: string[] = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`https://run.mocky.io/v3/663b6779-31a8-4e8c-aa84-2074c908c393`)
      .then((response) => {
        const currUser = response.data.data?.find((user: any) => user.id == id);
        setUser(currUser);
        setLoading(false);
      })
      .catch((error) => {
        const err = error.response.data;
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <section className="profile-module">
      <Link to="/dashboard/users" className="back">
        <img src="/images/icons/back-icon.svg" alt="back" />{" "}
        <span>Back to Users</span>
      </Link>
      <div className="cta-activity-handlers">
        <h1>User Details</h1>
        <div className="">
          <button type="button">BLACKLIST USER</button>
          <button type="button">ACTIVATE USER</button>
        </div>
      </div>
      {loading ? (
        <Loader width={"10px"} />
      ) : (
        <div>
          <div className="header-widget">
            <div className="header-info">
              <div>
                <div className="avatar">
                  <img
                    src={user?.profile?.avatar || "/images/user-avatar.svg"}
                    alt="avatar"
                  />
                </div>
                <div>
                  <p>{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</p>
                  <p>{user?.profile?.bvn}</p>
                </div>
              </div>

              <div className="tier-level">
                <p>User’s Tier</p>
                <div className="ratings">
                  <img src="/images/icons/star-filled.svg" alt="star" />
                  <img src="/images/icons/star-outline.svg" alt="star" />
                  <img src="/images/icons/star-outline.svg" alt="star" />
                </div>
              </div>

              <div>
                <p>₦{user?.accountBalance}</p>
                <p>{user?.accountNumber}/Providus Bank</p>
              </div>
            </div>
            <div className="user-header-nav">
              {tabs.map((item, index) => {
                return (
                  <Link key={index} to="#">
                    <div>{item}</div>
                  </Link>
                );
              })}
            </div>
          </div>


          <div className="user-details-main">
			<div className="user-info-card">
				<h2>Personal Information</h2>
				<div className="user-info-main">
					<div>
						<p>FULL NAME</p>
						<p>{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</p>
					</div>
					<div>
						<p>Phone Number</p>
						<p>{user?.profile?.phoneNumber}</p>
					</div>
					<div>
						<p>Email Address</p>
						<p>{user?.email}</p>
					</div>
					<div>
						<p>Bvn</p>
						<p>{user?.profile?.bvn}</p>
					</div>
					<div>
						<p>Gender</p>
						<p>{user?.profile?.gender}</p>
					</div>
					<div>
						<p>Marital status</p>
						<p>Single</p>
					</div>
					<div>
						<p>Children</p>
						<p>None</p>
					</div>
					<div>
						<p>Type of residence</p>
						<p>Parent’s Apartment</p>
					</div>
				</div>
			</div>

			<div className="user-info-card">
				<h2>Education and Employment</h2>
				<div className="user-info-main">
					<div>
						<p>level of education</p>
						<p>{user?.education?.level}</p>
					</div>
					<div>
						<p>employment status</p>
						<p>{user?.education?.employmentStatus}</p>
					</div>
					<div>
						<p>sector of employment</p>
						<p>{user?.education?.sector}</p>
					</div>
					<div>
						<p>Duration of employment</p>
						<p>{user?.education?.duration}</p>
					</div>
					<div>
						<p>office email</p>
						<p>{user?.education?.officeEmail}</p>
					</div>
					<div>
						<p>Monthly income</p>
						<p>{`₦${user?.education?.monthlyIncome[0]} to ₦${user?.education?.monthlyIncome[1]}`}</p>
					</div>
					<div>
						<p>loan repayment</p>
						<p>{user?.education?.loanRepayment}</p>
					</div>
				</div>
			</div>

			<div className="user-info-card">
				<h2>Socials</h2>
				<div className="user-info-main">
					<div>
						<p>Twitter</p>
						<p>{user?.socials?.twitter}</p>
					</div>
					<div>
						<p>Facebook</p>
						<p>{user?.socials?.facebook}</p>
					</div>
					<div>
						<p>Instagram</p>
						<p>{user?.socials?.instagram}</p>
					</div>
				</div>
			</div>

			<div className="user-info-card">
				<h2>Guarantor</h2>
				<div className="user-info-main">
					<div>
						<p>full Name</p>
						<p>{`${user?.guarantor?.firstName} ${user?.guarantor?.lastName}`}</p>
					</div>
					<div>
						<p>Phone Number</p>
						<p>{user?.guarantor?.phoneNumber}</p>
					</div>
					<div>
						<p>Address</p>
						<p>{user?.guarantor?.address}</p>
					</div>
					<div>
						<p>Relationship</p>
						<p>Sister</p>
					</div>
				</div>
			</div>
		</div>
        </div>
      )}
    </section>
  );
};

export default Profile;
