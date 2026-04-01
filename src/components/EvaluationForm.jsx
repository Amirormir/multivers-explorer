import { useRef, useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const evaluationSchema = z.object({
  nom: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  note: z
    .number({ invalid_type_error: "La note est obligatoire" })
    .min(1, "La note doit être entre 1 et 5")
    .max(5, "La note doit être entre 1 et 5"),
  commentaire: z
    .string()
    .max(200, "Le commentaire ne doit pas dépasser 200 caractères")
    .optional(),
});

function EvaluationForm() {
  const dialogRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      nom: "",
      email: "",
      note: "",
      commentaire: "",
    },
    validationSchema: toFormikValidationSchema(evaluationSchema),
    onSubmit: (values, { resetForm }) => {
      dialogRef.current.showModal();
      setSubmittedData(values);
      resetForm();
    },
  });

  const [submittedData, setSubmittedData] = useState(null);

  return (
    <section className="evaluation">
      <h2>Laisser une note sur ce personnage</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom de l'évaluateur</label>
          <input
            id="nom"
            name="nom"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nom}
          />
          {formik.touched.nom && formik.errors.nom && (
            <p className="error">{formik.errors.nom}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="note">Note (1 à 5)</label>
          <input
            id="note"
            name="note"
            type="number"
            min="1"
            max="5"
            onChange={(e) =>
              formik.setFieldValue("note", e.target.value === "" ? "" : Number(e.target.value))
            }
            onBlur={formik.handleBlur}
            value={formik.values.note}
          />
          {formik.touched.note && formik.errors.note && (
            <p className="error">{formik.errors.note}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="commentaire">Commentaire (facultatif)</label>
          <textarea
            id="commentaire"
            name="commentaire"
            rows="3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.commentaire}
          />
          {formik.touched.commentaire && formik.errors.commentaire && (
            <p className="error">{formik.errors.commentaire}</p>
          )}
        </div>

        <button type="submit">Valider</button>
      </form>

      <dialog ref={dialogRef}>
        {submittedData && (
          <div>
            <h3>Évaluation soumise</h3>
            <p><strong>Nom :</strong> {submittedData.nom}</p>
            <p><strong>Email :</strong> {submittedData.email}</p>
            <p><strong>Note :</strong> {submittedData.note}</p>
            <p><strong>Commentaire :</strong> {submittedData.commentaire || "Aucun"}</p>
            <button onClick={() => dialogRef.current.close()}>Fermer</button>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default EvaluationForm;
