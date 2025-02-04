import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FormData} from "../FormViewer/types";
import "./styles.css";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(storedForms);
  }, []);

  const handleDelete = (formId: string) => {
    const updatedForms = forms.filter((form) => form.id !== formId);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    setForms(updatedForms);
  };

  const navigateToViewer = (formId: string) => {
    navigate(`/view?id=${formId}`);
  };

  const navigateToEditor = (formId: string) => {
    navigate(`/build?id=${formId}`);
  };

  const navigateToNewForm = () => {
    navigate("/build");
  };

  if (forms.length === 0) {
    return (
      <div className="form-list empty-state">
        <h2>{"No forms created yet"}</h2>
        <button onClick={navigateToNewForm}>Create New Form</button>
      </div>
    );
  }

  return (
    <div className="form-list">
      <div className="header">
        <h2>{"Your Forms"}</h2>
        <button onClick={navigateToNewForm}>{"Create New Form"}</button>
      </div>

      <div className="forms-list">
        {forms.map((form) => (
          <div key={form.id} className="form-row">
            <div className="form-info">
              <h3>{form.name}</h3>
              <div className="form-details">
                <span>
                  Created: {new Date(form.createdAt).toLocaleDateString()}
                </span>
                <span>{form.questions.length} questions</span>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={() => navigateToViewer(form.id)}>
                View Form
              </button>
              <button onClick={() => navigateToEditor(form.id)}>
                Edit Form
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(form.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
