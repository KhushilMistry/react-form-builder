import {useState, useEffect, useRef} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FormProvider, FormRef} from "../../components/Form";
import {FormData} from "./types";
import "./styles.css";

const FormViewer = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData | null>(null);
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

  if (!form) {
    return <div className="form-viewer">{"Form not found"}</div>;
  }

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log(values);
  };

  const onSubmitClick = () => {
    if (formRef.current?.submitForm()) {
      navigate("/");
    }
  };

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

      <button type="button" className="submit-button" onClick={onSubmitClick}>
        {"Submit Form"}
      </button>
    </div>
  );
};

export default FormViewer;
