import {useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FormData} from "../FormViewer/types";
import "./styles.css";
import {Button} from "../../components/Button";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(storedForms);
  }, []);

  const handleDelete = useCallback(
    (formId: string) => {
      const updatedForms = forms.filter((form) => form.id !== formId);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
      setForms(updatedForms);
    },
    [forms]
  );

  const navigateToViewer = useCallback(
    (formId: string) => {
      navigate(`/view?id=${formId}`);
    },
    [navigate]
  );

  const navigateToEditor = useCallback(
    (formId: string) => {
      navigate(`/build?id=${formId}`);
    },
    [navigate]
  );

  const navigateToNewForm = useCallback(() => {
    navigate("/build");
  }, [navigate]);

  if (forms.length === 0) {
    return (
      <div className="form-list empty-state">
        <h2>{"No forms created yet"}</h2>
        <Button
          onClick={navigateToNewForm}
          label="Create New Form"
          variant="secondary"
        />
      </div>
    );
  }

  return (
    <div className="form-list">
      <div className="header">
        <h2>{"Your Forms"}</h2>
        <Button
          onClick={navigateToNewForm}
          label="Create New Form"
          variant="secondary"
        />
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
              <Button onClick={() => navigateToViewer(form.id)} label="View" />
              <Button onClick={() => navigateToEditor(form.id)} label="Edit" />
              <Button
                onClick={() => handleDelete(form.id)}
                label="Delete"
                variant="danger"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
