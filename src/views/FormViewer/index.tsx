import {useState, useEffect, useRef, useCallback} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FormProvider, FormRef} from "../../components/Form";
import {FormData} from "./types";
import "./styles.css";
import {Button} from "../../components/Button";

const SUCCESS_NOTE = "Changes Saved, Redirecting...";

const FormViewer = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData | null>(null);
  const [footerNote, setFooterNote] = useState("");
  const formRef = useRef<FormRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const formId = searchParams.get("id");
    if (!formId) return;

    const forms: FormData[] = JSON.parse(localStorage.getItem("forms") || "[]");
    const foundForm = forms.find((f) => f.id === formId);
    if (foundForm) {
      setForm(foundForm);
    }
  }, [searchParams]);

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    console.log(values);
  }, []);

  const onSubmitClick = useCallback(() => {
    if (formRef.current?.submitForm()) {
      setFooterNote(SUCCESS_NOTE);
      setTimeout(() => navigate("/"), 1000);
    }
  }, [navigate]);

  if (!form) {
    return <div className="form-viewer">{"Form not found"}</div>;
  }

  return (
    <div className="form-viewer">
      <h1 className="form-title">{form.name}</h1>

      <FormProvider
        ref={formRef}
        formName={`form-${form.id}`}
        fields={form.questions.map((q) => ({
          name: q.id,
          type: q.type,
          label: q.title,
          description: q.description,
          required: q.required,
          options: q.options,
        }))}
        onSubmit={handleSubmit}
      />

      <Button onClick={onSubmitClick} label="Submit Form" variant="secondary" />

      <div className="footer-note">{footerNote}</div>
    </div>
  );
};

export default FormViewer;
