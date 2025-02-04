import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FormRef} from "../../../components/Form/types";
import {Question} from "../components/QuestionEditor/types";
import {FormData} from "../../FormViewer/types";
import {v4 as uuidv4} from "uuid";

const DEFAULT_NOTE = "New changes added, Save to update the form";
const SUCCESS_NOTE = "Changes Saved";

export const useFormBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formName, setFormName] = useState("");
  const [formId, setFormId] = useState<string | null>(null);
  const [footerNote, setFooterNote] = useState("");
  const questionRefs = useRef<Record<string, FormRef>>({});

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const forms: FormData[] = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const form = forms.find((f) => f.id === id);
      if (form) {
        setFormId(id);
        setFormName(form.name);
        setQuestions(form.questions);
      }
    }
  }, [formId, searchParams]);

  const addQuestion = () => {
    setFooterNote(DEFAULT_NOTE);
    const newQuestion: Question = {
      id: uuidv4(),
      title: "",
      type: "text",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setFooterNote(DEFAULT_NOTE);
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const deleteQuestion = (questionId: string) => {
    setFooterNote(DEFAULT_NOTE);
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const validateAllQuestions = (): boolean => {
    let isValid = true;

    if (questions.length === 0) {
      isValid = false;
    }

    // Validate each question editor
    questions.forEach((question) => {
      const questionRef = questionRefs.current[question.id];
      if (questionRef) {
        const isQuestionValid = questionRef.submitForm();
        if (!isQuestionValid) {
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const validateForm = (): boolean => {
    if (!formName.trim()) {
      setFooterNote("Form name is required");
      return false;
    }
    return validateAllQuestions();
  };

  const handleSaveForm = () => {
    if (validateForm()) {
      const forms: FormData[] = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const formData = {
        id: formId || uuidv4(),
        name: formName.trim(),
        questions,
        createdAt: new Date().toISOString(),
      };

      if (formId) {
        const updatedForms = forms.map((f) => (f.id === formId ? formData : f));
        localStorage.setItem("forms", JSON.stringify(updatedForms));
      } else {
        localStorage.setItem("forms", JSON.stringify([...forms, formData]));
      }

      setFooterNote(SUCCESS_NOTE);
      navigate(`/view?id=${formData.id}`);
    }
  };

  return {
    handleSaveForm,
    footerNote,
    deleteQuestion,
    updateQuestion,
    addQuestion,
    questions,
    formName,
    setFormName,
  };
};
