import { data } from "jquery";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../Client/Header";
import Footer from "../../Client/Footer";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const [user, setUser] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const handleChangeAccPass = () => {
    const { currentPass, newPass, rePass } = data;
    // Check if passwords match and perform the change password logic
    if (newPass === rePass) {
      // Perform your password change logic here
      toast.success("Password changed successfully!");
      // Reset the form after successful password change
      reset();
    } else {
      toast.error("Passwords do not match.");
    }
  };
  const udpateProfile = async () => {
    if (user) {
      try {
        const updatedUser = {
          ...user,
        };

        const response = await fetch(`http://localhost:9999/user/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error("Error updating user.");
        }

        const data = await response.json();

        console.log("User updated:", data);
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Update succesfully!");
      } catch (error) {
        toast.error("Update fail");
        console.error("Error updating user:", error);
      }
    }
  };
  return (
    <Container fluid className="p-0">
      <Header></Header>
      <Row>
        <Container>
          <ToastContainer />
          <Col md={12} style={{ marginTop: "68px" }}>
            <h1>Edit Profile</h1>
            <hr></hr>
          </Col>
          <Row>
            <Col md={4} className="d-flex flex-column justify-content-center">
              <img
                src="../Images/personal.jpg"
                className="img-fluid"
                alt="personal"
              ></img>
              <button
                type="button"
                class="btn btn-danger mt-3"
                data-toggle="modal"
                data-target="#changePass"
              >
                Change Password
              </button>
              <div class="modal fade" id="changePass">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Change Password</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>

                    <div class="modal-body">
                      <form onSubmit={handleSubmit(handleChangeAccPass)}>
                        <table>
                          <tbody>
                            <tr>
                              <td>Current Password:</td>
                              <td>
                                <input
                                  //   style={{ margin: "8px 0" }}
                                  type="password"
                                  id="currentPass"
                                  {...register("currentPass", {
                                    required: true,
                                  })}
                                />
                                {errors.currentPass && (
                                  <p className="text-danger mb-0">
                                    This field is required.
                                  </p>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>New Password:</td>
                              <td>
                                <input
                                  //   style={{ margin: "8px 0" }}
                                  type="password"
                                  id="newPass"
                                  {...register("newPass", { required: true })}
                                />
                                {errors.newPass && (
                                  <p className="text-danger mb-0">
                                    This field is required.
                                  </p>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Enter new password again:</td>
                              <td>
                                <input
                                  //   style={{ margin: "8px 0" }}
                                  type="password"
                                  id="rePass"
                                  {...register("rePass", { required: true })}
                                />
                                {errors.rePass && (
                                  <p className="text-danger mb-0">
                                    This field is required.
                                  </p>
                                )}
                              </td>
                            </tr>

                            <button type="submit" className="btn btn-primary">
                              Change Password
                            </button>
                          </tbody>
                        </table>
                      </form>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <table className="w-100">
                <tbody className="table-edit">
                  <tr>
                    <td>
                      <h4>Profile Detail</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex mb-3">
                        <span style={{ width: "15%" }}>First Name:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="firstname"
                          value={user ? user.firstName : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              firstName: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Last Name:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="lastname"
                          value={user ? user.lastName : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              lastName: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Account:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="acc"
                          value={user ? user.account : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              account: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Date Of Birth:</span>
                        <input
                          style={{ width: "85%" }}
                          type="date"
                          id="dob"
                          value={user ? user.dateOfBirth : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              dateOfBirth: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Phone Number:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="phone"
                          value={user ? user.phone : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Address:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="address"
                          value={user ? user.address : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              address: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex  mb-3">
                        <span style={{ width: "15%" }}>Email:</span>
                        <input
                          style={{ width: "85%" }}
                          type="text"
                          id="email"
                          value={user ? user.email : ""}
                          onChange={(e) =>
                            setUser((prevUser) => ({
                              ...prevUser,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger w-25"
                      style={{ height: "48px" }}
                      onClick={() => udpateProfile()}
                    >
                      Update Profile
                    </button>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </Row>
      <Footer></Footer>
    </Container>
  );
};
export default Profile;
