import { useEffect, useState } from "react";
import validator from "validator";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState(""); //Home Work Mobile
  const [staff, setStaff] = useState(""); //Radio Buttons
  const [bio, setBio] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //Errors State
  const [errorsByField, setErrorsByField] = useState({
    name: "",
    email: "",
    phone: "",
    phoneType: "",
  });

  const SubmitForm = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length > 0)
      return alert("Cannot submit because of some errors");

    const formData = {
      name,
      email,
      phone,
      phoneType: phone.length > 0 ? phoneType : "",
      staff,
      bio,
      isSignedUp,
      submittedOn: new Date(),
    };

    console.log(JSON.stringify(formData));
    setHasSubmitted(false);
  };

  useEffect(() => {
    const errors = [];

    const errorsLabeled = {
      name: "",
      email: "",
      phone: "",
      phoneType: "",
    };

    if (phone.length === 0) setPhoneType("");

    if (name.length <= 0) {
      errors.push("Please enter a valid name");
      errorsLabeled.name = "Please enter a valid name";
    }

    if (!validator.isEmail(email)) {
      errors.push("Please enter a valid email");
      errorsLabeled.email = "Please enter a valid email";
    }

    

    if (phone.length > 0 && !validator.isMobilePhone(phone)) {
      errors.push("Enter a valid phone number");
      errorsLabeled.phone = "Enter a valid phone number";
    }

    if (phone.length > 0 && !["Home", "Work", "Mobile"].includes(phoneType)) {
      errors.push("Select a valid phone type");
      errorsLabeled.phoneType = "Select a valid phone type";
    }

    setErrorsByField(errorsLabeled);

    setValidationErrors(errors);
  }, [name, email, phone, phoneType, staff, bio, isSignedUp]);

  return (
    <>
      <form onSubmit={SubmitForm}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={hasSubmitted && errorsByField.name !== "" ? 'errorField' : null}
          />
        </div>
        {hasSubmitted && errorsByField.name !== "" && (
          <p className="errorMsg">{errorsByField.name}</p>
        )}

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={hasSubmitted && errorsByField.email !== "" ? 'errorField' : null}

          />
        </div>
        {hasSubmitted && errorsByField.email !== "" && (
          <p className="errorMsg">{errorsByField.email}</p>
        )}

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 93912939"
            className={hasSubmitted && errorsByField.phone !== "" ? 'errorField' : null}

          />

          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            id="phoneType"
            value={phoneType}
            disabled={phone.length === 0 ? true : false}
            className={hasSubmitted && errorsByField.phoneType !== "" ? 'errorField' : null}

          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        {hasSubmitted && errorsByField.phone !== "" && (
          <p className="errorMsg">{errorsByField.phone}</p>
        )}
        {hasSubmitted && errorsByField.phoneType !== "" && (
          <p className="errorMsg">{errorsByField.phoneType}</p>
        )}

        <div onChange={(e) => setStaff(e.target.value)}>
          <p>Staff:</p>
          <input value="instructor" id="instructor" type="radio" name="staff" />
          <label htmlFor="instructor">Instructor</label>
          <input value="student" id="student" type="radio" name="staff"></input>
          <label htmlFor="student">Student</label>
        </div>

        <div>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            id="bio"
            value={bio}
            maxLength={280}
          ></textarea>
        </div>

        <div>
          <label htmlFor="checkboxSignUp">Sign Up for email notification</label>
          <input
            id="checkboxSignUp"
            name="checkboxSignUp"
            type="checkbox"
            checked={isSignedUp}
            onChange={() => setIsSignedUp(!isSignedUp)}
          />
        </div>

        <button>Submit</button>
      </form>
    </>
  );
}

export default RegisterForm;
